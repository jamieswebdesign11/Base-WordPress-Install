<?php

namespace Artio\QuotePriceNotifier\Admin\Controller;

use Artio\QuotePriceNotifier\Admin\ListTable\QuoteListTable;
use Artio\QuotePriceNotifier\Db\Collection\QuoteCollection;
use Artio\QuotePriceNotifier\Db\Model\Quote;
use Exception;
use QuotePriceNotifierAdminMessage;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Handles display and actions for Quote Requests list table
 */
class QuoteAdminController extends AdminTableController {

	public function __construct() {
		parent::__construct(new QuoteListTable());
	}

	protected function getPageHeader() {
		return __('Quote Requests', 'quote-price-notifier');
	}

	/**
	 * Displays admin warning that no Quote Requests were selected for action
	 */
	protected function showNoSelectionMessage() {
		QuotePriceNotifierAdminMessage::add(__('No Quote Requests selected.'), 'warning');
	}

	/**
	 * Processes the "resolve" action on selected Quote Requests
	 */
	protected function resolve() {
		$ids = $this->getSelectedIds();
		if (!$ids) {
			$this->showNoSelectionMessage();
			return;
		}

		$succ = 0;
		$collection = new QuoteCollection();
		$quotes = $collection->getQuotesToResolve($ids);
		/* @var Quote $quote */
		foreach ($quotes as $quote) {
			try {
				$quote->resolve();
				$succ++;
			} catch (Exception $e) {
				$msg = sprintf(
					/* translators: %d: Quote request ID */
					__('Could not resolve Quote Request (ID: %d)', 'quote-price-notifier'),
					$quote->get('id')
				);
				QuotePriceNotifierAdminMessage::add($msg, 'warning');
			}
		}

		$msg = $succ > 0 ?
			/* translators: %d: Processed quote requests count */
			sprintf(_n(
				'%d Quote Request processed successfully',
				'%d Quote Requests processed successfully',
				$succ, 'quote-price-notifier'
			), $succ) :
			__('No Quote Request processed', 'quote-price-notifier');
		QuotePriceNotifierAdminMessage::add($msg, 'success');
	}

	/**
	 * Processes the "delete" action on selected Quote Requests
	 */
	protected function delete() {
		$ids = $this->getSelectedIds();
		if (!$ids) {
			$this->showNoSelectionMessage();
			return;
		}

		$collection = new QuoteCollection();
		$deleted = $collection->delete($ids);
		if (false === $deleted) {
			QuotePriceNotifierAdminMessage::add('Could not delete selected Quote Requests.', 'warning');
		} else {
			$msg = $deleted > 0 ?
				/* translators: %d: Processed quote requests count */
				sprintf(_n(
					'%d Quote Request deleted successfully',
					'%d Quote Requests deleted successfully',
					$deleted, 'quote-price-notifier'
				), $deleted) :
				__('No Quote Request deleted', 'quote-price-notifier');
			QuotePriceNotifierAdminMessage::add($msg, 'success');
		}
	}
}
