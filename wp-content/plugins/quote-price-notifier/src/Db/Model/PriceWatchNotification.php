<?php

namespace Artio\QuotePriceNotifier\Db\Model;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Represents single notification e-mail in a queue
 */
class PriceWatchNotification extends Model {

	const TABLE_NAME = 'qpn_price_watch_notification';
	const ID_COLUMN = 'id';

	/**
	 * Parent PriceWatch
	 *
	 * @var PriceWatch
	 */
	private $priceWatch;

	public function __construct( array $data = []) {
		parent::__construct(self::TABLE_NAME, self::ID_COLUMN, $data);

		$this->createdTimeColumn = 'created_gmt';
	}

	/**
	 * Returns cached PriceWatch model
	 *
	 * @return PriceWatch|null
	 */
	public function getPriceWatch() {
		if (!$this->priceWatch && $this->get('price_watch_id')) {
			$collection = new PriceWatchCollection();
			$this->priceWatch = $collection->getSingleItemById($this->get('price_watch_id'));
		}
		return $this->priceWatch;
	}

	/**
	 * Sets cached PriceWatch model
	 *
	 * @param PriceWatch $priceWatch
	 */
	public function setPriceWatch( PriceWatch $priceWatch) {
		$this->priceWatch = $priceWatch;
	}
}
