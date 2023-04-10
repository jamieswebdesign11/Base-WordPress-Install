<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 * namespace wordpress_pdf_generator_public.
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/public
 * @author     WP Swings <webmaster@wpswings.com>
 */
class WordPress_Pdf_Generator_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    3.0.0
	 * @param      string $plugin_name       The name of the plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    3.0.0
	 */
	public function wpg_public_enqueue_styles() {

		wp_enqueue_style( $this->plugin_name, WORDPRESS_PDF_GENERATOR_DIR_URL . 'public/src/scss/wordpress-pdf-generator-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    3.0.0
	 */
	public function wpg_public_enqueue_scripts() {

		wp_register_script( $this->plugin_name, WORDPRESS_PDF_GENERATOR_DIR_URL . 'public/src/js/wordpress-pdf-generator-public.js', array( 'jquery' ), $this->version, false );
		wp_localize_script( $this->plugin_name, 'wpg_public_param', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
		wp_enqueue_script( $this->plugin_name );

	}
	/**
	 * Bulk download for PDF button.
	 *
	 * @since 3.0.0
	 * @param string $html string containing html for the pdf download button.
	 * @param int    $id id of the current post.
	 * @return string
	 */
	public function wps_wpg_bulk_download_button( $html, $id ) {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'public/partials/wordpress-pdf-generator-public-display-bulk.php';
		$pgfw_display_settings     = get_option( 'pgfw_save_admin_display_settings', array() );
		$pgfw_bulk_download_enable = array_key_exists( 'pgfw_bulk_download_enable', $pgfw_display_settings ) ? $pgfw_display_settings['pgfw_bulk_download_enable'] : '';
		if ( 'yes' === $pgfw_bulk_download_enable ) {
			$html = return_bulk_download_button( $html, $id );
		}
		if ( isset( $_COOKIE['wpg_bulk_products_addition'] ) && ( is_array( $_COOKIE['wpg_bulk_products_addition'] ) && count( $_COOKIE['wpg_bulk_products_addition'] ) > 0 ) ) {
			$html .= return_bulk_html_content();
		}
		return $html;
	}
}
