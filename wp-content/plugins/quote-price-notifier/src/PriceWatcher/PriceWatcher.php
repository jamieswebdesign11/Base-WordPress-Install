<?php

namespace Artio\QuotePriceNotifier\PriceWatcher;

use Artio\QuotePriceNotifier\Enum\Hook;
use Artio\QuotePriceNotifier\Enum\ProductType;
use WC_Product;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to watch for price changes in WooCommerce products
 * on various WooCommerce actions
 */
class PriceWatcher {

	/**
	 * List of supported product types for which to watch the price changes
	 *
	 * @var string[]
	 */
	protected $supportedProductTypes = [
		ProductType::SIMPLE,
		ProductType::VARIATION,
		ProductType::EXTERNAL,
	];

	/**
	 * Used to remember previous price of a product before it is manually saved,
	 * so we can compare it to the new price
	 *
	 * @var array
	 */
	protected $beforeSaveData;

	/**
	 * Registers required hooks
	 */
	public function register() {
		add_action('woocommerce_before_product_object_save', [$this, 'beforeProductSave']);
		add_action('woocommerce_after_product_object_save', [$this, 'afterProductSave']);

		add_action('wc_before_products_starting_sales', [$this, 'productsStartingSales']);
		add_action('wc_before_products_ending_sales', [$this, 'productsEndingSales']);
	}

	/**
	 * Called with products IDs for which the discount is just starting
	 *
	 * @param int[] $ids
	 */
	public function productsStartingSales( array $ids) {
		$this->productsSalesChange($ids, true);
	}

	/**
	 * Called with products IDs for which the discount is just ending
	 *
	 * @param int[] $ids
	 */
	public function productsEndingSales( array $ids) {
		$this->productsSalesChange($ids, false);
	}

	/**
	 * Loops through products and checks whether the price was actually changed
	 *
	 * @param int[] $ids
	 * @param bool $starting Whether the sales are starting or ending
	 */
	protected function productsSalesChange( array $ids, $starting) {
		foreach ($ids as $id) {
			$product = wc_get_product($id);
			if (!$product || !in_array($product->get_type(), $this->supportedProductTypes)) {
				continue;
			}

			$regularPrice = $product->get_regular_price();
			$salePrice = $product->get_sale_price();
			if (!$regularPrice || !$salePrice || $regularPrice == $salePrice) {
				continue;
			}

			// Trigger action
			do_action(
				Hook::PRODUCT_PRICE_CHANGED,
				$product,
				$starting ? $regularPrice : $salePrice,
				$starting ? $salePrice : $regularPrice
			);
		}
	}

	/**
	 * Remembers old product price before it is manually saved
	 *
	 * @param WC_Product $product
	 */
	public function beforeProductSave( WC_Product $product) {
		$this->beforeSaveData = null;
		if (!in_array($product->get_type(), $this->supportedProductTypes)) {
			return;
		}

		$this->beforeSaveData = [
			'id' => $product->get_id(),
			'price' => $product->get_price(),
		];
	}

	/**
	 * Compares new product price to the old one after the product is manually saved
	 *
	 * @param WC_Product $product
	 */
	public function afterProductSave( WC_Product $product) {
		if (in_array($product->get_type(), $this->supportedProductTypes)) {
			if ($this->beforeSaveData && $this->beforeSaveData['id'] == $product->get_id() && $this->beforeSaveData['price'] != $product->get_price()) {
				// Trigger action
				do_action(
					Hook::PRODUCT_PRICE_CHANGED,
					$product,
					$this->beforeSaveData['price'],
					$product->get_price()
				);
			}
		}

		$this->beforeSaveData = null;
	}
}
