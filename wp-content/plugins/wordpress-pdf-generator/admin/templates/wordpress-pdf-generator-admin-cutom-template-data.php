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
/**
 * Return html for header custom template.
 *
 * @return string
 */
function wpg_header_html() {
	$html = '<!-- wp:columns -->
		<div class="wp-block-columns"><!-- wp:column -->
		<div class="wp-block-column"><!-- wp:paragraph -->
		<p>Logo Image</p>
		<!-- /wp:paragraph --></div>
		<!-- /wp:column -->
		
		<!-- wp:column -->
		<div class="wp-block-column"><!-- wp:paragraph -->
		<p>Company Name</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p>Company Address</p>
		<!-- /wp:paragraph --></div>
		<!-- /wp:column --></div>
		<!-- /wp:columns -->
		
		<!-- wp:separator -->
		<hr class="wp-block-separator"/>
		<!-- /wp:separator -->';
	return $html;
}
/**
 * Return Body html for custom template.
 *
 * @return string
 */
function wpg_body_html() {
	$html = '<!-- wp:columns -->
			<div class="wp-block-columns"><!-- wp:column -->
			<div class="wp-block-column"><!-- wp:paragraph -->
			<p><strong>Title</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:wps-pdf-snippet/post-block {"type":"{post-title}"} -->
			<span class="wp-block-wps-pdf-snippet-post-block">{post-title}</span>
			<!-- /wp:wps-pdf-snippet/post-block --></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column"><!-- wp:paragraph -->
			<p><strong>Post Meta Fields</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:wps-pdf-snippet/post-block {"type":"{post-metafields}"} -->
			<span class="wp-block-wps-pdf-snippet-post-block">{post-metafields}</span>
			<!-- /wp:wps-pdf-snippet/post-block --></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns -->

			<!-- wp:columns -->
			<div class="wp-block-columns"><!-- wp:column -->
			<div class="wp-block-column"><!-- wp:paragraph -->
			<p><strong>Description</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:wps-pdf-snippet/post-block {"type":"{post-content}"} -->
			<span class="wp-block-wps-pdf-snippet-post-block">{post-content}</span>
			<!-- /wp:wps-pdf-snippet/post-block --></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column"><!-- wp:paragraph -->
			<p><strong>Post Taxonomy</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:wps-pdf-snippet/post-block {"type":"{post-taxonomy}"} -->
			<span class="wp-block-wps-pdf-snippet-post-block">{post-taxonomy}</span>
			<!-- /wp:wps-pdf-snippet/post-block -->

			<!-- wp:paragraph -->
			<p><strong>Date</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:wps-pdf-snippet/post-block {"type":"{post-createddate}"} -->
			<span class="wp-block-wps-pdf-snippet-post-block">{post-createddate}</span>
			<!-- /wp:wps-pdf-snippet/post-block -->

			<!-- wp:paragraph -->
			<p><strong>Author</strong></p>
			<!-- /wp:paragraph -->

			<!-- wp:wps-pdf-snippet/post-block {"type":"{post-author}"} -->
			<span class="wp-block-wps-pdf-snippet-post-block">{post-author}</span>
			<!-- /wp:wps-pdf-snippet/post-block --></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns -->';
	return $html;
}
/**
 * Return footer html for custom template.
 *
 * @return string
 */
function wpg_footer_html() {
	$html = '<!-- wp:separator -->
			<hr class="wp-block-separator"/>
			<!-- /wp:separator -->

			<!-- wp:columns -->
			<div class="wp-block-columns"><!-- wp:column -->
			<div class="wp-block-column"><!-- wp:wps-pdf-snippet/post-block {"type":"{pageno}"} -->
			<span class="wp-block-wps-pdf-snippet-post-block">{pageno}</span>
			<!-- /wp:wps-pdf-snippet/post-block --></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column"><!-- wp:paragraph -->
			<p>My Company Technologies Limited, XYZ@mail.com</p>
			<!-- /wp:paragraph --></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns -->

			<!-- wp:paragraph -->
			<p></p>
			<!-- /wp:paragraph -->';
	return $html;
}
