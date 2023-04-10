<?php

namespace Artio\QuotePriceNotifier\Db\PagedData;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Maps given function to all given paged data
 */
class MappedPagedData extends PagedDataDecorator {

	/**
	 * Mapping function
	 *
	 * @var callable
	 */
	protected $mappingFunction;

	public function __construct( PagedData $data, callable $mappingFunction) {
		parent::__construct($data);

		$this->mappingFunction = $mappingFunction;
	}

	/**
	 * Returns results for single page processed by mapping function
	 *
	 * @param int $page
	 * @return array
	 */
	public function resultPage( $page) {
		return array_map($this->mappingFunction, $this->data->resultPage($page));
	}

	/**
	 * Returns all results processed by mapping function
	 *
	 * @return iterable
	 */
	public function results() {
		foreach ($this->data->results() as $result) {
			yield call_user_func($this->mappingFunction, $result);
		}
	}
}
