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
 * @subpackage Wordpress_Pdf_Generator/admin/templates
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}
$callname_lic         = WordPress_Pdf_Generator::$lic_callback_function;
$callname_lic_initial = WordPress_Pdf_Generator::$lic_ini_callback_function;
$day_count            = WordPress_Pdf_Generator::$callname_lic_initial();
$lcns_check           = WordPress_Pdf_Generator::check_lcns_validity();
if ( $lcns_check ) {
	$wpg_active_tab = isset( $_GET['wpg_tab'] ) ? sanitize_key( $_GET['wpg_tab'] ) : 'pdf-generator-for-wp-general'; // phpcs:ignore
} elseif ( $day_count > 0 ) {
	$wpg_active_tab = isset( $_GET['wpg_tab'] ) ? sanitize_key( $_GET['wpg_tab'] ) : 'pdf-generator-for-wp-general'; // phpcs:ignore
	if ( ! get_option( 'wps_wpg_license_check', 0 ) ) {
		$day_count_warning = floor( $day_count );
		$day_string        = sprintf(
			/* translators:%s day count. */
			_n( '%s day', '%s days', $day_count_warning, 'wordpress-pdf-generator' ),
			number_format_i18n( $day_count_warning )
		);
		$day_string = '<span id="wps-wpg-day-count" >' . $day_string . '</span>'; // phpcs:ignore
		?>
		<div class="thirty-days-notice wps-header-container wps-bg-white wps-r-8">
			<h1 class="update-message notice">
				<p>
					<strong>
						<a href="?page=pdf_generator_for_wp_menu&pgfw_tab=wordpress-pdf-generator-license"><?php esc_html_e( 'Activate', 'wordpress-pdf-generator' ); ?></a>
						<?php
						printf(
							/* translators: %s remaining day. */
							esc_html__( 'the license key before %s or you may risk losing data and the plugin will also become disfunctional.', 'wordpress-pdf-generator' ),
							wp_kses_post( $day_string )
						);
						?>
					</strong>
				</p>
			</h1>
		</div>
		<?php
	}
} else {
	$wpg_active_tab = isset( $_GET['wpg_tab'] ) ? sanitize_key( $_GET['wpg_tab'] ) : 'pdf-generator-for-wp-license'; // phpcs:ignore
	?>
	<div class="thirty-days-notice wps-header-container wps-bg-white wps-r-8">
		<h1 class="wps-header-title">
			<p>
				<strong><?php esc_html_e( 'Your trial period is over please activate license to use the features.', 'wordpress-pdf-generator' ); ?></strong>
			</p>
		</h1>
	</div>
	<?php
}
