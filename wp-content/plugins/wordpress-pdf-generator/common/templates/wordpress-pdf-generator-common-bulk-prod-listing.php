<?php
/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the html field for general tab.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/common/templates
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}
?>
<p>
	<div class="pgfw_bulk_wrapper">
		<ul class="pgfw_bulk_title">
			<li>
				<div><?php esc_html_e( 'PostImage', 'wordpress-pdf-generator' ); ?></div>
			</li>
			<li>
				<div><?php esc_html_e( 'PostName', 'wordpress-pdf-generator' ); ?></div>
			</li>
			<li>
				<div><?php esc_html_e( 'Action', 'wordpress-pdf-generator' ); ?></div>
			</li>
		</ul>
		<?php
		if ( isset( $_COOKIE['wpg_bulk_products_addition'] ) && is_array( $_COOKIE['wpg_bulk_products_addition'] ) ) {
			$product_ids = map_deep( wp_unslash( $_COOKIE['wpg_bulk_products_addition'] ), 'sanitize_text_field' );
			foreach ( $product_ids as $product_id ) {
				$post_obj      = get_post( $product_id );
				$thumbnail_url = get_the_post_thumbnail_url( $post_obj );
				?>
				<ul class="pgfw_bulk_content">
					<li>
						<div class="pgfw_bulk_content-img"><img style="width:70px;height:70px;"src="<?php echo esc_url( $thumbnail_url ); ?>" alt="<?php esc_html_e( 'no image found', 'wordpress-pdf-generator' ); ?>"></div>
					</li>
					<li>
						<div class="pgfw_bulk_content-title"><?php echo esc_html( substr( $post_obj->post_title, 0, 30 ) ); ?></div>
					</li>
					<li>
						<div><a href="javascript:void(0);" class="pgfw-delete-this-products-bulk" data-product-id="<?php echo esc_html( $product_id ); ?>"><?php esc_html_e( 'delete', 'wordpress-pdf-generator' ); ?></a></div>
					</li>
				</ul>
				<?php
			}
		}
		?>
	</div>
	<?php
	$display_setings_arr          = get_option( 'pgfw_save_admin_display_settings', array() );
	$pgfw_guest_download_or_email = array_key_exists( 'pgfw_guest_download_or_email', $display_setings_arr ) ? $display_setings_arr['pgfw_guest_download_or_email'] : '';
	$pgfw_user_download_or_email  = array_key_exists( 'pgfw_user_download_or_email', $display_setings_arr ) ? $display_setings_arr['pgfw_user_download_or_email'] : '';
	if ( ( is_user_logged_in() && 'direct_download' === $pgfw_user_download_or_email ) || ( ! is_user_logged_in() && 'direct_download' === $pgfw_guest_download_or_email ) ) {
		?>
		<button id="pgfw-create-zip-bulk"><?php esc_html_e( 'Create Zip', 'wordpress-pdf-generator' ); ?></button>
		<button id="pgfw-create-pdf-bulk"><?php esc_html_e( 'Create PDF', 'wordpress-pdf-generator' ); ?></button>
		<?php
	} else {
		?>
		<a href="#TB_inline?height=300&width=400&inlineId=bulk-pdf-download-modal" title="<?php esc_html_e( 'Please Enter Your Email ID', 'wordpress-pdf-generator' ); ?>" class="pgfw-bulk-pdf-download-button thickbox"><?php esc_html_e( 'Email PDFs', 'wordpress-pdf-generator' ); ?></a>
		<div id="bulk-pdf-download-modal" style="display:none;">
			<div class="wps_pgfw_email_bulk_input">
				<label for="pgfw-user-email-input-bulk">
					<?php esc_html_e( 'Email ID', 'wordpress-pdf-generator' ); ?>
				</label>
				<input type="email" id="pgfw-user-email-input-bulk" name="pgfw_user_email_input_bulk" placeholder="<?php esc_html_e( 'email', 'wordpress-pdf-generator' ); ?>">
			</div>
			<?php
			if ( is_user_logged_in() ) {
				?>
				<div class="wps_pgfw_email_bulk_account">
					<input type="checkbox" id="pgfw-user-email-from-account-bulk" name="pgfw_user_email_from_account_bulk">
					<label for="pgfw-user-email-from-account">
						<?php esc_html_e( 'Use account Email ID instead.', 'wordpress-pdf-generator' ); ?>
					</label>
				</div>
				<?php
			}
			?>
			<div class="wps_pgfw_email_bulk_continue">
				<input type="radio" id="pgfw-bulk-email-continuation-pdf" name="wpg_bulk_pdf_generate">
				<label for="pgfw-bulk-email-continuation-pdf">
					<?php esc_html_e( 'Email PDF in Continuation.', 'wordpress-pdf-generator' ); ?>
				</label>
			</div>
			<div class="wps_pgfw_email_bulk_zip">
				<input type="radio" id="pgfw-bulk-email-zip-pdf" name="wpg_bulk_pdf_generate">
				<label for="pgfw-bulk-email-zip-pdf">
					<?php esc_html_e( 'Email PDF in Zip.', 'wordpress-pdf-generator' ); ?>
				</label>
			</div>
			<div class="wps_pgfw_email_bulk_button">
				<button id="pgfw-submit-email-user-bulk"><?php esc_html_e( 'Submit', 'wordpress-pdf-generator' ); ?></button>
			</div>
			<div id="pgfw-user-email-submittion-message-bulk"></div>
		</div>
		<?php
	}
	?>
</p>
