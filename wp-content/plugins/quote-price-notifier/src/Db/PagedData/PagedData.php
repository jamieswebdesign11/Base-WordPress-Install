<?php

namespace Artio\QuotePriceNotifier\Db\PagedData;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used for loading data by pages from WP database
 */
interface PagedData {

	/**
	 * Return single page of results
	 *
	 * @param int $page
	 * @return array
	 */
	public function resultPage( $page);

	/**
	 * Returns iterable of all results loaded by pages
	 *
	 * @return iterable
	 */
	public function results();

	/**
	 * Counts rows for the query
	 *
	 * @return int
	 */
	public function countAllResultRows();
}
