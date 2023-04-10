<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/admin
 * @author     WP Swings <webmaster@wpswings.com>
 */
class WordPress_Pdf_Generator_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    3.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    3.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since 3.0.0
	 * @param string $hook The plugin page slug.
	 */
	public function wpg_admin_enqueue_styles( $hook ) {
		$screen = get_current_screen();
		if ( isset( $screen->id ) && 'wp-swings_page_pdf_generator_for_wp_menu' === $screen->id ) {
			wp_enqueue_style( 'wpg-admin-global-custom-admin-css', WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/scss/wps-admin-global-custom.css', array(), $this->version, 'all' );
			wp_enqueue_style( 'wpg-admin-css', WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/css/wps-admin.css', array(), $this->version, 'all' );
		}
		wp_enqueue_style( 'wpg-admin-global-custom-gutenberg-css', WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/scss/wordpress-pdf-generator-admin-gutenberg-custom.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since 3.0.0
	 * @param string $hook The plugin page slug.
	 */
	public function wpg_admin_enqueue_scripts( $hook ) {

		$screen = get_current_screen();
		if ( isset( $screen->id ) && 'wp-swings_page_pdf_generator_for_wp_menu' === $screen->id ) {
			wp_enqueue_script( 'wpg-admin-js', WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/js/wordpress-pdf-generator-admin.js', array( 'jquery' ), $this->version, true );
			wp_localize_script(
				'wpg-admin-js',
				'wpg_admin_param',
				array(
					'ajaxurl'                  => admin_url( 'admin-ajax.php' ),
					'nonce'                    => wp_create_nonce( 'wps_wpg_license_nonce' ),
					'wpg_admin_param_location' => admin_url( 'admin.php?page=pdf_generator_for_wp_menu' ),
					'copied'                   => __( 'copied', 'wordpress-pdf-generator' ),
				)
			);
			wp_enqueue_script( 'wpg-admin-global-custom-js', WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/js/wordpress-pdf-generator-admin-global-custom.js', array( 'jquery' ), $this->version, true );
			wp_localize_script(
				'wpg-admin-global-custom-js',
				'wpg_admin_custom_obj',
				array(
					'ajaxurl'              => admin_url( 'admin-ajax.php' ),
					'nonce'                => wp_create_nonce( 'wpg_admin_custom_nonce' ),
					'delete_loader'        => esc_html__( 'Deleting...', 'wordpress-pdf-generator' ),
					'delete_confirm'       => esc_html__( 'Are you sure you want to delete templates ?', 'wordpress-pdf-generator' ),
					'saving'               => esc_html__( 'Saving...', 'wordpress-pdf-generator' ),
					'saved'                => esc_html__( 'Saved', 'wordpress-pdf-generator' ),
					'resubmit'             => esc_html__( 'Resubmit', 'wordpress-pdf-generator' ),
					'insert_confirm'       => esc_html__( 'This will add three pages privately for header, body, footer with default layout which you can edit in editor by clicking on he link provided next to the template, you will reach to the editor.', 'wordpress-pdf-generator' ),
					'template_del_success' => esc_html__( 'Template Deleted Successfully', 'wordpress-pdf-generator' ),
					'Template_del_error'   => esc_html__( 'Unexpected error occured please refresh the page and try again.', 'wordpress-pdf-generator' ),
					'template_add_success' => esc_html__( 'Templates added successfully.', 'wordpress-pdf-generator' ),
					'template_add_error'   => esc_html__( 'Unexpected Error Occured during template addition, please refresh the page and try again.', 'wordpress-pdf-generator' ),
					'settings_saved'       => esc_html__( 'Settings Saved Successfully.', 'wordpress-pdf-generator' ),
					'settings_error'       => esc_html__( 'Unexpected Error occured, Please refresh the page and try again.', 'wordpress-pdf-generator' ),
					'temp_activate_error'  => esc_html__( 'Please activate any template before saving settings.', 'wordpress-pdf-generator' ),
					'activating'           => esc_html__( 'Activating..', 'wordpress-pdf-generator' ),
					'activated'            => esc_html__( 'Activated', 'wordpress-pdf-generator' ),
					'error'                => esc_html__( 'Error', 'wordpress-pdf-generator' ),
					'activate'             => esc_html__( 'Activate', 'wordpress-pdf-generator' ),
				)
			);
			add_thickbox();
		}
	}
	/**
	 * Register the js for gutenberg block.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_admin_enqueue_gutenberg_script() {
		wp_enqueue_script( 'wpg_admin-custom-gutenberg-js', WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/js/wordpress-pdf-generator-gutenberg-custom.js', array(), $this->version, true );
		wp_localize_script(
			'wpg_admin-custom-gutenberg-js',
			'wpg_custom_gutenberg_js_obj',
			array(
				'title'            => esc_html__( 'PDF Snippets', 'wordpress-pdf-generator' ),
				'description'      => esc_html__( 'Add Snippets for PDF', 'wordpress-pdf-generator' ),
				'please_choose'    => esc_html__( 'Please Choose', 'wordpress-pdf-generator' ),
				'post_title'       => esc_html__( 'Title', 'wordpress-pdf-generator' ),
				'post_content'     => esc_html__( 'Content', 'wordpress-pdf-generator' ),
				'post_metafields'  => esc_html__( 'Meta Fields', 'wordpress-pdf-generator' ),
				'post_taxonomy'    => esc_html__( 'Taxonomy', 'wordpress-pdf-generator' ),
				'post_createddate' => esc_html__( 'Created Date', 'wordpress-pdf-generator' ),
				'post_author'      => esc_html__( 'Author', 'wordpress-pdf-generator' ),
				'pageno'           => esc_html__( 'Page No.', 'wordpress-pdf-generator' ),
			)
		);
	}
	/**
	 * Adding extra field for pro in general settings tab.
	 *
	 * @since 3.0.0
	 * @param array $pgfw_settings_general_html_arr array containing html fields for general tab.
	 * @return array
	 */
	public function wpg_admin_general_settings_page_field_pro( $pgfw_settings_general_html_arr ) {
		unset( $pgfw_settings_general_html_arr[3] );
		return array_values( $pgfw_settings_general_html_arr );
	}
	/**
	 * Adding extra field for pro in display settings tab.
	 *
	 * @since 3.0.0
	 * @param array $pgfw_settings_display_html_arr array containing html fields for display tab.
	 * @return array
	 */
	public function wpg_admin_display_settings_page_field_pro( $pgfw_settings_display_html_arr ) {
		$pgfw_display_settings              = get_option( 'pgfw_save_admin_display_settings', array() );
		$pgfw_bulk_download_enable          = array_key_exists( 'pgfw_bulk_download_enable', $pgfw_display_settings ) ? $pgfw_display_settings['pgfw_bulk_download_enable'] : '';
		$sub_pgfw_pdf_bulk_download_icon    = array_key_exists( 'sub_pgfw_pdf_bulk_download_icon', $pgfw_display_settings ) ? $pgfw_display_settings['sub_pgfw_pdf_bulk_download_icon'] : '';
		$pgfw_settings_display_html_arr_new = array(
			array(
				'title'       => __( 'Enable Bulk Download', 'wordpress-pdf-generator' ),
				'type'        => 'radio-switch',
				'description' => __( 'Enable this to give access to bulk download PDF', 'wordpress-pdf-generator' ),
				'id'          => 'pgfw_bulk_download_enable',
				'value'       => $pgfw_bulk_download_enable,
				'class'       => 'pgfw_bulk_download_enable',
				'name'        => 'pgfw_bulk_download_enable',
				'options'     => array(
					'yes' => __( 'YES', 'wordpress-pdf-generator' ),
					'no'  => __( 'NO', 'wordpress-pdf-generator' ),
				),
			),
		);
		$pgfw_pre_html_arr                  = array_slice( $pgfw_settings_display_html_arr, 0, 2 );
		$pgfw_post_html_arr                 = array_slice( $pgfw_settings_display_html_arr, 2 );
		$pgfw_settings_display_html_arr     = array_merge( $pgfw_pre_html_arr, $pgfw_settings_display_html_arr_new, $pgfw_post_html_arr );

		$pgfw_settings_display_html_arr_new_sub = array(
			array(
				'title'       => __( 'Choose Bulk Download PDF Icon', 'wordpress-pdf-generator' ),
				'type'        => 'upload-button',
				'button_text' => __( 'Upload Icon', 'wordpress-pdf-generator' ),
				'class'       => 'sub_pgfw_pdf_bulk_download_icon',
				'id'          => 'sub_pgfw_pdf_bulk_download_icon',
				'value'       => $sub_pgfw_pdf_bulk_download_icon,
				'sub_id'      => 'pgfw_pdf_bulk_download_icon',
				'sub_class'   => 'pgfw_pdf_bulk_download_icon',
				'sub_name'    => 'pgfw_pdf_bulk_download_icon',
				'name'        => 'sub_pgfw_pdf_bulk_download_icon',
				'description' => __( 'If no icon is choosen default icon will be used', 'wordpress-pdf-generator' ),
				'img-tag'     => array(
					'img-class' => 'pgfw_bulk_pdf_icon_image',
					'img-id'    => 'pgfw_bulk_pdf_icon_image',
					'img-style' => ( $sub_pgfw_pdf_bulk_download_icon ) ? 'margin:10px;height:45px;width:45px;' : 'display:none;margin:10px;height:45px;width:45px;',
					'img-src'   => $sub_pgfw_pdf_bulk_download_icon,
				),
				'img-remove'  => array(
					'btn-class' => 'pgfw_bulk_pdf_icon_image_remove',
					'btn-id'    => 'pgfw_bulk_pdf_icon_image_remove',
					'btn-text'  => __( 'Remove Icon', 'wordpress-pdf-generator' ),
					'btn-title' => __( 'Remove Icon', 'wordpress-pdf-generator' ),
					'btn-name'  => 'pgfw_bulk_pdf_icon_image_remove',
					'btn-style' => ! ( $sub_pgfw_pdf_bulk_download_icon ) ? 'display:none' : '',
				),
			),
		);

		$pgfw_pre_html_arr              = array_slice( $pgfw_settings_display_html_arr, 0, 8 );
		$pgfw_post_html_arr             = array_slice( $pgfw_settings_display_html_arr, 8 );
		$pgfw_settings_display_html_arr = array_merge( $pgfw_pre_html_arr, $pgfw_settings_display_html_arr_new_sub, $pgfw_post_html_arr );
		return $pgfw_settings_display_html_arr;
	}
	/**
	 * Adding extra field for pro in header settings tab.
	 *
	 * @param array $pgfw_settings_header_fields_html_arr array containing html fields for header tab.
	 * @return array
	 */
	public function wpg_header_settings_page_field_pro( $pgfw_settings_header_fields_html_arr ) {
		return $pgfw_settings_header_fields_html_arr;
	}
	/**
	 * Adding extra field for pro in footer settings tab.
	 *
	 * @param array $pgfw_settings_footer_fields_html_arr array containing html fields for footer tab.
	 * @return array
	 */
	public function wpg_footer_settings_page_field_pro( $pgfw_settings_footer_fields_html_arr ) {
		return $pgfw_settings_footer_fields_html_arr;
	}
	/**
	 * Adding extra field for pro in body settings tab.
	 *
	 * @param array $pgfw_settings_body_fields_html_arr array containing html fields for body tab.
	 * @return array
	 */
	public function wpg_body_settings_page_field_pro( $pgfw_settings_body_fields_html_arr ) {
		$pgfw_body_settings                  = get_option( 'pgfw_body_save_settings', array() );
		$pgfw_watermark_image_use_in_pdf     = array_key_exists( 'pgfw_watermark_image_use_in_pdf', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_image_use_in_pdf'] : '';
		$pgfw_body_watermark_image           = array_key_exists( 'sub_pgfw_watermark_image_upload', $pgfw_body_settings ) ? $pgfw_body_settings['sub_pgfw_watermark_image_upload'] : '';
		$pgfw_watermark_position_left        = array_key_exists( 'pgfw_watermark_position_left', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_position_left'] : '';
		$pgfw_watermark_position_top         = array_key_exists( 'pgfw_watermark_position_top', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_position_top'] : '';
		$pgfw_watermark_angle                = array_key_exists( 'pgfw_watermark_angle', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_angle'] : '';
		$pgfw_watermark_image_width          = array_key_exists( 'pgfw_watermark_image_width', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_image_width'] : '';
		$pgfw_watermark_image_height         = array_key_exists( 'pgfw_watermark_image_height', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_image_height'] : '';
		$pgfw_watermark_opacity              = array_key_exists( 'pgfw_watermark_opacity', $pgfw_body_settings ) ? $pgfw_body_settings['pgfw_watermark_opacity'] : '';
		$pgfw_settings_body_html_arr_new_sub = array(
			array(
				'title'        => __( 'Add Watermark Image', 'wordpress-pdf-generator' ),
				'type'         => 'checkbox',
				'description'  => __( 'Select this to include watermark image in PDF.', 'wordpress-pdf-generator' ),
				'id'           => 'pgfw_watermark_image_use_in_pdf',
				'value'        => $pgfw_watermark_image_use_in_pdf,
				'class'        => 'pgfw_watermark_image_use_in_pdf',
				'name'         => 'pgfw_watermark_image_use_in_pdf',
				'parent-class' => 'wps_pgfw_setting_separate_border',
			),
			array(
				'title'       => __( 'Watermark Angle', 'wordpress-pdf-generator' ),
				'type'        => 'number',
				'description' => __( 'Please Choose Watermark Angle.', 'wordpress-pdf-generator' ),
				'id'          => 'pgfw_watermark_angle',
				'value'       => $pgfw_watermark_angle,
				'class'       => 'pgfw_watermark_angle',
				'placeholder' => '',
				'min'         => -90,
				'max'         => 180,
			),
			array(
				'title'       => __( 'Watermark Position', 'wordpress-pdf-generator' ),
				'type'        => 'multi',
				'id'          => 'pgfw_wartermark_position',
				'description' => __( 'Choose watermark position left, top in px.', 'wordpress-pdf-generator' ),
				'value'       => array(
					array(
						'type'        => 'number',
						'id'          => 'pgfw_watermark_position_left',
						'class'       => 'pgfw_watermark_position_left',
						'name'        => 'pgfw_watermark_position_left',
						'placeholder' => __( 'left', 'wordpress-pdf-generator' ),
						'value'       => $pgfw_watermark_position_left,
						'min'         => -5000,
						'max'         => 5000,
					),
					array(
						'type'        => 'number',
						'id'          => 'pgfw_watermark_position_top',
						'class'       => 'pgfw_watermark_position_top',
						'name'        => 'pgfw_watermark_position_top',
						'placeholder' => __( 'top', 'wordpress-pdf-generator' ),
						'value'       => $pgfw_watermark_position_top,
						'min'         => -5000,
						'max'         => 5000,
					),
				),
			),
			array(
				'title'       => __( 'Watermark Opacity', 'wordpress-pdf-generator' ),
				'type'        => 'number',
				'id'          => 'pgfw_watermark_opacity',
				'class'       => 'pgfw_watermark_opacity',
				'name'        => 'pgfw_watermark_opacity',
				'placeholder' => __( 'opacity', 'wordpress-pdf-generator' ),
				'value'       => $pgfw_watermark_opacity,
				'min'         => 0,
				'max'         => 1,
				'step'        => .1,
				'description' => __( 'Choose this to add transparency to the image used as watermark, value should be greater then 0 and less then 1, accepted decimal values.', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Choose Watermark Image', 'wordpress-pdf-generator' ),
				'type'        => 'upload-button',
				'button_text' => __( 'Upload Image', 'wordpress-pdf-generator' ),
				'sub_class'   => 'pgfw_watermark_image_upload',
				'sub_id'      => 'pgfw_watermark_image_upload',
				'id'          => 'sub_pgfw_watermark_image_upload',
				'name'        => 'sub_pgfw_watermark_image_upload',
				'class'       => 'sub_pgfw_watermark_image_upload',
				'value'       => $pgfw_body_watermark_image,
				'sub_name'    => 'pgfw_watermark_image_upload',
				'img-tag'     => array(
					'img-class' => 'pgfw_watermark_image',
					'img-id'    => 'pgfw_watermark_image',
					'img-style' => ( $pgfw_body_watermark_image ) ? 'margin-right:10px;width:100px;height:100px;' : 'display:none;margin-right:10px;width:100px;height:100px;',
					'img-src'   => $pgfw_body_watermark_image,
				),
				'img-remove'  => array(
					'btn-class' => 'pgfw_watermark_image_remove',
					'btn-id'    => 'pgfw_watermark_image_remove',
					'btn-text'  => __( 'Remove image', 'wordpress-pdf-generator' ),
					'btn-title' => __( 'Remove image', 'wordpress-pdf-generator' ),
					'btn-name'  => 'pgfw_watermark_image_remove',
					'btn-style' => ! ( $pgfw_body_watermark_image ) ? 'display:none' : '',
				),
			),
			array(
				'title'       => __( 'Watermark Image Size', 'wordpress-pdf-generator' ),
				'type'        => 'multi',
				'id'          => 'pgfw_wartermark_size',
				'description' => __( 'Choose watermark image width, height in px.', 'wordpress-pdf-generator' ),
				'value'       => array(
					array(
						'type'        => 'number',
						'id'          => 'pgfw_watermark_image_width',
						'class'       => 'pgfw_watermark_image_width',
						'name'        => 'pgfw_watermark_image_width',
						'placeholder' => __( 'width', 'wordpress-pdf-generator' ),
						'value'       => $pgfw_watermark_image_width,
						'min'         => -5000,
						'max'         => 5000,
					),
					array(
						'type'        => 'number',
						'id'          => 'pgfw_watermark_image_height',
						'class'       => 'pgfw_watermark_image_height',
						'name'        => 'pgfw_watermark_image_height',
						'placeholder' => __( 'height', 'wordpress-pdf-generator' ),
						'value'       => $pgfw_watermark_image_height,
						'min'         => -5000,
						'max'         => 5000,
					),
				),
			),
		);
		$pgfw_pre_html_arr                   = array_slice( $pgfw_settings_body_fields_html_arr, 0, 15 );
		$pgfw_post_html_arr                  = array_slice( $pgfw_settings_body_fields_html_arr, 15 );
		$pgfw_settings_body_fields_html_arr  = array_merge( $pgfw_pre_html_arr, $pgfw_settings_body_html_arr_new_sub, $pgfw_post_html_arr );
		return $pgfw_settings_body_fields_html_arr;
	}
	/**
	 * Adding extra field for pro in advanced settings tab.
	 *
	 * @since 3.0.0
	 * @param array $pgfw_settings_advanced_html_arr array containing html fields for advanced tab.
	 * @return array
	 */
	public function wpg_admin_advance_settings_page_field_pro( $pgfw_settings_advanced_html_arr ) {
		$pgfw_advanced_settings    = get_option( 'pgfw_advanced_save_settings', array() );
		$pgfw_tff_font_custom_name = array_key_exists( 'pgfw_ttf_font_upload', $pgfw_advanced_settings ) ? $pgfw_advanced_settings['pgfw_ttf_font_upload'] : '';

		$pgfw_settings_advanced_html_arr[] = array(
			'title'       => __( 'Upload Custom Font File', 'wordpress-pdf-generator' ),
			'type'        => 'file',
			'id'          => 'pgfw_ttf_font_upload',
			'value'       => $pgfw_tff_font_custom_name,
			'class'       => 'pgfw_ttf_font_upload',
			'name'        => 'pgfw_ttf_font_upload',
			'placeholder' => __( 'ttf file', 'wordpress-pdf-generator' ),
			'description' => __( 'Choose .ttf file to add custom font, once uploaded all dropdowns of font will have this option to choose from.', 'wordpress-pdf-generator' ),
		);
		return $pgfw_settings_advanced_html_arr;
	}
	/**
	 * Adding extra field for pro in meta_fields settings tab.
	 *
	 * @since 3.0.0
	 * @param array  $pgfw_settings_meta_fields_html_arr array containing html fields for meta_fields tab.
	 * @param array  $post_meta_field meta fields keys.
	 * @param string $post_type current post type.
	 * @return array
	 */
	public function wpg_admin_meta_fields_settings_page_field_pro( $pgfw_settings_meta_fields_html_arr, $post_meta_field, $post_type ) {
		$pgfw_meta_settings = get_option( 'pgfw_meta_fields_save_settings', array() );
		if ( is_array( $post_meta_field ) ) {
			update_option( 'wps_wpg_meta_fields_in_' . $post_type, array_values( $post_meta_field ) );
			$pgfw_settings_meta_fields_html_sub_arr = array();
			foreach ( $post_meta_field as $meta_key ) {
				$wpg_meta_key_name                        = array_key_exists( $meta_key, $pgfw_meta_settings ) ? $pgfw_meta_settings[ $meta_key ] : '';
				$wpg_meta_key_checkbox_value              = array_key_exists( $meta_key . '_checkbox', $pgfw_meta_settings ) ? $pgfw_meta_settings[ $meta_key . '_checkbox' ] : '';
				$pgfw_settings_meta_fields_html_sub_arr[] = array(
					'title'          => $meta_key,
					'type'           => 'text',
					'id'             => 'wps_wpg_' . $meta_key,
					'value'          => $wpg_meta_key_name,
					'class'          => 'wps_wpg_' . $meta_key,
					'name'           => $meta_key,
					'placeholder'    => $meta_key,
					'checkbox_name'  => $meta_key . '_checkbox',
					'checkbox_id'    => $meta_key . '_checkbox',
					'checkbox_value' => $wpg_meta_key_checkbox_value,
				);
			}
			array_pop( $pgfw_settings_meta_fields_html_arr );
			if ( count( $pgfw_settings_meta_fields_html_sub_arr ) > 0 ) {
				$pgfw_settings_meta_fields_html_arr[] = array(
					'title' => __( 'Rename Meta Fields Key', 'wordpress-pdf-generator' ),
					'type'  => 'multiwithcheck',
					'id'    => 'pgfw_meta_fields_description_settings',
					'value' => $pgfw_settings_meta_fields_html_sub_arr,
				);
			}
		}
		return array_values( $pgfw_settings_meta_fields_html_arr );
	}

	/**
	 * Add shortcode use notice below the meta fields settings form.
	 *
	 * @since 3.0.2
	 * @return void
	 */
	public function wps_add_shortcode_use_notice_below_meta_setting_page() {
		?>
		<div>
			<?php
			printf(
				wp_kses_post(
					/* translators: %s setting tab url. */
					__( 'Above selected meta fields will be added to the PDF, but all at the same place ( one after the other ), If you want the individual meta fields to be added at your desired place you can use below shortcode just replace the wps_field with your desired meta key and place at your desired place in the <a href="%s" target="_blank">custom template</a> it will fetch the respective meta field data.', 'wordpress-pdf-generator' )
				),
				esc_url( admin_url( 'admin.php?page=pdf_generator_for_wp_menu&pgfw_tab=wordpress-pdf-generator-internal-page-setting' ) )
			);
			?>
		</div>
		<div>
			<span class="wps-wpg-shortcode-meta-field-target">[WPS_POST_METAVALUE key='wps_field' {shortcode-postid}]</span>
			<button class="wps-wpg-copy-shortcode-meta-field" ><?php esc_html_e( 'copy', 'wordpress-pdf-generator' ); ?></button>
		</div>
		<?php
	}

	/**
	 * Adding extra field for pro in pdf_upload settings tab.
	 *
	 * @since 3.0.0
	 * @param array $pgfw_settings_pdf_upload_html_arr array containing html fields for pdf_upload tab.
	 * @return array
	 */
	public function wpg_admin_pdf_upload_settings_page_field_pro( $pgfw_settings_pdf_upload_html_arr ) {
		return $pgfw_settings_pdf_upload_html_arr;
	}
	/**
	 * Adding taxonomy customisations tab.
	 *
	 * @param array $pgfw_default_tabs array containing setting tabs.
	 * @return array
	 */
	public function wpg_taxonmy_settings_tab( $pgfw_default_tabs ) {

		$pgfw_default_tabs['wordpress-pdf-generator-taxonomy'] = array(
			'title' => esc_html__( 'Taxonomy Settings', 'wordpress-pdf-generator' ),
			'name'  => 'wordpress-pdf-generator-taxonomy',
		);

		$pgfw_default_tabs['wordpress-pdf-generator-layout-settings'] = array(
			'title' => esc_html__( 'Layout Settings', 'wordpress-pdf-generator' ),
			'name'  => 'wordpress-pdf-generator-layout-settings',
		);

		$pgfw_default_tabs['wordpress-pdf-generator-logs'] = array(
			'title' => esc_html__( 'PDF Logs', 'wordpress-pdf-generator' ),
			'name'  => 'wordpress-pdf-generator-logs',
		);
		return $pgfw_default_tabs;
	}
	/**
	 * Adding taxonomy customisations settings page.
	 *
	 * @param  string $pgfw_file_path path of the setting page file.
	 * @param  string $file_name file name to be included.
	 * @return string
	 */
	public function wpg_adding_taxonomy_setting_page( $pgfw_file_path, $file_name ) {
		$wpg_file_path = WORDPRESS_PDF_GENERATOR_DIR_PATH . $file_name;
		if ( file_exists( $wpg_file_path ) ) {
			return $wpg_file_path;
		}
		return $pgfw_file_path;
	}
	/**
	 * Setting fields for customising taxonomy.
	 *
	 * @param array $wpg_taxonomy_settings_arr array contining the fields.
	 * @return array
	 */
	public function wpg_setting_fields_for_customising_taxonomy( $wpg_taxonomy_settings_arr ) {
		$pgfw_taxonomy_settings = get_option( 'pgfw_taxonomy_fields_save_settings', array() );

		$wpg_taxonomy_settings_arr = array();
		$post_types                = get_post_types( array( 'public' => true ) );
		unset( $post_types['attachment'] );
		$i = 0;
		foreach ( $post_types as $post_type ) {
			$post_taxonomy_fields = get_object_taxonomies( $post_type );
			$post_taxonomy_field  = array();
			foreach ( $post_taxonomy_fields as $val ) {
				$post_taxonomy_field[ $val ] = $val;
			}
			$pgfw_show_type_taxonomy_val = array_key_exists( 'pgfw_taxonomy_fields_' . $post_type . '_show', $pgfw_taxonomy_settings ) ? $pgfw_taxonomy_settings[ 'pgfw_taxonomy_fields_' . $post_type . '_show' ] : '';

			$wpg_taxonomy_settings_arr[] =
			array(
				'title'        => __( 'Show Taxonomy Fields for ', 'wordpress-pdf-generator' ) . $post_type,
				'type'         => 'checkbox',
				'description'  => __( 'selecting this will show the taxonomy fields on PDF.', 'wordpress-pdf-generator' ),
				'id'           => 'pgfw_taxonomy_fields_' . $post_type . '_show',
				'value'        => $pgfw_show_type_taxonomy_val,
				'class'        => 'pgfw_taxonomy_fields_' . $post_type . '_show',
				'name'         => 'pgfw_taxonomy_fields_' . $post_type . '_show',
				'parent-class' => ( 0 === $i ) ? '' : 'wps_pgfw_setting_separate_border',
			);
			if ( is_array( $post_taxonomy_field ) && count( $post_taxonomy_field ) > 0 ) {
				$wpg_taxonomy_settings_sub_arr = array();
				foreach ( $post_taxonomy_field as $taxonomy_key ) {
					$wpg_taxonomy_key_name           = array_key_exists( $taxonomy_key, $pgfw_taxonomy_settings ) ? $pgfw_taxonomy_settings[ $taxonomy_key ] : '';
					$wpg_taxonomy_checkbox_value     = array_key_exists( $taxonomy_key . '_checkbox', $pgfw_taxonomy_settings ) ? $pgfw_taxonomy_settings[ $taxonomy_key . '_checkbox' ] : '';
					$wpg_taxonomy_settings_sub_arr[] = array(
						'title'          => $taxonomy_key,
						'type'           => 'text',
						'id'             => 'wps_wpg_' . $taxonomy_key,
						'value'          => $wpg_taxonomy_key_name,
						'class'          => 'wps_wpg_' . $taxonomy_key,
						'name'           => $taxonomy_key,
						'placeholder'    => $taxonomy_key,
						'checkbox_name'  => $taxonomy_key . '_checkbox',
						'checkbox_id'    => $taxonomy_key . '_checkbox',
						'checkbox_value' => $wpg_taxonomy_checkbox_value,
					);
				}
				$wpg_taxonomy_settings_arr[] = array(
					'title' => __( 'Rename Taxonomy Fields', 'wordpress-pdf-generator' ),
					'type'  => 'multiwithcheck',
					'id'    => 'pgfw_meta_fields_detail',
					'value' => $wpg_taxonomy_settings_sub_arr,
				);
			}
			$i++;
		}
		$wpg_taxonomy_settings_arr[] = array(
			'type'        => 'button',
			'id'          => 'pgfw_taxonomy_fields_save_settings',
			'button_text' => __( 'Save Settings', 'wordpress-pdf-generator' ),
			'class'       => 'pgfw_taxonomy_fields_save_settings',
			'name'        => 'pgfw_taxonomy_fields_save_settings',
		);
		return $wpg_taxonomy_settings_arr;
	}
	/**
	 * PDF Generator For WP Pro save tab settings.
	 *
	 * @since 3.0.0
	 */
	public function wpg_admin_save_tab_settings() {
		global $wpg_wps_wpg_obj, $wps_pgfw_gen_flag, $pgfw_save_check_flag;
		$settings_general_arr = array();
		if ( isset( $_POST['wpg_nonce_field'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['wpg_nonce_field'] ) ), 'nonce_settings_save' ) ) {
			if ( isset( $_POST['pgfw_taxonomy_fields_save_settings'] ) ) {
				$wpg_genaral_settings = apply_filters( 'wpg_taxonomy_settings_array', array() );
				$key                  = 'pgfw_taxonomy_fields_save_settings';
				$pgfw_save_check_flag = true;
			} elseif ( isset( $_POST['pgfw_coverpage_setting_save'] ) ) {
				$wpg_genaral_settings = apply_filters( 'wpg_layout_cover_page_setting_html_array', array() );
				$key                  = 'pgfw_coverpage_setting_save';
				$pgfw_save_check_flag = true;
			}
			if ( $pgfw_save_check_flag ) {
				$wps_pgfw_gen_flag = false;
				$wpg_button_index  = array_search( 'submit', array_column( $wpg_genaral_settings, 'type' ), true );
				if ( isset( $wpg_button_index ) && ( null == $wpg_button_index || '' === $wpg_button_index ) ) { // phpcs:ignore
					$wpg_button_index = array_search( 'button', array_column( $wpg_genaral_settings, 'type' ), true );
				}
				if ( isset( $wpg_button_index ) && '' !== $wpg_button_index ) {
					unset( $wpg_genaral_settings[ $wpg_button_index ] );
					if ( is_array( $wpg_genaral_settings ) && ! empty( $wpg_genaral_settings ) ) {
						foreach ( $wpg_genaral_settings as $wpg_genaral_setting ) {
							if ( isset( $wpg_genaral_setting['id'] ) && '' !== $wpg_genaral_setting['id'] ) {
								if ( 'multi' === $wpg_genaral_setting['type'] ) {
									$wpg_general_settings_sub_arr = $wpg_genaral_setting['value'];
									foreach ( $wpg_general_settings_sub_arr as $wpg_genaral_setting ) {
										if ( isset( $_POST[ $wpg_genaral_setting['id'] ] ) ) {
											$settings_general_arr[ $wpg_genaral_setting['id'] ] = is_array( $_POST[ $wpg_genaral_setting['id'] ] ) ? map_deep( wp_unslash( $_POST[ $wpg_genaral_setting['id'] ] ), 'sanitize_text_field' ) : sanitize_text_field( wp_unslash( $_POST[ $wpg_genaral_setting['id'] ] ) );
										} else {
											$settings_general_arr[ $wpg_genaral_setting['id'] ] = '';
										}
									}
								} elseif ( 'multiwithcheck' === $wpg_genaral_setting['type'] ) {
									$wpg_general_settings_sub_arr = $wpg_genaral_setting['value'];
									foreach ( $wpg_general_settings_sub_arr as $wpg_genaral_setting ) {
										if ( isset( $_POST[ $wpg_genaral_setting['name'] ] ) ) {
											$settings_general_arr[ $wpg_genaral_setting['name'] ] = is_array( $_POST[ $wpg_genaral_setting['name'] ] ) ? map_deep( wp_unslash( $_POST[ $wpg_genaral_setting['name'] ] ), 'sanitize_text_field' ) : sanitize_text_field( wp_unslash( $_POST[ $wpg_genaral_setting['name'] ] ) );
										} else {
											$settings_general_arr[ $wpg_genaral_setting['name'] ] = '';
										}
										if ( isset( $_POST[ $wpg_genaral_setting['checkbox_id'] ] ) ) {
											$settings_general_arr[ $wpg_genaral_setting['checkbox_id'] ] = is_array( $_POST[ $wpg_genaral_setting['checkbox_id'] ] ) ? map_deep( wp_unslash( $_POST[ $wpg_genaral_setting['checkbox_id'] ] ), 'sanitize_text_field' ) : sanitize_text_field( wp_unslash( $_POST[ $wpg_genaral_setting['checkbox_id'] ] ) );
										} else {
											$settings_general_arr[ $wpg_genaral_setting['checkbox_id'] ] = '';
										}
									}
								} else {
									if ( isset( $_POST[ $wpg_genaral_setting['id'] ] ) ) {
										$settings_general_arr[ $wpg_genaral_setting['id'] ] = is_array( $_POST[ $wpg_genaral_setting['id'] ] ) ? map_deep( wp_unslash( $_POST[ $wpg_genaral_setting['id'] ] ), 'sanitize_text_field' ) : sanitize_text_field( wp_unslash( $_POST[ $wpg_genaral_setting['id'] ] ) );
									} else {
										$settings_general_arr[ $wpg_genaral_setting['id'] ] = '';
									}
								}
							} else {
								$wps_pgfw_gen_flag = true;
							}
						}
					}
					if ( ! $wps_pgfw_gen_flag ) {
						update_option( $key, $settings_general_arr );
					}
				}
			}
		}
	}
	/**
	 * Admin notice after successful deletion from log.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpf_show_admin_notice_for_successfully_log_deletion() {
		if ( ! wp_doing_ajax() ) {
			if ( isset( $_GET['deleted'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
				require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-notice-template.php';
			}
		}
	}
	/**
	 * Add custom uploaded font in font dropdown.
	 *
	 * @since 3.0.0
	 * @param array $wps_pgfw_font_styles array containing font styles.
	 * @return array
	 */
	public function wpg_custom_font_uploaded_include_in_font_dropdown( $wps_pgfw_font_styles ) {
		$pgfw_advanced_settings = get_option( 'pgfw_advanced_save_settings', array() );
		$pgfw_ttf_font_upload   = array_key_exists( 'pgfw_ttf_font_upload', $pgfw_advanced_settings ) ? $pgfw_advanced_settings['pgfw_ttf_font_upload'] : '';
		if ( '' !== $pgfw_ttf_font_upload ) {
			$wps_pgfw_font_styles['custom'] = str_replace( '.ttf', '', $pgfw_ttf_font_upload );
		}
		return $wps_pgfw_font_styles;
	}
	/**
	 * Adding custom subtab for template settings in customisation tab.
	 *
	 * @since 3.0.0
	 * @param array $pgfw_default_tabs array containing subtabs in customisation ta.
	 * @return array
	 */
	public function wpg_add_custom_template_settings_tab( $pgfw_default_tabs ) {
		$pgfw_default_tabs['wordpress-pdf-generator-cover-page-setting'] = array(
			'title' => esc_html__( 'Cover Page', 'wordpress-pdf-generator' ),
			'name'  => 'wordpress-pdf-generator-cover-page-setting',
		);

		$pgfw_default_tabs['wordpress-pdf-generator-internal-page-setting'] = array(
			'title' => esc_html__( 'Internal Page', 'wordpress-pdf-generator' ),
			'name'  => 'wordpress-pdf-generator-internal-page-setting',
		);
		return $pgfw_default_tabs;
	}
	/**
	 * Adding template setting page.
	 *
	 * @since 3.0.0
	 * @param string $pgfw_file_path template file path.
	 * @param string $file_name template file name.
	 * @return string
	 */
	public function wpg_add_template_from_pro_plugin_for_template_setting( $pgfw_file_path, $file_name ) {
		$wpg_file_path = WORDPRESS_PDF_GENERATOR_DIR_PATH . $file_name;
		if ( file_exists( $wpg_file_path ) ) {
			return $wpg_file_path;
		}
		return $pgfw_file_path;
	}
	/**
	 * Create custom template on admin click.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_add_custom_template_page() {
		check_ajax_referer( 'wpg_admin_custom_nonce', 'nonce' );
		$custom_template_data = get_option( 'wpg_custom_templates_list', array() );
		$template_count       = count( $custom_template_data );

		$args = array(
			array(
				'post_title'   => 'header',
				'post_content' => $this->wpg_header_template_custom_html(),
				'post_type'    => 'page',
				'post_status'  => 'private',
			),
			array(
				'post_title'   => 'body',
				'post_content' => $this->wpg_body_template_custom_html(),
				'post_type'    => 'page',
				'post_status'  => 'private',
			),
			array(
				'post_title'   => 'footer',
				'post_content' => $this->wpg_footer_template_custom_html(),
				'post_type'    => 'page',
				'post_status'  => 'private',
			),
		);
		if ( is_array( $custom_template_data ) && array_key_exists( 'customtemplate', $custom_template_data ) ) {
			$template_name = 'customtemplate' . $template_count;
		} else {
			$template_name = 'customtemplate';
		}
		$custom_template_data[ $template_name ] = array();
		foreach ( $args as $post_arg ) {
			$post_id = wp_insert_post( $post_arg );
			$custom_template_data[ $template_name ][ $post_arg['post_title'] ] = $post_id;
		}
		update_option( 'wpg_custom_templates_list', $custom_template_data );
		wp_die();
	}
	/**
	 * Header template html for gutenberg during page creation.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public function wpg_header_template_custom_html() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-cutom-template-data.php';
		$html = wpg_header_html();
		return $html;
	}
	/**
	 * Body template for gutenberg during page creation.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public function wpg_body_template_custom_html() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-cutom-template-data.php';
		$html = wpg_body_html();
		return $html;
	}
	/**
	 * Footer template for gutenberg during page creation.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public function wpg_footer_template_custom_html() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-cutom-template-data.php';
		$html = wpg_footer_html();
		return $html;
	}
	/**
	 * Reset default settings to update option.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_reset_default_setings() {
		$pgfw_body_settings                                 = get_option( 'pgfw_body_save_settings', array() );
		$pgfw_body_settings['pgfw_watermark_angle']         = -45;
		$pgfw_body_settings['pgfw_watermark_position_left'] = 200;
		$pgfw_body_settings['pgfw_watermark_position_top']  = 200;
		$pgfw_body_settings['pgfw_watermark_opacity']       = 0.2;
		$pgfw_body_settings['pgfw_watermark_image_width']   = 100;
		$pgfw_body_settings['pgfw_watermark_image_height']  = 100;
		update_option( 'pgfw_body_save_settings', $pgfw_body_settings );
		update_option( 'wpg_use_template_to_generate_pdf', 'template1' );
		update_option( 'wpg_use_cover_page_template', 1 );
	}
	/**
	 * Deleting custom template from ajax request.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_delete_custom_template_page() {
		check_ajax_referer( 'wpg_admin_custom_nonce', 'nonce' );
		$template_name        = array_key_exists( 'template_name', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['template_name'] ) ) : '';
		$custom_template_data = get_option( 'wpg_custom_templates_list', array() );
		if ( is_array( $custom_template_data ) && array_key_exists( $template_name, $custom_template_data ) ) {
			foreach ( $custom_template_data[ $template_name ] as $template_for => $template_id ) {
				wp_trash_post( $template_id );
			}
			unset( $custom_template_data[ $template_name ] );
			update_option( 'wpg_custom_templates_list', $custom_template_data );
		}
		$wpg_use_template = get_option( 'wpg_use_template_to_generate_pdf' );
		if ( $wpg_use_template === $template_name ) {
			update_option( 'wpg_use_template_to_generate_pdf', 'template1' );
		}
		wp_die();
	}
	/**
	 * Saving internal page template settings through ajax.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_save_internal_page_template_setting() {
		check_ajax_referer( 'wpg_admin_custom_nonce', 'nonce' );
		$template_name = array_key_exists( 'template_name', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['template_name'] ) ) : '';
		update_option( 'wpg_use_template_to_generate_pdf', $template_name );
		wp_die();
	}
	/**
	 * Html fields for cover page layout.
	 *
	 * @since 3.0.0
	 * @param array $cover_page_html_arr cover page html array.
	 * @return array
	 */
	public function wpg_cover_page_html_layout_fields( $cover_page_html_arr ) {
		$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
		$coverpage_single_enable     = array_key_exists( 'wpg_cover_page_single_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_single_enable'] : '';
		$coverpage_bulk_enable       = array_key_exists( 'wpg_cover_page_bulk_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_bulk_enable'] : '';
		$coverpage_company_name      = array_key_exists( 'wpg_cover_page_company_name', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_name'] : '';
		$coverpage_company_tagline   = array_key_exists( 'wpg_cover_page_company_tagline', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_tagline'] : '';
		$coverpage_company_email     = array_key_exists( 'wpg_cover_page_company_email', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_email'] : '';
		$coverpage_company_address   = array_key_exists( 'wpg_cover_page_company_address', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_address'] : '';
		$coverpage_company_url       = array_key_exists( 'wpg_cover_page_company_url', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_url'] : '';
		$cover_page_image            = array_key_exists( 'sub_pgfw_cover_page_image_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_image_upload'] : '';
		$cover_page_company_logo     = array_key_exists( 'sub_pgfw_cover_page_company_logo_upload', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['sub_pgfw_cover_page_company_logo_upload'] : '';
		$coverpage_company_phone     = array_key_exists( 'wpg_cover_page_company_Phone', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_company_Phone'] : '';

		$cover_page_html_arr = array(
			array(
				'title'       => __( 'Add Cover Page to Single PDF', 'wordpress-pdf-generator' ),
				'type'        => 'checkbox',
				'id'          => 'wpg_cover_page_single_enable',
				'class'       => 'wpg_cover_page_single_enable',
				'name'        => 'wpg_cover_page_single_enable',
				'value'       => $coverpage_single_enable,
				'description' => __( 'Selecting this will add cover page to generated single PDFs', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Add Cover Page to Bulk PDF', 'wordpress-pdf-generator' ),
				'type'        => 'checkbox',
				'id'          => 'wpg_cover_page_bulk_enable',
				'class'       => 'wpg_cover_page_bulk_enable',
				'name'        => 'wpg_cover_page_bulk_enable',
				'value'       => $coverpage_bulk_enable,
				'description' => __( 'Selecting this will add cover page to generated bulk continuation PDFs', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Company Name', 'wordpress-pdf-generator' ),
				'type'        => 'text',
				'id'          => 'wpg_cover_page_company_name',
				'class'       => 'wpg_cover_page_company_name',
				'name'        => 'wpg_cover_page_company_name',
				'value'       => $coverpage_company_name,
				'description' => __( 'Add company name at the cover page.', 'wordpress-pdf-generator' ),
				'placeholder' => __( 'company name', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Company Logo', 'wordpress-pdf-generator' ),
				'type'        => 'upload-button',
				'button_text' => __( 'Upload Image', 'wordpress-pdf-generator' ),
				'sub_class'   => 'pgfw_cover_page_company_logo_upload',
				'sub_id'      => 'pgfw_cover_page_company_logo_upload',
				'id'          => 'sub_pgfw_cover_page_company_logo_upload',
				'name'        => 'sub_pgfw_cover_page_company_logo_upload',
				'class'       => 'sub_pgfw_cover_page_company_logo_upload',
				'value'       => $cover_page_company_logo,
				'sub_name'    => 'pgfw_cover_page_company_logo_upload',
				'img-tag'     => array(
					'img-class' => 'pgfw_cover_page_company_logo',
					'img-id'    => 'pgfw_cover_page_company_logo',
					'img-style' => ( $cover_page_company_logo ) ? 'width:100px;height:100px;margin-right:10px;' : 'display:none;margin-right:10px;width:100px;height:100px;',
					'img-src'   => $cover_page_company_logo,
				),
				'img-remove'  => array(
					'btn-class' => 'pgfw_cover_page_company_logo_remove',
					'btn-id'    => 'pgfw_cover_page_company_logo_remove',
					'btn-text'  => __( 'Remove logo', 'wordpress-pdf-generator' ),
					'btn-title' => __( 'Remove logo', 'wordpress-pdf-generator' ),
					'btn-name'  => 'pgfw_cover_page_company_logo_remove',
					'btn-style' => ! ( $cover_page_company_logo ) ? 'display:none' : '',
				),
			),
			array(
				'title'       => __( 'Cover Page Image', 'wordpress-pdf-generator' ),
				'type'        => 'upload-button',
				'button_text' => __( 'Upload Image', 'wordpress-pdf-generator' ),
				'sub_class'   => 'pgfw_cover_page_image_upload',
				'sub_id'      => 'pgfw_cover_page_image_upload',
				'id'          => 'sub_pgfw_cover_page_image_upload',
				'name'        => 'sub_pgfw_cover_page_image_upload',
				'class'       => 'sub_pgfw_cover_page_image_upload',
				'value'       => $cover_page_image,
				'sub_name'    => 'pgfw_cover_page_image_upload',
				'img-tag'     => array(
					'img-class' => 'pgfw_cover_page_image',
					'img-id'    => 'pgfw_cover_page_image',
					'img-style' => ( $cover_page_image ) ? 'width:100px;height:100px;margin-right:10px;' : 'display:none;margin-right:10px;width:100px;height:100px;',
					'img-src'   => $cover_page_image,
				),
				'img-remove'  => array(
					'btn-class' => 'pgfw_cover_page_image_remove',
					'btn-id'    => 'pgfw_cover_page_image_remove',
					'btn-text'  => __( 'Remove image', 'wordpress-pdf-generator' ),
					'btn-title' => __( 'Remove image', 'wordpress-pdf-generator' ),
					'btn-name'  => 'pgfw_cover_page_image_remove',
					'btn-style' => ! ( $cover_page_image ) ? 'display:none' : '',
				),
			),
			array(
				'title'       => __( 'Company Tagline', 'wordpress-pdf-generator' ),
				'type'        => 'textarea',
				'id'          => 'wpg_cover_page_company_tagline',
				'class'       => 'wpg_cover_page_company_tagline',
				'name'        => 'wpg_cover_page_company_tagline',
				'value'       => $coverpage_company_tagline,
				'description' => __( 'Add company tagline at the cover page.', 'wordpress-pdf-generator' ),
				'placeholder' => __( 'company tagline', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Company Email', 'wordpress-pdf-generator' ),
				'type'        => 'text',
				'id'          => 'wpg_cover_page_company_email',
				'class'       => 'wpg_cover_page_company_email',
				'name'        => 'wpg_cover_page_company_email',
				'value'       => $coverpage_company_email,
				'description' => __( 'Add email at the cover page bottom.', 'wordpress-pdf-generator' ),
				'placeholder' => __( 'email', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Company Address', 'wordpress-pdf-generator' ),
				'type'        => 'textarea',
				'id'          => 'wpg_cover_page_company_address',
				'class'       => 'wpg_cover_page_company_address',
				'name'        => 'wpg_cover_page_company_address',
				'value'       => $coverpage_company_address,
				'description' => __( 'Add address at the cover page bottom.', 'wordpress-pdf-generator' ),
				'placeholder' => __( 'address', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Company URL', 'wordpress-pdf-generator' ),
				'type'        => 'text',
				'id'          => 'wpg_cover_page_company_url',
				'class'       => 'wpg_cover_page_company_url',
				'name'        => 'wpg_cover_page_company_url',
				'value'       => $coverpage_company_url,
				'description' => __( 'Add url at the cover page bottom.', 'wordpress-pdf-generator' ),
				'placeholder' => __( 'url', 'wordpress-pdf-generator' ),
			),
			array(
				'title'       => __( 'Company Phone No.', 'wordpress-pdf-generator' ),
				'type'        => 'text',
				'id'          => 'wpg_cover_page_company_Phone',
				'class'       => 'wpg_cover_page_company_Phone',
				'name'        => 'wpg_cover_page_company_Phone',
				'value'       => $coverpage_company_phone,
				'description' => __( 'Add Phone at the cover page bottom.', 'wordpress-pdf-generator' ),
				'placeholder' => __( 'phone no.', 'wordpress-pdf-generator' ),
			),
			array(
				'type'        => 'button',
				'id'          => 'pgfw_coverpage_setting_save',
				'button_text' => __( 'Save Settings', 'wordpress-pdf-generator' ),
				'class'       => 'pgfw_coverpage_setting_save',
				'name'        => 'pgfw_coverpage_setting_save',
			),
		);
		return $cover_page_html_arr;
	}
	/**
	 * Activate Cover page template.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_activate_coverpage_template() {
		check_ajax_referer( 'wpg_admin_custom_nonce', 'nonce' );
		$template = array_key_exists( 'template', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['template'] ) ) : '';
		update_option( 'wpg_use_cover_page_template', $template );
		wp_die();
	}
	/**
	 * Add license tab on settings page.
	 *
	 * @param array $pgfw_default_tabs array containing default tabs for settings.
	 * @return array
	 */
	public function wpg_add_license_tab( $pgfw_default_tabs ) {
		$pgfw_default_tabs['wordpress-pdf-generator-license'] = array(
			'title' => esc_html__( 'License', 'wordpress-pdf-generator' ),
			'name'  => 'wordpress-pdf-generator-license',
		);
		return $pgfw_default_tabs;
	}
	/**
	 * Check license validation.
	 *
	 * @return void
	 */
	public function wps_wpg_check_license() {
		$user_license_key = get_option( 'wps_wpg_license_key', '' );
		$api_params       = array(
			'slm_action'         => 'slm_check',
			'secret_key'         => WORDPRESS_PDF_GENERATOR_SPECIAL_SECRET_KEY,
			'license_key'        => $user_license_key,
			'_registered_domain' => isset( $_SERVER['SERVER_NAME'] ) ? sanitize_text_field( wp_unslash( $_SERVER['SERVER_NAME'] ) ) : '',
			'item_reference'     => rawurlencode( WORDPRESS_PDF_GENERATOR_ITEM_REFERENCE ),
			'product_reference'  => 'MWBPK-13249',
		);

		$query        = esc_url_raw( add_query_arg( $api_params, WORDPRESS_PDF_GENERATOR_LICENSE_SERVER_URL ) );
		$request      = array(
			'method'      => 'GET',
			'timeout'     => 120,
			'redirection' => 5,
			'httpversion' => '1.0',
			'blocking'    => true,
			'cookies'     => array(),
			'sslverify'   => false,
		);
		$wps_response = wp_remote_get( $query, $request );
		$license_data = json_decode( wp_remote_retrieve_body( $wps_response ) );
		if ( isset( $license_data->result ) && 'success' === $license_data->result && isset( $license_data->status ) && 'active' === $license_data->status ) {
			update_option( 'wps_wpg_license_check', true );
		} else {
			delete_option( 'wps_wpg_license_check' );
		}
	}
	/**
	 * License validation admin notice.
	 *
	 * @return void
	 */
	public function wpg_license_validation_admin_notice_on_dashboard() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/templates/wordpress-pdf-generator-admin-license-notice-template.php';
	}
	/**
	 * Loading overview content of pro plugin.
	 *
	 * @return void
	 */
	public function wpg_pro_overview_content() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/partials/wordpress-pdf-generator-overview.php';
	}

	/**
	 * Update plugin name on admin dashboard.
	 *
	 * @param string $plugin_name free plugin name.
	 * @since 1.0.0
	 * @return string
	 */
	public function wps_wpg_update_plugin_name_admin_dashboard( $plugin_name ) {
		return $this->plugin_name;
	}

}
