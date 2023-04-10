<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/public/partials
 */

/**
 * Return bulk download button.
 *
 * @return string
 */
function return_bulk_html_content() {
	$count = ( isset( $_COOKIE['wpg_bulk_products_addition'] ) && count( $_COOKIE['wpg_bulk_products_addition'] ) > 0 ) ? count( $_COOKIE['wpg_bulk_products_addition'] ) : 0;
	$html  = '<div class="wps_pgw-button_wrapper">
				<div class="wps_pgw-button">
					<img src="' . esc_url( WORDPRESS_PDF_GENERATOR_DIR_URL ) . 'admin/src/images/Download_Full_PDF.svg" title="' . esc_html__( 'Bulk PDF', 'wordpress-pdf-generator' ) . '" alt="' . esc_html__( 'pdf bulk image', 'wordpress-pdf-generator' ) . '">
					<span class="wps_pgfw-display-value">' . $count . '</span>
				</div>
				<div id="pgfw-download-zip-parent"></div>
				<div class="wps_pgw-button_content">' . esc_html__( 'Loading.....', 'wordpress-pdf-generator' ) . '</div>
			</div>';
	return $html;
}
/**
 * Return Bulk download button.
 *
 * @param string $html html of the disbutton to display.
 * @param int    $id post id.
 * @return string
 */
function return_bulk_download_button( $html, $id ) {
	$pgfw_display_settings           = get_option( 'pgfw_save_admin_display_settings', array() );
	$sub_pgfw_pdf_bulk_download_icon = array_key_exists( 'sub_pgfw_pdf_bulk_download_icon', $pgfw_display_settings ) ? $pgfw_display_settings['sub_pgfw_pdf_bulk_download_icon'] : '';
	$pgfw_bulk_pdf_download_icon_src = ( '' !== $sub_pgfw_pdf_bulk_download_icon ) ? $sub_pgfw_pdf_bulk_download_icon : WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/download_PDF.svg';
	$pgfw_pdf_icon_width             = array_key_exists( 'pgfw_pdf_icon_width', $pgfw_display_settings ) ? $pgfw_display_settings['pgfw_pdf_icon_width'] : '';
	$pgfw_pdf_icon_height            = array_key_exists( 'pgfw_pdf_icon_height', $pgfw_display_settings ) ? $pgfw_display_settings['pgfw_pdf_icon_height'] : '';
	$html                           .= '<a href="javascript:void(0)" data-product-id="' . esc_html( $id ) . '" id="pgfw-bulk-product-add" class="pgfw-single-pdf-download-button"><img src="' . esc_url( $pgfw_bulk_pdf_download_icon_src ) . '" title="' . esc_html__( 'Add to Bulk PDFs', 'wordpress-pdf-generator' ) . '" style="width:' . esc_html( $pgfw_pdf_icon_width ) . 'px; height:' . esc_html( $pgfw_pdf_icon_height ) . 'px;"></a>';
	return $html;
}

