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
 * Return template 1 for coverpage.
 *
 * @return string
 */
function wpg_coverpage_template_1() {
	$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
	$coverpage_single_enable     = array_key_exists( 'wpg_cover_page_single_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_single_enable'] : '';
	$coverpage_bulk_enable       = array_key_exists( 'wpg_cover_page_bulk_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_bulk_enable'] : '';
	$coverpage_company_name      = array_key_exists( 'wpg_cover_page_company_name', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_name'] : '';
	$coverpage_company_tagline   = array_key_exists( 'wpg_cover_page_company_tagline', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_tagline'] : '';
	$coverpage_company_email     = array_key_exists( 'wpg_cover_page_company_email', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_email'] : '';
	$coverpage_company_address   = array_key_exists( 'wpg_cover_page_company_address', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_address'] : '';
	$coverpage_company_url       = array_key_exists( 'wpg_cover_page_company_url', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_url'] : '';
	$cover_page_image            = array_key_exists( 'sub_pgfw_cover_page_image_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_image_upload'] : '';
	$cover_page_company_logo     = array_key_exists( 'sub_pgfw_cover_page_company_logo_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_company_logo_upload'] : '';
	$coverpage_company_phone     = array_key_exists( 'wpg_cover_page_company_Phone', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_Phone'] : '';

	$html = '<style>
				.wpg-layout {
					margin: -92px -12px -80px -45px;
				}
				ul {
					list-style: none;
				}
				a {
					text-decoration: none;
				}
				a:hover {
					cursor: pointer;
				}
				.wpg-layout {		
					position: relative;
				}
				.wpg-layout::after {
					content: "";
					clear: both;
					display: table;
				}
				.wpg-left {
					background-color: #24b6c5;	
					position: relative;
				}
				.wpg-left:before {
					position: absolute;
					content:"";
					top: 0;
					left: 0;
					right: 0;
					background: #c2c2c2;
					height:100px;
				}
				.wpg-right {
					background-color: #ffffff;
					z-index: -1;
				}
				.wpg-layout-contents {
					height: auto;
				}
				.col {
					float: left;
					width: 50%;
					height: 100%;
				}
				.row:after {
					content: "";
					display: table;
					clear: both;
				}
				.wpg-title {
					color: #ffffff;
					text-transform: uppercase;
					font-size: 32px;
					line-height: 1.4;
					margin-top: 100px;
					padding: 20px 10px;
				}
				.wpg-desc {
					position: absolute;
					bottom: 100px;
					padding:20px 20px;
				}
				.wpg-desc p {
					color: #ffffff;
					font-size: 22px;
				}
				.wpg-logo {
					margin: 20px 130px;
				}
				.wpg-center-img {
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					height: 500px;
					width: 500px;			
				}
				.wpg-center-img img {
					width: 100%!important;
					height: 100%!important;
					object-fit: cover!important;			
				}	
				.wpg-footer {
					position: absolute;
					bottom: 30px;
					padding: 10px 15px;
				}
				.wpg-footer a {
					color: #6f6f6f;
				}
				</style>
				
				<div class="wpg-layout">
					<div class="wpg-layout-contents row" >
						<div class="col wpg-left">
								<h2 class="wpg-title">' . $coverpage_company_name . '</h2>
								<div class="wpg-desc">
									<p>' . $coverpage_company_tagline . '</p>
								</div>';
	if ( $cover_page_image && '' !== $cover_page_image ) {
		$html .= '<div class="wpg-center-img">
					<img src="' . $cover_page_image . '">
				</div>';
	} else {
		$html .= '<div class="wpg-center-img">
					<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/temp1.jpg">
				</div>';
	}
	$html .= '</div>
			<div class="col wpg-right">';
	if ( $cover_page_company_logo && '' !== $cover_page_company_logo ) {
		$html .= '<div class="wpg-logo">
					<img src="' . $cover_page_company_logo . '" width="100" height="100">
				</div>';
	} else {
		$html .= '<div class="wpg-logo">
					<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/wpswings_logo.png" width="150" height="150">
				</div>';
	}
	$html .= '<div class="wpg-footer">
					<ul class="contact-details">
						<li><a href="#">' . $coverpage_company_address . '</a></li>
						<li><a href="#">' . $coverpage_company_email . '</a></li>
						<li><a href="#">' . $coverpage_company_phone . '</a></li>
						<li><a href="#">' . $coverpage_company_url . '</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>';
	return $html;
}
/**
 * Return cover template 2 html.
 *
 * @return string
 */
function wpg_coverpage_template_2() {
	$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
	$coverpage_single_enable     = array_key_exists( 'wpg_cover_page_single_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_single_enable'] : '';
	$coverpage_bulk_enable       = array_key_exists( 'wpg_cover_page_bulk_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_bulk_enable'] : '';
	$coverpage_company_name      = array_key_exists( 'wpg_cover_page_company_name', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_name'] : '';
	$coverpage_company_tagline   = array_key_exists( 'wpg_cover_page_company_tagline', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_tagline'] : '';
	$coverpage_company_email     = array_key_exists( 'wpg_cover_page_company_email', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_email'] : '';
	$coverpage_company_address   = array_key_exists( 'wpg_cover_page_company_address', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_address'] : '';
	$coverpage_company_url       = array_key_exists( 'wpg_cover_page_company_url', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_url'] : '';
	$cover_page_image            = array_key_exists( 'sub_pgfw_cover_page_image_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_image_upload'] : '';
	$cover_page_company_logo     = array_key_exists( 'sub_pgfw_cover_page_company_logo_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_company_logo_upload'] : '';
	$coverpage_company_phone     = array_key_exists( 'wpg_cover_page_company_Phone', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_Phone'] : '';

	$html =
	'<style>
		.wpg-layout {
			margin: -92px -12px -80px -45px;
		}
		*{
			box-sizing: border-box;			
		}
		.wpg-layout {
			background: #ffffff;
			height: auto;
			positon: relative;
		}
		.wpg-layout-banner {
			position: absolute;
			top: -92px;
			left: -45px;
			right: 0;
			bottom: 0;
		}
		.wpg-layout-banner img {
			width: 100%;
		}
		.wpg-logo {
			background: transparent;
			padding: 20px;
			width: 150px;			
		}
		.wpg-logo img {
			max-width: 100%;
		}	
		.wpg-layout-text {
			position: absolute;
			top: 45%;
			right: 50%;
			width: 470px;
			transform: translate(50%,-45%);
			text-align: right;
			margin-left: 40px;
			padding: 10px;
		}	
		.wpg-layout-text .wpg-title {
			color: #000000;
			text-transform: uppercase;
			font-size: 32px;
			line-height: 1.1;
			margin-bottom: 20px;
		}
		.wpg-layout-text p {
			color: #000000;
			font-size: 22px;
			border-top: 1px solid;
			padding-top:40px;
		}
		.wpg-footer {
			position: absolute;
			bottom: 0;
		}
		.contact-details {
			max-width: 300px;
			padding: 40px;
			list-style: none;
		}
		.contact-details li {
			margin-bottom: 10px;

		}
		.wpg-footer a {
			text-decoration: none;
			color: #ffffff;
			letter-spacing: 1px;
		}
		.wpg-footer a:hover {
			cursor: pointer;
		}
	</style>
	<div class="wpg-layout" style="page-break-after:always">';
	if ( $cover_page_image && '' !== $cover_page_image ) {
		$html .= '<div class="wpg-layout-banner">
				<img src="' . $cover_page_image . '">
			</div>';
	} else {
		$html .= '<div class="wpg-layout-banner">
					<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/bg-pattern.png">
				</div>';
	}
	if ( $cover_page_company_logo && '' !== $cover_page_company_logo ) {
		$html .= '<div class="wpg-logo">
					<img src="' . $cover_page_company_logo . '" width="100" height="100">
				</div>';
	} else {
		$html .= '<div class="wpg-logo">
					<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/wpswings_logo.png" width="150" height="150">
				</div>';
	}
	$html .= '<div class="wpg-layout-text">			
				<h2 class="wpg-title">' . $coverpage_company_name . '</h2>
				<p>' . $coverpage_company_tagline . '</p>
			</div>
			<div class="wpg-footer" >
				<ul class="contact-details">
					<li><a href="#">' . $coverpage_company_address . '</a></li>
					<li><a href="#">' . $coverpage_company_email . '</a></li>
					<li><a href="#">' . $coverpage_company_phone . '</a></li>
					<li><a href="#">' . $coverpage_company_url . '</a></li>
				</ul>			
			</div>
	
	</div>';
	return $html;
}
/**
 * Return html for coverpage template3.
 *
 * @return string
 */
function wpg_coverpage_template_3() {
	$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
	$coverpage_single_enable     = array_key_exists( 'wpg_cover_page_single_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_single_enable'] : '';
	$coverpage_bulk_enable       = array_key_exists( 'wpg_cover_page_bulk_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_bulk_enable'] : '';
	$coverpage_company_name      = array_key_exists( 'wpg_cover_page_company_name', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_name'] : '';
	$coverpage_company_tagline   = array_key_exists( 'wpg_cover_page_company_tagline', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_tagline'] : '';
	$coverpage_company_email     = array_key_exists( 'wpg_cover_page_company_email', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_email'] : '';
	$coverpage_company_address   = array_key_exists( 'wpg_cover_page_company_address', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_address'] : '';
	$coverpage_company_url       = array_key_exists( 'wpg_cover_page_company_url', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_url'] : '';
	$cover_page_image            = array_key_exists( 'sub_pgfw_cover_page_image_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_image_upload'] : '';
	$cover_page_company_logo     = array_key_exists( 'sub_pgfw_cover_page_company_logo_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_company_logo_upload'] : '';
	$coverpage_company_phone     = array_key_exists( 'wpg_cover_page_company_Phone', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_Phone'] : '';

	$html =
	'<style>
		.wpg-layout {
			margin: -92px -12px -80px -45px;
			background-color: #fff34d;
			width: 100%;				
			text-align : center;	
			padding-top: 30px;		
		}
		.wpg-layout-text {
			margin-bottom: 50px;
			padding-left: 25px;
			padding-right: 25px;
		}
		.wpg-title {
			font-size: 32px;
			text-transform: uppercase;
			color: #030304;
			margin-bottom: 20px;
		}		
		.wpg-layout-text p {
			color: #000000;
			font-size: 22px;
			font-style: italic;
		}
		.wpg-logo {
			margin-bottom: 30px;
		}
		.wpg-layout-img  {
			height: 750px;
			background-color: #fff34d;
		}		
		.wpg-layout-img img {
			width: 100%;
			height: 100%!important;
			object-fit: cover!important;
		}
		.wpg-footer {
			position: absolute;
			bottom: 0px;
			background-color: #fff34d;
			padding: 10px;
		}
		.wpg-footer p {
			font-weight: 600;
		}
		.wpg-footer a {
			text-decoration: none;
			color: #000000;
			font-weight: 600;
		}
		.wpg-footer a:hover {
			cursor: pointer;
		}
	</style>
	<div class="wpg-layout" style="page-break-after:always;">';
	if ( $cover_page_company_logo && '' !== $cover_page_company_logo ) {
		$html .= '<div class="wpg-logo">
				<img src="' . $cover_page_company_logo . '" width="50" height="50">
			</div>';
	} else {
		$html .= '<div class="wpg-logo">
				<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/wpswings_logo.png" width="100" height="100">
			</div>';
	}
	$html .= '<div class="wpg-layout-text">			
			<h2 class="wpg-title">' . $coverpage_company_name . '</h2>
			<p>' . $coverpage_company_tagline . '</p>
		</div>';
	if ( $cover_page_image && '' !== $cover_page_image ) {
		$html .= '<div class="wpg-layout-img">
				<img src="' . $cover_page_image . '">
			</div>';
	} else {
		$html .= '<div class="wpg-layout-img">
				<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/temp4.jpg">
			</div>';
	}
	$html .= '<div class="wpg-footer" style="text-align:center;">
				<p>' . $coverpage_company_address . '</p>
				<p>' . $coverpage_company_phone . '<span>|</span><a href="#">' . $coverpage_company_email . '</a><span>|</span><a href="#">' . $coverpage_company_url . '</a></p>
		</div>
	</div>';
	return $html;
}
/**
 * Return html for coverpage template 4.
 *
 * @return string
 */
function wpg_coverpage_template_4() {
	$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
	$coverpage_single_enable     = array_key_exists( 'wpg_cover_page_single_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_single_enable'] : '';
	$coverpage_bulk_enable       = array_key_exists( 'wpg_cover_page_bulk_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_bulk_enable'] : '';
	$coverpage_company_name      = array_key_exists( 'wpg_cover_page_company_name', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_name'] : '';
	$coverpage_company_tagline   = array_key_exists( 'wpg_cover_page_company_tagline', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_tagline'] : '';
	$coverpage_company_email     = array_key_exists( 'wpg_cover_page_company_email', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_email'] : '';
	$coverpage_company_address   = array_key_exists( 'wpg_cover_page_company_address', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_address'] : '';
	$coverpage_company_url       = array_key_exists( 'wpg_cover_page_company_url', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_url'] : '';
	$cover_page_image            = array_key_exists( 'sub_pgfw_cover_page_image_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_image_upload'] : '';
	$cover_page_company_logo     = array_key_exists( 'sub_pgfw_cover_page_company_logo_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_company_logo_upload'] : '';
	$coverpage_company_phone     = array_key_exists( 'wpg_cover_page_company_Phone', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_Phone'] : '';

	$html = '<style>
				*{
					box-sizing: border-box;
				}
				.wpg-layout {
					margin: -92px -12px -95px -45px;
				}
				ul {
					list-style: none;
				}
				a {
					text-decoration: none;
				}
				a:hover {
					cursor: pointer;
				}
				.wpg-layout {				
					position: relative;
			
				}
				.wpg-logo {
					text-align: right;
					margin: 25px 30px;
				}
				.wpg-layout-img {
					width: 600px;
					height: 880px;
					position: absolute;	
					right: 0;	
					top: 90px;										
				}			
				.wpg-layout-img img {			
					height: 100%;
					width: 100%;
					object-fit: cover;	
				}
				.wpg-layout-text {
					background-image: url( ' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/bg-img.jpg);
					background-position: center;
					background-size: cover;
					width: 350px;
					height: 320px;
					position: absolute;
					top: 45%;
					left: 0;
					transform: translate(0,-50%);	
					padding: 50px 20px 20px;
				}
				.wpg-title {
					font-size: 32px;
					text-transform: uppercase;
					color: #ffffff;
					margin-bottom: 10px;
					border-top: 1px solid;
					line-height: 1.5;
					font-weight: 900;
				}		
				.wpg-layout-text p {
					color: #cccccc;
					font-size: 22px;
					border-top: 1px solid #cccccc;
					word-spacing: 1px;
					padding: 10px 0
				}	
				.wpg-footer {
					position: absolute;
					bottom: 10px;
					padding: 20px;
					text-align: center;
				}
				.wpg-footer a {
					text-decoration: none;
					color: #151515;
				}
			</style>
			<div class="wpg-layout" style="page-break-after:always">';
	if ( $cover_page_company_logo && '' !== $cover_page_company_logo ) {
		$html .= '<div class="wpg-logo">
				<img src="' . $cover_page_company_logo . '" width="100" height="100">
			</div>';
	} else {
		$html .= '<div class="wpg-logo">
				<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/wpswings_logo.png" width="100" height="100">
			</div>';
	}
	if ( $cover_page_image && '' !== $cover_page_image ) {
		$html .= '<div class= "wpg-layout-img">
				<img src="' . $cover_page_image . '">
			</div>';
	} else {
		$html .= '<div class= "wpg-layout-img">
				<img src="' . WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/temp3.jpg">
			</div>';
	}
	$html .= '<div class="wpg-layout-text">			
			<h2 class="wpg-title">' . $coverpage_company_name . '</h2>
			<p>' . $coverpage_company_tagline . '</p>
		</div>
		<div class="wpg-footer">
			<ul class="contact-details">
				<li><img src=""><a href="#">' . $coverpage_company_address . '</a></li>
				<li><img src=""><a href="#">' . $coverpage_company_email . '</a></li>
				<li><img src=""><a href="#">' . $coverpage_company_phone . '</a></li>
				<li><img src=""><a href="' . $coverpage_company_url . '" target="__blank">' . $coverpage_company_url . '</a></li>
			</ul>			
		</div>
	</div>';
	return $html;
}
