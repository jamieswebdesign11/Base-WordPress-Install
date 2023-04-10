<?php
/**
 * Fired during plugin activation
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      3.0.0
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/includes
 * @author     WP Swings <webmaster@wpswings.com>
 */
class WordPress_Pdf_Generator_Activator {

	/**
	 * Will update default value on plugin activation.
	 *
	 * @param boolean $network_wide either network activated or not.
	 * @since 3.0.0
	 * @return void
	 */
	public static function wordpress_pdf_generator_activate( $network_wide ) {
		global $wpdb;
		if ( is_multisite() && $network_wide ) {
			$blog_ids = $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" ); // phpcs:ignore WordPress
			foreach ( $blog_ids as $blog_id ) {
				switch_to_blog( $blog_id );
				self::wpg_update_option_table_for_pro_settings();
				self::wpg_create_database_table_on_activation();
				restore_current_blog();
			}
		} else {
			self::wpg_update_option_table_for_pro_settings();
			self::wpg_create_database_table_on_activation();
		}
	}

	/**
	 * Create Database during plugin activation.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public static function wpg_create_database_table_on_activation() {
		global $wpdb;
		$table_name      = $wpdb->prefix . 'wps_pdflog';
		$charset_collate = $wpdb->get_charset_collate();
		$sql             = "CREATE TABLE $table_name (
			id mediumint(9) NOT NULL AUTO_INCREMENT,
			postid text,
			username varchar(500),
			email varchar(320),
			time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			PRIMARY KEY  (id)
		) $charset_collate;";
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );
	}
	/**
	 * Updating Settings for pro plugin during plugin activation.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public static function wpg_update_option_table_for_pro_settings() {
		$timestamp = get_option( 'wps_wpg_activated_timestamp', 'not_set' );
		if ( 'not_set' === $timestamp ) {
			$current_time = current_time( 'timestamp' ); // phpcs:ignore
			$thirty_days  = strtotime( '+30 days', $current_time );
			update_option( 'wps_wpg_activated_timestamp', $thirty_days );
		}
		$pgfw_body_settings = get_option( 'pgfw_body_save_settings', array() );
		if ( ! array_key_exists( 'pgfw_watermark_angle', $pgfw_body_settings ) ) {
			$pgfw_body_settings['pgfw_watermark_angle']         = -45;
			$pgfw_body_settings['pgfw_watermark_position_left'] = 200;
			$pgfw_body_settings['pgfw_watermark_position_top']  = 200;
			$pgfw_body_settings['pgfw_watermark_opacity']       = 0.2;
			$pgfw_body_settings['pgfw_watermark_image_width']   = 100;
			$pgfw_body_settings['pgfw_watermark_image_height']  = 100;
			update_option( 'pgfw_body_save_settings', $pgfw_body_settings );
		}
		$custom_template_data = get_option( 'wpg_custom_templates_list', array() );
		if ( is_array( $custom_template_data ) && ! array_key_exists( 'customtemplate', $custom_template_data ) ) {
			$args = array(
				array(
					'post_title'   => 'header',
					'post_content' => self::wpg_customtemplate_header_html(),
					'post_type'    => 'page',
					'post_status'  => 'private',
				),
				array(
					'post_title'   => 'body',
					'post_content' => self::wpg_customtemplate_body_html(),
					'post_type'    => 'page',
					'post_status'  => 'private',
				),
				array(
					'post_title'   => 'footer',
					'post_content' => self::wpg_customtemplate_footer_html(),
					'post_type'    => 'page',
					'post_status'  => 'private',
				),
			);

			$custom_template_data['customtemplate'] = array();
			foreach ( $args as $post_arg ) {
				$post_id = wp_insert_post( $post_arg );
				$custom_template_data['customtemplate'][ $post_arg['post_title'] ] = $post_id;
			}
			update_option( 'wpg_custom_templates_list', $custom_template_data );
			update_option( 'wpg_use_template_to_generate_pdf', 'template1' );
			update_option( 'wpg_use_cover_page_template', 1 );
		}
		$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
		if ( ! $wpg_coverpage_settings_data ) {
			$wpg_coverpage_settings_data['wpg_cover_page_single_enable']            = '';
			$wpg_coverpage_settings_data['wpg_cover_page_bulk_enable']              = '';
			$wpg_coverpage_settings_data['wpg_cover_page_company_name']             = 'company name';
			$wpg_coverpage_settings_data['wpg_cover_page_company_tagline']          = 'company tagline';
			$wpg_coverpage_settings_data['wpg_cover_page_company_email']            = 'mail@gmail.com';
			$wpg_coverpage_settings_data['wpg_cover_page_company_address']          = 'Address || Address || Address';
			$wpg_coverpage_settings_data['wpg_cover_page_company_url']              = 'xyz.com';
			$wpg_coverpage_settings_data['sub_pgfw_cover_page_image_upload']        = '';
			$wpg_coverpage_settings_data['sub_pgfw_cover_page_company_logo_upload'] = '';
			$wpg_coverpage_settings_data['wpg_cover_page_company_Phone']            = '+919800000000';
			update_option( 'pgfw_coverpage_setting_save', $wpg_coverpage_settings_data );
		}
	}
	/**
	 * Default html for customtemplate header.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public static function wpg_customtemplate_header_html() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-cutom-template-data.php';
		$html = wpg_header_html();
		return $html;
	}
	/**
	 * Default html for customtemplate body.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public static function wpg_customtemplate_body_html() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-cutom-template-data.php';
		$html = wpg_body_html();
		return $html;
	}
	/**
	 * Default html for customtemplate footer.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public static function wpg_customtemplate_footer_html() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-cutom-template-data.php';
		$html = wpg_footer_html();
		return $html;
	}
}
