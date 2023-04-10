<?php

namespace Artio\QuotePriceNotifier\Admin\ListTable;

use Artio\QuotePriceNotifier\Db\Model\Model;
use Artio\QuotePriceNotifier\Html\DateHtml;
use WP_List_Table;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Base class with some common functions for our list tables
 *
 * @uses BaseListTable::column_created_gmt()
 * @uses BaseListTable::column_product_name()
 * @uses BaseListTable::column_customer_email()
 * @uses BaseListTable::column_customer_name()
 */
abstract class BaseListTable extends WP_List_Table {

	/**
	 * Data provider
	 *
	 * @var ListTableDataProvider
	 */
	protected $dataProvider;

	public function __construct( ListTableDataProvider $dataProvider, array $args = []) {
		parent::__construct($args);

		$this->dataProvider = $dataProvider;
		$this->_column_headers = $this->get_column_info();
	}

	/**
	 * Override to return list of columns which should be hidden
	 *
	 * @return string[]
	 */
	protected function get_hidden_columns() {
		return [];
	}

	/**
	 * Returns ORDER BY clause for SQL query
	 *
	 * @return string
	 */
	protected function get_ordering() {
		$ordering = '';
		if (!empty($_GET['orderby'])) {
			$sortable = $this->get_sortable_columns();
			if (isset($sortable[$_GET['orderby']])) {
				$ordering = sanitize_key($_GET['orderby']);

				$order = ( !empty($_GET['order']) && in_array($_GET['order'], ['asc', 'desc']) ) ?
					sanitize_key($_GET['order']) : 'asc';
				$ordering .= ' ' . $order;
			}
		}

		return $ordering;
	}

	/**
	 * Override to return WHERE clause for SQL query
	 *
	 * @return string
	 */
	protected function get_filters() {
		return '';
	}

	/**
	 * Loads single page of data from current data provider for display
	 */
	public function prepare_items() {
		$perPage = $this->get_items_per_page('quote_price_notifier_items_per_page');

		$data = $this->dataProvider->getAdminTablePagedData($perPage, $this->get_filters(), $this->get_ordering());
		$count = $data->countAllResultRows();

		$this->set_pagination_args([
			'total_items' => $count,
			'per_page' => $perPage,
		]);

		$this->items = $data->resultPage($this->get_pagenum() - 1);
	}

	/**
	 * Default function for returning column value
	 *
	 * @param Model $item
	 * @param string $column_name
	 * @return string
	 */
	protected function column_default( $item, $column_name) {
		return esc_html($item->get($column_name));
	}

	/**
	 * Displays checkbox
	 *
	 * @param Model $item
	 * @return string
	 */
	protected function column_cb( $item) {
		return sprintf(
			'<input type="checkbox" name="cid[]" value="%1$s" />',
			$item->get($this->get_primary_column_name())
		);
	}

	/**
	 * Value for created_gmt
	 *
	 * @param Model $item
	 * @return string
	 */
	protected function column_created_gmt( $item) {
		return DateHtml::adminTableDateFromGmt($item->get('created_gmt'));
	}

	/**
	 * Value for product_name
	 *
	 * @param Model $item
	 * @return string
	 */
	protected function column_product_name( $item) {
		$productId = (int) $item->get('product_parent_id');
		if (!$productId) {
			$productId = $item->get('product_id');
		}

		$productName = esc_html($item->get('product_name'));
		$productStatus = get_post_status($productId);

		$status = '';
		if ('private' === $productStatus) {
			$status = __('Private');
		} else if ('publish' !== $productStatus) {
			$status = __('Unpublished');
		}
		$status = $status ? ' (' . esc_html($status) . ')' : '';

		return sprintf(
			'<a href="%s">%s</a>%s',
			get_edit_post_link($productId),
			$productName,
			$status
		);
	}

	/**
	 * Value for customer_email
	 *
	 * @param Model $item
	 * @return string
	 */
	protected function column_customer_email( $item) {
		return sprintf(
			'<a href="%s">%s</a>',
			'mailto:' . esc_attr($item->get('customer_email')),
			esc_html($item->get('customer_email'))
		);
	}

	/**
	 * Value for customer_name
	 *
	 * @param Model $item
	 * @return string
	 */
	protected function column_customer_name( $item) {
		$customerId = $item->get('customer_id');

		$html = esc_html($item->get('customer_name'));

		if ($customerId) {
			$html = sprintf(
				'<a href="%s">%s</a>',
				get_edit_user_link($customerId),
				$html
			);
		}

		return $html;
	}

	/**
	 * Generates action string used by internal WP nonce function for bulk actions
	 *
	 * @return string
	 */
	protected function getWpNonceBulkAction() {
		return 'bulk-' . $this->_args['plural'];
	}

	/**
	 * Checks admin referer and nonce for bulk actions
	 */
	public function check_admin_referer() {
		check_admin_referer($this->getWpNonceBulkAction());
	}

	/**
	 * Determines whether specified action is supported
	 *
	 * @param string $action
	 * @return bool
	 */
	public function is_valid_action( $action) {
		$actions = $this->get_bulk_actions();
		return isset($actions[$action]);
	}

	protected function get_views() {
		global $plugin_page;

		$status = !empty($_GET['status']) ? sanitize_key($_GET['status']) : null;
		$counts = $this->dataProvider->getCounts();
		$baseUrl = menu_page_url($plugin_page, false);

		$definitions = $this->getViewsDefinitions();

		$views = [];
		foreach ($definitions as $view) {
			$attr = ( $status === $view['status'] ) ? 'class="current" aria-current="page"' : '';
			$url = $view['status'] ? add_query_arg('status', $view['status'], $baseUrl) : $baseUrl;
			$link = '<a href="' . esc_attr($url) . '" ' . $attr . '>' . esc_html($view['label']) . ' <span class="count">(' . number_format_i18n($counts[$view['name']]) . ')</span></a>';
			$views[$view['name']] = $link;
		}

		return $views;
	}

	/**
	 * Returns list of available views for current list table
	 *
	 * @return array
	 */
	abstract protected function getViewsDefinitions();
}
