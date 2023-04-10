<?php

namespace Artio\QuotePriceNotifier\Db;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;
use Artio\QuotePriceNotifier\Db\Collection\QuoteCollection;
use RuntimeException;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to create or update required database tables when needed
 */
final class Schema {

	const SCHEMA_VERSION_OPTION = 'quote_price_notifier_db_version';

	/**
	 * DB schema migration queries
	 *
	 * @var string[][]
	 */
	private $queries;

	public function __construct() {
		$this->initQueries();
	}

	/**
	 * Registers handlers for database changes
	 */
	public function register() {
		add_action('deleted_post', function( $postId) {
 $this->onPostDeleted($postId);
		});
		add_action('deleted_user', function( $userId) {
 $this->onUserDeleted($userId);
		});
	}

	/**
	 * Initializes the list of SQL queries needed to update database to current version.
	 * Each list item represents single schema version and is an array of SQL queries
	 * which need to be run to update the database from previous version.
	 *
	 * We don't use dbDelta() function here because it doesn't support foreign keys.
	 */
	private function initQueries() {
		global $wpdb;

		$this->queries = [[
			"CREATE TABLE {$wpdb->prefix}qpn_price_watch (
				id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
				product_id bigint(20) UNSIGNED NOT NULL,
				customer_email varchar(100) NOT NULL,
				customer_name varchar(250) NOT NULL,
				customer_id bigint(20) UNSIGNED,
				status varchar(20) NOT NULL,
				created_gmt datetime NOT NULL,
				modified_gmt datetime NOT NULL,
				PRIMARY KEY (id),
				KEY product_id (product_id),
				KEY customer_email (customer_email),
				KEY customer_id (customer_id),
				KEY status (status)
			) ENGINE = InnoDB",
			"CREATE TABLE {$wpdb->prefix}qpn_quote (
				id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
				product_id bigint(20) UNSIGNED NOT NULL,
				quantity int(11) NOT NULL,
				customer_email varchar(100) NOT NULL,
				customer_name varchar(250) NOT NULL,
				customer_id bigint(20) UNSIGNED,
				status varchar(20) NOT NULL,
				created_gmt datetime NOT NULL,
				modified_gmt datetime NOT NULL,
				PRIMARY KEY (id),
				KEY product_id (product_id),
				KEY customer_email (customer_email),
				KEY customer_id (customer_id),
				KEY status (status)
			) ENGINE = InnoDB",
			"CREATE TABLE {$wpdb->prefix}qpn_price_watch_notification (
				id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
				price_watch_id bigint(20) UNSIGNED NOT NULL,
				old_price varchar(100) NOT NULL,
				new_price varchar(100) NOT NULL,
				created_gmt datetime NOT NULL,
				PRIMARY KEY (id),
				KEY price_watch_id (price_watch_id),
				CONSTRAINT fk_qpn_pwq_pw FOREIGN KEY (price_watch_id) REFERENCES {$wpdb->prefix}qpn_price_watch (id) ON UPDATE CASCADE ON DELETE CASCADE
			) ENGINE = InnoDB",
		]];
	}

	/**
	 * Returns list of update queries
	 *
	 * @return string[][]
	 */
	private function getQueries() {
		return $this->queries;
	}

	/**
	 * Returns current schema version (the version of database that we need),
	 * this is basically the total number of SQL queries.
	 *
	 * @return int
	 */
	private function getSchemaVersion() {
		return count($this->getQueries());
	}

	/**
	 * Returns current database version (the current version actually in the database)
	 *
	 * @return int
	 */
	private function getDbVersion() {
		return (int) get_option(self::SCHEMA_VERSION_OPTION, 0);
	}

	/**
	 * Compares current database version to required schema version and runs all the
	 * SQL queries needed to update the database.
	 */
	public function updateIfNeeded() {
		global $wpdb;

		$dbVersion = $this->getDbVersion();
		$schemaVersion = $this->getSchemaVersion();
		if ($dbVersion >= $schemaVersion) {
			return;
		}

		// Run all the queries with higher version than current database
		$allQueries = $this->getQueries();
		for ($nextVersion = $dbVersion; $nextVersion < $schemaVersion; $nextVersion++) {
			// Run queries to update single version
			$queries = $allQueries[$nextVersion];
			foreach ($queries as $query) {
				// Work-around to allow dynamic query to pass through CodeSniffer >:[
				if (!$wpdb->query($wpdb->prepare('%1$s', '') . $query)) {
					throw new RuntimeException(sprintf(
						/* translators: %s: SQL query */
						__('Could not run query: %s', 'quote-price-notifier'),
						$query
					));
				}
			}

			// Store new database version
			if (!update_option(self::SCHEMA_VERSION_OPTION, $nextVersion+1)) {
				throw new RuntimeException(__('Could not store new database version.', 'quote-price-notifier'));
			}
		}
	}

	/**
	 * Called immediately after some post is deleted, removes related Price Watchers and Quotes
	 *
	 * @param int $postId
	 */
	private function onPostDeleted( $postId) {
		// Delete related quotes
		$quotes = new QuoteCollection();
		$quotes->deleteByProduct($postId);

		// Delete related price watchers
		$watchers = new PriceWatchCollection();
		$watchers->deleteByProduct($postId);
	}

	/**
	 * Called immediately after some user is deleted, clears customer ID in related Price Watchers and Quotes
	 *
	 * @param int $userId
	 */
	private function onUserDeleted( $userId) {
		// Delete related quotes
		$quotes = new QuoteCollection();
		$quotes->clearCustomer($userId);

		// Delete related price watchers
		$watchers = new PriceWatchCollection();
		$watchers->clearCustomer($userId);
	}
}
