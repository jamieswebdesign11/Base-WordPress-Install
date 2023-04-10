<?php
/**
 * New price watch e-mail
 */

use Artio\QuotePriceNotifier\Db\Model\PriceWatch;

if (!defined('ABSPATH')) {
exit;
}

/* @var string $email_heading */
/* @var string $additional_content */
/* @var WC_Email $email */
/* @var PriceWatch $priceWatch */

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n";
echo esc_html(wp_strip_all_tags($email_heading));
echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

echo esc_html__( 'Dear admin,', 'quote-price-notifier' ) . "\n\n";

echo sprintf(
	/* translators: %s: Product name */
	esc_html__('Please notify me when the price of %s changes.', 'quote-price-notifier'),
	esc_html($priceWatch->getProduct()->get_name())
) . "\n\n";

echo sprintf(
	/* translators: %1$s: Customer name; %2$s: Customer email */
	esc_html__("Best regards,\n%1\$s\n%2\$s", 'quote-price-notifier'),
	esc_html($priceWatch->get('customer_name')),
	esc_html($priceWatch->get('customer_email'))
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
