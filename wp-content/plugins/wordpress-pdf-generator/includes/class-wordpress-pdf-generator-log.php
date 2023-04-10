<?php
/**
 * Provide a admin area view for the plugin
 *
 * This file is used to show PDF logs.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/includes
 */

if ( ! class_exists( 'WP_List_Table' ) ) {
		require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}
/**
 * Class Name WordPress_Pdf_Generator_Log
 * This class will show the details of PDF logs by extending WP_List_Table.
 */
class WordPress_Pdf_Generator_Log extends WP_List_Table {

	/**
	 * Getting data from Database.
	 *
	 * @since 3.0.0
	 * @param string $orderby sorting order by column.
	 * @param string $order sorting order.
	 * @param string $search_item item to search.
	 * @return array array containing the data fetched from database
	 */
	public function wps_wordpress_pdf_generator_data( $orderby, $order, $search_item ) {
		global $wpdb;
		$data_arr = array();
		if ( '' !== $search_item ) {
			$result = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM ' . $wpdb->prefix . 'wps_pdflog WHERE email LIKE %s', '%' . $search_item . '%' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.DirectDatabaseQuery.DirectQuery
		} elseif ( '' !== $orderby && '' !== $order ) {
			$result = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM ' . $wpdb->prefix . 'wps_pdflog ORDER BY %1s %2s', $orderby, $order ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress
		} else {
			$result = $wpdb->get_results( 'SELECT * FROM ' . $wpdb->prefix . 'wps_pdflog' ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.DirectDatabaseQuery.DirectQuery
		}
		if ( count( $result ) > 0 ) {
			$date_format = get_option( 'date_format' );
			$time_format = get_option( 'time_format' );
			foreach ( $result as $key => $value ) {
				$postid = $value->postid;
				if ( '' !== $postid ) {
					$postid = json_decode( $postid, true );
					if ( is_array( $postid ) ) {
						foreach ( $postid as $id ) {
							$data_arr[] = array(
								'id'       => $value->id,
								'postid'   => $id,
								'username' => $value->username,
								'email'    => $value->email,
								'time'     => gmdate( $date_format . ' ' . $time_format, strtotime( $value->time ) ),
							);
						}
						continue;
					}
				}
				$data_arr[] = array(
					'id'       => $value->id,
					'postid'   => $postid,
					'username' => $value->username,
					'email'    => $value->email,
					'time'     => gmdate( $date_format . ' ' . $time_format, strtotime( $value->time ) ),
				);
			}
		}
		return $data_arr;

	}
	/**
	 * Hiding databse id column.
	 *
	 * @since 3.0.0
	 * @return array array contining the column to hide
	 */
	public function get_hidden_columns() {
		return array( 'id' );
	}
	/**
	 * Setting sortable columns.
	 *
	 * @since 3.0.0
	 * @return array array containing the columns to sort.
	 */
	public function get_sortable_columns() {
		return array(
			'username' => array( 'username', true ),
			'email'    => array( 'email', true ),
			'time'     => array( 'time', true ),
		);
	}
	/**
	 * Get all columns to list as the Heading.
	 *
	 * @since 3.0.0
	 * @return array array containing the datbase keys and Title to show as heading of the table.
	 */
	public function get_columns() {
		$columns = array(
			'cb'       => '<input type="checkbox" />',
			'id'       => __( 'ID', 'wordpress-pdf-generator' ),
			'postid'   => __( 'Post ID', 'wordpress-pdf-generator' ),
			'username' => __( 'Username', 'wordpress-pdf-generator' ),
			'email'    => __( 'Email', 'wordpress-pdf-generator' ),
			'time'     => __( 'Time', 'wordpress-pdf-generator' ),
		);
		return $columns;
	}
	/**
	 * Callback function will be used during bulk delete.
	 *
	 * @since 3.0.0
	 * @param array $item array contining the databse row id will bve used for deletion.
	 * @return string
	 */
	public function column_cb( $item ) {
		return sprintf(
			'<input type="checkbox" name="bulk-delete[]" value="%s" />',
			$item['id']
		);
	}
	/**
	 * Getting value of the respective column.
	 *
	 * @since 3.0.0
	 * @param array  $item contains items from the database.
	 * @param string $column_name contains column name to get data for.
	 * @return array
	 */
	public function column_default( $item, $column_name ) {
		switch ( $column_name ) {
			case 'id':
			case 'postid':
			case 'username':
			case 'email':
			case 'time':
			case 'action':
				return $item[ $column_name ];
			default:
				return 'No Value';
		}

	}
	/**
	 * Array containing the bulk actions.
	 *
	 * @since 3.0.0
	 * @return array
	 */
	public function get_bulk_actions() {
		$actions = array(
			'bulk-delete' => __( 'Delete', 'wordpress-pdf-generator' ),
		);
		return $actions;
	}
	/**
	 * Deleting PDF Log.
	 *
	 * @since 3.0.0
	 * @param integer $id id of the log to delete.
	 * @return void
	 */
	public static function delete_log( $id ) {
		global $wpdb, $wpg_admin_log_deletion_success_notice;
		$wpdb->delete( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.DirectDatabaseQuery.DirectQuery
			$wpdb->prefix . 'wps_pdflog',
			array( 'id' => $id ),
			array( '%d' )
		);
		$wpg_admin_log_deletion_success_notice = true;
	}
	/**
	 * Processing bulk action to delete PDF log
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function process_bulk_action() {
		if ( ( isset( $_POST['action'] ) && 'bulk-delete' === $_POST['action'] ) || ( isset( $_POST['action2'] ) && 'bulk-delete' === $_POST['action2'] ) ) {
			if ( wp_verify_nonce( isset( $_POST['delete_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['delete_nonce'] ) ) : '' ) ) {
				$delete_ids = isset( $_POST['bulk-delete'] ) ? map_deep( wp_unslash( $_POST['bulk-delete'] ), 'sanitize_text_field' ) : '';
				foreach ( $delete_ids as $id ) {
					self::delete_log( $id );
				}
			}
			wp_safe_redirect(
				add_query_arg(
					array(
						'page'     => 'pdf_generator_for_wp_menu',
						'pgfw_tab' => 'wordpress-pdf-generator-logs',
						'deleted'  => true,
					),
					admin_url( 'admin.php' )
				)
			);
			exit;
		}
	}
	/**
	 * Main function to preparing all table and show in front end.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function prepare_items() {
		if ( wp_verify_nonce( isset( $_POST['search_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['search_nonce'] ) ) : '' ) ) {
			$search_item = isset( $_POST['s'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['s'] ) ) ) : '';
		} else {
			$search_item = '';
		}
		$orderby      = isset( $_GET['orderby'] ) ? trim( sanitize_key( wp_unslash( $_GET['orderby'] ) ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$order        = isset( $_GET['order'] ) ? trim( sanitize_key( wp_unslash( $_GET['order'] ) ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$wps_all_data = $this->wps_wordpress_pdf_generator_data( $orderby, $order, $search_item );
		$per_page     = 10;
		$current_page = $this->get_pagenum();
		$total_data   = count( $wps_all_data );
		$this->set_pagination_args(
			array(
				'total_items' => $total_data,
				'per_page'    => $per_page,
			)
		);
		$this->items = array_slice( $wps_all_data, ( ( $current_page - 1 ) * $per_page ), $per_page );
		// callback to get columns.
		$columns = $this->get_columns();
		// callback to get hidden columns.
		$hidden = $this->get_hidden_columns();
		// callback to get sortable columns.
		$sortable = $this->get_sortable_columns();
		$this->process_bulk_action();
		// all callback called to the header.
		$this->_column_headers = array( $columns, $hidden, $sortable );
	}
}
