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
 * @subpackage Wordpress_Pdf_Generator/admin/partials
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $wpg_wps_wpg_obj;
$wpg_taxonomy_settings_arr = apply_filters( 'wpg_taxonomy_settings_array', array() );
?>
<!--  template file for admin settings. -->
<form action="" method="POST" class="wps-wpg-gen-section-form">
	<div class="wpg-secion-wrap">
		<?php
		wp_nonce_field( 'nonce_settings_save', 'wpg_nonce_field' );
		$wpg_wps_wpg_obj->wps_wpg_plug_generate_html( $wpg_taxonomy_settings_arr );
		?>
	</div>
</form>
