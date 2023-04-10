<?php
/**
 * Product price changed notification e-mail
 */

use Artio\QuotePriceNotifier\Db\Model\PriceWatchNotification;
use Artio\QuotePriceNotifier\PriceWatcher\UnsubscribeHash;

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

/*
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<p>
	<?php
	echo sprintf(
		/* translators: %s: Customer name */
		esc_html__('Dear %s,', 'quote-price-notifier'),
		esc_html($priceWatch->get('customer_name'))
	);
	?>
</p>

<p>
	<?php
	echo sprintf(
		/* translators: %1$s: Product name; %2$s: Product SKU; %3$s: Old price; %4$s: New price */
		esc_html__('We\'re informing you that the product price for %1$s (%2$s) has changed from %3$s to %4$s.', 'quote-price-notifier'),
		esc_html($product->get_name()),
		esc_html($product->get_sku()),
		wp_kses_post(wc_price($notification->get('old_price'))),
		wp_kses_post(wc_price($notification->get('new_price')))
	);
	?>
</p>

<p>
	<?php
	echo esc_html__('You have received this e-mail because you wanted to be notified about price changes for this product.', 'quote-price-notifier');
	echo '<br/>';

	echo sprintf(
		/* translators: %s: Unsubscribe product link */
		esc_html__('If you don\'t want to receive notifications for this product anymore, please click here: %s', 'quote-price-notifier'),
		'<a href="' . esc_url($unsubscribeUrl) . '" target="_blank">' . esc_html__('Unsubscribe from product', 'quote-price-notifier') . '</a>'
	);
	echo '<br/>';

	echo sprintf(
		/* translators: %s: Unsubscribe all link */
		esc_html__('If you don\'t want to receive notifications for any of the products anymore, please click here: %s', 'quote-price-notifier'),
		'<a href="' . esc_url($unsubscribeAllUrl) . '" target="_blank">' . esc_html__('Unsubscribe from all products', 'quote-price-notifier') . '</a>'
	);
	?>
</p>

<?php

/**
 * Show user-defined additional content - this is set in each email's settings.
 */
if ($additional_content) {
	?>
	<div align="center">
		<?php echo wp_kses_post(wpautop(wptexturize($additional_content))); ?>
	</div>
	<?php
}

/*
 * @hooked WC_Emails::email_footer() Output the email footer
 */
do_action( 'woocommerce_email_footer', $email );
