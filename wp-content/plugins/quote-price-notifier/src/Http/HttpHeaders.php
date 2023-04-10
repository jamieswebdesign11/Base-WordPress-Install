<?php

namespace Artio\QuotePriceNotifier\Http;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Helper functions to work with HTTP headers
 */
abstract class HttpHeaders {

	/**
	 * Parses given HTTP headers string into an associative array
	 *
	 * @param string $str
	 * @return array
	 */
	public static function parse( $str) {
		$headers = [];

		foreach (explode("\r\n", $str) as $row) {
			$line = explode(':', trim($row), 2);
			if (!isset($line[1])) {
				continue;
			}

			$key = $line[0];
			$val = trim($line[1]);
			if (!isset($headers[$key])) {
				$headers[$key] = $val;
			} else if (is_array($headers[$key])) {
				$headers[$key][] = $val;
			} else {
				$headers[$key] = [
					$headers[$key],
					$val
				];
			}
		}

		return $headers;
	}

	/**
	 * Builds HTTP headers strig from given associative array
	 *
	 * @param array $headers
	 * @return string
	 */
	public static function build( array $headers) {
		$lines = [];

		foreach ($headers as $key => $value) {
			if (is_array($value)) {
				foreach ($value as $val) {
					$lines[] = $key . ': ' . $val . "\r\n";
				}
			} else {
				$lines[] = $key . ': ' . $value . "\r\n";
			}
		}

		return implode('', $lines);
	}
}
