<?php

namespace Artio\QuotePriceNotifier\Db\PagedData;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Returns empty set of paged data. Used when no data can be loaded.
 */
class EmptyPagedData implements PagedData {

	public function resultPage( $page) {
		return [];
	}

	public function results() {
		return [];
	}
	public function countAllResultRows() {
		return 0;
	}
}
