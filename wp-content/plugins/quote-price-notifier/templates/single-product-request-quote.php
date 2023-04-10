<?php

use Artio\QuotePriceNotifier\Captcha\Recaptcha;
use Artio\QuotePriceNotifier\Enum\ProductType;

if (!defined('ABSPATH')) {
exit;
}

global $product;

/* @var WC_Product $product */
/* @var Recaptcha $captcha */

// Handle variable products
$productId = $product->get_id();
if ($product->get_type() == ProductType::VARIABLE) {
	$productId = '';
}

?>
<button id="qpn_request_quote_btn" type="button" class="button">
	<?php esc_html_e('Request quote', 'quote-price-notifier'); ?>
</button>
<div id="qpn_request_quote_form" class="site" style="display: none">
	<div>
		<p>
			<label for="qpn_quote_name"><?php esc_html_e('Your name', 'quote-price-notifier'); ?></label>
			<input id="qpn_quote_name"
				   class="validation-required"
				   type="text"
				   name="name"
				   value="<?php echo esc_attr(wp_get_current_user()->display_name); ?>" />
		</p>
		<p>
			<label for="qpn_quote_email"><?php esc_html_e('Your email', 'quote-price-notifier'); ?></label>
			<input id="qpn_quote_email"
				   class="validation-required validation-email"
				   type="email"
				   name="email"
				   value="<?php echo esc_attr(wp_get_current_user()->user_email); ?>" />
		</p>
		<p>
			<label for="qpn_quote_quantity"><?php esc_html_e('Quantity', 'quote-price-notifier'); ?></label>
			<input id="qpn_quote_quantity"
				   class="validation-required validation-number-positive"
				   type="number"
				   min="1"
				   pattern="[1-9][0-9]*"
				   name="quantity"
				   value="1" />
			<input type="hidden"
				   name="product_id"
				   value="<?php echo esc_attr($productId); ?>" />
			<?php wp_nonce_field('qpn-request-quote'); ?>
		</p>
		<?php
		if ($captcha) {
			echo '<p>' . wp_kses_post($captcha->getWrapper()) . '</p>';
		}
		?>
		<p class="qpn-button-wrapper">
			<button type="button" class="button qpn-send"><?php esc_html_e('Send request', 'quote-price-notifier'); ?></button>
			<span class="loader"></span>
		</p>
	</div>
</div>
