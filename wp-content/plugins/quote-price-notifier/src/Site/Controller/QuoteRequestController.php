<?php

namespace Artio\QuotePriceNotifier\Site\Controller;

use Artio\QuotePriceNotifier\Db\Model\Quote;
use Artio\QuotePriceNotifier\Enum\Hook;
use Artio\QuotePriceNotifier\Enum\QuoteStatus;
use Artio\QuotePriceNotifier\Exception\ModelDataInvalidException;
use Exception;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Controller for handling Quote Request tasks
 */
class QuoteRequestController extends ControllerBase {

	/**
	 * Saves new Quote Request
	 */
	protected function save() {
		check_ajax_referer('qpn-request-quote');

		// Validate inputs
		$name = isset($_POST['name']) ? trim(sanitize_text_field($_POST['name'])) : '';
		$email = isset($_POST['email']) ? trim(sanitize_email($_POST['email'])) : '';
		$qty = isset($_POST['quantity']) ? trim(sanitize_text_field($_POST['quantity'])) : '';
		$productId = isset($_POST['product_id']) ? trim(sanitize_text_field($_POST['product_id'])) : '';
		$qty = is_numeric($qty) ? (int) $qty : 0;
		$productId = is_numeric($productId) ? (int) $productId : 0;

		if (!$name || !$email || $qty <= 0 || $productId <= 0) {
			$this->jsonError(__('Please enter correct data.', 'quote-price-notifier'));
		}

		// Check captcha if enabled
		$settings = $this->factory->getSettings();
		$captcha = $this->factory->getRecaptcha();
		if ($settings->isQuoteRequestsCaptchaEnabled() && $captcha->isActive()) {
			$tokenKey = $captcha->getTokenKey();
			$token = isset($_POST[$tokenKey]) ? wp_strip_all_tags($_POST[$tokenKey]) : null;
			if (!$captcha->validate($token)) {
				$this->jsonError(__('Invalid reCaptcha, please try again.', 'quote-price-notifier'));
			}
		}

		// Create new quote request
		$userId = get_current_user_id();
		$quote = new Quote([
			'product_id' => $productId,
			'quantity' => $qty,
			'customer_email' => $email,
			'customer_name' => $name,
			'customer_id' => $userId ? $userId : null,
			'status' => QuoteStatus::PENDING,
		]);

		try {
			$quote->save();
		} catch (ModelDataInvalidException $e) {
			$this->jsonError($e->getMessage());
		} catch (Exception $e) {
			$this->jsonError(__('Could not save new quote request. Please try again later.', 'quote-price-notifier'));
		}

		// Trigger event
		do_action(Hook::NEW_QUOTE_REQUEST_CREATED, $quote);

		$this->jsonSuccess(__('Your quote request has been received and we will contact you as soon as possible.', 'quote-price-notifier'));
	}
}
