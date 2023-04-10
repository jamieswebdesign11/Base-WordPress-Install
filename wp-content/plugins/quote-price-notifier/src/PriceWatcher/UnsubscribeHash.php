<?php

namespace Artio\QuotePriceNotifier\PriceWatcher;

if (!defined('ABSPATH')) {
exit;
}

class UnsubscribeHash {

	const SECRET_OPTION_NAME = 'qpn_secret_key';
	const SECRET_LENGTH = 32;
	const HASH_LENGTH = 10;

	/**
	 * Generates pseudo-random secret string
	 *
	 * @return string
	 */
	protected function generateSecret() {
		static $chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

		$secret = '';
		$max = strlen($chars)-1;
		for ($i = 0; $i < self::SECRET_LENGTH; $i++) {
			$secret .= $chars[mt_rand(0, $max)];
		}

		return $secret;
	}

	/**
	 * Obtains stored secret key or generates new secret key if not stored yet
	 *
	 * @return string
	 */
	protected function getSecret() {
		$secret = trim(get_option(self::SECRET_OPTION_NAME, ''));
		if (!$secret) {
			$secret = $this->generateSecret();
			update_option(self::SECRET_OPTION_NAME, $secret);
		}

		return $secret;
	}

	/**
	 * Generates unsubscribe hash for given e-mail and optionally product ID
	 *
	 * @param string $email
	 * @param int $productId
	 * @return string
	 */
	public function getHash( $email, $productId = null) {
		$src = $this->getSecret() . '|' . strtolower($email) . '|' . ( $productId ? $productId : '' );
		$hash = base64_encode(sha1($src, true));

		return substr($hash, 0, self::HASH_LENGTH);
	}
}
