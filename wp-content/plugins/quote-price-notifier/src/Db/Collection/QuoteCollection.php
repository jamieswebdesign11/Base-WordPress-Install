<?php

namespace Artio\QuotePriceNotifier\Db\Collection;

use Artio\QuotePriceNotifier\Admin\ListTable\ListTableDataProvider;
use Artio\QuotePriceNotifier\Db\Model\Quote;
use Artio\QuotePriceNotifier\Db\PagedData\MappedPagedData;
use Artio\QuotePriceNotifier\Db\SqlBuilder;
use Artio\QuotePriceNotifier\Enum\QuoteStatus;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Quote collection
 *
 * @method Quote|null createItem(array $data)
 */
class QuoteCollection extends Collection implements ListTableDataProvider {

	public function __construct() {
		parent::__construct(Quote::class, Quote::TABLE_NAME, Quote::ID_COLUMN);
	}

	/**
	 * Returns filtered and sorted data required for Quotes Requests list table
	 *
	 * @param int $pageSize
	 * @param string $filters
	 * @param string $ordering
	 * @return MappedPagedData
	 */
	public function getAdminTablePagedData( $pageSize, $filters = '', $ordering = '') {
		global $wpdb;

		$query = "SELECT q.*, p.post_title AS product_name, sku.meta_value AS product_sku, p.post_parent AS product_parent_id
			FROM {$wpdb->prefix}{$this->tableName} q
			INNER JOIN {$wpdb->posts} p ON q.product_id = p.ID
			LEFT JOIN {$wpdb->postmeta} sku ON p.ID = sku.post_id AND sku.meta_key = '_sku'" .
			( $filters ? "\nWHERE " . $filters : '' ) .
			"\nORDER BY " . ( $ordering ? $ordering : 'created_gmt desc' );

		return $this->getTypedData($query, $pageSize);
	}

	/**
	 * Returns Quote models iterable for specified IDs which
	 * are not already resolved
	 *
	 * @param int[] $ids
	 * @return iterable
	 */
	public function getQuotesToResolve( array $ids) {
		global $wpdb;

		$idsList = SqlBuilder::prepareIdsList($ids);
		$query = "SELECT * FROM {$wpdb->prefix}{$this->tableName}
			WHERE `{$this->idColumn}` IN ({$idsList})
			  AND `status` != '" . QuoteStatus::RESOLVED . "'
			ORDER BY `id`";
		$pagedData = $this->getTypedData($query);

		return $pagedData->results();
	}

	/**
	 * Searches for duplicate pending quote request and returns it
	 *
	 * @param int $productId
	 * @param int $quantity
	 * @param string $mail
	 * @return Quote|null
	 */
	public function getDuplicateQuote( $productId, $quantity, $mail) {
		global $wpdb;

		// We must use numbered arguments which don't quote the string to add dynamic table name to query,
		// otherwise CodeSniffer will complain >:[
		$data = $wpdb->get_row(
			$wpdb->prepare("SELECT *
				FROM %1\$s
				WHERE `product_id` = %2\$d
				  AND `quantity` = %3\$d
				  AND `customer_email` = '%4\$s'
				  AND `status` = '%5\$s'
				LIMIT 1",
				$wpdb->prefix . $this->tableName,
				$productId,
				$quantity,
				$mail,
				QuoteStatus::PENDING
			),
			ARRAY_A
		);

		return $this->createItem($data);
	}

	/**
	 * Returns cached counts of Quote Requests by their status
	 *
	 * @return int[]
	 */
	public function getCounts() {
		global $wpdb;
		static $counts = null;

		if (is_null($counts)) {
			$result = $wpdb->get_results(
				$wpdb->prepare(
					'SELECT status, COUNT(*) AS cnt
					FROM %1$s
					GROUP BY `status`',
					$wpdb->prefix . $this->tableName
				)
			);

			// Prepare array of all available statuses
			$counts = array_fill_keys(array_keys(QuoteStatus::getLabels()), 0);
			$all = 0;
			foreach ($result as $count) {
				$counts[$count->status] = (int) $count->cnt;
				$all += (int) $count->cnt;
			}
			$counts['all'] = $all;
		}

		return $counts;
	}
}
