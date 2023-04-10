<?php

namespace Artio\QuotePriceNotifier\Admin\Controller;

use Artio\QuotePriceNotifier\Admin\ListTable\BaseListTable;
use QuotePriceNotifierAdminMessage;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Base controller which displays list table and processes its actions
 */
abstract class AdminTableController {

	/**
	 * Table
	 *
	 * @var BaseListTable
	 */
	protected $adminTable;

	public function __construct( BaseListTable $adminTable) {
		$this->adminTable = $adminTable;
	}

	/**
	 * Returns table's page header
	 *
	 * @return string
	 */
	abstract protected function getPageHeader();

	/**
	 * Called when the page is being loaded, use to process actions
	 */
	public function load() {
		QuotePriceNotifierAdminMessage::load();

		$this->processAction();
	}

	/**
	 * Validates and processes list table action from request
	 */
	protected function processAction() {
		$action = $this->adminTable->current_action();
		if (!$action) {
			return;
		}

		$this->adminTable->check_admin_referer();

		if (!$this->adminTable->is_valid_action($action)) {
			QuotePriceNotifierAdminMessage::add(__('Action not supported.', 'quote-price-notifier'), 'error');
		} else if (!method_exists($this, $action)) {
			QuotePriceNotifierAdminMessage::add(__('Action not implemented.', 'quote-price-notifier'), 'error');
		} else {
			$this->$action();
		}

		$this->redirectAfterAction();
	}

	/**
	 * Called when the page is being displayed, renders list table
	 */
	public function display() {
		$this->adminTable->prepare_items();

		$page = isset($_REQUEST['page']) ? sanitize_key($_REQUEST['page']) : '';
		?>
		<div class="wrap">
			<h1><?php echo esc_html($this->getPageHeader()); ?></h1>
			<?php $this->adminTable->views(); ?>
			<form method="post">
				<input type="hidden" name="page" value="<?php echo esc_attr($page); ?>">
				<?php $this->adminTable->display(); ?>
			</form>
		</div>
		<?php
	}

	/**
	 * Returns selected records IDs from request
	 *
	 * @return int[]
	 */
	protected function getSelectedIds() {
		$ids = isset($_REQUEST['cid']) ?
			array_unique(array_filter(array_map('intval', (array) $_REQUEST['cid']))) :
			[];
		//$ids = is_array($ids) ? $ids : ( is_numeric($ids) ? [$ids] : [] );
		//$ids = array_unique(array_filter(array_map('intval', $ids)));

		return $ids;
	}

	/**
	 * Redirects to current page after some action was processed
	 * without the action related query variables
	 */
	protected function redirectAfterAction() {
		// Store admin messages
		QuotePriceNotifierAdminMessage::store();

		// The simplest way to obtain current URL in Wordpress...
		$url = add_query_arg([]);

		// Remove common action variables
		$url = remove_query_arg([
			'action',
			'cid',
			'_wpnonce',
		], $url);
		if (wp_redirect($url)) {
			die();
		}
	}
}
