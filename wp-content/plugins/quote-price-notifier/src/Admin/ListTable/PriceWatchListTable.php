<?php

namespace Artio\QuotePriceNotifier\Admin\ListTable;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;
use Artio\QuotePriceNotifier\Db\Model\Model;
use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Enum\PriceWatchStatus;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Price Watches list table
 *
 * @property PriceWatchCollection $dataProvider
 */
class PriceWatchListTable extends BaseListTable {

	public function __construct() {
		parent::__construct(
			new PriceWatchCollection(),
			['singular' => 'price watch', 'plural' => 'price watches']
		);
	}

	public function no_items() {
		esc_html_e('No Price Watches found.', 'quote-price-notifier');
	}

	public function get_columns() {
		return [
			'cb'             => '<input type="checkbox" />',
			'created_gmt'    => __('Date', 'quote-price-notifier'),
			'product_name'   => __('Product', 'quote-price-notifier'),
			'product_sku'    => __('Product SKU', 'quote-price-notifier'),
			'product_id'     => __('Product ID', 'quote-price-notifier'),
			'customer_email' => __('Customer E-mail', 'quote-price-notifier'),
			'customer_name'  => __('Customer', 'quote-price-notifier'),
			'customer_id'    => __('Customer ID', 'quote-price-notifier'),
			'status'         => __('Status', 'quote-price-notifier'),
		];
	}

	protected function get_hidden_columns() {
		return ['product_id', 'customer_id'];
	}

	protected function get_sortable_columns() {
		return [
			'id' => ['id', false],
			'product_id' => ['product_id', false],
			'created_gmt' => ['created_gmt', false],
			'product_sku' => ['product_sku', false],
			'product_name' => ['product_name', false],
			'customer_email' => ['customer_email', false],
			'customer_name' => ['customer_name', false],
			'customer_id' => ['customer_id', false],
			'status' => ['status', false],
		];
	}

	protected function get_primary_column_name() {
		return 'id';
	}

	protected function getViewsDefinitions() {
		return [[
			'name' => 'all',
			'status' => null,
			'label' => __('All', 'quote-price-notifier'),
		], [
			'name' => PriceWatchStatus::ACTIVE,
			'status' => PriceWatchStatus::ACTIVE,
			'label' => PriceWatchStatus::getLabel(PriceWatchStatus::ACTIVE),
		], [
			'name' => PriceWatchStatus::INACTIVE,
			'status' => PriceWatchStatus::INACTIVE,
			'label' => PriceWatchStatus::getLabel(PriceWatchStatus::INACTIVE),
		]];
	}

	protected function get_filters() {
		global $wpdb;

		$where = [];

		$status = !empty($_GET['status']) ? sanitize_key($_GET['status']) : null;
		if ($status && PriceWatchStatus::isValid($status)) {
			$where[] = $wpdb->prepare('status = %s', $status);
		}

		return implode(' AND ', $where);
	}

	/**
	 * Value for status
	 *
	 * @param Model $item
	 * @return string
	 */
	protected function column_status( $item) {
		return esc_html(PriceWatchStatus::getLabel($item->get('status')));
	}

	protected function get_bulk_actions() {
		$actions = [
			'activate' => __('Activate', 'quote-price-notifier'),
			'deactivate' => __('Deactivate', 'quote-price-notifier'),
			'delete' => __('Delete', 'quote-price-notifier'),
		];

		return $actions;
	}

	/**
	 * Generates HTML for single Price Watch actions links
	 *
	 * @param PriceWatch $item
	 * @param string $column_name
	 * @param string $primary
	 * @return string
	 */
	protected function handle_row_actions( $item, $column_name, $primary) {
		if ('created_gmt' !== $column_name) {
			return '';
		}

		$actions = [
			/* translators: %d: Table record ID */
			'id' => sprintf(__('ID: %d', 'quote-price-notifier'), $item->getId()),
		];

		if ($item->isActive()) {
			$actions['deactivate'] = sprintf(
				'<a href="%s">%s</a>',
				wp_nonce_url(add_query_arg([
					'action' => 'deactivate',
					'cid' => $item->getId(),
				]), $this->getWpNonceBulkAction()),
				esc_html__('Deactivate', 'quote-price-notifier')
			);
		} else {
			$actions['activate'] = sprintf(
				'<a href="%s">%s</a>',
				wp_nonce_url(add_query_arg([
					'action' => 'activate',
					'cid' => $item->getId(),
				]), $this->getWpNonceBulkAction()),
				esc_html__('Activate', 'quote-price-notifier')
			);
		}

		$actions['delete'] = sprintf(
			'<a href="%s">%s</a>',
			wp_nonce_url(add_query_arg([
				'action' => 'delete',
				'cid' => $item->getId(),
			]), $this->getWpNonceBulkAction()),
			esc_html__('Delete', 'quote-price-notifier')
		);

		return $this->row_actions($actions);
	}
}
