<?php

namespace Artio\QuotePriceNotifier;

use Artio\QuotePriceNotifier\Admin\Controller\PriceWatchAdminController;
use Artio\QuotePriceNotifier\Admin\Controller\QuoteAdminController;
use Artio\QuotePriceNotifier\Admin\Menu\AdminMenu;
use Artio\QuotePriceNotifier\Admin\Settings\SettingsView;
use Artio\QuotePriceNotifier\Captcha\Recaptcha;
use Artio\QuotePriceNotifier\Db\Schema;
use Artio\QuotePriceNotifier\Email\EmailsManager;
use Artio\QuotePriceNotifier\Email\EmailsProcessor;
use Artio\QuotePriceNotifier\Filesystem\Paths;
use Artio\QuotePriceNotifier\Html\Scripts;
use Artio\QuotePriceNotifier\Locking\TransientLock;
use Artio\QuotePriceNotifier\PriceWatcher\PriceWatcher;
use Artio\QuotePriceNotifier\PriceWatcher\PriceWatchNotificationQueue;
use Artio\QuotePriceNotifier\PriceWatcher\UnsubscribeHash;
use Artio\QuotePriceNotifier\Privacy\PersonalDataEraser;
use Artio\QuotePriceNotifier\Privacy\PersonalDataExporter;
use Artio\QuotePriceNotifier\Site\Controller\ControllerBase;
use Artio\QuotePriceNotifier\Site\ProductButtons;
use Artio\QuotePriceNotifier\Site\RequestHandler;
use Artio\QuotePriceNotifier\Site\UnsubscribePage;
use InvalidArgumentException;

if (!defined('ABSPATH')) {
exit;
}

final class Factory {

	/**
	 * Main plugin file
	 *
	 * @var string
	 */
	private $pluginFile;

	/**
	 * Schema
	 *
	 * @var Schema
	 */
	private $schema;
	/**
	 * Settings
	 *
	 * @var Settings
	 */
	private $settings;
	/**
	 * Quote admin controller
	 *
	 * @var QuoteAdminController
	 */
	private $quoteAdminController;
	/**
	 * PriceWatch admin controller
	 *
	 * @var PriceWatchAdminController
	 */
	private $priceWatchAdminController;
	/**
	 * Files paths
	 *
	 * @var Paths
	 */
	private $paths;
	/**
	 * Scripts helper
	 *
	 * @var Scripts
	 */
	private $scripts;
	/**
	 * Site controllers
	 *
	 * @var ControllerBase[]
	 */
	private $siteControllers = [];
	/**
	 * Recaptcha
	 *
	 * @var Recaptcha
	 */
	private $recatpcha;
	/**
	 * Unsubscribe hash generator
	 *
	 * @var UnsubscribeHash
	 */
	private $unsubscribeHash;

	/**
	 * Constructor
	 *
	 * @param string $pluginFile
	 */
	public function __construct( $pluginFile) {
		$this->pluginFile = $pluginFile;
	}

	/**
	 * Returns schema
	 *
	 * @return Schema
	 */
	public function getDbSchema() {
		if (!$this->schema) {
			$this->schema = new Schema();
		}
		return $this->schema;
	}

	/**
	 * Returns admin menu
	 *
	 * @return AdminMenu
	 */
	public function getAdminMenu() {
		return new AdminMenu($this);
	}

	/**
	 * Returns settings view
	 *
	 * @return SettingsView
	 */
	public function getAdminSettingsView() {
		return new SettingsView();
	}

	/**
	 * Returns settings
	 *
	 * @return Settings
	 */
	public function getSettings() {
		if (!$this->settings) {
			$this->settings = new Settings();
		}
		return $this->settings;
	}

	/**
	 * Returns quote admin controller
	 *
	 * @return QuoteAdminController
	 */
	public function getQuoteAdminController() {
		if (!$this->quoteAdminController) {
			$this->quoteAdminController = new QuoteAdminController();
		}
		return $this->quoteAdminController;
	}

