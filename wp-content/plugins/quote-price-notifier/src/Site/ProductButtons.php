<?php

namespace Artio\QuotePriceNotifier\Site;

use Artio\QuotePriceNotifier\Enum\ProductType;
use Artio\QuotePriceNotifier\Factory;
use Artio\QuotePriceNotifier\Settings;
use WC_Product;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Handles display of Request Quote and Watch Price buttons for WooCommerce products
 */
class ProductButtons {

	/**
	 * List of supported product types for which to display buttons
	 *
	 * @var string[]
	 */
	protected $supportedProductTypes = [
		ProductType::SIMPLE,
		ProductType::VARIABLE,
		ProductType::EXTERNAL,
	];

	/**
	 * Factory
	 *
	 * @var Factory
	 */
	protected $factory;

	/**
	 * Settings
	 *
	 * @var Settings
	 */
	protected $settings;

	public function __construct( Factory $factory) {
		$this->factory = $factory;
		$this->settings = $factory->getSettings();
	}

	/**
	 * Registers required hooks to display buttons on frontend
	 */
	public function register() {
		if ($this->settings->isQuoteRequestsEnabled() || $this->settings->isPriceWatchesEnabled()) {
			// Load required scripts
			$this->factory->getScripts()->register();
			if ($this->settings->isCaptchaEnabled()) {
				$this->factory->getRecaptcha()->register();
			}

			add_action('woocommerce_after_add_to_cart_button', function() {
				$this->displayButtons();
			});
		}
	}

	/**
	 * Loads templates to display the buttons
	 */
	protected function displayButtons() {
		global $product;
		/* @var WC_Product $product */

		if (!$product || !in_array($product->get_type(), $this->supportedProductTypes)) {
			return;
		}

		echo '<div class="qpn_buttons">';
		if ($this->settings->isQuoteRequestsEnabled()) {
			wc_get_template(
				'single-product-request-quote.php',
				[
					'captcha' => $this->settings->isQuoteRequestsCaptchaEnabled() ? $this->factory->getRecaptcha() : null,
				],
				'',
				$this->factory->getPaths()->getTemplatesDir()
			);
		}
		if ($this->settings->isPriceWatchesEnabled()) {
			wc_get_template(
				'single-product-watch-price.php',
				[
					'captcha' => $this->settings->isPriceWatchesCaptchaEnabled() ? $this->factory->getRecaptcha() : null,
				],
				'',
				$this->factory->getPaths()->getTemplatesDir()
			);
		}
		echo '</div>';
	}
}
