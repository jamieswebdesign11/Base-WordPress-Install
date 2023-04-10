<?php

namespace Artio\QuotePriceNotifier\Site\Controller;

use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Enum\Hook;
use Artio\QuotePriceNotifier\Enum\PriceWatchStatus;
use Artio\QuotePriceNotifier\Exception\ModelDataInvalidException;
use Exception;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Controller for handling Price Watch tasks
 */
class PriceWatchController extends ControllerBase {

	/**
	 * Saves new Quote Request
	 */
	protected function save() {
		check_ajax_referer('qpn-watch-price');

		// Validate inputs
		$name = isset($_POST['name']) ? trim(sanitize_text_field($_POST['name'])) : '';
		$email = isset($_POST['email']) ? trim(sanitize_email($_POST['email'])) : '';
		$productId = isset($_POST['product_id']) ? trim(sanitize_text_field($_POST['product_id'])) : '';
		$productId = is_numeric($productId) ? (int) $productId : 0;

		if (!$name || !$email || $productId <= 0) {
			$this->jsonError(__('Please enter correct data.', 'quote-price-notifier'));
		}

		// Check captcha if enabled
		$settings = $this->factory->getSettings();
		$captcha = $this->factory->getRecaptcha();
		if ($settings->isPriceWatchesCaptchaEnabled() && $captcha->isActive()) {
			$tokenKey = $captcha->getTokenKey();
			$token = isset($_POST[$tokenKey]) ? wp_strip_all_tags($_POST[$tokenKey]) : null;
			if (!$captcha->validate($token)) {
				$this->jsonError(__('Invalid reCaptcha, please try again.', 'quote-price-notifier'));
			}
		}

		// Create new price watch
		$userId = get_current_user_id();
		$priceWatch = new PriceWatch([
			'product_id' => $productId,
			'customer_email' => $email,
			'customer_name' => $name,
			'customer_id' => $userId ? $userId : null,
			'status' => PriceWatchStatus::ACTIVE,
		]);

		try {
			$priceWatch->save();
		} catch (ModelDataInvalidException $e) {
			$this->jsonError($e->getMessage());
		} catch (Exception $e) {
			$this->jsonError(__('Could not save new price watch. Please try again later.', 'quote-price-notifier'));
		}

		// Trigger event
		do_action(Hook::NEW_PRICE_WATCH_CREATED, $priceWatch);

		$this->jsonSuccess(__('You have been successfully subscribed to product price watching. You will be notified anytime its price changes.', 'quote-price-notifier'));
	}
}
