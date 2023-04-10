<?php

namespace Artio\QuotePriceNotifier\Email;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchNotificationCollection;
use Artio\QuotePriceNotifier\Db\Model\PriceWatchNotification;
use Artio\QuotePriceNotifier\Enum\Hook;
use Artio\QuotePriceNotifier\Factory;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Sends notification e-mails from queue in background using WP-Cron
 */
class EmailsProcessor {

	const CRON_INTERVAL = 'every_minute';
	const PROCESS_NAME = 'qpn_emails_process';
	const PROCESS_TIMEOUT = 300;
	const LAST_RUN_OPTION = 'qpn_emails_last_run';

	/**
	 * Factory
	 *
	 * @var Factory
	 */
	private $factory;

	/**
	 * Path to main plugin file
	 *
	 * @var string
	 */
	private $pluginFile;

	/**
	 * Time limit
	 *
	 * @var int|null
	 */
	private $limitMaxTime = null;

	/**
	 * Emails limit
	 *
	 * @var int
	 */
	private $limitEmails = 5;

	/**
	 * Constructor
	 *
	 * @param Factory $factory
	 * @param string $pluginFile
	 */
	public function __construct( Factory $factory, $pluginFile) {
		$this->factory = $factory;
		$this->pluginFile = $pluginFile;
	}

	/**
	 * Registers required hooks for WP-Cron processing
	 */
	public function register() {
		$this->registerCronInterval();
		$this->registerCronHandler();
		$this->scheduleCronTask();
		$this->registerDeactivation();
	}

	/**
	 * Registers "Every minute" cron interval if it doesn't already exist
	 */
	private function registerCronInterval() {
		add_filter('cron_schedules', function( array $schedules) {
			if (!isset($schedules[self::CRON_INTERVAL])) {
				$schedules[self::CRON_INTERVAL] = [
					'interval' => 60,
					'display' => esc_html__('Every minute'),
				];
			}
			return $schedules;
		});
	}

	/**
	 * Registers the WP-Cron task handler function
	 */
	private function registerCronHandler() {
		add_action(Hook::EMAILS_CRON, function() {
 $this->processEmails();
		});
	}

	/**
	 * Schedules WP-Cron task
	 */
	private function scheduleCronTask() {
		if (!wp_next_scheduled(Hook::EMAILS_CRON)) {
			wp_schedule_event(time(), self::CRON_INTERVAL, Hook::EMAILS_CRON);
		}
	}

	/**
	 * Registers hook to unschedule cron task on plugin deactivation
	 */
	private function registerDeactivation() {
		register_deactivation_hook($this->pluginFile, function() {
			wp_unschedule_event(wp_next_scheduled(Hook::EMAILS_CRON), Hook::EMAILS_CRON);
		});
	}

	/**
	 * Executed by WP-Cron in specified intervals, actually sends e-mails from queue
	 * taking into account time and number of e-mails limits
	 */
	private function processEmails() {
		// Lock process
		$lock = $this->factory->getLock(self::PROCESS_NAME, self::PROCESS_TIMEOUT);
		if (!$lock->lock()) {
			return;
		}

		// Calculate limits
		$this->calculateLimits();
//		file_put_contents('/mnt/c/wamp/www/cron.txt', gmdate('Y-m-d H:i:s').': Executed, max mails: '.$this->limitEmails."\n", FILE_APPEND);

		// Load mails from queue and loop, check limits
		$notifications = $this->getNotificationsToProcess();
		/* @var PriceWatchNotification $notification */
		foreach ($notifications as $notification) {
			// Process only active price watches
			if ($notification->getPriceWatch()->isActive()) {
				// Trigger action
				do_action(Hook::SEND_PRICE_WATCH_NOTIFICATION, $notification);

				// Decrease count
				$this->limitEmails--;
			}

			// Delete current notification
			$notification->delete();

			if (!$this->checkLimits()) {
				break;
			}
			$lock->updateLock();
		}

		// Unlock process
		$lock->unlock();
	}

	/**
	 * Calculates limits for how long the process can run and how many e-mails it can send
	 */
	private function calculateLimits() {
		// Calculate time limit
		$maxTime = (int) @ini_get('max_execution_time');
		if ($maxTime > 0) {
			$this->limitMaxTime = time() + (int) floor($maxTime * 0.9);
		} else {
			$this->limitMaxTime = null;
		}

		// Calculate e-mails limit - check when the process was last run
		// and batch at most 5 runs together, because we expect to be run
		// every minute, but if someone has cron configured to run every
		// 5 minutes, we want to batch those together.
		$maxMails = $this->factory->getSettings()->getMaxEmailsPerMinute();
		$lastRun = get_option(self::LAST_RUN_OPTION, 0);
		if ($lastRun > 0) {
			$lastRunMinutes = (int) floor(( time() - $lastRun ) / 60);
			$lastRunMinutes = max(1, min($lastRunMinutes, 5));
			$maxMails = $maxMails * $lastRunMinutes;
		}
		$this->limitEmails = $maxMails;
		update_option(self::LAST_RUN_OPTION, time());
	}

	/**
	 * Checks whether calculated limits still haven't been reached
	 *
	 * @return bool TRUE if the process can continue, FALSE if the limits have been reached
	 */
	private function checkLimits() {
		if ($this->limitMaxTime && ( time() >= $this->limitMaxTime )) {
			return false;
		}

		if ($this->limitEmails <= 0) {
			return false;
		}

		return true;
	}

	/**
	 * Loads all the price watch notifications we should process next
	 *
	 * @return iterable
	 */
	private function getNotificationsToProcess() {
		$collection = new PriceWatchNotificationCollection();
		return $collection->getNotificationsToProcess();
	}
}
