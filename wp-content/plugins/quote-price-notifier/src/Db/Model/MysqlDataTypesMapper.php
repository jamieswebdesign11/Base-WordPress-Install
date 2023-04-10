<?php

namespace Artio\QuotePriceNotifier\Db\Model;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to automatically map data loaded from database to correct
 * data types according to actual table columns types in database.
 */
class MysqlDataTypesMapper {

	/**
	 * Maps MySQL data types to PHP data types
	 *
	 * @var string[]
	 */
	protected static $mysqlTypesMap = [
		'bit' => 'int',
		'bool' => 'int',
		'boolean' => 'int',
		'tinyint' => 'int',
		'smallint' => 'int',
		'mediumint' => 'int',
		'int' => 'int',
		'integer' => 'int',
		'bigint' => 'int',
		'decimal' => 'float',
		'dec' => 'float',
		'numeric' => 'float',
		'fixed' => 'float',
		'float' => 'float',
		'double' => 'float',
	];

	/**
	 * Table name
	 *
	 * @var string
	 */
	protected $tableName;

	/**
	 * Maps table columns to data types
	 *
	 * @var array
	 */
	protected $dataTypesMap = [];

	protected function __construct( $tableName) {
		$this->tableName = $tableName;
		$this->initDataTypesMap();
	}

	/**
	 * Returns single instance for specified database table
	 *
	 * @param string $tableName
	 * @return MysqlDataTypesMapper
	 */
	public static function getInstance( $tableName) {
		static $instances = [];
		if (!isset($instances[$tableName])) {
			$instances[$tableName] = new self($tableName);
		}
		return $instances[$tableName];
	}

	/**
	 * Returns list of columns names in current table
	 *
	 * @return string[]
	 */
	public function getFields() {
		return array_keys($this->dataTypesMap);
	}

	/**
	 * Initializes data types map according to actual columns types in the database
	 */
	protected function initDataTypesMap() {
		global $wpdb;

		$table = $wpdb->prefix . $this->tableName;
		$fields = $wpdb->get_results(
			$wpdb->prepare(
				'SHOW COLUMNS FROM %1$s',
				$table
			)
		);

		foreach ($fields as $field) {
			$fieldName = $field->Field;
			$parts = explode('(', $field->Type, 2);
			$fieldType = strtolower(trim($parts[0]));

			$this->dataTypesMap[$fieldName] = isset(self::$mysqlTypesMap[$fieldType]) ?
				self::$mysqlTypesMap[$fieldType] :
				'string';
		}
	}

	/**
	 * Maps data types for given key => value pairs
	 *
	 * @param array $data
	 * @return array
	 */
	public function mapDataTypes( array $data) {
		foreach ($data as $key => $value) {
			$data[$key] = $this->mapDataType($key, $value);
		}
		return $data;
	}

	/**
	 * Maps data type for given column and value
	 *
	 * @param string $key
	 * @param mixed $value
	 * @return mixed
	 */
	public function mapDataType( $key, $value) {
		if (!is_null($value) && isset($this->dataTypesMap[$key])) {
			if ('int' === $this->dataTypesMap[$key]) {
				return (int) $value;
			} else if ('float' === $this->dataTypesMap[$key]) {
				return (float) $value;
			} else {
				return (string) $value;
			}
		}
		return $value;
	}
}
