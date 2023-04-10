<?php

namespace Artio\QuotePriceNotifier\Db\Collection;

use Artio\QuotePriceNotifier\Db\Model\Model;
use Artio\QuotePriceNotifier\Db\PagedData\MappedPagedData;
use Artio\QuotePriceNotifier\Db\PagedData\PagedQueryData;
use Artio\QuotePriceNotifier\Db\SqlBuilder;
use InvalidArgumentException;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to provide typed access to data stored in database
 */
abstract class Collection {

	/**
	 * Model class name
	 *
	 * @var string
	 */
	protected $modelClass;

	/**
	 * DB table name
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
	 * Must be overriden in inherited classes which provide specific data model class name.
	 * Provided class must be a sub-class of Model.
	 *
	 * @param string $modelClass
	 * @param string $tableName
	 * @param string $idColumn
	 */
	public function __construct( $modelClass, $tableName, $idColumn) {
		if (!is_a($modelClass, Model::class, true)) {
			throw new InvalidArgumentException('Given class is not a Model.');
		}

		$this->modelClass = $modelClass;
		$this->tableName = $tableName;
		$this->idColumn = $idColumn;
	}

	/**
	 * Used to generate PagedData instance which will return raw database data
	 *
	 * @param string $query
	 * @param int $pageSize
	 * @param int $limit
	 * @return PagedQueryData
	 */
	protected function getPagedData( $query, $pageSize = 20, $limit = 0) {
		return new PagedQueryData($query, $pageSize, $limit);
	}

	/**
	 * Used to generate PagedData instance which will return data mapped to specified model class
	 *
	 * @param string $query
	 * @param int $pageSize
	 * @param int $limit
	 * @return MappedPagedData
	 */
	public function getTypedData( $query, $pageSize = 20, $limit = 0) {
		$pagedData = $this->getPagedData($query, $pageSize, $limit);
		return new MappedPagedData($pagedData, function( $data) {
			return new $this->modelClass($data);
		});
	}

	/**
	 * Loads single model by given ID
	 *
	 * @param int $id
	 * @return Model|null
	 */
	public function getSingleItemById( $id) {
		global $wpdb;

		// We must use numbered arguments which don't quote the string to add dynamic table name to query,
		// otherwise CodeSniffer will complain  >:[
		$data = $wpdb->get_row(
			$wpdb->prepare(
				'SELECT * FROM %1$s WHERE `%2$s` = %3$d',
				$wpdb->prefix . $this->tableName,
				$this->idColumn,
				$id
			),
			ARRAY_A
		);

		return $this->createItem($data);
	}

	/**
	 * Instantiates single model from given data
	 *
	 * @param array $data
	 * @return Model|null
	 */
	public function createItem( $data) {
		if (!is_array($data)) {
			return null;
		}

		return new $this->modelClass($data);
	}

	/**
	 * Deletes all records by specified IDs, returns number
	 * of deleted records or FALSE on error.
	 *
	 * @param int[] $ids
	 * @return int|false
	 */
	public function delete( array $ids) {
		global $wpdb;

		if (!$ids) {
			return true;
		}

		// We must use numbered arguments which don't quote the string to add dynamic table name to query,
		// otherwise CodeSniffer will complain  >:[
		$idsList = SqlBuilder::prepareIdsList($ids);
		$result = $wpdb->query(
			$wpdb->prepare('DELETE FROM %1$s
				WHERE `%2$s` IN (%3$s)',
				$wpdb->prefix . $this->tableName,
				$this->idColumn,
				$idsList
			)
		);

		return $result;
	}

	/**
	 * Returns personal data for specified e-mail
	 *
	 * @param string $email
	 * @param int $pageSize
	 * @return PagedQueryData
	 */
	public function getPersonalData( $email, $pageSize = 100) {
		global $wpdb;

		// We must use numbered arguments which don't quote the string to add dynamic table name to query,
		// otherwise CodeSniffer will complain  >:[
		$query = $wpdb->prepare(
			"SELECT `id`, `customer_email`, `customer_name`
				FROM %1\$s
				WHERE `customer_email` = '%2\$s'",
			$wpdb->prefix . $this->tableName,
			$email
		);
		return $this->getPagedData($query, $pageSize);
	}

	/**
	 * Deletes items matching given e-mail
	 *
	 * @param string $email
	 * @return int|false
	 */
	public function deleteByEmail( $email) {
		global $wpdb;

		$where = [
			'customer_email' => $email,
		];

		return $wpdb->delete($wpdb->prefix . $this->tableName, $where, SqlBuilder::getFormat($where));
	}

	/**
	 * Deletes items matching given product ID
	 *
	 * @param int $productId
	 * @return int|false
	 */
	public function deleteByProduct( $productId) {
		global $wpdb;

		$where = [
			'product_id' => (int) $productId,
		];

		return $wpdb->delete($wpdb->prefix . $this->tableName, $where, SqlBuilder::getFormat($where));
	}

	/**
	 * Sets customer_id to NULL for given customers
	 *
	 * @param int $customerId
	 * @return int|false
	 */
	public function clearCustomer( $customerId) {
		global $wpdb;

		$update = [
			'customer_id' => null,
		];
		$where = [
			'customer_id' => (int) $customerId,
		];

		return $wpdb->update(
			$wpdb->prefix . $this->tableName,
			$update,
			$where,
			SqlBuilder::getFormat($update),
			SqlBuilder::getFormat($where)
		);
	}
}
