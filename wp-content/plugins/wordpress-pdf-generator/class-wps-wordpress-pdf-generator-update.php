<?php
/**
 * The update-specific functionality of the plugin.
 *
 * @author WP Swings <webmaster@wpswings.com>
 * @package Wordpress_Pdf_Generator
 */

if ( ! class_exists( 'Wps_WordPress_Pdf_Generator_Update' ) ) {
	/**
	 * Plugin update class file.
	 */
	class Wps_WordPress_Pdf_Generator_Update {
		/**
		 * Initialize the class and set its properties.
		 *
		 * @since 3.0.0
		 */
		public function __construct() {
			register_activation_hook( WORDPRESS_PDF_GENERATOR_BASE_FILE, array( $this, 'wps_check_activation' ) );
			add_action( 'wps_wordpress_pdf_generator_check_event', array( $this, 'wps_check_update' ) );
			add_filter( 'http_request_args', array( $this, 'wps_updates_exclude' ), 5, 2 );
			register_deactivation_hook( WORDPRESS_PDF_GENERATOR_BASE_FILE, array( $this, 'wps_check_deactivation' ) );
			$plugin_update = get_option( 'wps_wpg_plugin_update', 'false' );
			if ( 'true' === $plugin_update ) {
				// To add view details content in plugin update notice on plugins page.
				add_action( 'install_plugins_pre_plugin-information', array( $this, 'wps_wpg_details' ) );
				// To add plugin update notice after plugin update message.
				add_action( 'in_plugin_update_message-wordpress-pdf-generator/wordpress-pdf-generator.php', array( $this, 'wps_wpg_in_plugin_update_notice' ), 10, 2 );
			}
		}
		/**
		 * Clears the scheduler on deactivation.
		 *
		 * @since 3.0.0
		 */
		public function wps_check_deactivation() {
			wp_clear_scheduled_hook( 'wps_wordpress_pdf_generator_check_event' );
		}
		/**
		 * Schedules the scheduler on activation.
		 *
		 * @since 3.0.0
		 */
		public function wps_check_activation() {
			wp_schedule_event( time(), 'daily', 'wps_wordpress_pdf_generator_check_event' );
		}
		/**
		 * Details and request for updatation.
		 *
		 * @since 3.0.0
		 */
		public function wps_wpg_details() {
			global $tab;
			// change $_REQUEST['plugin] to your plugin slug name.
			if ( 'plugin-information' === $tab && ( isset( $_REQUEST['plugin'] ) && 'wordpress-pdf-generator' === $_REQUEST['plugin'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
				$data = $this->get_plugin_update_data();
				if ( is_wp_error( $data ) || empty( $data ) ) {
					return;
				}
				if ( ! empty( $data['body'] ) ) {
					$all_data = json_decode( $data['body'], true );
					if ( ! empty( $all_data ) && is_array( $all_data ) ) {
						$this->create_html_data( $all_data );
						wp_die();
					}
				}
			}
		}

		/**
		 * Gets the update data for plugin.
		 *
		 * @since 3.0.0
		 */
		public function get_plugin_update_data() {
			// replace with your plugin url.
			$url      = 'https://wpswings.com/pluginupdates/wordpress-pdf-generator/update.php';
			$postdata = array(
				'action'       => 'check_update',
				'license_code' => WORDPRESS_PDF_GENERATOR_LICENSE_KEY,
			);
			$args     = array(
				'method' => 'POST',
				'body'   => $postdata,
			);
			$data     = wp_remote_post( $url, $args );
			return $data;
		}

		/**
		 * Render HTML content.
		 *
		 * @since 3.0.0
		 * @param array $all_data list of data.
		 */
		public function create_html_data( $all_data ) {
			?>
			<style>
				#TB_window{
					top : 4% !important;
				}
				.wps_wpg_banner > img {
					width: 50%;
				}
				.wps_wpg_banner > h1 {
					margin-top: 0px;
				}
				.wps_wpg_banner {
					text-align: center;
				}
				.wps_wpg_description > h4 {
					background-color: #3779B5;
					padding: 5px;
					color: #ffffff;
					border-radius: 5px;
				}
				.wps_wpg_changelog_details > h4 {
					background-color: #3779B5;
					padding: 5px;
					color: #ffffff;
					border-radius: 5px;
				}
			</style>
			<div class="wps_wpg_details_wrapper">
				<div class="wps_wpg_banner">
					<?php
					$value = $all_data['name'] . ' ' . $all_data['version'];
					?>
					<h1>
						<?php echo wp_kses_post( $value ); ?>
					</h1>
					<img src="<?php echo wp_kses_post( $all_data['banners']['logo'] ); ?>">
				</div>
				<div class="wps_wpg_description">
					<h4>
						<?php esc_html_e( 'Plugin Description', 'wordpress-pdf-generator' ); ?>
					</h4>
					<span>
						<?php echo wp_kses_post( $all_data['sections']['description'] ); ?>
					</span>
				</div>
				<div class="wps_wpg_changelog_details">
					<h4>
						<?php esc_html_e( 'Plugin Change Log', 'wordpress-pdf-generator' ); ?>
					</h4>
					<span>
						<?php echo wp_kses_post( $all_data['sections']['changelog'] ); ?>
					</span>
				</div>
			</div>
			<?php
		}
		/**
		 * Render update notice content.
		 *
		 * @since 3.0.0
		 */
		public function wps_wpg_in_plugin_update_notice() {
			$data = $this->get_plugin_update_data();
			if ( is_wp_error( $data ) || empty( $data ) ) {
				return;
			}
			if ( isset( $data['body'] ) ) {
				$all_data = json_decode( $data['body'], true );
				if ( is_array( $all_data ) && ! empty( $all_data['sections']['update_notice'] ) ) {
					?>
					<style type="text/css">
						#wordpress-pdf-generator-update .dummy {
							display: none;
						}
						#wps_wpg_in_plugin_update_div p:before {
							content: none;
						}
						#wps_wpg_in_plugin_update_div {
							border-top: 1px solid #ffb900;
							margin-left: -13px;
							padding-left: 20px;
							padding-top: 10px;
							padding-bottom: 5px;
						}
						#wps_wpg_in_plugin_update_div ul {
							list-style-type: decimal;
							padding-left: 20px;
						}
					</style>
					</p><div id="wps_wpg_in_plugin_update_div"><?php echo wp_kses_post( $all_data['sections']['update_notice'] ); ?></div><p class="dummy">
					<?php
				}
			}
		}
		/**
		 * Checks for the update.
		 *
		 * @since 3.0.0
		 */
		public function wps_check_update() {
			global $wp_version;
			$update_check_wpg = 'https://wpswings.com/pluginupdates/wordpress-pdf-generator/update.php';
			$plugin_folder    = plugin_basename( dirname( WORDPRESS_PDF_GENERATOR_BASE_FILE ) );
			$plugin_file      = basename( ( WORDPRESS_PDF_GENERATOR_BASE_FILE ) );
			if ( defined( 'WP_INSTALLING' ) ) {
				return false;
			}
			$postdata = array(
				'action'      => 'check_update',
				'license_key' => WORDPRESS_PDF_GENERATOR_LICENSE_KEY,
			);
			$args     = array(
				'method' => 'POST',
				'body'   => $postdata,
			);
			$response = wp_remote_post( $update_check_wpg, $args );
			if ( is_wp_error( $response ) || empty( $response['body'] ) ) {
				return;
			}
			list( $version, $url ) = explode( '~', $response['body'] );
			if ( $this->wps_plugin_get( 'Version' ) >= $version ) {
				update_option( 'wps_wpg_plugin_update', 'false' );
				return false;
			}
			update_option( 'wps_wpg_plugin_update', 'true' );
			$plugin_transient = get_site_transient( 'update_plugins' );
			$a                = array(
				'slug'        => $plugin_folder,
				'new_version' => $version,
				'url'         => $this->wps_plugin_get( 'AuthorURI' ),
				'package'     => $url,
			);
			$o                = (object) $a;
			$plugin_transient->response[ $plugin_folder . '/' . $plugin_file ] = $o;
			set_site_transient( 'update_plugins', $plugin_transient );
		}
		/**
		 * Wps_updates_exclude excludes the update.
		 *
		 * @since 3.0.0
		 * @param array  $r array of details.
		 * @param string $url link for the site.
		 */
		public function wps_updates_exclude( $r, $url ) {
			if ( 0 !== strpos( $url, 'http://api.wordpress.org/plugins/update-check' ) ) {
				return $r;
			}
			$plugins = unserialize( $r['body']['plugins'] ); // phpcs:ignore
			if ( ! empty( $plugins->plugins ) ) {
				unset( $plugins->plugins[ plugin_basename( __FILE__ ) ] );
			}
			if ( ! empty( $plugins->active ) ) {
				unset( $plugins->active[ array_search( plugin_basename( __FILE__ ), $plugins->active, true ) ] );
			}
			$r['body']['plugins'] = serialize( $plugins ); // phpcs:ignore
			return $r;
		}
		/**
		 * Returns current plugin info.
		 *
		 * @since 3.0.0
		 * @param string $i index.
		 */
		public function wps_plugin_get( $i ) {
			if ( ! function_exists( 'get_plugins' ) ) {
				require_once ABSPATH . 'wp-admin/includes/plugin.php';
			}
			$plugin_folder = get_plugins( '/' . plugin_basename( dirname( WORDPRESS_PDF_GENERATOR_BASE_FILE ) ) );
			$plugin_file   = basename( ( WORDPRESS_PDF_GENERATOR_BASE_FILE ) );
			return $plugin_folder[ $plugin_file ][ $i ];
		}
	}
	new Wps_WordPress_Pdf_Generator_Update();
}
