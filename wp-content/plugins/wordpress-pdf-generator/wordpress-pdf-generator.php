<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://wpswings.com/
 * @since             1.0.0
 * @package           Wordpress_Pdf_Generator
 *
 * @wordpress-plugin
 * Plugin Name:       PDF Generator For WP Pro
 * Plugin URI:        https://wpswings.com/product/pdf-generator-for-wp-pro/?utm_source=wpswings-pdf-product&utm_medium=pdf-pro-backend&utm_campaign=product-page
 * Description:       PDF Generator For WP Pro assists you in converting your pages, products, or posts into PDF format, enabling easy sharing across channels and offline access.
 * Version:           3.0.5
 * Author:            WP Swings
 * Author URI:        https://wpswings.com/?utm_source=wpswings-official&utm_medium=pdf-pro-backend&utm_campaign=official
 * Text Domain:       wordpress-pdf-generator
 * Domain Path:       /languages
 *
 * Requires at least:    4.6
 * Tested up to:         5.9.2
 * WC requires at least: 4.0.0
 * WC tested up to:      6.3.1
 * Stable tag:           3.0.5
 * Requires PHP:         7.2
 * License:              Software License Agreement
 * License URI:          https://wpswings.com/license-agreement.txt
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}


require_once ABSPATH . '/wp-admin/includes/plugin.php';
$wpg_old_org_exist = false;
$plug           = get_plugins();
if ( isset( $plug['pdf-generator-for-wp/pdf-generator-for-wp.php'] ) ) {
	if ( version_compare( $plug['pdf-generator-for-wp/pdf-generator-for-wp.php']['Version'], '1.0.6', '<' ) ) {
		$wpg_old_org_exist = true;
	}
}

$active_plugins = array_merge( get_option( 'active_plugins', array() ), get_site_option( 'active_sitewide_plugins', array() ) );
if ( in_array( 'pdf-generator-for-wp/pdf-generator-for-wp.php', $active_plugins, true ) || array_key_exists( 'pdf-generator-for-wp/pdf-generator-for-wp.php', $active_plugins ) ) {
	wps_wpg_run_current_plugin();

} else {
	wpg_dependency_checkup();
}

/**
 * Checking dependency for woocommerce plugin.
 *
 * @return void
 */
function wpg_dependency_checkup() {
	add_action( 'admin_init', 'wpg_deactivate_child_plugin' );
	add_action( 'admin_notices', 'wpg_show_admin_notices' );
}
/**
 * Deactivating child plugin.
 *
 * @return void
 */
function wpg_deactivate_child_plugin() {
	deactivate_plugins( plugin_basename( __FILE__ ) );
}
/**
 * Showing admin notices.
 *
 * @since 3.0.0
 * @return void
 */
function wpg_show_admin_notices() {

	require_once 'wps-wpg-auto-download-free.php';
	wps_wpg_run_current_plugin();
	$wpg_child_plugin  = __( 'PDF Generator For WP Pro', 'wordpress-pdf-generator' );
		$wpg_parent_plugin = __( 'PDF Generator for Wp', 'wordpress-pdf-generator' );

	$response_free_download = wpg_replace_plugin();
	if ( ! $response_free_download ) {
		$wpg_child_plugin  = __( 'PDF Generator For WP Pro', 'wordpress-pdf-generator' );
		$wpg_parent_plugin = __( 'PDF Generator for Wp', 'wordpress-pdf-generator' );
		echo '<div class="notice notice-error is-dismissible"><p>'
			/* translators: %s dependency checks */
			. sprintf( esc_html__( '%1$s requires %2$s to function correctly. Please activate %2$s before activating %1$s. For now, the plugin has been deactivated.', 'wordpress-pdf-generator' ), '<strong>' . esc_html( $wpg_child_plugin ) . '</strong>', '<strong>' . esc_html( $wpg_parent_plugin ) . '</strong>' )
			. '</p></div>';
		if ( isset( $_GET['activate'] ) ) { // phpcs:ignore
			unset( $_GET['activate'] ); //phpcs:ignore
		}
	} else {
		echo '<div class="notice notice-error is-dismissible"><p>'
		/* translators: %s dependency checks */
		. sprintf( esc_html__( '%1$s requires %2$s to function correctly. Please deactivate %1$s before deactivating %2$s.', 'wordpress-pdf-generator' ), '<strong>' . esc_html( $wpg_child_plugin ) . '</strong>', '<strong>' . esc_html( $wpg_parent_plugin ) . '</strong>' )
		. '</p></div>';
	}
}

// ================================= Plugin Main Functions ================================

