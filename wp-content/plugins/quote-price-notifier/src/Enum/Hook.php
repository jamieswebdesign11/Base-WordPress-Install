<?php

namespace Artio\QuotePriceNotifier\Enum;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Available actions hooks
 */
abstract class Hook {

	const NEW_QUOTE_REQUEST_CREATED = 'qpn_quote_request_created';
	const NEW_PRICE_WATCH_CREATED = 'qpn_price_watch_created';
	const PRODUCT_PRICE_CHANGED = 'qpn_product_price_changed';
	const EMAILS_CRON = 'qpn_emails_cron';
	const SEND_PRICE_WATCH_NOTIFICATION = 'qpn_send_price_watch_notification';
}
