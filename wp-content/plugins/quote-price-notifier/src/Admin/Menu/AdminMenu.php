<?php

namespace Artio\QuotePriceNotifier\Admin\Menu;

use Artio\QuotePriceNotifier\Admin\Controller\AdminTableController;
use Artio\QuotePriceNotifier\Db\Collection\QuoteCollection;
use Artio\QuotePriceNotifier\Enum\QuoteStatus;
use Artio\QuotePriceNotifier\Factory;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to generate new entries in WooCommerce's admin menu
 */
class AdminMenu {

	const MENU_SLUG_PREFIX = 'quote-price-notifier-';
	const MENU_SLUG_QUOTES = 'quotes';
	const MENU_SLUG_PRICE_WATCHES = 'price-watches';

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
	 * Registers hook to generate admin menu entries when needed
	 */
	public function register() {
		add_action('admin_menu', function() {
			$this->createMenu();
		});
	}

	/**
	 * Creates new menu items in WooCommerce's admin menu
	 */
	protected function createMenu() {
		// Display count of pending quote requests
		$counts = ( new QuoteCollection() )->getCounts();
		$pending = $counts[QuoteStatus::PENDING];

		$quotesTitle = __('Quote Requests', 'quote-price-notifier');
		$quotesCounter = ' <span class="awaiting-mod update-plugins count-' . $pending . '"><span class="pending-count">' . $pending . '</span></span>';

		$priceWatchesTitle = __('Price Watches', 'quote-price-notifier');

		$this->addWooCommerceSubmenu($quotesTitle . $quotesCounter, $quotesTitle,
			self::MENU_SLUG_QUOTES, [$this->factory, 'getQuoteAdminController']
		);
		$this->addWooCommerceSubmenu($priceWatchesTitle, $priceWatchesTitle,
			self::MENU_SLUG_PRICE_WATCHES, [$this->factory, 'getPriceWatchAdminController']
		);
	}

	/**
	 * Adds new submenu item to WooCommerce's admin menu and registers required callbacks
	 * for processing requests and rendering the page
	 *
	 * @param string $menuTitle
	 * @param string $pageTitle
	 * @param string $slugSuffix
	 * @param callable $controllerGetter Function which must return an AdminTableController instance
	 */
	protected function addWooCommerceSubmenu( $menuTitle, $pageTitle, $slugSuffix, $controllerGetter) {
		$hook = add_submenu_page('woocommerce', $pageTitle, $menuTitle, 'administrator',
			self::MENU_SLUG_PREFIX . $slugSuffix,
			static function() use ( $controllerGetter) {
				/* @var AdminTableController $controller */
				$controller = $controllerGetter();
				$controller->display();
			}
		);

		// Register load callback
		add_action('load-' . $hook, static function() use ( $controllerGetter) {
			/* @var AdminTableController $controller */
			$controller = $controllerGetter();
			$controller->load();
		});
	}
}
