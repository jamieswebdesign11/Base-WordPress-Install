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
<button id="qpn_watch_price_btn" type="button" class="button">
	<?php esc_html_e('Watch price', 'quote-price-notifier'); ?>
</button>
<div id="qpn_watch_price_form" class="site" style="display: none">
	<div>
		<p>
			<label for="qpn_watch_name"><?php esc_html_e('Your name', 'quote-price-notifier'); ?></label>
			<input id="qpn_watch_name"
				   class="validation-required"
				   type="text"
				   name="name"
				   value="<?php echo esc_attr(wp_get_current_user()->display_name); ?>" />
		</p>
		<p>
			<label for="qpn_watch_email"><?php esc_html_e('Your email', 'quote-price-notifier'); ?></label>
			<input id="qpn_watch_email"
				   class="validation-required validation-email"
				   type="email"
				   name="email"
				   value="<?php echo esc_attr(wp_get_current_user()->user_email); ?>" />
			<input type="hidden"
				   name="product_id"
				   value="<?php echo esc_attr($productId); ?>" />
			<?php wp_nonce_field('qpn-watch-price'); ?>
		</p>
		<?php
		if ($captcha) {
			echo '<p>' . wp_kses_post($captcha->getWrapper()) . '</p>';
		}
		?>
		<p class="qpn-button-wrapper">
			<button type="button" class="button qpn-send"><?php esc_html_e('Watch price', 'quote-price-notifier'); ?></button>
			<span class="loader"></span>
		</p>
	</div>
</div>
