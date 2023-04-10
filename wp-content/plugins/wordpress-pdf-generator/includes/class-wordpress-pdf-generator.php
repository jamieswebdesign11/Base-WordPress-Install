<?php
/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      3.0.0
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/includes
 * @author     WP Swings <webmaster@wpswings.com>
 */
class WordPress_Pdf_Generator {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    3.0.0
	 * @access   protected
	 * @var      WordPress_Pdf_Generator_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

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
	 * The current version of the plugin.
	 *
	 * @since    3.0.0
	 * @access   protected
	 * @var      string    $wpg_onboard    To initializsed the object of class onboard.
	 */
	protected $wpg_onboard;

	/**
	 * Public static variable to be accessed in this plugin.
	 *
	 * @var string
	 */
	public static $lic_callback_function = 'check_lcns_validity';

	/**
	 * Public static variable to be accessed in this plugin.
	 *
	 * @var string
	 */
	public static $lic_ini_callback_function = 'check_lcns_initial_days';

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area,
	 * the public-facing side of the site and common side of the site.
	 *
	 * @since    3.0.0
	 */
	public function __construct() {

		if ( defined( 'WORDPRESS_PDF_GENERATOR_VERSION' ) ) {

			$this->version = WORDPRESS_PDF_GENERATOR_VERSION;
		} else {

			$this->version = '3.0.0';
		}

		$this->plugin_name = 'pdf-generator-for-wp-pro';

		$this->wordpress_pdf_generator_dependencies();
		$this->wordpress_pdf_generator_locale();
		if ( is_admin() ) {
			$this->wordpress_pdf_generator_admin_hooks();
		} else {
			$this->wordpress_pdf_generator_public_hooks();
		}
		$this->wordpress_pdf_generator_common_hooks();

		$this->wordpress_pdf_generator_api_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Wordpress_Pdf_Generator_Loader. Orchestrates the hooks of the plugin.
	 * - Wordpress_Pdf_Generator_i18n. Defines internationalization functionality.
	 * - WordPress_Pdf_Generator_Admin. Defines all hooks for the admin area.
	 * - Wordpress_Pdf_Generator_Common. Defines all hooks for the common area.
	 * - Wordpress_Pdf_Generator_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    3.0.0
	 * @access   private
	 */
	private function wordpress_pdf_generator_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-wordpress-pdf-generator-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-wordpress-pdf-generator-i18n.php';

		if ( is_admin() ) {

			// The class responsible for defining all actions that occur in the admin area.
			require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-wordpress-pdf-generator-admin.php';

		} else {

			// The class responsible for defining all actions that occur in the public-facing side of the site.
			require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-wordpress-pdf-generator-public.php';

		}

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'package/rest-api/class-wordpress-pdf-generator-rest-api.php';

		/**
		 * This class responsible for defining common functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'common/class-wordpress-pdf-generator-common.php';

		$this->loader = new WordPress_Pdf_Generator_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the WordPress_Pdf_Generator_I18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    3.0.0
	 * @access   private
	 */
	private function wordpress_pdf_generator_locale() {

		$plugin_i18n = new WordPress_Pdf_Generator_I18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 */
	private function wordpress_pdf_generator_admin_hooks() {
		$wpg_plugin_admin     = new WordPress_Pdf_Generator_Admin( $this->wpg_get_plugin_name(), $this->wpg_get_version() );
		$callname_lic         = self::$lic_callback_function;
		$callname_lic_initial = self::$lic_ini_callback_function;
		$day_count            = self::$callname_lic_initial();
		if ( self::$callname_lic() || 0 <= $day_count ) {
			$this->loader->add_action( 'wps_wpg_check_license_daily', $wpg_plugin_admin, 'wps_wpg_check_license' );
		}
		$this->wpg_enable_pro_tab_features( $wpg_plugin_admin );
		$this->loader->add_action( 'pgfw_license_activation_notice_on_dashboard', $wpg_plugin_admin, 'wpg_license_validation_admin_notice_on_dashboard' );
		$this->loader->add_filter( 'wps_pgfw_setting_page_loading_filter_hook', $wpg_plugin_admin, 'wpg_adding_taxonomy_setting_page', 10, 2 );
		$this->loader->add_action( 'admin_enqueue_scripts', $wpg_plugin_admin, 'wpg_admin_enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $wpg_plugin_admin, 'wpg_admin_enqueue_scripts' );
		$this->loader->add_action( 'wps_pgfw_pro_overview_content', $wpg_plugin_admin, 'wpg_pro_overview_content' );
	}
	/**
	 * Activate pr tab if license is verified.
	 *
	 * @param object $wpg_plugin_admin object of admin functionality class.
	 * @return void
	 */
	public function wpg_enable_pro_tab_features( $wpg_plugin_admin ) {
		$callname_lic         = self::$lic_callback_function;
		$callname_lic_initial = self::$lic_ini_callback_function;
		$day_count            = self::$callname_lic_initial();
		if ( self::$callname_lic() || $day_count > 0 ) {
			$this->loader->add_filter( 'pgfw_settings_general_html_arr_filter_hook', $wpg_plugin_admin, 'wpg_admin_general_settings_page_field_pro' );
			$this->loader->add_filter( 'pgfw_settings_display_fields_html_arr_filter_hook', $wpg_plugin_admin, 'wpg_admin_display_settings_page_field_pro' );
			$this->loader->add_filter( 'pgfw_settings_header_fields_html_arr_filter_hook', $wpg_plugin_admin, 'wpg_header_settings_page_field_pro', 10, 2 );
			$this->loader->add_filter( 'pgfw_settings_footer_fields_html_arr_filter_hook', $wpg_plugin_admin, 'wpg_footer_settings_page_field_pro', 10, 2 );
			$this->loader->add_filter( 'pgfw_settings_body_fields_html_arr_filter_hook', $wpg_plugin_admin, 'wpg_body_settings_page_field_pro', 10, 2 );
			$this->loader->add_filter( 'pgfw_settings_meta_fields_html_arr_filter_hook', $wpg_plugin_admin, 'wpg_admin_meta_fields_settings_page_field_pro', 10, 3 );
			$this->loader->add_filter( 'pgfw_settings_advance_html_arr_filter_hook', $wpg_plugin_admin, 'wpg_admin_advance_settings_page_field_pro' );
			$this->loader->add_filter( 'wps_pgfw_plugin_standard_admin_settings_tabs', $wpg_plugin_admin, 'wpg_taxonmy_settings_tab' );
			$this->loader->add_filter( 'wpg_taxonomy_settings_array', $wpg_plugin_admin, 'wpg_setting_fields_for_customising_taxonomy' );
			$this->loader->add_action( 'admin_init', $wpg_plugin_admin, 'wpg_admin_save_tab_settings' );
			$this->loader->add_action( 'wps_wpg_deletion_success_notice', $wpg_plugin_admin, 'wpf_show_admin_notice_for_successfully_log_deletion' );
			$this->loader->add_filter( 'wps_pgfw_font_styles_filter_hook', $wpg_plugin_admin, 'wpg_custom_font_uploaded_include_in_font_dropdown' );
			$this->loader->add_action( 'wps_pgfw_plugin_standard_admin_settings_sub_tabs', $wpg_plugin_admin, 'wpg_add_custom_template_settings_tab' );
			$this->loader->add_action( 'wp_ajax_wpg_add_custom_template_page', $wpg_plugin_admin, 'wpg_add_custom_template_page' );
			$this->loader->add_action( 'enqueue_block_editor_assets', $wpg_plugin_admin, 'wpg_admin_enqueue_gutenberg_script' );
			$this->loader->add_action( 'wps_pgfw_save_default_pro_settings', $wpg_plugin_admin, 'wpg_reset_default_setings' );
			$this->loader->add_action( 'wp_ajax_wpg_delete_custom_template_page', $wpg_plugin_admin, 'wpg_delete_custom_template_page' );
			$this->loader->add_action( 'wp_ajax_wpg_save_internal_page_template_setting', $wpg_plugin_admin, 'wpg_save_internal_page_template_setting' );
			$this->loader->add_filter( 'wpg_layout_cover_page_setting_html_array', $wpg_plugin_admin, 'wpg_cover_page_html_layout_fields' );
			$this->loader->add_action( 'wp_ajax_wpg_activate_coverpage_template', $wpg_plugin_admin, 'wpg_activate_coverpage_template' );
			$this->loader->add_filter( 'wps_pgfw_update_plugin_name_dashboard', $wpg_plugin_admin, 'wps_wpg_update_plugin_name_admin_dashboard' );
			$this->loader->add_action( 'wps_pgfw_below_meta_fields_setting_form', $wpg_plugin_admin, 'wps_add_shortcode_use_notice_below_meta_setting_page' );
		}
		if ( ! self::$callname_lic() ) {
			$this->loader->add_filter( 'wps_pgfw_plugin_standard_admin_settings_tabs', $wpg_plugin_admin, 'wpg_add_license_tab' );
		}
	}
	/**
	 * Register all of the hooks related to the common functionality
	 * of the plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 */
	private function wordpress_pdf_generator_common_hooks() {
		$wpg_plugin_common = new WordPress_Pdf_Generator_Common( $this->wpg_get_plugin_name(), $this->wpg_get_version() );
		$this->loader->add_action( 'wp_enqueue_scripts', $wpg_plugin_common, 'wpg_common_enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $wpg_plugin_common, 'wpg_common_enqueue_scripts' );
		$pdf_general_settings_arr = get_option( 'pgfw_general_settings_save', array() );
		$pgfw_enable_plugin       = array_key_exists( 'pgfw_enable_plugin', $pdf_general_settings_arr ) ? $pdf_general_settings_arr['pgfw_enable_plugin'] : '';
		$callname_lic             = self::$lic_callback_function;
		$callname_lic_initial     = self::$lic_ini_callback_function;
		$day_count                = self::$callname_lic_initial();
		if ( 'yes' === $pgfw_enable_plugin ) {
			if ( self::$callname_lic() || $day_count > 0 ) {
				// destroying cookies once logout.
				$this->loader->add_action( 'wp_logout', $wpg_plugin_common, 'wpg_destroy_cookies_bulk_products' );
				// add product to bulk pdf ajax.
				$this->loader->add_action( 'wp_ajax_nopriv_wpg_bulk_add_products_ajax', $wpg_plugin_common, 'wpg_bulk_add_products_ajax', 10 );
				$this->loader->add_action( 'wp_ajax_wpg_bulk_add_products_ajax', $wpg_plugin_common, 'wpg_bulk_add_products_ajax', 10 );
				// ajax to build html table from cookies.
				$this->loader->add_action( 'wp_ajax_wpg_build_html_from_cookies', $wpg_plugin_common, 'wpg_build_html_from_cookies' );
				$this->loader->add_action( 'wp_ajax_nopriv_wpg_build_html_from_cookies', $wpg_plugin_common, 'wpg_build_html_from_cookies' );
				// deleting product from cookies bulk products.
				$this->loader->add_action( 'wp_ajax_wpg_delete_product_from_cookies', $wpg_plugin_common, 'wpg_delete_product_from_cookies' );
				$this->loader->add_action( 'wp_ajax_nopriv_wpg_delete_product_from_cookies', $wpg_plugin_common, 'wpg_delete_product_from_cookies' );
				// ajax for creating zip of bulk product or continuation of bulk products.
				$this->loader->add_action( 'wp_ajax_wps_wpg_ajax_for_zip_or_pdf', $wpg_plugin_common, 'wps_wpg_ajax_for_zip_or_pdf' );
				$this->loader->add_action( 'wp_ajax_nopriv_wps_wpg_ajax_for_zip_or_pdf', $wpg_plugin_common, 'wps_wpg_ajax_for_zip_or_pdf' );
				$this->loader->add_filter( 'wps_pgfw_product_taxonomy_in_pdf_filter_hook', $wpg_plugin_common, 'wpg_add_taxonomy_to_pdf', 10, 2 );
				$this->loader->add_action( 'wps_pgfw_update_pdf_details_indb', $wpg_plugin_common, 'wpg_insert_file_details_indb', 10, 3 );
				$this->loader->add_action( 'plugins_loaded', $wpg_plugin_common, 'wpg_shortcode_to_get_product_details' );
				$this->loader->add_filter( 'pgfw_customize_body_watermark_image_pdf', $wpg_plugin_common, 'wpg_watermark_image_pdf_body_html' );
				$this->loader->add_filter( 'pgfw_load_templates_for_pdf_html', $wpg_plugin_common, 'wpg_load_custom_template_for_pdf_generation', 10, 3 );
				$this->loader->add_filter( 'wps_pgfw_product_post_meta_in_pdf_filter_hook', $wpg_plugin_common, 'wpg_add_meta_fields_to_pdf', 10, 2 );
				$this->loader->add_action( 'init', $wpg_plugin_common, 'wpg_preview_for_generted_pdf' );
				$this->loader->add_filter( 'wps_pgfw_add_cover_page_template_to_single_pdf', $wpg_plugin_common, 'wpg_add_cover_page_to_single_pdf' );
				$this->loader->add_filter( 'wps_pgfw_add_cover_page_template_to_bulk_pdf', $wpg_plugin_common, 'wpg_add_cover_page_to_bulk_pdf' );
				$this->loader->add_action( 'wps_pgfw_load_all_compatible_shortcode_converter', $wpg_plugin_common, 'wpg_load_all_compatible_shortcode_loader' );
			}
		}
		$this->loader->add_action( 'wp_ajax_wps_wpg_validate_license_key', $wpg_plugin_common, 'wps_wpg_validate_license_key' );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 */
	private function wordpress_pdf_generator_public_hooks() {
		$wpg_plugin_public = new WordPress_Pdf_Generator_Public( $this->wpg_get_plugin_name(), $this->wpg_get_version() );
		$this->loader->add_action( 'wp_enqueue_scripts', $wpg_plugin_public, 'wpg_public_enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $wpg_plugin_public, 'wpg_public_enqueue_scripts' );
		$pdf_general_settings_arr = get_option( 'pgfw_general_settings_save', array() );
		$pgfw_enable_plugin       = array_key_exists( 'pgfw_enable_plugin', $pdf_general_settings_arr ) ? $pdf_general_settings_arr['pgfw_enable_plugin'] : '';
		$callname_lic             = self::$lic_callback_function;
		$callname_lic_initial     = self::$lic_ini_callback_function;
		$day_count                = self::$callname_lic_initial();
		if ( 'yes' === $pgfw_enable_plugin ) {
			if ( self::$callname_lic() || $day_count > 0 ) {
				$this->loader->add_filter( 'wps_pgfw_bulk_download_button_filter_hook', $wpg_plugin_public, 'wps_wpg_bulk_download_button', 10, 2 );
			}
		}
	}

	/**
	 * Register all of the hooks related to the api functionality
	 * of the plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 */
	private function wordpress_pdf_generator_api_hooks() {
		$wpg_plugin_api = new WordPress_Pdf_Generator_Rest_Api( $this->wpg_get_plugin_name(), $this->wpg_get_version() );
		$this->loader->add_action( 'rest_api_init', $wpg_plugin_api, 'wps_wpg_add_endpoint' );
	}


	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    3.0.0
	 */
	public function wpg_run() {
		$this->loader->wpg_run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     3.0.0
	 * @return    string    The name of the plugin.
	 */
	public function wpg_get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     3.0.0
	 * @return    WordPress_Pdf_Generator_Loader    Orchestrates the hooks of the plugin.
	 */
	public function wpg_get_loader() {
		return $this->loader;
	}


	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     3.0.0
	 * @return    Wordpress_Pdf_Generator_Onboard    Orchestrates the hooks of the plugin.
	 */
	public function wpg_get_onboard() {
		return $this->wpg_onboard;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     3.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function wpg_get_version() {
		return $this->version;
	}

	/**
	 * Locate and load appropriate tempate.
	 *
	 * @since   3.0.0
	 * @param string $path path file for inclusion.
	 * @param array  $params parameters to pass to the file for access.
	 */
	public function wps_wpg_plug_load_template( $path, $params = array() ) {

		$wpg_file_path = WORDPRESS_PDF_GENERATOR_DIR_PATH . $path;

		if ( file_exists( $wpg_file_path ) ) {

			include $wpg_file_path;
		} else {

			/* translators: %s: file path */
			$wpg_notice = sprintf( esc_html__( 'Unable to locate file at location "%s". Some features may not work properly in this plugin. Please contact us!', 'wordpress-pdf-generator' ), $wpg_file_path );
			$this->wps_wpg_plug_admin_notice( $wpg_notice, 'error' );
		}
	}

	/**
	 * Show admin notices.
	 *
	 * @param  string $wpg_message    Message to display.
	 * @param  string $type       notice type, accepted values - error/update/update-nag.
	 * @since  3.0.0
	 */
	public static function wps_wpg_plug_admin_notice( $wpg_message, $type = 'error' ) {

		$wpg_classes = 'notice ';

		switch ( $type ) {

			case 'update':
				$wpg_classes .= 'updated is-dismissible';
				break;

			case 'update-nag':
				$wpg_classes .= 'update-nag is-dismissible';
				break;

			case 'success':
				$wpg_classes .= 'notice-success is-dismissible';
				break;

			default:
				$wpg_classes .= 'notice-error is-dismissible';
		}

		$wpg_notice  = '<div class="' . esc_attr( $wpg_classes ) . ' wps-errorr-8">';
		$wpg_notice .= '<p>' . esc_html( $wpg_message ) . '</p>';
		$wpg_notice .= '</div>';

		echo wp_kses_post( $wpg_notice );
	}
	/**
	 * Generate html components.
	 *
	 * @param  string $wpg_components    html to display.
	 * @since  3.0.0
	 */
	public function wps_wpg_plug_generate_html( $wpg_components = array() ) {
		if ( is_array( $wpg_components ) && ! empty( $wpg_components ) ) {
			foreach ( $wpg_components as $wpg_component ) {
				if ( ! empty( $wpg_component['type'] ) && ( ! empty( $wpg_component['id'] ) || ! empty( $wpg_component['a-id'] ) ) ) {
					switch ( $wpg_component['type'] ) {
						case 'hidden':
						case 'number':
						case 'email':
						case 'text':
							?>
						<div class="wps-form-group wps-wpg-<?php echo esc_attr( $wpg_component['type'] ); ?>">
							<div class="wps-form-group__label">
								<label for="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
							</div>
							<div class="wps-form-group__control">
								<label class="mdc-text-field mdc-text-field--outlined">
									<span class="mdc-notched-outline">
										<span class="mdc-notched-outline__leading"></span>
										<span class="mdc-notched-outline__notch">
											<?php if ( 'number' !== $wpg_component['type'] ) { ?>
												<span class="mdc-floating-label" id="my-label-id" style=""><?php echo ( isset( $wpg_component['placeholder'] ) ? esc_attr( $wpg_component['placeholder'] ) : '' ); ?></span>
											<?php } ?>
										</span>
										<span class="mdc-notched-outline__trailing"></span>
									</span>
									<input
									class="mdc-text-field__input <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>" 
									name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
									id="<?php echo esc_attr( $wpg_component['id'] ); ?>"
									type="<?php echo esc_attr( $wpg_component['type'] ); ?>"
									value="<?php echo ( isset( $wpg_component['value'] ) ? esc_attr( $wpg_component['value'] ) : '' ); ?>"
									placeholder="<?php echo ( isset( $wpg_component['placeholder'] ) ? esc_attr( $wpg_component['placeholder'] ) : '' ); ?>"
									>
								</label>
								<div class="mdc-text-field-helper-line">
									<div class="mdc-text-field-helper-text--persistent wps-helper-text" id="" aria-hidden="true"><?php echo ( isset( $wpg_component['description'] ) ? esc_attr( $wpg_component['description'] ) : '' ); ?></div>
								</div>
							</div>
						</div>
							<?php
							break;

						case 'password':
							?>
						<div class="wps-form-group">
							<div class="wps-form-group__label">
								<label for="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
							</div>
							<div class="wps-form-group__control">
								<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon">
									<span class="mdc-notched-outline">
										<span class="mdc-notched-outline__leading"></span>
										<span class="mdc-notched-outline__notch">
										</span>
										<span class="mdc-notched-outline__trailing"></span>
									</span>
									<input 
									class="mdc-text-field__input <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?> wps-form__password" 
									name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
									id="<?php echo esc_attr( $wpg_component['id'] ); ?>"
									type="<?php echo esc_attr( $wpg_component['type'] ); ?>"
									value="<?php echo ( isset( $wpg_component['value'] ) ? esc_attr( $wpg_component['value'] ) : '' ); ?>"
									placeholder="<?php echo ( isset( $wpg_component['placeholder'] ) ? esc_attr( $wpg_component['placeholder'] ) : '' ); ?>"
									>
									<i class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing wps-password-hidden" tabindex="0" role="button">visibility</i>
								</label>
								<div class="mdc-text-field-helper-line">
									<div class="mdc-text-field-helper-text--persistent wps-helper-text" id="" aria-hidden="true"><?php echo ( isset( $wpg_component['description'] ) ? esc_attr( $wpg_component['description'] ) : '' ); ?></div>
								</div>
							</div>
						</div>
							<?php
							break;

						case 'textarea':
							?>
						<div class="wps-form-group">
							<div class="wps-form-group__label">
								<label class="wps-form-label" for="<?php echo esc_attr( $wpg_component['id'] ); ?>"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
							</div>
							<div class="wps-form-group__control">
								<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea"  	for="text-field-hero-input">
									<span class="mdc-notched-outline">
										<span class="mdc-notched-outline__leading"></span>
										<span class="mdc-notched-outline__notch">
											<span class="mdc-floating-label"><?php echo ( isset( $wpg_component['placeholder'] ) ? esc_attr( $wpg_component['placeholder'] ) : '' ); ?></span>
										</span>
										<span class="mdc-notched-outline__trailing"></span>
									</span>
									<span class="mdc-text-field__resizer">
										<textarea class="mdc-text-field__input <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>" rows="2" cols="25" aria-label="Label" name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>" id="<?php echo esc_attr( $wpg_component['id'] ); ?>" placeholder="<?php echo ( isset( $wpg_component['placeholder'] ) ? esc_attr( $wpg_component['placeholder'] ) : '' ); ?>"><?php echo ( isset( $wpg_component['value'] ) ? esc_textarea( $wpg_component['value'] ) : '' ); ?></textarea>
									</span>
								</label>
								<div class="mdc-text-field-helper-line">
									<label for="checkbox-1"><?php echo ( isset( $wpg_component['description'] ) ? esc_attr( $wpg_component['description'] ) : '' ); ?></label>
								</div>
							</div>
						</div>

							<?php
							break;

						case 'select':
						case 'multiselect':
							?>
						<div class="wps-form-group <?php echo esc_attr( isset( $wpg_component['parent-class'] ) ? $wpg_component['parent-class'] : '' ); ?>">
							<div class="wps-form-group__label">
								<label class="wps-form-label" for="<?php echo esc_attr( $wpg_component['id'] ); ?>"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
							</div>
							<div class="wps-form-group__control">
								<div class="wps-form-select">
									<select id="<?php echo esc_attr( $wpg_component['id'] ); ?>" name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : '' ); ?><?php echo ( 'multiselect' === $wpg_component['type'] ) ? '[]' : ''; ?>" id="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="mdl-textfield__input <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>" <?php echo 'multiselect' === $wpg_component['type'] ? 'multiple="multiple"' : ''; ?> >
										<?php
										foreach ( $wpg_component['options'] as $wpg_key => $wpg_val ) {
											?>
											<option value="<?php echo esc_attr( $wpg_key ); ?>"
												<?php
												if ( is_array( $wpg_component['value'] ) ) {
													selected( in_array( (string) $wpg_key, $wpg_component['value'], true ), true );
												} else {
													selected( $wpg_component['value'], (string) $wpg_key );
												}
												?>
												>
												<?php echo esc_html( $wpg_val ); ?>
											</option>
											<?php
										}
										?>
									</select>
									<label class="mdl-textfield__label" for="octane"><?php echo ( isset( $wpg_component['description'] ) ? esc_attr( $wpg_component['description'] ) : '' ); ?></label>
								</div>
							</div>
						</div>
							<?php
							break;
						case 'checkbox':
							?>
						<div class="wps-form-group <?php echo esc_attr( isset( $wpg_component['parent-class'] ) ? $wpg_component['parent-class'] : '' ); ?>">
							<div class="wps-form-group__label">
								<label for="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
							</div>
							<div class="wps-form-group__control wps-pl-4">
								<div class="mdc-form-field">
									<div class="mdc-checkbox">
										<input 
										name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
										id="<?php echo esc_attr( $wpg_component['id'] ); ?>"
										type="checkbox"
										class="mdc-checkbox__native-control <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>"
										value="yes"
										<?php checked( $wpg_component['value'], 'yes' ); ?>
										/>
										<div class="mdc-checkbox__background">
											<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
												<path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
											</svg>
											<div class="mdc-checkbox__mixedmark"></div>
										</div>
										<div class="mdc-checkbox__ripple"></div>
									</div>
									<label for="checkbox-1"><?php echo ( isset( $wpg_component['description'] ) ? esc_attr( $wpg_component['description'] ) : '' ); ?></label>
								</div>
							</div>
						</div>
							<?php
							break;
						case 'radio':
							?>
						<div class="wps-form-group">
							<div class="wps-form-group__label">
								<label for="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
							</div>
							<div class="wps-form-group__control wps-pl-4">
								<div class="wps-flex-col">
									<?php
									foreach ( $wpg_component['options'] as $wpg_radio_key => $wpg_radio_val ) {
										?>
										<div class="mdc-form-field">
											<div class="mdc-radio">
												<input
												name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
												value="<?php echo esc_attr( $wpg_radio_key ); ?>"
												type="radio"
												class="mdc-radio__native-control <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>"
												<?php checked( $wpg_radio_key, $wpg_component['value'] ); ?>
												>
												<div class="mdc-radio__background">
													<div class="mdc-radio__outer-circle"></div>
													<div class="mdc-radio__inner-circle"></div>
												</div>
												<div class="mdc-radio__ripple"></div>
											</div>
											<label for="radio-1"><?php echo esc_html( $wpg_radio_val ); ?></label>
										</div>	
										<?php
									}
									?>
								</div>
							</div>
						</div>
							<?php
							break;

						case 'radio-switch':
							?>

						<div class="wps-form-group">
							<div class="wps-form-group__label">
								<label for="" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
							</div>
							<div class="wps-form-group__control">
								<div>
									<div class="mdc-switch">
										<div class="mdc-switch__track"></div>
										<div class="mdc-switch__thumb-underlay">
											<div class="mdc-switch__thumb"></div>
											<input
											name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
											type="checkbox"
											id="<?php echo esc_html( $wpg_component['id'] ); ?>"
											value="yes"
											class="mdc-switch__native-control <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>"
											role="switch"
											aria-checked="<?php echo ( 'yes' === $wpg_component['value'] ) ? 'true' : 'false'; ?>"
											<?php checked( $wpg_component['value'], 'yes' ); ?>
											>
										</div>
									</div>
								</div>
							</div>
						</div>
							<?php
							break;

						case 'button':
							?>
						<div class="wps-form-group">
							<div class="wps-form-group__label"></div>
							<div class="wps-form-group__control">
								<button class="mdc-button mdc-button--raised" name= "<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
									id="<?php echo esc_attr( $wpg_component['id'] ); ?>"> <span class="mdc-button__ripple"></span>
									<span class="mdc-button__label <?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>"><?php echo ( isset( $wpg_component['button_text'] ) ? esc_html( $wpg_component['button_text'] ) : '' ); ?></span>
								</button>
							</div>
						</div>

							<?php
							break;
						case 'multi':
							?>
							<div class="wps-form-group wps-isfw-<?php echo esc_attr( $wpg_component['type'] ); ?>">
								<div class="wps-form-group__label">
									<label for="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
									</div>
									<div class="wps-form-group__control">
									<?php
									foreach ( $wpg_component['value'] as $component ) {
										?>
											<label class="mdc-text-field mdc-text-field--outlined">
												<span class="mdc-notched-outline">
													<span class="mdc-notched-outline__leading"></span>
													<span class="mdc-notched-outline__notch">
														<?php if ( 'number' !== $component['type'] ) { ?>
															<span class="mdc-floating-label" id="my-label-id" style=""><?php echo ( isset( $component['placeholder'] ) ? esc_attr( $component['placeholder'] ) : '' ); ?></span>
														<?php } ?>
													</span>
													<span class="mdc-notched-outline__trailing"></span>
												</span>
												<input 
												class="mdc-text-field__input <?php echo ( isset( $component['class'] ) ? esc_attr( $component['class'] ) : '' ); ?>" 
												name="<?php echo ( isset( $component['name'] ) ? esc_html( $component['name'] ) : esc_html( $component['id'] ) ); ?>"
												id="<?php echo esc_attr( $component['id'] ); ?>"
												type="<?php echo esc_attr( $component['type'] ); ?>"
												value="<?php echo ( isset( $component['value'] ) ? esc_attr( $component['value'] ) : '' ); ?>"
												placeholder="<?php echo ( isset( $component['placeholder'] ) ? esc_attr( $component['placeholder'] ) : '' ); ?>"
												<?php echo esc_attr( ( 'number' === $component['type'] ) ? 'max=10 min=0' : '' ); ?>
												>
											</label>
								<?php } ?>
									<div class="mdc-text-field-helper-line">
										<div class="mdc-text-field-helper-text--persistent wps-helper-text" id="" aria-hidden="true"><?php echo ( isset( $component['description'] ) ? esc_attr( $component['description'] ) : '' ); ?></div>
									</div>
								</div>
							</div>
								<?php
							break;
						case 'multiwithcheck':
							?>
							<div class="wps-form-group wps-isfw-<?php echo esc_attr( $wpg_component['type'] ); ?>">
								<div class="wps-form-group__label">
									<label for="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
									</div>
									<div class="wps-form-group__control">
									<?php
									foreach ( $wpg_component['value'] as $component ) {
										?>
											<label class="mdc-text-field mdc-text-field--outlined">
												<span class="mdc-notched-outline">
													<span class="mdc-notched-outline__leading"></span>
													<span class="mdc-notched-outline__notch">
														<?php if ( 'number' !== $component['type'] ) { ?>
															<span class="mdc-floating-label" id="my-label-id" style=""><?php echo ( isset( $component['placeholder'] ) ? esc_attr( $component['placeholder'] ) : '' ); ?></span>
														<?php } ?>
													</span>
													<span class="mdc-notched-outline__trailing"></span>
												</span>
												<input type="checkbox" class="wpg-multi-checkbox" name="<?php echo ( isset( $component['checkbox_name'] ) ? esc_attr( $component['checkbox_name'] ) : '' ); ?>" id="<?php echo ( isset( $component['checkbox_id'] ) ? esc_attr( $component['checkbox_id'] ) : '' ); ?>" <?php checked( ( isset( $component['checkbox_value'] ) ? $component['checkbox_value'] : '' ), 'yes' ); ?> value="yes">
												<input 
												class="mdc-text-field__input <?php echo ( isset( $component['class'] ) ? esc_attr( $component['class'] ) : '' ); ?>" 
												name="<?php echo ( isset( $component['name'] ) ? esc_html( $component['name'] ) : esc_html( $component['id'] ) ); ?>"
												id="<?php echo esc_attr( $component['id'] ); ?>"
												type="<?php echo esc_attr( $component['type'] ); ?>"
												value="<?php echo ( isset( $component['value'] ) ? esc_attr( $component['value'] ) : '' ); ?>"
												placeholder="<?php echo ( isset( $component['placeholder'] ) ? esc_attr( $component['placeholder'] ) : '' ); ?>"
												<?php echo esc_attr( ( 'number' === $component['type'] ) ? 'max=10 min=0' : '' ); ?>
												>
											</label>
								<?php } ?>
									<div class="mdc-text-field-helper-line">
										<div class="mdc-text-field-helper-text--persistent wps-helper-text" id="" aria-hidden="true"><?php echo ( isset( $component['description'] ) ? esc_attr( $component['description'] ) : '' ); ?></div>
									</div>
								</div>
							</div>
								<?php
							break;
						case 'color':
						case 'date':
						case 'file':
							?>
							<div class="wps-form-group wps-isfw-<?php echo esc_attr( $wpg_component['type'] ); ?>">
								<div class="wps-form-group__label">
									<label for="<?php echo esc_attr( $wpg_component['id'] ); ?>" class="wps-form-label"><?php echo ( isset( $wpg_component['title'] ) ? esc_html( $wpg_component['title'] ) : '' ); ?></label>
								</div>
								<div class="wps-form-group__control">
									<label class="mdc-text-field mdc-text-field--outlined">
										<input 
										class="<?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>" 
										name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
										id="<?php echo esc_attr( $wpg_component['id'] ); ?>"
										type="<?php echo esc_attr( $wpg_component['type'] ); ?>"
										value="<?php echo ( isset( $wpg_component['value'] ) ? esc_attr( $wpg_component['value'] ) : '' ); ?>"
										<?php echo esc_html( ( 'date' === $wpg_component['type'] ) ? 'max=' . gmdate( 'Y-m-d', strtotime( gmdate( 'Y-m-d', mktime() ) . ' + 365 day' ) ) . ' min=' . gmdate( 'Y-m-d' ) : '' ); ?>
										>
									</label>
									<div class="mdc-text-field-helper-line">
										<div class="mdc-text-field-helper-text--persistent wps-helper-text" id="" aria-hidden="true"><?php echo ( isset( $wpg_component['description'] ) ? esc_attr( $wpg_component['description'] ) : '' ); ?></div>
									</div>
								</div>
							</div>
							<?php
							break;

						case 'submit':
							?>
						<tr valign="top">
							<td scope="row">
								<input type="submit" class="button button-primary" 
								name="<?php echo ( isset( $wpg_component['name'] ) ? esc_html( $wpg_component['name'] ) : esc_html( $wpg_component['id'] ) ); ?>"
								id="<?php echo esc_attr( $wpg_component['id'] ); ?>"
								class="<?php echo ( isset( $wpg_component['class'] ) ? esc_attr( $wpg_component['class'] ) : '' ); ?>"
								value="<?php echo esc_attr( $wpg_component['button_text'] ); ?>"
								/>
							</td>
						</tr>
							<?php
							break;
						case 'upload-button':
							?>
								<div class="wps-form-group <?php echo esc_attr( isset( $wpg_component['parent-class'] ) ? $wpg_component['parent-class'] : '' ); ?>">
								<div class="wps-form-group__label">
									<label for="<?php echo esc_attr( array_key_exists( 'id', $wpg_component ) ? $wpg_component['id'] : '' ); ?>" class="wps-form-label"><?php echo esc_html( array_key_exists( 'title', $wpg_component ) ? $wpg_component['title'] : '' ); ?></label>
								</div>
								<div class="wps-form-group__control">
									<input
									type="hidden"
									id="<?php echo esc_attr( array_key_exists( 'id', $wpg_component ) ? $wpg_component['id'] : '' ); ?>"
									class="<?php echo esc_attr( array_key_exists( 'class', $wpg_component ) ? $wpg_component['class'] : '' ); ?>"
									name="<?php echo esc_attr( array_key_exists( 'name', $wpg_component ) ? $wpg_component['name'] : '' ); ?>"
									value="<?php echo esc_html( array_key_exists( 'value', $wpg_component ) ? $wpg_component['value'] : '' ); ?>"
									>
									<img
										src="<?php echo esc_attr( $wpg_component['img-tag']['img-src'] ); ?>"
										class="<?php echo esc_attr( $wpg_component['img-tag']['img-class'] ); ?>"
										id="<?php echo esc_attr( $wpg_component['img-tag']['img-id'] ); ?>"
										style="<?php echo esc_attr( $wpg_component['img-tag']['img-style'] ); ?>"
									>
									<button class="mdc-button--raised" name="<?php echo esc_attr( array_key_exists( 'sub_name', $wpg_component ) ? $wpg_component['sub_name'] : '' ); ?>"
										id="<?php echo esc_attr( array_key_exists( 'sub_id', $wpg_component ) ? $wpg_component['sub_id'] : '' ); ?>"> <span class="mdc-button__ripple"></span>
										<span class="mdc-button__label"><?php echo esc_attr( array_key_exists( 'button_text', $wpg_component ) ? $wpg_component['button_text'] : '' ); ?></span>
									</button>
									<button class="mdc-button--raised" name="<?php echo esc_attr( $wpg_component['img-remove']['btn-name'] ); ?>"
										id="<?php echo esc_attr( $wpg_component['img-remove']['btn-id'] ); ?>"
										style="<?php echo esc_attr( $wpg_component['img-remove']['btn-style'] ); ?>"
										> <span class="mdc-button__ripple"
										></span>
										<span class="mdc-button__label"><?php echo esc_attr( $wpg_component['img-remove']['btn-title'] ); ?></span>
									</button>
									<input
									type="hidden"
									id="<?php echo ( isset( $wpg_component['img-hidden'] ) ) ? esc_attr( $wpg_component['img-hidden']['id'] ) : ''; ?>"
									class="<?php echo ( isset( $wpg_component['img-hidden'] ) ) ? esc_attr( $wpg_component['img-hidden']['class'] ) : ''; ?>"
									name="<?php echo ( isset( $wpg_component['img-hidden'] ) ) ? esc_attr( $wpg_component['img-hidden']['name'] ) : ''; ?>"
									>
									<div class="mdc-text-field-helper-line">
										<div class="mdc-text-field-helper-text--persistent wps-helper-text" id="" aria-hidden="true"><?php echo ( isset( $wpg_component['description'] ) ? esc_attr( $wpg_component['description'] ) : '' ); ?></div>
									</div>
								</div>
							</div>
								<?php
							break;

						default:
							break;
					}
				}
			}
		}
	}

	/**
	 * Check license validity.
	 *
	 * @since 3.0.0
	 * @return bool
	 */
	public static function check_lcns_validity() {
		$wps_wpg_lcns_key    = get_option( 'wps_wpg_license_key', '' );
		$wps_wpg_lcns_status = get_option( 'wps_wpg_license_check', '' );
		if ( $wps_wpg_lcns_key && true == $wps_wpg_lcns_status ) { // phpcs:ignore
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Check days left in license expiration.
	 *
	 * @since 3.0.0
	 * @return int
	 */
	public static function check_lcns_initial_days() {
		$thirty_days  = get_option( 'wps_wpg_activated_timestamp', 0 );
		$current_time = current_time( 'timestamp' ); // phpcs:ignore
		$day_count    = ( $thirty_days - $current_time ) / ( 24 * 60 * 60 );
		return $day_count;
	}
}
