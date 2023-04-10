<?php
/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the html field for PDF logs.
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
?>
<!--  template file for admin settings. -->
<div class="wpg-secion-wrap">
	<?php
	require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'includes/class-wordpress-pdf-generator-log.php';
	do_action( 'wps_wpg_deletion_success_notice' );
	$obj = new WordPress_Pdf_Generator_Log();
	$obj->prepare_items();
	echo '<form method="post" name="wps_search_post" action="">';
	echo '<input type="hidden" name="search_nonce" value=' . esc_html( wp_create_nonce() ) . '>';
	$obj->search_box( __( 'Search by email', 'wordpress-pdf-generator' ), 'wps_search_data_id' );
	echo '</form>';
	echo '<form method="POST" action="">';
	echo '<input type="hidden" name="delete_nonce" value=' . esc_html( wp_create_nonce() ) . '>';
	$obj->display();
	echo '</form>';
	?>
</div>
