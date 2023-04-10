<?php

namespace Artio\QuotePriceNotifier\Enum;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Available values for Price Watch status
 */
abstract class PriceWatchStatus {

	const ACTIVE = 'active';
	const INACTIVE = 'inactive';

	/**
	 * Maps enum values to their localized labels
	 *
	 * @var string[]
	 */
	protected static $labels;

	/**
	 * Returns all available values with their localized labels
	 *
	 * @return string[]
	 */
	public static function getLabels() {
		if (is_null(self::$labels)) {
			self::$labels = [
				self::ACTIVE  => __('Active', 'quote-price-notifier'),
				self::INACTIVE => __('Inactive', 'quote-price-notifier'),
			];
		}
		return self::$labels;
	}

	/**
	 * Returns label for given value
	 *
	 * @param string $value
	 * @return string
	 */
	public static function getLabel( $value) {
		$labels = self::getLabels();
		return isset($labels[$value]) ? $labels[$value] : 'Unknown';
	}

	/**
	 * Determines whether given value is a valid Price Watch status
	 *
	 * @param string $value
	 * @return bool
	 */
	public static function isValid( $value) {
		$labels = self::getLabels();
		return isset($labels[$value]);
	}
}
