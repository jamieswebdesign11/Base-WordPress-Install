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
/**
 * Return html for watermark on PDF.
 *
 * @param string $html html for the PDF to generate.
 * @return string
 */
function wpg_watermark_html( $html ) {
	$pgfw_body_settings           = get_option( 'pgfw_body_save_settings', array() );
	$pgfw_watermark_position_left = array_key_exists( 'pgfw_watermark_position_left', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_position_left'] : '';
	$pgfw_watermark_position_top  = array_key_exists( 'pgfw_watermark_position_top', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_position_top'] : '';
	$pgfw_watermark_angle         = array_key_exists( 'pgfw_watermark_angle', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_angle'] : '';
	$pgfw_watermark_image_width   = array_key_exists( 'pgfw_watermark_image_width', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_image_width'] : '';
	$pgfw_watermark_image_height  = array_key_exists( 'pgfw_watermark_image_height', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_image_height'] : '';
	$pgfw_body_watermark_image    = array_key_exists( 'sub_pgfw_watermark_image_upload', $pgfw_body_settings ) ? $pgfw_body_settings['sub_pgfw_watermark_image_upload'] : '';
	$pgfw_watermark_opacity       = array_key_exists( 'pgfw_watermark_opacity', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_opacity'] : '';
	if ( '' !== $pgfw_body_watermark_image ) {
		$html .= '<style>
					#wpg-pdf-watermark-image{
						opacity: ' . $pgfw_watermark_opacity . ';
						position: fixed;
						top: ' . $pgfw_watermark_position_top . 'px;
						left: ' . $pgfw_watermark_position_left . 'px;
						transform: rotate(' . $pgfw_watermark_angle . 'deg);
					}
				</style>
				<div id="wpg-pdf-watermark-image">
					<img src="' . $pgfw_body_watermark_image . '" width="' . $pgfw_watermark_image_width . '" height="' . $pgfw_watermark_image_height . '"/>
				</div>';
	}
	return $html;
}
