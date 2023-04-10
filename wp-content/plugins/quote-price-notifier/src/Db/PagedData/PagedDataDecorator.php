<?php

namespace Artio\QuotePriceNotifier\Db\PagedData;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Base class for PagedData decorators
 */
abstract class PagedDataDecorator implements PagedData {

	/**
	 * Decorated PagedData
	 *
	 * @var PagedData
	 */
	protected $data;

	public function __construct( PagedData $data) {
		$this->data = $data;
	}

	public function resultPage( $page) {
		return $this->data->resultPage($page);
	}

	public function results() {
		return $this->data->results();
	}

	public function countAllResultRows() {
		return $this->data->countAllResultRows();
	}
}
