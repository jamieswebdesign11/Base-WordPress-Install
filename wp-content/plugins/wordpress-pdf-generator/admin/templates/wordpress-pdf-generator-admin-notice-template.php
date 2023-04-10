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
?>
<div class="notice notice-success is-dismissible">
	<p>
		<?php esc_html_e( 'Log(s) deleted successfully', 'wordpress-pdf-generator' ); ?>
	</p>
</div>
<br/>
