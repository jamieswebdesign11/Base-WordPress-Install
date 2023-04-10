<?php

namespace Artio\QuotePriceNotifier\Db\Collection;

use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Db\Model\PriceWatchNotification;
use Artio\QuotePriceNotifier\Db\PagedData\MappedPagedData;
use Artio\QuotePriceNotifier\Db\PagedData\PagedQueryData;
use Artio\QuotePriceNotifier\Db\SqlBuilder;

if (!defined('ABSPATH')) {
exit;
}

/**
 * PriceWatch Notification collection
 *
 * @method PriceWatchNotification|null createItem(array $data)
 */
class PriceWatchNotificationCollection extends Collection {

	public function __construct() {
		parent::__construct(
			PriceWatchNotification::class,
			PriceWatchNotification::TABLE_NAME,
			PriceWatchNotification::ID_COLUMN
		);
	}

	/**
	 * Returns specified number of PriceWatchNotification models from
	 * queue ready to be processed. The models are loaded together
	 * with their associated PriceWatch models.
	 *
	 * @return iterable
	 */
	public function getNotificationsToProcess() {
		global $wpdb;

		// Prepare list of PriceWatch table columns to load
		// so they don't interfere with PriceWatchNotification table columns
		$priceWatchTable = PriceWatch::TABLE_NAME;
		$priceWatchSelect = SqlBuilder::getSelectColumnsList($priceWatchTable, 'pw', 'pw_');

		$query = 'SELECT n.*, ' . $priceWatchSelect . "
			FROM {$wpdb->prefix}{$this->tableName} n
			INNER JOIN {$wpdb->prefix}{$priceWatchTable} pw ON pw.id = n.price_watch_id
			ORDER BY n.`id`";
		$pagedData = $this->getTypedDataWithPriceWatch($query);

		return $pagedData->results();
	}

	/**
	 * Returns PriceWatchNotifications pre-loaded with their parent PriceWatch
	 *
	 * @param string $query
	 * @param int $pageSize
	 * @param int $limit
	 * @return MappedPagedData
	 */
	protected function getTypedDataWithPriceWatch( $query, $pageSize = 20, $limit = 0) {
		$pagedData = $this->getPagedData($query, $pageSize, $limit);
		return new MappedPagedData($pagedData, function( array $data) {
			// Split data to notification's and price watch's columns by their prefix
			$pwnData = [];
			$pwData = [];
			foreach ($data as $key => $value) {
				if (substr($key, 0, 3) === 'pw_') {
					$pwData[substr($key, 3)] = $value;
				} else {
					$pwnData[$key] = $value;
				}
			}

			// Create PriceWatchNotification model with PriceWatch model loaded
			$pwn = new PriceWatchNotification($pwnData);
			$pw = new PriceWatch($pwData);
			$pwn->setPriceWatch($pw);

			return $pwn;
		});
	}
}
