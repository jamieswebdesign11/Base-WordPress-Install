<?php

namespace Artio\QuotePriceNotifier\Email;

use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Http\HttpHeaders;
use WC_Email;
use WC_Emails;

if (!defined('ABSPATH')) {
exit;
}

require_once WP_PLUGIN_DIR . '/woocommerce/includes/emails/class-wc-email.php';

/**
 * NewPriceWatch admin email
 *
 * @property PriceWatch $object
 */
class NewPriceWatchAdminMail extends WC_Email {

	/**
	 * Constructor
	 *
	 * @param string $templatesDir
	 */
	public function __construct( $templatesDir) {
		$this->id = 'qpn_new_price_watch_admin';
		$this->customer_email = false;
		$this->title = __('New product price watch', 'quote-price-notifier');
		$this->description = __('Sent whenever a customer subscribes for a product price watching.', 'quote-price-notifier');
		$this->template_html = 'emails/new-price-watch-admin.php';
		$this->template_plain = 'emails/plain/new-price-watch-admin.php';
		$this->template_base = $templatesDir;
		$this->placeholders = [
			'{sku}' => '',
			'{product}' => '',
		];

		parent::__construct();

		$this->manual = false;
		$this->recipient = $this->get_option('recipient', get_option('admin_email'));
	}

	public function get_content_html() {
		return wc_get_template_html(
			$this->template_html,
			[
				'email_heading' => $this->get_heading(),
				'additional_content' => $this->get_additional_content(),
				'email' => $this,
				'priceWatch' => $this->object,
			],
			'',
			$this->template_base
		);
	}

	public function get_content_plain() {
		return wc_get_template_html(
			$this->template_plain,
			[
				'email_heading' => $this->get_heading(),
				'additional_content' => $this->get_additional_content(),
				'email' => $this,
				'priceWatch' => $this->object,
			],
			'',
			$this->template_base
		);
	}

	public function get_default_subject() {
		return esc_html__('[{site_title}]: New price watch for {product}', 'quote-price-notifier');
	}

	public function get_default_heading() {
		return __('New Price Watch', 'quote-price-notifier');
	}

	/**
	 * Adds Reply-to header to e-mail using specified customer's info
	 *
	 * @param string $header
	 * @param mixed $id
	 * @param PriceWatch $priceWatch
	 * @return string
	 */
	public function addReplyTo( $header, $id, PriceWatch $priceWatch) {
		$fromName = $priceWatch->get('customer_name');
		$fromMail = $priceWatch->get('customer_email');
		if ($fromName && $fromMail) {
			$headers = HttpHeaders::parse($header);
			$headers['Reply-to'] = $fromName . ' <' . $fromMail . '>';
			$header = HttpHeaders::build($headers);
		}

		return $header;
	}

	/**
	 * Prepares and sends the e-mail if enabled
	 *
	 * @param PriceWatch $priceWatch
	 */
	public function trigger( PriceWatch $priceWatch) {
		if (!$this->is_enabled() || !$this->get_recipient()) {
			return;
		}

		// Check required data
		$product = $priceWatch->getProduct();
		if (!$product) {
			return;
		}

		// Initialize WC_Emails if required, otherwise the default
		// WooCommerce template won't be used
		WC_Emails::instance();

		// Setup
		$this->object = $priceWatch;
		$this->placeholders['{sku}'] = $product->get_sku();
		$this->placeholders['{product}'] = $product->get_name();

		add_filter('woocommerce_email_headers', [$this, 'addReplyTo'], 10, 3);

		// Send e-mail
		$this->send(
			$this->get_recipient(),
			$this->get_subject(),
			$this->get_content(),
			$this->get_headers(),
			$this->get_attachments()
		);

		remove_filter('woocommerce_email_headers', [$this, 'addReplyTo']);

		// Release references
		$this->object = null;
	}
}
