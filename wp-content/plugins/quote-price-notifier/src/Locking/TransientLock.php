<?php

namespace Artio\QuotePriceNotifier\Locking;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Implements locking mechanism using WP transients
 */
class TransientLock {

	/**
	 * Lock name
	 *
	 * @var string
	 */
	private $name;
	/**
	 * Lock timeout
	 *
	 * @var int
	 */
	private $timeout;
	/**
	 * Last lock update
	 *
	 * @var int
	 */
	private $lastUpdate;

	/**
	 * Constructor
	 *
	 * @param string $name
	 * @param int $timeout Lock timeout in seconds
	 */
	public function __construct( $name, $timeout) {
		$this->name = $name;
		$this->timeout = $timeout;
	}

	/**
	 * Tries to create lock
	 *
	 * @return bool
	 */
	public function lock() {
		// Check if already locked
		if (get_transient($this->name)) {
			return false;
		}

		$result = set_transient($this->name, '1', $this->timeout);
		if ($result) {
			$this->lastUpdate = time();
		}

		return $result;
	}

	/**
	 * Resets timeout for existing lock
	 *
	 * @return bool
	 */
	public function updateLock() {
		if (time() <= $this->lastUpdate) {
			return true;
		}

		if (!get_transient($this->name)) {
			return false;
		}

		return set_transient($this->name, '1', $this->timeout);
	}

	/**
	 * Releases lock
	 */
	public function unlock() {
		delete_transient($this->name);
	}
}
