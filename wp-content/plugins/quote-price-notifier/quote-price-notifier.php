<?php
/**
 * Plugin Name: Quote & Price Notifier
 * Plugin URI: http://www.artio.net/e-shop/wordpress-extensions/quote-price-notifier
 * Description: Quote & Price Notifier lets your customers request a quote or subscribe for price changes notifications directly from your shop's product detail page. You can enable both features for your customers or only one of them. Both support simple, variable and external product types.
 * Version: 1.0.0
 * Author: Lukas Bialon
 * Author URI: http://www.artio.net/
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: quote-price-notifier
 * Domain Path: /languages
 * Requires at least: 4.9
 * Requires PHP: 5.6
 * WC requires at least: 3.8.0
 * WC tested up to: 4.3.0
 * Woo: 8482051:2e1af8911f2579561081df2a61948aa0
 */

/**
 * Main plugin entry file. This file is intentionally written to support
 * at least PHP 5.2, so it doesn't cause white page when accidentally installed
 * on older system. The actual requirements are checked before running actual plugin code.
 */

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to display admin messages
 */
class QuotePriceNotifierAdminMessage {

	/**
	 * Admin messages
	 *
	 * @var array
	 */
	private static $messages = array();

	/**
	 * Whether initialized
	 *
	 * @var bool
	 */
	private static $inited = false;

	/**
	 * Checks if we're in admin, registers callback for messages rendering
	 * and stores given message
	 *
	 * @param string $message
	 * @param string $type One of "error", "warning", "success", "info"
	 */
	public static function add( $message, $type = 'info') {
		if (!is_admin()) {
			return;
		}

		self::init();
		self::$messages[] = array($message, $type);
	}

	/**
	 * Registers callback for rendering the messages (only once)
	 */
	private static function init() {
		if (!self::$inited) {
			add_action('admin_notices', array(__CLASS__, 'render'));
			self::$inited = true;
		}
	}

	/**
	 * Renders stored messages
	 */
	public static function render() {
		foreach (self::$messages as $message) {
			?>
			<div class="notice notice-<?php echo esc_attr($message[1]); ?>">
				<p><?php echo esc_html($message[0]); ?></p>
			</div>
			<?php
		}
	}

	/**
	 * Stores current messages in a transient
	 */
	public static function store() {
		if (self::$messages) {
			set_transient('qpn_admin_messages', self::$messages, 60);
		}
	}

	/**
	 * Loads stored messages
	 */
	public static function load() {
		$messages = get_transient('qpn_admin_messages');
		if ($messages) {
			self::init();
			self::$messages = array_merge(self::$messages, $messages);
			delete_transient('qpn_admin_messages');
		}
	}
}

/**
 * Used to check required versions and initialize plugin
 */
class QuotePriceNotifierBootstrap {

	const MIN_PHP_VERSION = '5.6.0';
	const MIN_WP_VERSION = '4.9.0';
	const MIN_WC_VERSION = '3.8.0';

	/**
	 * Determines whether WooCommerce plugin is active
	 *
	 * @return bool
	 */
	private static function isWooCommerceActive() {
		return class_exists('WooCommerce');
	}

	/**
	 * Determines whether actual version is at least minimum required version,
	 * displays given error message if it isn't.
	 *
	 * @param string $requiredVersion
	 * @param string $actualVersion
	 * @param string $errorMessage Localized error message with placeholders for sprintf(), where indexes are:
	 * 1 for required version
	 * 2 for actual version
	 *
	 * @return bool
	 */
	private static function checkVersion( $requiredVersion, $actualVersion, $errorMessage) {
		if (version_compare($actualVersion, $requiredVersion) < 0) {
			$msg = sprintf(
				$errorMessage,
				$requiredVersion,
				$actualVersion
			);
			QuotePriceNotifierAdminMessage::add($msg, 'error');
			return false;
		}
		return true;
	}

	/**
	 * Determines whether minimum required PHP version is available,
	 * displays error message if it isn't
	 *
	 * @return bool
	 */
	private static function checkPhpSupport() {
		preg_match('/^[0-9.]+/', PHP_VERSION, $match);
		$phpVersion = $match[0];

		return self::checkVersion(
			self::MIN_PHP_VERSION,
			$phpVersion,
			/* translators: %1$s: Required PHP version; %2$s: Current PHP version */
			__('Quote & Price Notifier requires PHP version at least %1$s but there is only %2$s installed!', 'quote-price-notifier')
		);
	}

	/**
	 * Determines whether minimum required WordPress version is available,
	 * displays error message if it isn't
	 *
	 * @return bool
	 */
	private static function checkWordPressSupport() {
		$wpVersion = get_bloginfo('version');

		return self::checkVersion(
			self::MIN_WP_VERSION,
			$wpVersion,
			/* translators: %1$s: Required WordPress version; %2$s: Current WordPress version */
			__('Quote & Price Notifier requires WordPress version at least %1$s but there is only %2$s installed!', 'quote-price-notifier')
		);
	}

	/**
	 * Determines whether minimum required WooCommerce version is available,
	 * displays error message if it isn't
	 *
	 * @return bool
	 */
	private static function checkWooCommerceSupport() {
		$wc = WooCommerce::instance();
		$wcVersion = $wc->version;

		return self::checkVersion(
			self::MIN_WC_VERSION,
			$wcVersion,
			/* translators: %1$s: Required WooCommerce version; %2$s: Current WooCommerce version */
			__('Quote & Price Notifier requires WooCommerce version at least %1$s but there is only %2$s installed!', 'quote-price-notifier')
		);
	}

	/**
	 * Loads language file for current locale
	 */
	private static function loadLanguage() {
		$langDir = trailingslashit(dirname(plugin_basename(__FILE__))) . 'languages';
		load_plugin_textdomain('quote-price-notifier', false, $langDir);
	}

	/**
	 * Returns cached plugin instance, checks required versions
	 * before instantiating the plugin for the first time
	 *
	 * @return \Artio\QuotePriceNotifier\Plugin|false
	 */
	private static function getPlugin() {
		static $plugin = null;

		if (is_null($plugin)) {
			$plugin = false;

			self::loadLanguage();

			// Don't short-circuit, so all error messages get displayed at once
			$checks = array(
				self::checkPhpSupport(),
				self::checkWordPressSupport(),
				self::checkWooCommerceSupport()
			);
			if (in_array(false, $checks, true)) {
				return $plugin;
			}

			// Instantiate plugin
			if (is_readable(__DIR__ . '/vendor/autoload.php')) {
				require(__DIR__ . '/vendor/autoload.php');
			}
			// Instantiate from string, so the code can be parsed by PHP 5.2
			$factoryClass = 'Artio\\QuotePriceNotifier\\Factory';
			$pluginClass = 'Artio\\QuotePriceNotifier\\Plugin';
			$factory = new $factoryClass(__FILE__);
			$plugin = new $pluginClass($factory);
		}

		return $plugin;
	}

	/**
	 * Called when the plugin is activated
	 */
	public static function activate() {
		$plugin = self::getPlugin();
		if (!$plugin) {
			return;
		}

		$plugin->activate();
	}

	/**
	 * Instantiates and runs the plugin
	 */
	public static function run() {
		if (!self::isWooCommerceActive()) {
			return;
		}

		$plugin = self::getPlugin();
		if (!$plugin) {
			return;
		}

		$plugin->run();
	}
}

register_activation_hook(__FILE__, array('QuotePriceNotifierBootstrap', 'activate'));

add_action('plugins_loaded', array('QuotePriceNotifierBootstrap', 'run'));
