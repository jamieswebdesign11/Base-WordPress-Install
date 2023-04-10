<?php

namespace Artio\QuotePriceNotifier\Db\PagedData;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Filters given paged data by given filtering function
 */
class FilteredPagedData extends PagedDataDecorator {

	/**
	 * Filter function
	 *
	 * @var callable
	 */
	protected $filterFunction;

	public function __construct( PagedData $data, callable $filterFunction = null) {
		parent::__construct($data);

		$this->filterFunction = $filterFunction;
	}

	/**
	 * Returns only results matching filtering function from single page
	 *
	 * @param int $page
	 * @return array
	 */
	public function resultPage( $page) {
		return array_filter($this->data->resultPage($page), $this->filterFunction);
	}

	/**
	 * Returns all results matching filtering function
	 *
	 * @return iterable
	 */
	public function results() {
		foreach ($this->data->results() as $result) {
			if (call_user_func($this->filterFunction, $result)) {
				yield $result;
			}
		}
	}
}
