<?php

namespace Artio\QuotePriceNotifier\Site\Controller;

use Artio\QuotePriceNotifier\Factory;
use InvalidArgumentException;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Base class for frontend controllers
 */
abstract class ControllerBase {

	/**
	 * Factory
	 *
	 * @var Factory
	 */
	protected $factory;

	public function __construct( Factory $factory) {
		$this->factory = $factory;
	}

	/**
	 * Returns current request task
	 *
	 * @return string|null
	 */
	private function getTask() {
		return isset($_REQUEST['task']) ?
			preg_replace('/[^a-zA-Z0-9_]/', '', trim(wp_strip_all_tags($_REQUEST['task']))) :
			null;
	}

	/**
	 * Sends JSON response with success status
	 *
	 * @param string $message
	 * @param array $data
	 */
	protected function jsonSuccess( $message = '', array $data = []) {
		$data['status'] = 1;
		$data['message'] = $message;
		wp_send_json($data);
	}

	/**
	 * Sends JSON response with error status
	 *
	 * @param string $message
	 * @param array $data
	 */
	protected function jsonError( $message = '', array $data = []) {
		$data['status'] = 0;
		$data['message'] = $message;
		wp_send_json($data);
	}

	/**
	 * Processes current task from request
	 */
	public function processTask() {
		$task = $this->getTask();
		if (!$task) {
			return;
		}

		if (!method_exists($this, $task)) {
			throw new InvalidArgumentException('Invalid task');
		}

		$this->$task();
	}
}
