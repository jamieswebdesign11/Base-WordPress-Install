<?php

namespace Artio\QuotePriceNotifier\Admin\ListTable;

use Artio\QuotePriceNotifier\Db\PagedData\PagedData;

if (!defined('ABSPATH')) {
exit;
}

interface ListTableDataProvider {

	/**
	 * Generates paged data required to display list table
	 *
	 * @param int $pageSize
	 * @param string $filters
	 * @param string $ordering
	 * @return PagedData
	 */
	public function getAdminTablePagedData( $pageSize, $filters = '', $ordering = '');

	/**
	 * Returns counts of items indexed by their status for list table views
	 *
	 * @return int[]
	 */
	public function getCounts();
}
