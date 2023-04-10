<?php

namespace Artio\QuotePriceNotifier\Html;

use Artio\QuotePriceNotifier\Filesystem\Paths;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to load required JS scripts and styles
 */
class Scripts {

	/**
	 * Files paths helper
	 *
	 * @var Paths
	 */
	protected $paths;

	public function __construct( Paths $paths) {
		$this->paths = $paths;
	}

	/**
	 * Registers hook to load required JS scripts and styles
	 */
	public function register() {
		add_action('wp_enqueue_scripts', function() {
			$this->loadScripts();
		});
	}

	/**
	 * Loads required JS scripts and styles
	 */
	protected function loadScripts() {
		wp_enqueue_script('jquery-ui-dialog');
		wp_enqueue_style('wp-jquery-ui-dialog');

		wp_enqueue_script(
			'qpn',
			$this->paths->getScriptUrl('qpn.js'),
			['jquery'],
			@filemtime($this->paths->getScriptPath('qpn.js'))
		);
		wp_enqueue_style(
			'qpn',
			$this->paths->getStyleUrl('qpn.css'),
			[],
			@filemtime($this->paths->getStylePath('qpn.css'))
		);

		wp_localize_script(
			'qpn',
			'QpnPopups',
			[
				'ajaxUrl' => admin_url('admin-ajax.php'),
				'l10n' => [
					'requestQuoteTitle' => __('Request Quote', 'quote-price-notifier'),
					'watchPriceTitle' => __('Watch Price', 'quote-price-notifier'),
					'validationError' => __('Please enter required data', 'quote-price-notifier'),
					'ajaxError' => __('Could not send data to server. Please try again later.', 'quote-price-notifier'),
					'dialogButtonOk' => __('OK', 'quote-price-notifier'),
				],
			]
		);
	}
}
