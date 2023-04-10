<?php

namespace Artio\QuotePriceNotifier\Email;

use Artio\QuotePriceNotifier\Db\Model\PriceWatchNotification;
use Artio\QuotePriceNotifier\PriceWatcher\UnsubscribeHash;
use WC_Email;
use WC_Emails;

if (!defined('ABSPATH')) {
exit;
}

require_once WP_PLUGIN_DIR . '/woocommerce/includes/emails/class-wc-email.php';

/**
 * PriceWatchNotification email
 *
 * @property PriceWatchNotification $object
 */
class PriceWatchNotificationMail extends WC_Email {

	/**
	 * Unsubscribe page ID
	 *
	 * @var int
	 */
	private $unsubscribePageId;

	/**
	 * Unsubscribe hash generator
	 *
	 * @var UnsubscribeHash
	 */
	private $hashing;

	/**
	 * Constructor
	 *
	 * @param string $templatesDir
	 * @param int $unsubscribePageId
	 * @param UnsubscribeHash $hashing
	 */
	public function __construct( $templatesDir, $unsubscribePageId, UnsubscribeHash $hashing) {
		$this->id = 'qpn_price_watch_notification';
		$this->customer_email = true;
		$this->title = __('Product price changed notification', 'quote-price-notifier');
		$this->description = __('Sent to all customers subscribed to product price watching when the product\'s price changes.', 'quote-price-notifier');
		$this->template_html = 'emails/price-watch-notification.php';
		$this->template_plain = 'emails/plain/price-watch-notification.php';
		$this->template_base = $templatesDir;
		$this->placeholders = [
			'{customer_name}' => '',
			'{customer_email}' => '',
			'{sku}' => '',
			'{product}' => '',
			'{old_price}' => '',
			'{new_price}' => '',
		];

		parent::__construct();

		$this->manual = false;
		$this->unsubscribePageId = $unsubscribePageId;
		$this->hashing = $hashing;
	}

	/**
	 * Generates unsubscribe URLs for given Price Watch notification
	 *
	 * @param PriceWatchNotification $notification
	 * @return array
	 */
	private function getUnsubscribeUrls( PriceWatchNotification $notification) {
		$priceWatch = $notification->getPriceWatch();
		$product = $priceWatch->getProduct();

		$unsubscribeBaseUrl = get_page_link($this->unsubscribePageId);
		$unsubscribeHash = $this->hashing->getHash($priceWatch->get('customer_email'), $product->get_id());
		$unsubscribeAllHash = $this->hashing->getHash($priceWatch->get('customer_email'));

		$unsubscribeUrl = add_query_arg([
			'email' => urlencode($priceWatch->get('customer_email')),
			'product_id' => urlencode($product->get_id()),
			'hash' => urlencode($unsubscribeHash),
		], $unsubscribeBaseUrl);
		$unsubscribeAllUrl = add_query_arg([
			'email' => urlencode($priceWatch->get('customer_email')),
			'hash' => urlencode($unsubscribeAllHash),
		], $unsubscribeBaseUrl);

		return [
			'unsubscribeUrl' => $unsubscribeUrl,
			'unsubscribeAllUrl' => $unsubscribeAllUrl,
		];
	}

	public function get_content_html() {
		return wc_get_template_html(
			$this->template_html,
			array_merge([
				'email_heading' => $this->get_heading(),
				'additional_content' => $this->get_additional_content(),
				'email' => $this,
				'notification' => $this->object,
			], $this->getUnsubscribeUrls($this->object)),
			'',
			$this->template_base
		);
	}

	public function get_content_plain() {
		return wc_get_template_html(
			$this->template_plain,
			array_merge([
				'email_heading' => $this->get_heading(),
				'additional_content' => $this->get_additional_content(),
				'email' => $this,
				'notification' => $this->object,
			], $this->getUnsubscribeUrls($this->object)),
			'',
			$this->template_base
		);
	}

	public function get_default_subject() {
		return esc_html__('[{site_title}]: Price changed for {product}', 'quote-price-notifier');
	}

	public function get_default_heading() {
		return __('Product Price Changed', 'quote-price-notifier');
	}

	/**
	 * Prepares and sends the e-mail if enabled
	 *
	 * @param PriceWatchNotification $notification
	 */
	public function trigger( PriceWatchNotification $notification) {
		if (!$this->is_enabled()) {
			return;
		}

		// Check required data
		$priceWatch = $notification->getPriceWatch();
		$product = $priceWatch ? $priceWatch->getProduct() : null;
		if (!$priceWatch || !$product) {
			return;
		}

		$this->recipient = $priceWatch->get('customer_email');
		if (!$this->get_recipient()) {
			return;
		}

		// Initialize WC_Emails if required, otherwise the default
		// WooCommerce template won't be used
		WC_Emails::instance();

		// Setup
		$this->object = $notification;
		$this->placeholders['{customer_name}'] = $priceWatch->get('customer_name');
		$this->placeholders['{customer_email}'] = $priceWatch->get('customer_email');
		$this->placeholders['{sku}'] = $product->get_sku();
		$this->placeholders['{product}'] = $product->get_name();
		$this->placeholders['{old_price}'] = strip_tags(wc_price($notification->get('old_price')));
		$this->placeholders['{new_price}'] = strip_tags(wc_price($notification->get('new_price')));

		// Send e-mail
		$this->send(
			$this->get_recipient(),
			$this->get_subject(),
			$this->get_content(),
			$this->get_headers(),
			$this->get_attachments()
		);

		// Release references
		$this->object = null;
	}
}
