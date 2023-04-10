<?php

namespace Artio\QuotePriceNotifier;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Provides centralized access to stored plugin settings
 */
class Settings {

	const QUOTE_REQUESTS_ENABLED = 'qpn_quote_requests_enabled';
	const QUOTE_REQUESTS_CAPTCHA = 'qpn_quote_requests_captcha';

	const PRICE_WATCHES_ENABLED = 'qpn_price_watches_enabled';
	const PRICE_WATCHES_CAPTCHA = 'qpn_price_watches_captcha';

	const RECAPTCHA_SITE_KEY = 'qpn_recaptcha_site_key';
	const RECAPTCHA_SECRET_KEY = 'qpn_recaptcha_secret_key';

	const EMAILS_PER_MINUTE = 'qpn_emails_per_minute';
	const UNSUBSCRIBE_PAGE_ID = 'qpn_unsubscribe_page_id';

	/**
	 * List of default values for bool options
	 *
	 * @var string[]
	 */
	protected static $defaults = [
		self::QUOTE_REQUESTS_ENABLED => 'yes',
		self::QUOTE_REQUESTS_CAPTCHA => 'no',
		self::PRICE_WATCHES_ENABLED => 'yes',
		self::PRICE_WATCHES_CAPTCHA => 'no',
		self::EMAILS_PER_MINUTE => 5,
		self::UNSUBSCRIBE_PAGE_ID => 0,
	];

	/**
	 * Returns default value for specified option
	 *
	 * @param string $option
	 * @return string|false
	 */
	public static function getDefault( $option) {
		return isset(self::$defaults[$option]) ? self::$defaults[$option] : false;
	}

	/**
	 * Determines if specified option is enabled
	 *
	 * @param string $option
	 * @return bool
	 */
	protected function isEnabled( $option) {
		return ( get_option($option, self::getDefault($option)) === 'yes' );
	}

	/**
	 * Whether quote requests are enabled
	 *
	 * @return bool
	 */
	public function isQuoteRequestsEnabled() {
		return $this->isEnabled(self::QUOTE_REQUESTS_ENABLED);
	}

	/**
	 * Whether captcha for quote requests is enabled
	 *
	 * @return bool
	 */
	public function isQuoteRequestsCaptchaEnabled() {
		return $this->isEnabled(self::QUOTE_REQUESTS_CAPTCHA);
	}

	/**
	 * Whether price watchers are enabled
	 *
	 * @return bool
	 */
	public function isPriceWatchesEnabled() {
		return $this->isEnabled(self::PRICE_WATCHES_ENABLED);
	}

	/**
	 * Whether captcha for price watchers is enabled
	 *
	 * @return bool
	 */
	public function isPriceWatchesCaptchaEnabled() {
		return $this->isEnabled(self::PRICE_WATCHES_CAPTCHA);
	}

	/**
	 * Recaptcha site key
	 *
	 * @return string
	 */
	public function getRecaptchaSiteKey() {
		return trim(get_option(self::RECAPTCHA_SITE_KEY, ''));
	}

	/**
	 * Recaptcha secret key
	 *
	 * @return string
	 */
	public function getRecaptchaSecretKey() {
		return trim(get_option(self::RECAPTCHA_SECRET_KEY, ''));
	}

	/**
	 * Determines whether captcha is enabled at least for some functionality
	 *
	 * @return bool
	 */
	public function isCaptchaEnabled() {
		return ( $this->isQuoteRequestsCaptchaEnabled() || $this->isPriceWatchesCaptchaEnabled() );
	}

	/**
	 * Returns maximum number of emails sent per minute
	 *
	 * @return int
	 */
	public function getMaxEmailsPerMinute() {
		$value = (int) get_option(self::EMAILS_PER_MINUTE, self::getDefault(self::EMAILS_PER_MINUTE));
		if ($value < 1) {
			$value = 1;
		}
		return $value;
	}

	/**
	 * Returns selected Unsubscribe page ID
	 *
	 * @return int
	 */
	public function getUnsubscribePageId() {
		return (int) get_option(self::UNSUBSCRIBE_PAGE_ID, self::getDefault(self::UNSUBSCRIBE_PAGE_ID));
	}
}
