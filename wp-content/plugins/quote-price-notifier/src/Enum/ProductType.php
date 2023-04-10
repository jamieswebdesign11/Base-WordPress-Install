<?php

namespace Artio\QuotePriceNotifier\Enum;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Available WooCommerce product types
 */
abstract class ProductType {

	const SIMPLE = 'simple';
	const VARIABLE = 'variable';
	const VARIATION = 'variation';
	const GROUPED = 'grouped';
	const EXTERNAL = 'external';
}
