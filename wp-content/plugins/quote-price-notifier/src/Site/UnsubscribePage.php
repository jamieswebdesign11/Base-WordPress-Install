<?php

namespace Artio\QuotePriceNotifier\Site;

use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;
use Artio\QuotePriceNotifier\Filesystem\Paths;
use Artio\QuotePriceNotifier\PriceWatcher\UnsubscribeHash;
use Artio\QuotePriceNotifier\Settings;
use WC_Product;
use WP_Post;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Handles required Unsubscribe page functionality
 */
class UnsubscribePage {

	const SHORTCODE = 'qpn_unsubscribe_price_watch';

	/**
	 * Settings
	 *
	 * @var Settings
	 */
	private $settings;

	/**
	 * Unsubscribe hash generator
	 *
	 * @var UnsubscribeHash
	 */
	private $hashing;

	/**
	 * Files paths helper
	 *
	 * @var Paths
	 */
	private $paths;

	/**
	 * Constructor
	 *
	 * @param Settings $settings
	 * @param UnsubscribeHash $hashing
	 * @param Paths $paths
	 */
	public function __construct( Settings $settings, UnsubscribeHash $hashing, $paths) {
		$this->settings = $settings;
		$this->hashing = $hashing;
		$this->paths = $paths;
	}

	/**
	 * Registers required WP hooks
	 */
	public function register() {
		// Display notice for selected page
		add_filter('display_post_states', function( $postSates, $post) {
			return $this->addNoticeToPage($postSates, $post);
		}, 10, 2);

		// Generate HTML for unsubscribe page shortcode
		add_shortcode(self::SHORTCODE, function() {
 return $this->processPage();
		});
	}

	/**
	 * Displays notice in admin pages list next to selected Unsubscribe page
	 *
	 * @param array $postStates
	 * @param WP_Post $post
	 * @return array
	 */
	protected function addNoticeToPage( array $postStates, WP_Post $post) {
		$pageId = $this->settings->getUnsubscribePageId();
		if ($pageId && $post->ID == $pageId) {
			$postStates[] = __('Unsubscribe Price Watch page, do not delete', 'quote-price-notifier');
		}

		return $postStates;
	}

	/**
	 * Checks if valid Unsubscribe page is already created or creates it otherwise
	 */
	public function createPageIfNeeded() {
		if ($this->isValidPageSet()) {
			return;
		}

		if ($this->isValidPageFound()) {
			return;
		}

		$this->createValidPage();
	}

	/**
	 * Checks whether a valid published page is set in settings
	 *
	 * @return bool
	 */
	protected function isValidPageSet() {
		$pageId = $this->settings->getUnsubscribePageId();
		if ($pageId > 0) {
			$page = get_post($pageId);

			if ($page && 'page' === $page->post_type && !in_array($page->post_status, ['pending', 'trash', 'future', 'auto-draft'], true)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Searches for valid Unsubscribe page and sets it to settings if found
	 *
	 * @return bool
	 */
	protected function isValidPageFound() {
		global $wpdb;

		$pageId = (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT ID FROM {$wpdb->posts}
				WHERE post_type = 'page'
				  AND post_status NOT IN ('pending', 'trash', 'future', 'auto-draft')
				  AND post_content LIKE %s
				LIMIT 1",
				'%[' . self::SHORTCODE . ']%'
			)
		);

		if ($pageId > 0) {
			update_option(Settings::UNSUBSCRIBE_PAGE_ID, $pageId);
			return true;
		}

		return false;
	}

	/**
	 * Creates new Unsubscribe page with our shortcode and sets it to settings
	 */
	protected function createValidPage() {
		$pageData = [
			'post_type' => 'page',
			'post_status' => 'publish',
			'post_author' => 1,
			'post_title' => __('Unsubscribe Price Watch', 'quote-price-notifier'),
			'post_name' => __('unsubscribe-price-watch', 'quote-price-notifier'),
			'post_content' => '[' . self::SHORTCODE . ']',
			'post_parent' => 0,
			'comment_status' => 'closed',
			'ping_status' => 'closed',
			'post_category' => [1],
		];
		$pageId = wp_insert_post($pageData);
		$pageId = is_numeric($pageId) ? (int) $pageId : 0;
		if ($pageId > 0) {
			update_option(Settings::UNSUBSCRIBE_PAGE_ID, $pageId);
		}
	}

	/**
	 * Processes the unsubscribe page and returns HTML code to display
	 *
	 * @return string
	 */
	protected function processPage() {
		$email = ( isset($_REQUEST['email']) && is_string($_REQUEST['email']) ) ? trim(sanitize_email($_REQUEST['email'])) : null;
		$productId = ( isset($_REQUEST['product_id']) && is_numeric($_REQUEST['product_id']) ) ? (int) $_REQUEST['product_id'] : null;
		$hash = ( isset($_REQUEST['hash']) && is_string($_REQUEST['hash']) ) ? trim(wp_strip_all_tags($_REQUEST['hash'])) : null;

		if (!$email) {
			return $this->getErrorHtml(__('No e-mail address specified.', 'quote-price-notifier'));
		}

		if ($hash !== $this->hashing->getHash($email, $productId)) {
			return $this->getErrorHtml(__('Hash value doesn\'t match, please check that the page link is correct.', 'quote-price-notifier'));
		}

		$product = null;
		if ($productId) {
			$product = wc_get_product($productId);
			if (!$product) {
				return $this->getErrorHtml(__('Specified product doesn\'t exist.', 'quote-price-notifier'));
			}
		}

		// Unsubscribe
		$collection = new PriceWatchCollection();
		if (!$collection->deactivate($email, $productId)) {
			return $this->getErrorHtml(__('An error has occured while unsubscribing your e-mail address. Please, try again later.', 'quote-price-notifier'));
		}

		return $this->getSuccessHtml($email, $product);
	}

	/**
	 * Returns HTML for given error message
	 *
	 * @param string $message
	 * @return string
	 */
	protected function getErrorHtml( $message) {
		return wc_get_template_html(
			'unsubscribe/error.php',
			[
				'message' => $message,
			],
			'',
			$this->paths->getTemplatesDir()
		);
	}

	/**
	 * Returns HTML for successful unsubscribe
	 *
	 * @param string $email
	 * @param WC_Product|null $product
	 * @return string
	 */
	protected function getSuccessHtml( $email, $product) {
		return wc_get_template_html(
			'unsubscribe/success.php',
			[
				'email' => $email,
				'product' => $product,
			],
			'',
			$this->paths->getTemplatesDir()
		);
	}
}
