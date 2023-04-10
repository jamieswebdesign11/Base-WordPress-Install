<?php

namespace Artio\QuotePriceNotifier\Site;

use Artio\QuotePriceNotifier\Factory;
use InvalidArgumentException;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to handle requests for our plugin
 */
class RequestHandler {

	const AJAX_ACTION = 'qpn_ajax';

	/**
	 * Factory
	 *
	 * @var Factory
	 */
	private $factory;

	public function __construct( Factory $factory) {
		$this->factory = $factory;
	}

	/**
	 * Registers handlers for our plugin requests
	 */
	public function register() {
		// AJAX requests
		$ajaxHandler = function() {
			$this->processAjax();
		};
		add_action('wp_ajax_' . self::AJAX_ACTION, $ajaxHandler);
		add_action('wp_ajax_nopriv_' . self::AJAX_ACTION, $ajaxHandler);
	}

	/**
	 * Processes AJAX requests
	 */
	protected function processAjax() {
		$controllerName = isset($_REQUEST['controller']) ? trim(wp_strip_all_tags($_REQUEST['controller'])) : null;
		if (!$controllerName) {
			throw new InvalidArgumentException('Controller not specified');
		}

		$controller = $this->factory->getSiteController($controllerName);
		$controller->processTask();
	}
}
