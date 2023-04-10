<?php

namespace Artio\QuotePriceNotifier\Db\Model;

use Artio\QuotePriceNotifier\Db\SqlBuilder;
use Artio\QuotePriceNotifier\Exception\DbException;
use Artio\QuotePriceNotifier\Exception\ModelDataInvalidException;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Generic database entity model used to hold and provide access to given data.
 * It will automatically load database table's structure and convert data to
 * their respective data types (int, float or string).
 */
abstract class Model {

	/**
	 * Table name
	 *
	 * @var string
	 */
	protected $tableName;

	/**
	 * ID column name
	 *
	 * @var string
	 */
	protected $idColumn;

	/**
	 * If specified, this column will be set to GMT date/time
	 * automatically when new record is created in database
	 *
	 * @var string
	 */
	protected $createdTimeColumn;

	/**
	 * If specified, this column will be set to GMT date/time
	 * automatically when new record is created or existing
	 * record is updated in database (if there's anything to update)
	 *
	 * @var string
	 */
	protected $updatedTimeColumn;

	/**
	 * Current data
	 *
	 * @var array
	 */
	protected $data;

	/**
	 * Previous data for changes detection
	 *
	 * @var array
	 */
	protected $oldData;

	/**
	 * Data types mapper
	 *
	 * @var MysqlDataTypesMapper
	 */
	protected $dataTypesMapper;

	/**
	 * Constructor
	 *
	 * @param string $tableName
	 * @param string $idColumn
	 * @param array $data
	 */
	public function __construct( $tableName, $idColumn, array $data = []) {
		$this->tableName = $tableName;
		$this->idColumn = $idColumn;
		$this->dataTypesMapper = MysqlDataTypesMapper::getInstance($tableName);

		$this->addData($data);

		$this->resetOldData();
	}

	/**
	 * Resets old stored data with current stored data
	 */
	protected function resetOldData() {
		if ($this->isNew()) {
			$this->oldData = [];
		} else {
			$fieldsArray   = array_fill_keys($this->dataTypesMapper->getFields(), true);
			$this->oldData = array_intersect_key($this->data, $fieldsArray);
		}
	}

	/**
	 * Retrieves specified key value from stored data or default value
	 * if key is not stored
	 *
	 * @param string $key
	 * @param mixed $default
	 * @return mixed
	 */
	public function get( $key, $default = null) {
		return isset($this->data[$key]) ? $this->data[$key] : $default;
	}

	/**
	 * Returns ID column value from stored data
	 *
	 * @return mixed
	 */
	public function getId() {
		return $this->get($this->idColumn);
	}

	/**
	 * Sets ID column value, returns its previous value.
	 *
	 * @param mixed $id
	 * @return mixed
	 */
	public function setId( $id) {
		return $this->set($this->idColumn, $id);
	}

	/**
	 * Determines whether this model represents new (unsaved)
	 * or existing entity.
	 *
	 * @return bool
	 */
	public function isNew() {
		return !$this->getId();
	}

	/**
	 * Stores specified key => value pair and returns old value or NULL.
	 * Automatically maps data type for given value according to underlying
	 * database table's column type.
	 *
	 * @param string $key
	 * @param mixed $value
	 * @return mixed
	 */
	public function set( $key, $value = null) {
		$oldValue = $this->get($key);
		$this->data[$key] = $this->dataTypesMapper->mapDataType($key, $value);
		return $oldValue;
	}

	/**
	 * Sets all key => value pairs from given array
	 *
	 * @param array $data
	 */
	public function addData( array $data) {
		foreach ($data as $key => $value) {
			$this->set($key, $value);
		}
	}

	/**
	 * Checks whether current data are valid. Override in inherited
	 * models to validate your data.
	 * Throws exception on error.
	 *
	 * @throws ModelDataInvalidException
	 */
	public function check() {
	}

	/**
	 * Inserts new or updates existing record in database.
	 * Throws exception on error.
	 *
	 * @throws ModelDataInvalidException|DbException
	 */
	public function save() {
		$this->check();

		if ($this->isNew()) {
			$this->insertData();
		} else {
			$this->updateData();
		}
	}

	/**
	 * Deletes current record
	 *
	 * @return bool
	 */
	public function delete() {
		global $wpdb;

		if (!$this->getId()) {
			return false;
		}

		$where = [$this->idColumn => $this->getId()];

		$result = $wpdb->delete($wpdb->prefix . $this->tableName, $where, SqlBuilder::getFormat($where));

		return ( false !== $result );
	}

	/**
	 * Returns array of modified internal data
	 *
	 * @return array
	 */
	protected function getModifiedData() {
		$modified = [];
		foreach ($this->dataTypesMapper->getFields() as $field) {
			if ($field === $this->idColumn) {
				continue;
			}

			if (!isset($this->data[$field])) {
				continue;
			}

			if (isset($this->oldData[$field]) && $this->oldData[$field] === $this->data[$field]) {
				continue;
			}

			$modified[$field] = $this->data[$field];
		}

		return $modified;
	}

	/**
	 * Updates current record in database. Updates only columns
	 * modified since last successful save.
	 * Throws exception on error.
	 *
	 * @throws DbException
	 */
	protected function updateData() {
		global $wpdb;

		$modified = $this->getModifiedData();
		if (!$modified) {
			return;
		}

		// Update modified date/times if set
		$time = gmdate('Y-m-d H:i:s');
		if ($this->updatedTimeColumn) {
			$modified[$this->updatedTimeColumn] = $time;
		}

		$where = [$this->idColumn => $this->getId()];

		$result = $wpdb->update($wpdb->prefix . $this->tableName, $modified, $where,
			SqlBuilder::getFormat($modified), SqlBuilder::getFormat($where));

		if (false === $result) {
			throw new DbException(__('Could not update data in database.', 'quote-price-notifier'));
		}

		// Update internal values
		if ($this->updatedTimeColumn) {
			$this->set($this->updatedTimeColumn, $time);
		}

		$this->resetOldData();
	}

	/**
	 * Inserts new record to database.
	 * Throws exception on error.
	 *
	 * @throws DbException
	 */
	protected function insertData() {
		global $wpdb;

		$modified = $this->getModifiedData();
		$modified[$this->idColumn] = null;

		// Set created and modified date/times if set
		$time = gmdate('Y-m-d H:i:s');
		if ($this->createdTimeColumn) {
			$modified[$this->createdTimeColumn] = $time;
		}
		if ($this->updatedTimeColumn) {
			$modified[$this->updatedTimeColumn] = $time;
		}

		$result = $wpdb->insert($wpdb->prefix . $this->tableName, $modified, SqlBuilder::getFormat($modified));

		if (false === $result) {
			throw new DbException(__('Could not save data to database.', 'quote-price-notifier'));
		}

		// Update internal values
		$this->setId($wpdb->insert_id);
		if ($this->createdTimeColumn) {
			$this->set($this->createdTimeColumn, $time);
		}
		if ($this->updatedTimeColumn) {
			$this->set($this->updatedTimeColumn, $time);
		}

		$this->resetOldData();
	}
}
