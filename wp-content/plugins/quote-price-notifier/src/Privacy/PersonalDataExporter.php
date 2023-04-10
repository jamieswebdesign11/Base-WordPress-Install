<?php

namespace Artio\QuotePriceNotifier\Privacy;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;
use Artio\QuotePriceNotifier\Db\Collection\QuoteCollection;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to export personal data in compliance with GDPR
 */
class PersonalDataExporter {

	const EXPORT_BATCH = 100;

	/**
	 * Registers exporters in WordPress
	 */
	public function register() {
		add_filter('wp_privacy_personal_data_exporters', function( array $exporters) {
			$exporters += [
				'quote-price-notifier-quote-requests' => [
					'exporter_friendly_name' => __('Product Quote Requests', 'quote-price-notifier'),
					'callback' => [$this, 'exportQuotes'],
				],
				'quote-price-notifier-price-watches' => [
					'exporter_friendly_name' => __('Product Price Watches', 'quote-price-notifier'),
					'callback' => [$this, 'exportPriceWatches'],
				],
			];
			return $exporters;
		});
	}

	/**
	 * Exports personal data from quote requests
	 *
	 * @param string $email
	 * @param int $page
	 * @return array
	 */
	public function exportQuotes( $email, $page = 1) {
		$collection = new QuoteCollection();
		$pagedData = $collection->getPersonalData($email, self::EXPORT_BATCH);
		$quotes = $pagedData->resultPage($page - 1);

		$data = [];
		$done = true;

		if (is_array($quotes)) {
			foreach ($quotes as $quote) {
				$data[] = [
					'group_id' => 'qpn-quote-requests',
					'group_label' => __('Product Quote Requests', 'quote-price-notifier'),
					'item_id' => 'qpn-quote-request-' . (int) $quote['id'],
					'data' => [[
						'name' => __('Quote Request ID', 'quote-price-notifier'),
						'value' => (int) $quote['id'],
					], [
						'name' => __('Customer Name', 'quote-price-notifier'),
						'value' => $quote['customer_name'],
					], [
						'name' => __('Customer Email', 'quote-price-notifier'),
						'value' => $quote['customer_email'],
					]],
				];
			}

			$done = ( count($quotes) < self::EXPORT_BATCH );
		}

		return [
			'data' => $data,
			'done' => $done,
		];
	}

	/**
	 * Exports personal data from price watches
	 *
	 * @param string $email
	 * @param int $page
	 * @return array
	 */
	public function exportPriceWatches( $email, $page = 1) {
		$collection = new PriceWatchCollection();
		$pagedData = $collection->getPersonalData($email, self::EXPORT_BATCH);
		$priceWatches = $pagedData->resultPage($page - 1);

		$data = [];
		$done = true;

		if (is_array($priceWatches)) {
			foreach ($priceWatches as $priceWatch) {
				$data[] = [
					'group_id' => 'qpn-price-watches',
					'group_label' => __('Product Price Watches', 'quote-price-notifier'),
					'item_id' => 'qpn-price-watch-' . (int) $priceWatch['id'],
					'data' => [[
						'name' => __('Price Watch ID', 'quote-price-notifier'),
						'value' => (int) $priceWatch['id'],
					], [
						'name' => __('Customer Name', 'quote-price-notifier'),
						'value' => $priceWatch['customer_name'],
					], [
						'name' => __('Customer Email', 'quote-price-notifier'),
						'value' => $priceWatch['customer_email'],
					]],
				];
			}

			$done = ( count($priceWatches) < self::EXPORT_BATCH );
		}

		return [
			'data' => $data,
			'done' => $done,
		];
	}
}
