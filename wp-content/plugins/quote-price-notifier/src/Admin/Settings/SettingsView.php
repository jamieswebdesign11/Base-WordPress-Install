<?php

namespace Artio\QuotePriceNotifier\Admin\Settings;

use Artio\QuotePriceNotifier\Settings;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Displays new settings section on WooCommerce's Products settings page
 */
class SettingsView {

	const SECTION_KEY = 'quote_price_notifier';

	/**
	 * Registers new settings section in WooCommerce's Products settings
	 */
	public function register() {
		add_filter('woocommerce_get_sections_products', static function ( array $sections) {
			$sections[self::SECTION_KEY] = __('Quote & Price Notifier', 'quote-price-notifier');
			return $sections;
		});
		add_filter('woocommerce_get_settings_products', function ( array $settings, $currentSection) {
			if (self::SECTION_KEY !== $currentSection) {
				return $settings;
			}

			return $this->getSettings();
		}, 10, 2);
	}

	/**
	 * Generates settings for our plugin using WooCommerce's Settings API
	 *
	 * @return array
	 */
	protected function getSettings() {
		return [
			[
				'type' => 'title',
				'id' => 'qpn_quote_requests_settings',
				'title' => __('Quote Requests', 'quote-price-notifier'),
			],
			[
				'type' => 'checkbox',
				'id' => Settings::QUOTE_REQUESTS_ENABLED,
				'title' => __('Enabled', 'quote-price-notifier'),
				'desc' => __('Enable Quote Requests', 'quote-price-notifier'),
				'default' => Settings::getDefault(Settings::QUOTE_REQUESTS_ENABLED),
			],
			[
				'type' => 'checkbox',
				'id' => Settings::QUOTE_REQUESTS_CAPTCHA,
				'title' => __('Use reCaptcha', 'quote-price-notifier'),
				'desc' => __('Use invisible reCaptcha to validate user requests', 'quote-price-notifier'),
				'default' => Settings::getDefault(Settings::QUOTE_REQUESTS_CAPTCHA),
			],
			[
				'type' => 'sectionend',
				'id' => 'qpn_quote_requests_settings',
			],
			[
				'type' => 'title',
				'id' => 'qpn_price_watches_settings',
				'title' => __('Price Watches', 'quote-price-notifier'),
			],
			[
				'type' => 'checkbox',
				'id' => Settings::PRICE_WATCHES_ENABLED,
				'title' => __('Enabled', 'quote-price-notifier'),
				'desc' => __('Enable Price Watches', 'quote-price-notifier'),
				'default' => Settings::getDefault(Settings::PRICE_WATCHES_ENABLED),
			],
			[
				'type' => 'checkbox',
				'id' => Settings::PRICE_WATCHES_CAPTCHA,
				'title' => __('Use reCaptcha', 'quote-price-notifier'),
				'desc' => __('Use invisible reCaptcha to validate user requests', 'quote-price-notifier'),
				'default' => Settings::getDefault(Settings::PRICE_WATCHES_CAPTCHA),
			],
			[
				'type' => 'single_select_page',
				'id' => Settings::UNSUBSCRIBE_PAGE_ID,
				'title' => __('Unsubscribe page', 'quote-price-notifier'),
				'default' => Settings::getDefault(Settings::UNSUBSCRIBE_PAGE_ID),
				'class' => 'wc-enhanced-select-nostd',
			],
			[
				'type' => 'sectionend',
				'id' => 'qpn_price_watches_settings',
			],
			[
				'type' => 'title',
				'id' => 'qpn_captcha_settings',
				'title' => __('reCaptcha', 'quote-price-notifier'),
				'desc' => sprintf(
					/* translators: %s: Link to Google reCaptcha settings */
					__('If you want to use Invisible reCaptcha, please register your website at %s and choose reCaptcha v2 - Invisile reCaptcha as type.<br/>After registering, you can find your reCaptcha keys on Settings page.', 'quote-price-notifier'),
					'<a href="https://www.google.com/recaptcha/admin" target="_blank">https://www.google.com/recaptcha/admin</a>'
				),
			],
			[
				'type' => 'text',
				'id' => Settings::RECAPTCHA_SITE_KEY,
				'title' => __('reCaptcha site key', 'quote-price-notifier'),
			],
			[
				'type' => 'text',
				'id' => Settings::RECAPTCHA_SECRET_KEY,
				'title' => __('reCaptcha secret key', 'quote-price-notifier'),
			],
			[
				'type' => 'sectionend',
				'id' => 'qpn_captcha_settings',
			],
			[
				'type' => 'title',
				'id' => 'qpn_emails_settings',
				'title' => __('Emails', 'quote-price-notifier'),
				'desc' => sprintf(
					/* translators: %s: Link to emails configuration */
					esc_html__('In order to configure individual Quote & Price Notifier emails, switch to the %s tab.', 'quote-price-notifier'),
					'<a href="' . admin_url('admin.php?page=wc-settings&tab=email') . '">' . __('Emails', 'woocommerce') . '</a>'
				),
			],
			[
				'type' => 'number',
				'id' => Settings::EMAILS_PER_MINUTE,
				'title' => __('Max emails per minute', 'quote-price-notifier'),
				'desc' => __('Maximum number of notification emails sent to customers per minute in order to avoid getting blacklisted by SPAM filters.', 'quote-price-notifier'),
				'default' => Settings::getDefault(Settings::EMAILS_PER_MINUTE),
				'custom_attributes' => [
					'min' => 1,
					'step' => 1,
				],
				'css' => 'width: 80px'
			],
			[
				'type' => 'sectionend',
				'id' => 'qpn_emails_settings',
			],
		];
	}
}
