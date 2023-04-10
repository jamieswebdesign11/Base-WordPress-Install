<?php

namespace Artio\QuotePriceNotifier\Db;

use RuntimeException;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Simple helper class to work with database transactions
 */
abstract class Transaction {

	private static $inTransaction = false;

	/**
	 * Starts a new transaction if not already started
	 */
	public static function start() {
		global $wpdb;

		if (self::$inTransaction) {
			throw new RuntimeException(__('Transaction is already open.', 'quote-price-notifier'));
		}

		if ($wpdb->query('START TRANSACTION') === false) {
			throw new RuntimeException(__('Could not start transaction.', 'quote-price-notifier'));
		}

		self::$inTransaction = true;
	}

	/**
	 * Commits current transaction if open
	 */
	public static function commit() {
		global $wpdb;

		if (!self::$inTransaction) {
			throw new RuntimeException(__('There is no open transaction.', 'quote-price-notifier'));
		}

		if ($wpdb->query('COMMIT') === false) {
			throw new RuntimeException(__('Could not commit transaction.', 'quote-price-notifier'));
		}

		self::$inTransaction = false;
	}

	/**
	 * Rolls back current transaction if open
	 */
	public static function rollback() {
		global $wpdb;

		if (!self::$inTransaction) {
			throw new RuntimeException(__('There is no open transaction.', 'quote-price-notifier'));
		}

		if ($wpdb->query('ROLLBACK') === false) {
			throw new RuntimeException(__('Could not rollback transaction.', 'quote-price-notifier'));
		}

		self::$inTransaction = false;
	}
}
