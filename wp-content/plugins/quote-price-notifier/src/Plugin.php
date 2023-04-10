<?php

namespace Artio\QuotePriceNotifier;

use Artio\QuotePriceNotifier\Admin\Menu\AdminMenu;
use Artio\QuotePriceNotifier\Db\Schema;
use Exception;
use QuotePriceNotifierAdminMessage;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Main plugin class
 */
class Plugin {

	/**
	 * Factory
	 *
	 * @var Factory
	 */
	protected $factory;

	public function __construct( Factory $factory) {
		$this->factory = $factory;
	}

	/**
	 * Executed once when the plugin is activated
	 */
	public function activate() {
		$this->factory->getUnsubscribePage()->createPageIfNeeded();
	}

	/**
	 * Main entrypoint executed after plugins are loaded
	 */
	public function run() {
		$this->runCommon();

		if (is_admin()) {
			$this->runAdmin();
		} else {
			$this->runFrontend();
		}
	}

	/**
	 * Executed in both frontend and backend
	 */
	protected function runCommon() {
		$this->updateDatabase();

		$this->factory->getDbSchema()->register();
		$this->factory->getRequestHandler()->register();
		$this->factory->getPriceWatcher()->register();
		$this->factory->getEmailsManager()->register();
		$this->factory->getEmailsProcessor()->register();
		$this->factory->getUnsubscribePage()->register();
		$this->factory->getPersonalDataExporter()->register();
		$this->factory->getPersonalDataEraser()->register();
	}

	/**
	 * Executed only in backend
	 */
	protected function runAdmin() {
		$this->factory->getAdminMenu()->register();
		$this->factory->getAdminSettingsView()->register();
	}

	/**
	 * Executed only in frontend
	 */
	protected function runFrontend() {
		$this->factory->getProductButtons()->register();
	}

	/**
	 * Updates plugin's database tables if needed
	 */
	private function updateDatabase() {
		try {
			$this->factory->getDbSchema()->updateIfNeeded();
		} catch (Exception $e) {
			QuotePriceNotifierAdminMessage::add(sprintf(
				/* translators: %s: Error message */
				__('Quote & Price Notifier could not update database: %s', 'quote-price-notifier'),
				$e->getMessage()
			), 'error');
		}
	}
}
