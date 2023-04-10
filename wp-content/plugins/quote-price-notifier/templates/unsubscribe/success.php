<?php

if (!defined('ABSPATH')) {
exit;
}

/* @var string $email */
/* @var WC_Product|null $product */

echo '<p>';

if ($product) {
	echo sprintf(
		/* translators: %1$s: Customer email; %2$s: Product name */
		esc_html__('Your e-mail %1$s has been successfully unsubscribed and you won\'t receive further notifications about price changes for product %2$s.', 'quote-price-notifier'),
		'<strong>' . esc_html($email) . '</strong>',
		'<strong>' . esc_html($product->get_name()) . '</strong>'
	);
} else {
	echo sprintf(
		/* translators: %s: Customer email */
		esc_html__('Your e-mail %s has been successfully unsubscribed and you won\'t receive further notifications about price changes for any products.', 'quote-price-notifier'),
		'<strong>' . esc_html($email) . '</strong>'
	);
}

echo '</p>';
