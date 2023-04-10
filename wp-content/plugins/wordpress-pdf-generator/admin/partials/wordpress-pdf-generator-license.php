<?php
/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/admin/partials
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit(); // Exit if accessed directly.
}
?>
<div class="wps-wpg-wrap">
	<h1><?php esc_html_e( 'Your License', 'wordpress-pdf-generator' ); ?></h1>
	<div class="wps_wpg_license_text">
		<p>
			<?php
			esc_html_e( 'This is the License Activation Panel. After purchasing extension from WP Swings you will get the purchase code of this extension. Please verify your purchase below so that you can use feature of this plugin.', 'wordpress-pdf-generator' );
			?>
		</p>
		<form id="wps_wpg_license_form">
			<table class="wps-wpg-form-table">
				<tr>
					<th scope="row"><label for="puchase-code"><?php esc_html_e( 'Purchase Code : ', 'wordpress-pdf-generator' ); ?></label></th>
					<td>
						<input type="text" id="wps_wpg_license_key" name="purchase-code" required="" size="30" class="wps-wpg-purchase-code" value="" placeholder="<?php esc_html_e( 'Enter your code here...', 'wordpress-pdf-generator' ); ?>">
					</td>
				</tr>
			</table>
			<p id="wps_wpg_license_activation_status"></p>
			<p class="submit">
				<button id="wps_wpg_license_activate" required="" class="button-primary woocommerce-save-button" name="wps_wpg_license_settings"><?php esc_html_e( 'Validate', 'wordpress-pdf-generator' ); ?></button>
			</p>
		</form>
	</div>
</div>