/**
 * Define plugin constants.
 *
 * @since 3.0.0
 */
function define_wordpress_pdf_generator_constants() {
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_VERSION', '3.0.5' );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_DIR_PATH', plugin_dir_path( __FILE__ ) );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_DIR_URL', plugin_dir_url( __FILE__ ) );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_SERVER_URL', 'https://wpswings.com' );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_ITEM_REFERENCE', 'PDF Generator For WP Pro' );
}

/**
 * Callable function for defining plugin constants.
 *
 * @param string $key    Key for contant.
 * @param string $value   value for contant.
 * @since   3.0.0
 */
function wordpress_pdf_generator_constants( $key, $value ) {
	if ( ! defined( $key ) ) {
		define( $key, $value );
	}
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wordpress-pdf-generator-activator.php
 *
 * @param boolean $network_wide either network activated or not.
 * @since 3.0.0
 * @return void
 */
function activate_wordpress_pdf_generator( $network_wide ) {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wordpress-pdf-generator-activator.php';
	WordPress_Pdf_Generator_Activator::wordpress_pdf_generator_activate( $network_wide );
	$wps_wpg_active_plugin                            = get_option( 'wps_all_plugins_active', array() );
	$wps_wpg_active_plugin['wordpress-pdf-generator'] = array(
		'plugin_name' => __( 'PDF Generator For WP Pro', 'wordpress-pdf-generator' ),
		'active'      => '1',
	);
	update_option( 'wps_all_plugins_active', $wps_wpg_active_plugin );
	if ( ! wp_next_scheduled( 'wps_wpg_check_license_daily' ) ) {
		wp_schedule_event( time(), 'daily', 'wps_wpg_check_license_daily' );
	}
}

/**
 * Update default values on new site creation.
 *
 * @param object $new_site current new blog object.
 * @since 3.0.2
 * @return void
 */
function wps_wpg_update_option_value_new_site_creation( $new_site ) {
	if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
		require_once ABSPATH . '/wp-admin/includes/plugin.php';
	}
	if ( is_plugin_active_for_network( 'wordpress-pdf-generator/wordpress-pdf-generator.php' ) ) {
		$blog_id            = $new_site->blog_id;
		$wps_license_code   = get_option( 'wps_wpg_license_key' );
		$wps_license_status = get_option( 'wps_wpg_license_check' );
		switch_to_blog( $blog_id );
		update_option( 'wps_wpg_license_key', $wps_license_code );
		update_option( 'wps_wpg_license_check', $wps_license_status );
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-wordpress-pdf-generator-activator.php';
		WordPress_Pdf_Generator_Activator::wpg_create_database_table_on_activation();
		WordPress_Pdf_Generator_Activator::wpg_update_option_table_for_pro_settings();
		$wps_wpg_active_plugin                            = get_option( 'wps_all_plugins_active', array() );
		$wps_wpg_active_plugin['wordpress-pdf-generator'] = array(
			'plugin_name' => __( 'PDF Generator For WP Pro', 'wordpress-pdf-generator' ),
			'active'      => '1',
		);
		update_option( 'wps_all_plugins_active', $wps_wpg_active_plugin );
		if ( ! wp_next_scheduled( 'wps_wpg_check_license_daily' ) ) {
			wp_schedule_event( time(), 'daily', 'wps_wpg_check_license_daily' );
		}
		restore_current_blog();
	}
}

add_action( 'wp_initialize_site', 'wps_wpg_update_option_value_new_site_creation', 900 );

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wordpress-pdf-generator-deactivator.php
 */
function deactivate_wordpress_pdf_generator() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wordpress-pdf-generator-deactivator.php';
	WordPress_Pdf_Generator_Deactivator::wordpress_pdf_generator_deactivate();
	$wps_wpg_deactive_plugin = get_option( 'wps_all_plugins_active', false );
	if ( is_array( $wps_wpg_deactive_plugin ) && ! empty( $wps_wpg_deactive_plugin ) ) {
		foreach ( $wps_wpg_deactive_plugin as $wps_wpg_deactive_key => $wps_wpg_deactive ) {
			if ( 'wordpress-pdf-generator' === $wps_wpg_deactive_key ) {
				$wps_wpg_deactive_plugin[ $wps_wpg_deactive_key ]['active'] = '0';
			}
		}
	}
	update_option( 'wps_all_plugins_active', $wps_wpg_deactive_plugin );
}

/**
 * Auto update function from WP Swings site.
 *
 * @since 3.0.0
 * @return void
 */
