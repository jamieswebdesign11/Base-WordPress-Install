<?php
/**
 * New quote request e-mail
 */

use Artio\QuotePriceNotifier\Db\Model\Quote;

if (!defined('ABSPATH')) {
exit;
}

/* @var string $email_heading */
/* @var string $additional_content */
/* @var WC_Email $email */
/* @var Quote $quote */

/*
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<p><?php esc_html_e( 'Dear admin,', 'quote-price-notifier' ); ?></p>

<p>
	<?php
	echo sprintf(
		/* translators: %1$d: Requested quantity; %2$s: Requested product name */
		esc_html__(_n(
			'Please send me a quote for %1$d piece of %2$s.',
			'Please send me a quote for %1$d pieces of %2$s.',
			(int) $quote->get('quantity'),
			'quote-price-notifier'
		)),
		(int) $quote->get('quantity'),
		esc_html($quote->getProduct()->get_name())
	);
	?>
</p>

<p>
	<?php
	echo nl2br(sprintf(
		/* translators: %1$s: Customer name; %2$s: Customer email */
		esc_html__("Best regards,\n%1\$s\n%2\$s", 'quote-price-notifier'),
		esc_html($quote->get('customer_name')),
		esc_html($quote->get('customer_email'))
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
