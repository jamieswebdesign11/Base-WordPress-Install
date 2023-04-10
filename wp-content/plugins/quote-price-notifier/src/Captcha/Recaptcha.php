<?php

namespace Artio\QuotePriceNotifier\Captcha;

if (!defined('ABSPATH')) {
exit;
}

class Recaptcha {

	/**
	 * Site key
	 *
	 * @var string
	 */
	protected $siteKey;

	/**
	 * Secret key
	 *
	 * @var string
	 */
	protected $secretKey;

	/**
	 * Constructor
	 *
	 * @param string $siteKey
	 * @param string $secretKey
	 */
	public function __construct( $siteKey, $secretKey) {
		$this->siteKey = $siteKey;
		$this->secretKey = $secretKey;
	}

	/**
	 * Determines whether captcha is configured
	 *
	 * @return bool
	 */
	public function isActive() {
		return ( $this->siteKey && $this->secretKey );
	}

	/**
	 * Registers required hooks
	 */
	public function register() {
		if (!$this->isActive()) {
			return;
		}

		add_action('wp_enqueue_scripts', function() {
			$this->loadScripts();
		});
	}

	/**
	 * Adds "async" and "defer" attributes to our reCaptcha script tag
	 *
	 * @param string $tag
	 * @param string $handle
	 * @param string $src
	 * @return string
	 */
	private function scriptAsyncDefer( $tag, $handle, $src) {
		if ('qpn_recaptcha' !== $handle) {
			return $tag;
		}

		return str_ireplace('<script ', '<script async defer ', $tag);
	}

	/**
	 * Loads required JS scripts
	 */
	protected function loadScripts() {
		// Prepare function to add "async" and "defer" to generated script tag
		add_filter('script_loader_tag', function( $tag, $handle, $src) {
			return $this->scriptAsyncDefer($tag, $handle, $src);
		}, 10, 3);

		wp_enqueue_script(
			'qpn_recaptcha',
			'https://www.google.com/recaptcha/api.js?render=explicit',
			['jquery'],
			1
		);

		wp_localize_script(
			'qpn_recaptcha',
			'QpnRecaptcha',
			[
				'siteKey' => $this->siteKey,
				'errorMsg' => __('There is a problem with reCaptcha. Please try again later or contact website administrator.', 'quote-price-notifier'),
			]
		);
	}

	/**
	 * Returns HTML code for captcha wrapper
	 *
	 * @return string
	 */
	public function getWrapper() {
		return '<div class="captcha"></div>';
	}

	/**
	 * Returns variable name used for captcha token in POST
	 *
	 * @return string
	 */
	public function getTokenKey() {
		return 'captcha_token';
	}

	/**
	 * Validates captcha token from request
	 *
	 * @param string $token
	 * @return bool
	 */
	public function validate( $token ) {
		if (!$token) {
			return false;
		}

		$data = [
			'secret' => $this->secretKey,
			'response' => $token,
		];
		$response = wp_remote_retrieve_body(
			wp_remote_post(
				'https://www.google.com/recaptcha/api/siteverify', [
					'body' => $data
				]
			)
		);

		if (empty($response)) {
			return false;
		}

		$json = json_decode($response);
		if (!$json || empty($json->success)) {
			return false;
		}

		return true;
	}
}
