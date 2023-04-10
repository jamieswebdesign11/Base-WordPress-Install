<?php

namespace Artio\QuotePriceNotifier\Db\Model;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;
use Artio\QuotePriceNotifier\Enum\PriceWatchStatus;
use Artio\QuotePriceNotifier\Exception\DbException;
use Artio\QuotePriceNotifier\Exception\ModelDataInvalidException;
use WC_Product;

if (!defined('ABSPATH')) {
exit;
}

class PriceWatch extends Model {

	const TABLE_NAME = 'qpn_price_watch';
	const ID_COLUMN = 'id';

	/**
	 * Watched product
	 *
	 * @var WC_Product
	 */
	private $product;

	public function __construct( array $data = []) {
		parent::__construct(self::TABLE_NAME, self::ID_COLUMN, $data);

		$this->createdTimeColumn = 'created_gmt';
		$this->updatedTimeColumn = 'modified_gmt';
	}

	/**
	 * Checks for duplicate quote requests when saving new quote request
	 *
	 * @throws ModelDataInvalidException
	 */
	public function check() {
		if (!$this->isNew()) {
			return;
		}

		$collection = new PriceWatchCollection();
		$duplicate = $collection->getDuplicatePriceWatch(
			$this->get('product_id'),
			$this->get('customer_email')
		);
		if ($duplicate) {
			throw new ModelDataInvalidException(__('There is already an active price watch registered on this product for your e-mail.', 'quote-price-notifier'));
		}
	}

	/**
	 * Returns cached product object
	 *
	 * @return WC_Product|null
	 */
	public function getProduct() {
		if (!$this->product && $this->get('product_id')) {
			$this->product = wc_get_product($this->get('product_id'));
		}
		return $this->product;
	}

	/**
	 * Changes Price Watch status to requested value.
	 * Throws exception on error.
	 *
	 * @param string $status
	 * @throws ModelDataInvalidException|DbException
	 */
	public function changeStatus( $status) {
		$this->set('status', $status);
		$this->save();
	}

	/**
	 * Determines whether this Price Watch status is active
	 *
	 * @return bool
	 */
	public function isActive() {
		return ( $this->get('status') === PriceWatchStatus::ACTIVE );
	}
}
