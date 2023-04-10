<?php

namespace Artio\QuotePriceNotifier\Privacy;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;
use Artio\QuotePriceNotifier\Db\Collection\QuoteCollection;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to erase personal data in compliance with GDPR
 */
class PersonalDataEraser {

	/**
	 * Registers erasers in WordPress
	 */
	public function register() {
		add_filter('wp_privacy_personal_data_erasers', function( array $erasers) {
			$erasers += [
				'quote-price-notifier-quote-requests' => [
					'eraser_friendly_name' => __('Product Quote Requests', 'quote-price-notifier'),
					'callback' => [$this, 'eraseQuotes'],
				],
				'quote-price-notifier-price-watches' => [
					'eraser_friendly_name' => __('Product Price Watches', 'quote-price-notifier'),
					'callback' => [$this, 'erasePriceWatches'],
				],
			];
			return $erasers;
		});
	}

	/**
	 * Erases Quote Requests matching given e-mail
	 *
	 * @param string $email
	 * @param int $page
	 * @return array
	 */
	public function eraseQuotes( $email, $page = 1) {
		$collection = new QuoteCollection();
		$deleted = $collection->deleteByEmail($email);

		$msgs = [];
		if (false !== $deleted) {
			$msgs[] = sprintf(
				/* translators: %d: Number of quote requests erased */
				__('Product quote requests erased: %d.', 'quote-price-notifier'),
				$deleted
			);
		}

		return [
			'items_removed' => ( $deleted > 0 ),
			'items_retained' => ( false === $deleted ),
			'messages' => $msgs,
			'done' => true,
		];
	}

	/**
	 * Erases Price Watches matching given e-mail
	 *
	 * @param string $email
	 * @param int $page
	 * @return array
	 */
	public function erasePriceWatches( $email, $page = 1) {
		$collection = new PriceWatchCollection();
		$deleted = $collection->deleteByEmail($email);

		$msgs = [];
		if (false !== $deleted) {
			$msgs[] = sprintf(
				/* translators: %d: Number of price watches erased */
				__('Product price watches erased: %d.', 'quote-price-notifier'),
				$deleted
			);
		}

		return [
			'items_removed' => ( $deleted > 0 ),
			'items_retained' => ( false === $deleted ),
			'messages' => $msgs,
			'done' => true,
		];
	}
}
