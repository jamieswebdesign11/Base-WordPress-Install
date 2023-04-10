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

/*
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<p><?php esc_html_e( 'Dear admin,', 'quote-price-notifier' ); ?></p>

<p>
	<?php
	echo sprintf(
		/* translators: %s: Product name */
		esc_html__('Please notify me when the price of %s changes.', 'quote-price-notifier'),
		esc_html($priceWatch->getProduct()->get_name())
	);
	?>
</p>

<p>
	<?php
	echo nl2br(sprintf(
		/* translators: %1$s: Customer name; %2$s: Customer email */
		esc_html__("Best regards,\n%1\$s\n%2\$s", 'quote-price-notifier'),
		esc_html($priceWatch->get('customer_name')),
		esc_html($priceWatch->get('customer_email'))
	));
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
