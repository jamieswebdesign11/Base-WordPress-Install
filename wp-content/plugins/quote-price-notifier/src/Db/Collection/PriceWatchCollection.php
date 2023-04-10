<?php

namespace Artio\QuotePriceNotifier\Db\Collection;

use Artio\QuotePriceNotifier\Admin\ListTable\ListTableDataProvider;
use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Db\PagedData\MappedPagedData;
use Artio\QuotePriceNotifier\Db\SqlBuilder;
use Artio\QuotePriceNotifier\Enum\PriceWatchStatus;

if (!defined('ABSPATH')) {
exit;
}

/**
 * PriceWatch collection
 *
 * @method PriceWatch|null createItem(array $data)
 */
class PriceWatchCollection extends Collection implements ListTableDataProvider {

	public function __construct() {
		parent::__construct(PriceWatch::class, PriceWatch::TABLE_NAME, PriceWatch::ID_COLUMN);
	}

	/**
	 * Returns filtered and sorted data required for Price Watches list table
	 *
	 * @param int $pageSize
	 * @param string $filters
	 * @param string $ordering
	 * @return MappedPagedData
	 */
	public function getAdminTablePagedData( $pageSize, $filters = '', $ordering = '') {
		global $wpdb;

		$query = "SELECT w.*, p.post_title AS product_name, sku.meta_value AS product_sku, p.post_parent AS product_parent_id
			FROM {$wpdb->prefix}{$this->tableName} w
			INNER JOIN {$wpdb->posts} p ON w.product_id = p.ID
			LEFT JOIN {$wpdb->postmeta} sku ON p.ID = sku.post_id AND sku.meta_key = '_sku'" .
				 ( $filters ? "\nWHERE " . $filters : '' ) .
				 "\nORDER BY " . ( $ordering ? $ordering : 'created_gmt desc' );

		return $this->getTypedData($query, $pageSize);
	}

	/**
	 * Searches for duplicate active price watch and returns it
	 *
	 * @param int $productId
	 * @param string $mail
	 * @return PriceWatch|null
	 */
	public function getDuplicatePriceWatch( $productId, $mail) {
		global $wpdb;

		// We must use numbered arguments which don't quote the string to add dynamic table name to query,
		// otherwise CodeSniffer will complain >:[
		$data = $wpdb->get_row(
			$wpdb->prepare("SELECT *
				FROM %1\$s
				WHERE `product_id` = %2\$d
				  AND `customer_email` = '%3\$s'
				  AND `status` = '%4\$s'
				LIMIT 1",
				$wpdb->prefix . $this->tableName,
				$productId,
				$mail,
				PriceWatchStatus::ACTIVE
			),
			ARRAY_A
		);

		return $this->createItem($data);
	}

	/**
	 * Returns cached counts of Price Watches by their status
	 *
	 * @return int[]
	 */
	public function getCounts() {
		global $wpdb;
		static $counts = null;

		if (is_null($counts)) {
			$result = $wpdb->get_results(
				$wpdb->prepare('SELECT status, COUNT(*) AS cnt
					FROM %1$s
					GROUP BY `status`',
					$wpdb->prefix . $this->tableName
				)
			);

			// Prepare array of all available statuses
			$counts = array_fill_keys(array_keys(PriceWatchStatus::getLabels()), 0);
			$all = 0;
			foreach ($result as $count) {
				$counts[$count->status] = (int) $count->cnt;
				$all += (int) $count->cnt;
			}
			$counts['all'] = $all;
		}

		return $counts;
	}

	/**
	 * Returns Price Watch models iterable for specified IDs which
	 * are not already in requested status
	 *
	 * @param int[] $ids
	 * @param string $status
	 * @return iterable
	 */
	public function getPriceWatchesToChangeStatus( array $ids, $status) {
		global $wpdb;

		$idsList = SqlBuilder::prepareIdsList($ids);
		$query = $wpdb->prepare(
			"SELECT * FROM %1\$s
			WHERE `%2\$s` IN (%3\$s)
			  AND `status` != '%4\$s'
			ORDER BY `%5\$s`",
			$wpdb->prefix . $this->tableName,
			$this->idColumn,
			$idsList,
			$status,
			$this->idColumn
		);
		$pagedData = $this->getTypedData($query);

		return $pagedData->results();
	}

	/**
	 * Deactivates all Price Watches for specified e-mail and optionally product ID
	 *
	 * @param string $email
	 * @param int|null $productId
	 * @return bool
	 */
	public function deactivate( $email, $productId) {
		global $wpdb;

		$update = [
			'status' => PriceWatchStatus::INACTIVE,
			'modified_gmt' => gmdate('Y-m-d H:i:s'),
		];
		$where = [
			'customer_email' => $email,
			'status' => PriceWatchStatus::ACTIVE,
		];
		if ($productId) {
			$where['product_id'] = (int) $productId;
		}

		$result = $wpdb->update(
			$wpdb->prefix . PriceWatch::TABLE_NAME,
			$update,
			$where,
			SqlBuilder::getFormat($update),
			SqlBuilder::getFormat($where)
		);

		return ( false !== $result );
	}
}