function auto_update_wordpress_pdf_generator() {
	$wps_wpg_license_key = get_option( 'wps_wpg_license_key', '' );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_SPECIAL_SECRET_KEY', '59f32ad2f20102.74284991' );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_LICENSE_SERVER_URL', 'https://wpswings.com' );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_ITEM_REFERENCE', 'PDF Generator For WP Pro' );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_BASE_FILE', __FILE__ );
	wordpress_pdf_generator_constants( 'WORDPRESS_PDF_GENERATOR_LICENSE_KEY', $wps_wpg_license_key );
	require_once 'class-wps-wordpress-pdf-generator-update.php';
}

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since 3.0.0
 */
function run_wordpress_pdf_generator() {
	define_wordpress_pdf_generator_constants();
	auto_update_wordpress_pdf_generator();
	$wpg_plugin_standard = new WordPress_Pdf_Generator();
	$wpg_plugin_standard->wpg_run();
	$GLOBALS['wpg_wps_wpg_obj'] = $wpg_plugin_standard;
}

/**
 * Settings link.
 *
 * @since 3.0.0
 * @param array $links Settings link array.
 */
function wordpress_pdf_generator_settings_link( $links ) {
	$my_link = array(
		'<a href="' . admin_url( 'admin.php?page=pdf_generator_for_wp_menu' ) . '">' . __( 'Settings', 'wordpress-pdf-generator' ) . '</a>',
	);
	return array_merge( $my_link, $links );
}

/**
 * Adding custom setting links at the plugin activation list.
 *
 * @param array  $links_array array containing the links to plugin.
 * @param string $plugin_file_name plugin file name.
 * @return array
 */
function wordpress_pdf_generator_custom_settings_at_plugin_tab( $links_array, $plugin_file_name ) {
	if ( strpos( $plugin_file_name, basename( __FILE__ ) ) ) {
		$links_array[] = '<a href="https://demo.wpswings.com/pdf-generator-for-wp-pro/?utm_source=wpswings-pdf-demo&utm_medium=pdf-pro-backend&utm_campaign=view-demo" target="_blank"><img src="' . esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL ) . 'admin/src/images/Demo.svg" class="wps-info-img" alt="Demo image" style="width: 20px;height: 20px;padding-right:2px;">' . __( 'Demo', 'wordpress-pdf-generator' ) . '</a>';
		$links_array[] = '<a href="https://docs.wpswings.com/pdf-generator-for-wp-pro/?utm_source=wpswings-pdf-docs&utm_medium=pdf-pro-backend&utm_campaign=documentation" target="_blank"><img src="' . esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL ) . 'admin/src/images/Documentation.svg" class="wps-info-img" alt="documentation image" style="width: 20px;height: 20px;padding-right:2px;">' . __( 'Documentation', 'wordpress-pdf-generator' ) . '</a>';
		$links_array[] = '<a href="https://support.wpswings.com/?utm_source=wpswings-pdf-support&utm_medium=pdf-pro-backend&utm_campaign=support" target="_blank"><img src="' . esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL ) . 'admin/src/images/Support.svg" class="wps-info-img" alt="support image" style="width: 20px;height: 20px;padding-right:2px;">' . __( 'Support', 'wordpress-pdf-generator' ) . '</a>';
	}
	return $links_array;
}


/**
 * Run current plugin all hooks.
 *
 * @since 3.0.1
 * @return void
 */
function wps_wpg_run_current_plugin() {
	register_activation_hook( __FILE__, 'activate_wordpress_pdf_generator' );
	register_deactivation_hook( __FILE__, 'deactivate_wordpress_pdf_generator' );
	/**
	 * The core plugin class that is used to define internationalization,
	 * admin-specific hooks, and public-facing site hooks.
	 */
	require plugin_dir_path( __FILE__ ) . 'includes/class-wordpress-pdf-generator.php';

	run_wordpress_pdf_generator();

	// Add settings link on plugin page.
	add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'wordpress_pdf_generator_settings_link' );
	add_filter( 'plugin_row_meta', 'wordpress_pdf_generator_custom_settings_at_plugin_tab', 10, 2 );
	add_action( 'admin_notices', 'wps_wpg_pro_migrate_notice', 99 );

}
// Upgrade notice code.



/**
 * Migration to new domain notice on main dashboard notice.
 */
function wps_wpg_pro_migrate_notice() {
	// phpcs:disable WordPress.Security.NonceVerification.Recommended
	$tab = isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : '';
	global $wpg_old_org_exist;
	if ( $wpg_old_org_exist ) {
		require_once 'wps-wpg-auto-download-free.php';
		wpg_replace_plugin();
	}
}
// Ending noticed code .
