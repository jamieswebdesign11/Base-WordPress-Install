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

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! class_exists( 'WordPress_Pdf_Generator_Api_Process' ) ) {

	/**
	 * The plugin API class.
	 *
	 * This is used to define the functions and data manipulation for custom endpoints.
	 *
	 * @since      3.0.0
	 * @package    Wordpress_Pdf_Generator
	 * @subpackage Wordpress_Pdf_Generator/includes
	 * @author     WP Swings <webmaster@wpswings.com>
	 */
	class WordPress_Pdf_Generator_Api_Process {

		/**
		 * Initialize the class and set its properties.
		 *
		 * @since    3.0.0
		 */
		public function __construct() {

		}

		/**
		 * Define the function to process data for custom endpoint.
		 *
		 * @since    3.0.0
		 * @param   object $wpg_request  data of requesting headers and other information.
		 * @return  Array $wps_wpg_rest_response    returns processed data and status of operations.
		 */
		public function wps_wpg_default_process( $wpg_request ) {
			$wps_wpg_rest_response = array();

			// Write your custom code here.

			$wps_wpg_rest_response['status'] = 200;
			$wps_wpg_rest_response['data']   = $wpg_request->get_headers();
			return $wps_wpg_rest_response;
		}
	}
}
