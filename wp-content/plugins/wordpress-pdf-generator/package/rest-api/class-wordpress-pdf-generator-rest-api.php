<?php
/**
 * The file that defines the core plugin api class
 *
 * A class definition that includes api's endpoints and functions used across the plugin
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/package/rest-api/version1
 */

/**
 * The core plugin  api class.
 *
 * This is used to define internationalization, api-specific hooks, and
 * endpoints for plugin.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      3.0.0
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/package/rest-api/version1
 * @author     WP Swings <webmaster@wpswings.com>
 */
class WordPress_Pdf_Generator_Rest_Api {

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    3.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    3.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin api.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the merthods, and set the hooks for the api and
	 *
	 * @since    3.0.0
	 * @param   string $plugin_name    Name of the plugin.
	 * @param   string $version        Version of the plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}


	/**
	 * Define endpoints for the plugin.
	 *
	 * Uses the Wordpress_Pdf_Generator_Rest_Api class in order to create the endpoint
	 * with WordPress.
	 *
	 * @since    3.0.0
	 * @access   private
	 */
	public function wps_wpg_add_endpoint() {
		register_rest_route(
			'wpg-route/v1',
			'/wpg-dummy-data/',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'wps_wpg_default_callback' ),
				'permission_callback' => array( $this, 'wps_wpg_default_permission_check' ),
			)
		);
	}


	/**
	 * Begins validation process of api endpoint.
	 *
	 * @param   Array $request    All information related with the api request containing in this array.
	 * @return  Array   $result   return rest response to server from where the endpoint hits.
	 * @since    3.0.0
	 */
	public function wps_wpg_default_permission_check( $request ) {

		// Add rest api validation for each request.
		$result = true;
		return $result;
	}


	/**
	 * Begins execution of api endpoint.
	 *
	 * @since  3.0.0
	 * @param  array $request All information related with the api request containing in this array.
	 * @return array $wps_wpg_response return rest response to server from where the endpoint hits.
	 */
	public function wps_wpg_default_callback( $request ) {

		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'package/rest-api/version1/class-wordpress-pdf-generator-api-process.php';
		$wps_wpg_api_obj     = new WordPress_Pdf_Generator_Api_Process();
		$wps_wpg_resultsdata = $wps_wpg_api_obj->wps_wpg_default_process( $request );
		if ( is_array( $wps_wpg_resultsdata ) && isset( $wps_wpg_resultsdata['status'] ) && 200 == $wps_wpg_resultsdata['status'] ) { // phpcs:ignore
			unset( $wps_wpg_resultsdata['status'] );
			$wps_wpg_response = new WP_REST_Response( $wps_wpg_resultsdata, 200 );
		} else {
			$wps_wpg_response = new WP_Error( $wps_wpg_resultsdata );
		}
		return $wps_wpg_response;
	}
}
