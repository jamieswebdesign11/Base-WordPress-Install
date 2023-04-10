<?php

namespace Artio\QuotePriceNotifier\Email;

use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Db\Model\PriceWatchNotification;
use Artio\QuotePriceNotifier\Db\Model\Quote;
use Artio\QuotePriceNotifier\Enum\Hook;
use Artio\QuotePriceNotifier\Filesystem\Paths;
use Artio\QuotePriceNotifier\PriceWatcher\PriceWatchNotificationQueue;
use Artio\QuotePriceNotifier\PriceWatcher\UnsubscribeHash;
use Artio\QuotePriceNotifier\Settings;
use WC_Product;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Registers e-mails classes in WooCommerce and handles their sending
 */
class EmailsManager {

	/**
	 * Files paths helper
	 *
	 * @var Paths
	 */
	private $paths;

	/**
	 * PriceWatch Notifications queue
	 *
	 * @var PriceWatchNotificationQueue
	 */
	private $priceWatchNotificationQueue;

	/**
	 * Settings
	 *
	 * @var Settings
	 */
	private $settings;

	/**
	 * Unsubscribe hash generator
	 *
	 * @var UnsubscribeHash
	 */
	private $hashing;

	public function __construct(
		Paths $paths,
		PriceWatchNotificationQueue $priceWatchNotificationQueue,
		Settings $settings,
		UnsubscribeHash $hashing
	) {
		$this->paths = $paths;
		$this->priceWatchNotificationQueue = $priceWatchNotificationQueue;
		$this->settings = $settings;
		$this->hashing = $hashing;
	}

	/**
	 * Registers all the required hooks
	 */
	public function register() {
		$this->registerWooCommerceClasses();
		$this->registerTriggers();
	}

	/**
	 * Instantiates NewQuoteRequest admin email
	 *
	 * @return NewQuoteRequestAdminEmail
	 */
	private function getNewQuoteRequestAdminEmail() {
		return new NewQuoteRequestAdminEmail($this->paths->getTemplatesDir());
	}

	/**
	 * Instantiates NewPriceWatch admin email
	 *
	 * @return NewPriceWatchAdminMail
	 */
	private function getNewPriceWatchAdminEmail() {
		return new NewPriceWatchAdminMail($this->paths->getTemplatesDir());
	}

	/**
	 * Instantiates PriceWatchNotification email
	 *
	 * @return PriceWatchNotificationMail
	 */
	private function getPriceWatchNotificationEmail() {
		return new PriceWatchNotificationMail(
			$this->paths->getTemplatesDir(),
			$this->settings->getUnsubscribePageId(),
			$this->hashing
		);
	}

	/**
	 * Registers e-mails classes in WooCommerce to display settings for them
	 */
	private function registerWooCommerceClasses() {
		add_filter('woocommerce_email_classes', function( $emails) {
			$emails['QPN_NewQuoteRequestAdminEmail'] = $this->getNewQuoteRequestAdminEmail();
			$emails['QPN_NewPriceWatchAdminMail'] = $this->getNewPriceWatchAdminEmail();
			$emails['QPN_PriceWatchNotificationMail'] = $this->getPriceWatchNotificationEmail();
			return $emails;
		});
	}

	/**
	 * Registers triggers to send various kinds of e-mails
	 */
	private function registerTriggers() {
		// Send e-mail to admin when new quote is requested
		add_action(Hook::NEW_QUOTE_REQUEST_CREATED, function( Quote $quote) {
			$this->getNewQuoteRequestAdminEmail()->trigger($quote);
		});

		// Send e-mail to admin when new price watch is registered
		add_action(Hook::NEW_PRICE_WATCH_CREATED, function( PriceWatch $priceWatch) {
			$this->getNewPriceWatchAdminEmail()->trigger($priceWatch);
		});

		// Enqueue notifications to customers when some product price changes
		add_action(Hook::PRODUCT_PRICE_CHANGED, function( WC_Product $product, $oldPrice, $newPrice) {
			// Enqueue price watch notifications for this product
			$this->priceWatchNotificationQueue->enqueue(
				(int) $product->get_id(),
				$oldPrice,
				$newPrice
			);
		}, 10, 3);

		// Send notification e-mail to customer when they're being processed
		add_action(Hook::SEND_PRICE_WATCH_NOTIFICATION, function( PriceWatchNotification $notification) {
//			file_put_contents('/mnt/c/wamp/www/cron.txt', gmdate('Y-m-d H:i:s').':   Processing notification '.$notification->getId()."\n", FILE_APPEND);
			$this->getPriceWatchNotificationEmail()->trigger($notification);
		});
	}
}
