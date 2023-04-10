<?php
/**
 * The update-specific functionality of the plugin.
 *
 * @author WP Swings <webmaster@wpswings.com>
 * @package Wordpress_Pdf_Generator
 */

/**
 * Replace plugin main function.
 *
 * @return boolean
 */
function wpg_replace_plugin() {
	$plugin_slug        = 'pdf-generator-for-wp/pdf-generator-for-wp.php';
	$plugin_name        = 'Pdf Generator For Wp';
	$plugin_zip         = 'https://downloads.wordpress.org/plugin/pdf-generator-for-wp.zip';
	$current_pro_plugin = 'wordpress-pdf-generator/wordpress-pdf-generator.php';
	if ( wpg_is_plugin_installed( $plugin_slug ) ) {
		wpg_upgrade_plugin( $plugin_slug );
		$installed = true;
	} else {
		$installed = wpg_install_plugin( $plugin_zip );
	}
	if ( ! is_wp_error( $installed ) && $installed ) {
		$status_free = activate_plugin( $plugin_slug );
		if ( ! is_wp_error( $status_free ) ) {
			$status_pro = activate_plugin( $current_pro_plugin );
			if ( is_wp_error( $status_pro ) ) {
				printf(
					wp_kses_post( '<div>%s</div>' ),
					esc_html__( 'Please activate pro plugin once again.', 'wordpress-pdf-generator' )
				);
			} else {
				return true;
			}
		} else {
			printf(
				wp_kses_post( '<div> %1$s %2$s.</div>' ),
				esc_html__( 'please activate', 'wordpress-pdf-generator' ),
				esc_html( $plugin_name )
			);
		}
	} else {
		printf(
			wp_kses_post( '<div>%1$s %2$s %3$s</div>' ),
			esc_html__( 'please install', 'wordpress-pdf-generator' ),
			esc_html( $plugin_name ),
			esc_html__( 'from WordPress before installing the pro plugin.', 'wordpress-pdf-generator' )
		);
	}
	return false;
}

/**
 * Checking if plugin is already installed.
 *
 * @param string $slug string containing the plugin slug.
 * @return boolean
 */
function wpg_is_plugin_installed( $slug ) {
	if ( ! function_exists( 'get_plugins' ) ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
	}
	$all_plugins = get_plugins();
	if ( ! empty( $all_plugins[ $slug ] ) ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Install plugin.
 *
 * @param string $plugin_zip url for the plugin zip file at WordPress.
 * @return boolean
 */
function wpg_install_plugin( $plugin_zip ) {
	include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
	wp_cache_flush();
	$upgrader  = new Plugin_Upgrader();
	$installed = $upgrader->install( $plugin_zip );
	return $installed;
}

/**
 * Upgrade plugin.
 *
 * @param string $plugin_slug string contining the plugin slug.
 * @return boolean
 */
function wpg_upgrade_plugin( $plugin_slug ) {
	include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
	wp_cache_flush();
	$upgrader = new Plugin_Upgrader();
	$upgraded = $upgrader->upgrade( $plugin_slug );
	return $upgraded;
}