	/**
	 * Returns price watch admin controller
	 *
	 * @return PriceWatchAdminController
	 */
	public function getPriceWatchAdminController() {
		if (!$this->priceWatchAdminController) {
			$this->priceWatchAdminController = new PriceWatchAdminController();
		}
		return $this->priceWatchAdminController;
	}

	/**
	 * Returns product buttons
	 *
	 * @return ProductButtons
	 */
	public function getProductButtons() {
		return new ProductButtons($this);
	}

	/**
	 * Returns file paths helper
	 *
	 * @return Paths
	 */
	public function getPaths() {
		if (!$this->paths) {
			$this->paths = new Paths($this->pluginFile);
		}
		return $this->paths;
	}

	/**
	 * Returns scripts helper
	 *
	 * @return Scripts
	 */
	public function getScripts() {
		if (!$this->scripts) {
			$this->scripts = new Scripts($this->getPaths());
		}
		return $this->scripts;
	}

	/**
	 * Returns specified site controller
	 *
	 * @param string $name
	 * @return ControllerBase
	 */
	public function getSiteController( $name) {
		if (!isset($this->siteControllers[$name])) {
			$className = str_replace('_', '', ucwords($name, '_')) . 'Controller';
			$fullName = 'Artio\\QuotePriceNotifier\\Site\\Controller\\' . $className;
			if (!class_exists($fullName)) {
				throw new InvalidArgumentException('Invalid controller');
			}

			$this->siteControllers[$name] = new $fullName($this);
		}

		return $this->siteControllers[$name];
	}

	/**
	 * Returns request handler
	 *
	 * @return RequestHandler
	 */
	public function getRequestHandler() {
		return new RequestHandler($this);
	}

	/**
	 * Returns emails manager
	 *
	 * @return EmailsManager
	 */
	public function getEmailsManager() {
		return new EmailsManager(
			$this->getPaths(),
			$this->getPriceWatchNotificationQueue(),
			$this->getSettings(),
			$this->getUnsubscribeHash()
		);
	}

	/**
	 * Returns emails processor
	 *
	 * @return EmailsProcessor
	 */
	public function getEmailsProcessor() {
		return new EmailsProcessor($this, $this->pluginFile);
	}

	/**
	 * Returns recaptcha
	 *
	 * @return Recaptcha
	 */
	public function getRecaptcha() {
		if (!$this->recatpcha) {
			$settings = $this->getSettings();
			$this->recatpcha = new Recaptcha($settings->getRecaptchaSiteKey(), $settings->getRecaptchaSecretKey());
		}
		return $this->recatpcha;
	}

	/**
	 * Returns price watcher
	 *
	 * @return PriceWatcher
	 */
	public function getPriceWatcher() {
		return new PriceWatcher();
	}

	/**
	 * Returns price watch notification queue
	 *
	 * @return PriceWatchNotificationQueue
	 */
	public function getPriceWatchNotificationQueue() {
		return new PriceWatchNotificationQueue();
	}

	/**
	 * Creates lock with timeout
	 *
	 * @param string $name
	 * @param int $timeout
	 * @return TransientLock
	 */
	public function getLock( $name, $timeout) {
		return new TransientLock($name, $timeout);
	}

	/**
	 * Returns unsubscribe hash generator
	 *
	 * @return UnsubscribeHash
	 */
	public function getUnsubscribeHash() {
		if (!$this->unsubscribeHash) {
			$this->unsubscribeHash = new UnsubscribeHash();
		}
		return $this->unsubscribeHash;
	}

	/**
	 * Returns unsubscribe page
	 *
	 * @return UnsubscribePage
	 */
	public function getUnsubscribePage() {
		return new UnsubscribePage($this->getSettings(), $this->getUnsubscribeHash(), $this->getPaths());
	}

	/**
	 * Returns personal data exporter
	 *
	 * @return PersonalDataExporter
	 */
	public function getPersonalDataExporter() {
		return new PersonalDataExporter();
	}

	/**
	 * Returns personal data eraser
	 *
	 * @return PersonalDataEraser
	 */
	public function getPersonalDataEraser() {
		return new PersonalDataEraser();
	}
}
