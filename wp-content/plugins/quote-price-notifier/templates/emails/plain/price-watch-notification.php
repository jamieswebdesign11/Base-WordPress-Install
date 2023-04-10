<?php
/**
 * Product price changed notification e-mail
 */

use Artio\QuotePriceNotifier\Db\Model\PriceWatchNotification;

if (!defined('ABSPATH')) {
exit;
}

/* @var string $email_heading */
/* @var string $additional_content */
/* @var WC_Email $email */
/* @var PriceWatchNotification $notification */
/* @var string $unsubscribeUrl */
/* @var string $unsubscribeAllUrl */

$priceWatch = $notification->getPriceWatch();
$product = $priceWatch->getProduct();

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n";
echo esc_html(wp_strip_all_tags($email_heading));
echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

echo sprintf(
	/* translators: %s: Customer name */
	esc_html(wptexturize(__('Dear %s,', 'quote-price-notifier'))),
	esc_html(wptexturize($priceWatch->get('customer_name')))
) . "\n\n";

echo sprintf(
	/* translators: %1$s: Product name; %2$s: Product SKU; %3$s: Old price; %4$s: New price */
	esc_html(wptexturize(__('We\'re informing you that the product price for %1$s (%2$s) has changed from %3$s to %4$s.', 'quote-price-notifier'))),
	esc_html(wptexturize($product->get_name())),
	esc_html($product->get_sku()),
	esc_html(strip_tags(wc_price($notification->get('old_price')))),
	esc_html(strip_tags(wc_price($notification->get('new_price'))))
) . "\n\n";

echo esc_html(wptexturize(__('You have received this e-mail because you wanted to be notified about price changes for this product.', 'quote-price-notifier')));
echo "\n";

echo sprintf(
	/* translators: %s: Unsubscribe product link */
	esc_html(wptexturize(__('If you don\'t want to receive notifications for this product anymore, please click here: %s', 'quote-price-notifier'))),
	esc_html($unsubscribeUrl)
);
echo "\n";

echo sprintf(
	/* translators: %s: Unsubscribe all link */
	esc_html(wptexturize(__('If you don\'t want to receive notifications for any of the products anymore, please click here: %s', 'quote-price-notifier'))),
	esc_html($unsubscribeAllUrl)
);

echo "\n\n----------------------------------------\n\n";

/**
 * Show user-defined additional content - this is set in each email's settings.
 */
if ($additional_content) {
	echo esc_html(wp_strip_all_tags(wptexturize($additional_content)));
	echo "\n\n----------------------------------------\n\n";
}

echo wp_kses_post(apply_filters('woocommerce_email_footer_text', get_option('woocommerce_email_footer_text')));
