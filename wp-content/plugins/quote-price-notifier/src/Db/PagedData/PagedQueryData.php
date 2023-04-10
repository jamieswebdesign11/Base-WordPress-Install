<?php

namespace Artio\QuotePriceNotifier\Db\PagedData;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Loads data by pages using given SQL query
 */
class PagedQueryData implements PagedData {

	/**
	 * DB query
	 *
	 * @var string
	 */
	private $query;

	/**
	 * Page size
	 *
	 * @var int
	 */
	private $pageSize;

	/**
	 * Limit
	 *
	 * @var int
	 */
	private $totalLimit;

	/**
	 * Constructor
	 *
	 * @param string $query
	 * @param int $pageSize
	 * @param int $totalLimit
	 */
	public function __construct( $query, $pageSize = 20, $totalLimit = 0) {
		$this->query = $query;
		$this->pageSize = $pageSize;
		$this->totalLimit = $totalLimit;
	}

	public function resultPage( $page) {
		global $wpdb;

		// Take total limit into account if set
		$offset = $this->pageSize * $page;
		$limit = $this->pageSize;
		if ($this->totalLimit > 0) {
			$limit = min($limit, $this->totalLimit - $offset);
			if ($limit <= 0) {
				return [];
			}
		}

		$limitQuery = $wpdb->prepare(' LIMIT %d OFFSET %d', $limit, $offset);

		return $wpdb->get_results(
			// Work-around to allow dynamic query to pass through CodeSniffer >:[
			$wpdb->prepare('%1$s', '') . $this->query . $limitQuery,
			ARRAY_A
		);
	}

	/**
	 * Loads all data page by page and returns them one by one as generator (using yield)
	 *
	 * @return iterable
	 */
	public function results() {
		for ($page = 0, $items = $this->resultPage($page);
			 count($items) > 0;
			 $page++, $items = $this->resultPage($page)) {
			foreach ($items as $item) {
				yield $item;
			}
			if (count($items) < $this->pageSize) {
				break;
			}
		}
	}

	public function countAllResultRows() {
		global $wpdb;
		$countQuery = preg_replace('/SELECT\s.*FROM/is', 'SELECT COUNT(*) FROM', $this->query);
		$countQuery = preg_replace('/\s+ORDER\s+BY\s.*$/is', '', $countQuery);
		return $wpdb->get_var(
			// Work-around to allow dynamic query to pass through CodeSniffer >:[
			$wpdb->prepare('%1$s', '') . $countQuery
		);
	}
}
