<?php

namespace Artio\QuotePriceNotifier\Db\Model;

use Artio\QuotePriceNotifier\Db\Collection\QuoteCollection;
use Artio\QuotePriceNotifier\Enum\QuoteStatus;
use Artio\QuotePriceNotifier\Exception\DbException;
use Artio\QuotePriceNotifier\Exception\ModelDataInvalidException;
use WC_Product;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Represents Quote Request entity in database
 */
class Quote extends Model {

	const TABLE_NAME = 'qpn_quote';
	const ID_COLUMN = 'id';

	/**
	 * Quoted product
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

		$collection = new QuoteCollection();
		$duplicate = $collection->getDuplicateQuote(
			$this->get('product_id'),
			$this->get('quantity'),
			$this->get('customer_email')
		);
		if ($duplicate) {
			throw new ModelDataInvalidException(__('There is already the same quote request pending for your e-mail.', 'quote-price-notifier'));
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
	 * Changes Quote Request's status to "resolved".
	 * Throws exception on error.
	 *
	 * @throws ModelDataInvalidException|DbException
	 */
	public function resolve() {
		$this->set('status', QuoteStatus::RESOLVED);
		$this->save();
	}

	/**
	 * Determines whether this Quote Request is pending
	 *
	 * @return bool
	 */
	public function isPending() {
		return ( $this->get('status') == QuoteStatus::PENDING );
	}
}
