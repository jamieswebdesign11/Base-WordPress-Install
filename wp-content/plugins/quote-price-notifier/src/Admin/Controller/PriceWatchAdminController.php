<?php

namespace Artio\QuotePriceNotifier\Admin\Controller;

use Artio\QuotePriceNotifier\Admin\ListTable\PriceWatchListTable;
use Artio\QuotePriceNotifier\Db\Collection\PriceWatchCollection;
use Artio\QuotePriceNotifier\Db\Model\PriceWatch;
use Artio\QuotePriceNotifier\Enum\PriceWatchStatus;
use Exception;
use QuotePriceNotifierAdminMessage;

if (!defined('ABSPATH')) {
exit;
}

class PriceWatchAdminController extends AdminTableController {

	public function __construct() {
		parent::__construct(new PriceWatchListTable());
	}

	protected function getPageHeader() {
		return __('Price Watches', 'quote-price-notifier');
	}

	/**
	 * Displays admin warning that no Price Watches were selected for action
	 */
	protected function showNoSelectionMessage() {
		QuotePriceNotifierAdminMessage::add(__('No Price Watches selected.'), 'warning');
	}

	/**
	 * Processes status change of selected Price Watches to desired status
	 *
	 * @param string $status
	 */
	protected function changeStatus( $status) {
		$ids = $this->getSelectedIds();
		if (!$ids) {
			$this->showNoSelectionMessage();
			return;
		}

		$succ = 0;
		$collection = new PriceWatchCollection();
		$priceWatches = $collection->getPriceWatchesToChangeStatus($ids, $status);
		/* @var PriceWatch $priceWatch */
		foreach ($priceWatches as $priceWatch) {
			try {
				$priceWatch->changeStatus($status);
				$succ++;
			} catch (Exception $e) {
				$msg = sprintf(
					/* translators: %d: Price Watch ID */
					__('Could not process Price Watch (ID: %d)', 'quote-price-notifier'),
					$priceWatch->get('id')
				);
				QuotePriceNotifierAdminMessage::add($msg, 'warning');
			}
		}

		$msg = $succ > 0 ?
			/* translators: %d: Processed price watches count */
			sprintf(_n(
				'%d Price Watch processed successfully',
				'%d Price Watches processed successfully',
				$succ, 'quote-price-notifier'
			), $succ) :
			__('No Price Watch processed', 'quote-price-notifier');
		QuotePriceNotifierAdminMessage::add($msg, 'success');
	}

	/**
	 * Processes the "activate" action on selected Price Watches
	 */
	protected function activate() {
		$this->changeStatus(PriceWatchStatus::ACTIVE);
	}

	/**
	 * Processes the "deactivate" action on selected Price Watches
	 */
	protected function deactivate() {
		$this->changeStatus(PriceWatchStatus::INACTIVE);
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

		$collection = new PriceWatchCollection();
		$deleted = $collection->delete($ids);
		if (false === $deleted) {
			QuotePriceNotifierAdminMessage::add('Could not delete selected Price Watches.', 'warning');
		} else {
			$msg = $deleted > 0 ?
				/* translators: %d: Deleted price watches count */
				sprintf(_n(
					'%d Price Watch deleted successfully',
					'%d Price Watches deleted successfully',
					$deleted, 'quote-price-notifier'
				), $deleted) :
				__('No Price Watch deleted', 'quote-price-notifier');
			QuotePriceNotifierAdminMessage::add($msg, 'success');
		}
	}
}
