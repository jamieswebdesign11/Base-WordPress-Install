<?php

namespace Artio\QuotePriceNotifier\Db;

use Artio\QuotePriceNotifier\Db\Model\MysqlDataTypesMapper;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Helper class with functions for building various parts of SQL queries
 */
abstract class SqlBuilder {

	/**
	 * Returns array of format strings to be used with $wpdb::insert() or $wpdb::update()
	 * method for each value according to its data type
	 *
	 * @param array $values
	 * @return string[]
	 */
	public static function getFormat( array $values) {
		return array_map(static function( $value) {
			return
				is_null($value) ? null :
					( is_int($value) ? '%d' :
						( is_float($value) ? '%f' : '%s' ) );
		}, $values);
	}

	/**
	 * Uses $wpdb::prepare() method to prepare a comma separated list
	 * of given integer IDs
	 *
	 * @param int[] $ids
	 * @return string
	 */
	public static function prepareIdsList( array $ids) {
		global $wpdb;

		return $wpdb->prepare(
			implode(', ', array_fill(0, count($ids), '%d')),
			$ids
		);
	}

	/**
	 * Uses MysqlDataTypesMapper to prepare list of columns from specified table
	 * for SELECT statement. Optionally the columns may be prepended with table alias
	 * and may be given specified prefix in their own aliases, for example:
	 *   pw.product_id AS pw_product_id
	 *
	 * @param string $table Table name without WPDB prefix
	 * @param string $tableAlias
	 * @param string $prefix
	 * @return string
	 */
	public static function getSelectColumnsList( $table, $tableAlias = '', $prefix = '') {
		$mapper = MysqlDataTypesMapper::getInstance($table);
		$fields = $mapper->getFields();
		$parts = array_map(static function( $field) use ( $tableAlias, $prefix) {
			return ( $tableAlias ? $tableAlias . '.' : '' )
				   . $field
				   . ( $prefix ? ' AS ' . $prefix . $field : '' );
		}, $fields);

		return implode(', ', $parts);
	}
}
