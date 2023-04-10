<?php

namespace Artio\QuotePriceNotifier\Html;

use DateTime;
use DateTimeZone;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Helper class for operations with date and time
 */
abstract class DateHtml {

	/**
	 * Returns cached instance of UTC timezone
	 *
	 * @return DateTimeZone
	 */
	public static function getUtcTimezone() {
		static $tz;

		if (!$tz) {
			$tz = new DateTimeZone('UTC');
		}

		return $tz;
	}

	/**
	 * Returns cached instance of local timezone according to WP configuration
	 *
	 * @return DateTimeZone
	 */
	public static function getLocalTimezone() {
		static $tz;

		if (!$tz) {
			$tzString = get_option('timezone_string');
			$tz = $tzString ? new DateTimeZone($tzString) : self::getUtcTimezone();
		}

		return $tz;
	}

	/**
	 * Converts date/time string from GMT (as loaded from DB) to
	 * local timezone and generates HTML for display in list table
	 *
	 * @param string $dateString
	 * @return string
	 */
	public static function adminTableDateFromGmt( $dateString) {
		// Parse date from GMT string
		$dt = new DateTime($dateString, self::getUtcTimezone());

		// Set local timezone
		$dt->setTimezone(self::getLocalTimezone());

		// Get GMT timestamp and local timezone timestamp
		$ts = $dt->getTimestamp();
		$tsLocal = $ts + $dt->getOffset();

		// For dates less than 1 day ago, display human readable time difference
		// otherwise display short date
		$now = time();
		if ($ts <= $now && $ts > strtotime('-1 day', $now)) {
			$showDate = sprintf(
				/* translators: %s: Human readable time difference */
				__( '%s ago', 'quote-price-notifier' ),
				human_time_diff($ts, $now)
			);
		} else {
			$showDate = date_i18n(get_option('date_format'), $tsLocal);
		}

		// Generate HTML tag
		$html = sprintf(
			'<time datetime="%1$s" title="%2$s">%3$s</time>',
			esc_attr($dt->format('c')),
			esc_html(date_i18n(get_option('date_format') . ' ' . get_option('time_format'), $tsLocal)),
			esc_html($showDate)
		);

		return $html;
	}
}
