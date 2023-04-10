<?php

namespace Artio\QuotePriceNotifier\Filesystem;

if (!defined('ABSPATH')) {
exit;
}

/**
 * Used to obtain paths and URLs to various files types
 */
class Paths {

	/**
	 * Main plugin file
	 *
	 * @var string
	 */
	private $pluginFile;

	/**
	 * Constructor
	 *
	 * @param $pluginFile
	 */
	public function __construct( $pluginFile) {
		$this->pluginFile = $pluginFile;
	}

	/**
	 * Returns default templates directory
	 *
	 * @return string
	 */
	public function getTemplatesDir() {
		return plugin_dir_path($this->pluginFile) . 'templates/';
	}

	/**
	 * Generates URL to given JS script file
	 *
	 * @param string $fileName
	 * @return string
	 */
	public function getScriptUrl( $fileName) {
		return plugins_url('/assets/js/' . $fileName, $this->pluginFile);
	}

	/**
	 * Returns full path to given JS script file
	 *
	 * @param string $fileName
	 * @return string
	 */
	public function getScriptPath( $fileName) {
		return plugin_dir_path($this->pluginFile) . 'assets/js/' . $fileName;
	}

	/**
	 * Generates URL to given CSS stylesheet file
	 *
	 * @param string $fileName
	 * @return string
	 */
	public function getStyleUrl( $fileName) {
		return plugins_url('/assets/css/' . $fileName, $this->pluginFile);
	}

	/**
	 * Returns full path to given CSS stylesheet file
	 *
	 * @param string $fileName
	 * @return string
	 */
	public function getStylePath( $fileName) {
		return plugin_dir_path($this->pluginFile) . 'assets/css/' . $fileName;
	}
}
