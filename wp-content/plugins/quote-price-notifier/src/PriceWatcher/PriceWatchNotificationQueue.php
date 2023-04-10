<?php

namespace Artio\QuotePriceNotifier\PriceWatcher;

use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Db\Model\PriceWatchNotification;
use Artio\QuotePriceNotifier\Enum\PriceWatchStatus;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Manages queue of price watch notifications e-mails
 */
class PriceWatchNotificationQueue {

	/**
	 * Enqueues notifications for all active price watches for given product
	 *
	 * @param int $productId
	 * @param string $oldPrice
	 * @param string $newPrice
	 */
	public function enqueue( $productId, $oldPrice, $newPrice) {
		global $wpdb;

		$queueTable = $wpdb->prefix . PriceWatchNotification::TABLE_NAME;
		$priceWatchTable = $wpdb->prefix . PriceWatch::TABLE_NAME;

		$wpdb->query(
			$wpdb->prepare(
				"INSERT INTO `%1\$s` (`price_watch_id`, `old_price`, `new_price`, `created_gmt`)
				SELECT `id`, %2\$s, %3\$s, %4\$s
				FROM `%5\$s`
				WHERE `product_id` = %6\$d
				  AND `status` = '%7\$s'",
				$queueTable,
				$oldPrice,
				$newPrice,
				gmdate('Y-m-d H:i:s'),
				$priceWatchTable,
				(int) $productId,
				PriceWatchStatus::ACTIVE
			)
		);
	}
}
