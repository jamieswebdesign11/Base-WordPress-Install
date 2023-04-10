<?php
/**
 * The common functionality of the plugin.
 *
 * @link       https://wpswings.com/
 * @since      3.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/common
 */

/**
 * The common functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the common stylesheet and JavaScript.
 * namespace wordpress_pdf_generator_common.
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/common
 * @author     WP Swings <webmaster@wpswings.com>
 */
class WordPress_Pdf_Generator_Common {
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
	 * @since   3.0.0
	 * @access  private
	 * @var     string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since  3.0.0
	 * @param  string $plugin_name       The name of the plugin.
	 * @param  string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the common side of the site.
	 *
	 * @since 3.0.0
	 */
	public function wpg_common_enqueue_styles() {
		wp_enqueue_style( $this->plugin_name . 'common', WORDPRESS_PDF_GENERATOR_DIR_URL . 'common/src/scss/wordpress-pdf-generator-common.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the common side of the site.
	 *
	 * @since 3.0.0
	 */
	public function wpg_common_enqueue_scripts() {
		wp_register_script( $this->plugin_name . 'common', WORDPRESS_PDF_GENERATOR_DIR_URL . 'common/src/js/wordpress-pdf-generator-common.js', array( 'jquery' ), $this->version, false );
		wp_localize_script(
			$this->plugin_name . 'common',
			'wpg_common_param',
			array(
				'ajaxurl'            => admin_url( 'admin-ajax.php' ),
				'nonce'              => wp_create_nonce( 'wpg_common_nonce' ),
				'loader'             => WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/loader.gif',
				'processing_html'    => '<span style="color:#1e73be;">' . esc_html__( 'Please wait....', 'wordpress-pdf-generator' ) . '</span>',
				'email_submit_error' => '<span style="color:#8e4b86;">' . esc_html__( 'Some unexpected error occured. Kindly Resubmit again', 'wordpress-pdf-generator' ) . '</span>',
			)
		);
		wp_enqueue_script( $this->plugin_name . 'common' );
	}

	/**
	 * Destroying cookies at logout.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_destroy_cookies_bulk_products() {
		unset( $_COOKIE['wpg_bulk_products_addition'] );
		setcookie( 'wpg_bulk_products_addition', wp_json_encode( array() ), time() - 86400 );
	}

	/**
	 * Adding products to bulk products for pdf generation using ajax.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_bulk_add_products_ajax() {
		check_ajax_referer( 'wpg_common_nonce', 'nonce' );
		$product_id = array_key_exists( 'product_id', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['product_id'] ) ) : '';
		if ( ! isset( $_COOKIE['wpg_bulk_products_addition'] ) ) {
			setcookie( 'wpg_bulk_products_addition[0]', $product_id, time() + 86400, '/' );
		} else {
			$bulk_product = map_deep( wp_unslash( $_COOKIE['wpg_bulk_products_addition'] ), 'sanitize_text_field' );
			$index        = count( $bulk_product );
			if ( ! in_array( $product_id, $bulk_product, true ) ) {
				setcookie( 'wpg_bulk_products_addition[' . $index . ']', $product_id, time() + 86400, '/' );
				echo esc_html( count( $_COOKIE['wpg_bulk_products_addition'] ) + 1 );
				wp_die();
			}
		}
		echo esc_html( is_array( $_COOKIE['wpg_bulk_products_addition'] ) ? count( $_COOKIE['wpg_bulk_products_addition'] ) : 0 );
		wp_die();
	}

	/**
	 * Html for listing bulk products details.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_build_html_from_cookies() {
		check_ajax_referer( 'wpg_common_nonce', 'nonce' );
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'common/templates/wordpress-pdf-generator-common-bulk-prod-listing.php';
		wp_die();
	}

	/**
	 * Delete products from cookies on ajax request.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_delete_product_from_cookies() {
		check_ajax_referer( 'wpg_common_nonce', 'nonce' );
		$product_id = array_key_exists( 'product_id', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['product_id'] ) ) : '';
		if ( isset( $_COOKIE['wpg_bulk_products_addition'] ) ) {
			$bulk_products = map_deep( wp_unslash( $_COOKIE['wpg_bulk_products_addition'] ), 'sanitize_text_field' );
			$key           = array_search( $product_id, $bulk_products, true );
			if ( false !== $key ) {
				unset( $bulk_products[ $key ] );
				if ( is_array( $bulk_products ) ) {
					$bulk_products = array_values( $bulk_products );
					foreach ( map_deep( wp_unslash( $_COOKIE['wpg_bulk_products_addition'] ), 'sanitize_text_field' ) as $key => $val ) {
						setcookie( 'wpg_bulk_products_addition[' . $key . ']', '', time() - 86400, '/' );
					}
					foreach ( $bulk_products as $index => $post_id ) {
						setcookie( 'wpg_bulk_products_addition[' . $index . ']', $post_id, time() + 86400, '/' );
					}
				}
			}
		}
		$this->wpg_build_html_from_cookies();
	}
	/**
	 * This function will return the object of free plugin common class.
	 *
	 * @since 3.0.0
	 * @return object
	 */
	public function wpg_return_free_plugin_common_object() {
		require_once PDF_GENERATOR_FOR_WP_DIR_PATH . 'common/class-pdf-generator-for-wp-common.php';
		$pdf_generator_common_class = new Pdf_Generator_For_Wp_Common( 'wordpress-pdf-generator', '3.0.0' );
		return $pdf_generator_common_class;
	}

	/**
	 * Handling ajax request for creating bulk PDF.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wps_wpg_ajax_for_zip_or_pdf() {
		check_ajax_referer( 'wpg_common_nonce', 'nonce' );
		$pdf_generator_common_class = $this->wpg_return_free_plugin_common_object();
		$name                       = array_key_exists( 'name', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
		$mode                       = array_key_exists( 'mode', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['mode'] ) ) : '';
		$product_ids                = isset( $_COOKIE['wpg_bulk_products_addition'] ) ? map_deep( wp_unslash( $_COOKIE['wpg_bulk_products_addition'] ), 'sanitize_text_field' ) : array();
		$upload_dir                 = wp_upload_dir();
		if ( 'pdf_bulk_download_zip' === $name ) {
			$this->zip      = new ZipArchive();
			$upload_basedir = $upload_dir['basedir'] . '/post_to_pdf/';
			$doc_name       = 'document_' . strtotime( gmdate( 'y-m-d H:i:s' ) );
			$zip_path       = $upload_basedir . $doc_name . '.zip';
			if ( file_exists( $zip_path ) ) {
				@unlink( $zip_path ); // phpcs:ignore
			}
			$this->zip->open( $zip_path, ZipArchive::CREATE );
			$general_settings_arr = get_option( 'pgfw_general_settings_save', array() );
			$pdf_file_name        = array_key_exists( 'pgfw_general_pdf_file_name', $general_settings_arr ) ? $general_settings_arr['pgfw_general_pdf_file_name'] : 'post_name';
			foreach ( $product_ids as $product_id ) {
				$post = get_post( $product_id );
				if ( 'custom' === $pdf_file_name ) {
					$pdf_file_name_custom = array_key_exists( 'pgfw_custom_pdf_file_name', $general_settings_arr ) ? $general_settings_arr['pgfw_custom_pdf_file_name'] : '';
					$document_name        = ( ( '' !== $pdf_file_name_custom ) && ( $post ) ) ? $pdf_file_name_custom . '_' . $post->ID : 'document';
				} elseif ( 'post_name' === $pdf_file_name ) {
					$document_name = ( $post ) ? $post->post_title : 'document';
				} else {
					$document_name = ( $post ) ? 'document_' . $post->ID : 'document';
				}
				$path = $upload_basedir . $document_name . '.pdf';
				if ( file_exists( $path ) ) {
					@unlink( $path ); // phpcs:ignore
				}
				$pdf_generator_common_class->pgfw_generate_pdf_from_library( $product_id, 'bulk', 'bulk_zip' );
				$this->zip->addFile( $path, $document_name . '.pdf' );
			}
			$this->zip->close();
			$upload_baseurl = $upload_dir['baseurl'] . '/post_to_pdf/';
			$file_url       = $upload_baseurl . $doc_name . '.zip';
			$file_path      = $zip_path;
		} else {
			$document_name  = $pdf_generator_common_class->pgfw_generate_pdf_from_library( $product_ids, 'bulk', 'continuous_on_same_page', '' );
			$upload_baseurl = $upload_dir['baseurl'] . '/post_to_pdf/';
			$upload_basedir = $upload_dir['basedir'] . '/post_to_pdf/';
			$file_url       = $upload_baseurl . $document_name . '.pdf';
			$file_path      = $upload_basedir . $document_name . '.pdf';
		}
		$email = array_key_exists( 'email', $_POST ) ? sanitize_text_field( wp_unslash( $_POST['email'] ) ) : '';
		if ( 'email' === $mode ) {
			if ( 'use_account_email' === $email ) {
				$current_user = wp_get_current_user();
				$email        = $current_user->user_email;
			}
			if ( ! is_email( $email ) ) {
				?>
				<span style="color:#8e4b86;"><?php esc_html_e( 'Please Enter Valid Email Address to Receive Attachment.', 'wordpress-pdf-generator' ); ?></span>
				<?php
			} else {
				wp_mail( $email, __( 'document form site', 'wordpress-pdf-generator' ), __( 'Please find these attachment', 'wordpress-pdf-generator' ), '', array( $file_path ) );
				?>
				<span style="color:green;"><?php esc_html_e( 'Email Submitted Successfully.', 'wordpress-pdf-generator' ); ?></span><div><?php esc_html_e( 'Thank You For Submitting Your Email. You Will Receive an Email Containing the PDF as Attachment.', 'wordpress-pdf-generator' ); ?></div>
				<?php
			}
		} else {
			echo esc_url( $file_url );
		}
		$current_user = wp_get_current_user();
		$user_name    = $current_user->display_name;
		$email        = ( ( '' !== $email ) && ( $email ) ) ? $email : $current_user->user_email;
		do_action( 'wps_pgfw_update_pdf_details_indb', $product_ids, $user_name, $email );
		wp_die();
	}

	/**
	 * Html for taxonomy listing in PDF modified by pro plugin.
	 *
	 * @since 3.0.0
	 * @param string $html1 html for taxonomy listing in PDF.
	 * @param string $post  post object.
	 * @return string
	 */
	public function wpg_add_taxonomy_to_pdf( $html1, $post ) {
		$post_type                   = get_post_type( $post );
		$pgfw_taxonomy_settings      = get_option( 'pgfw_taxonomy_fields_save_settings', array() );
		$pgfw_show_type_taxonomy_val = array_key_exists( 'pgfw_taxonomy_fields_' . $post_type . '_show', $pgfw_taxonomy_settings ) ? $pgfw_taxonomy_settings[ 'pgfw_taxonomy_fields_' . $post_type . '_show' ] : '';
		$pgfw_show_type_taxonomy_arr = array_key_exists( 'pgfw_taxonomy_fields_' . $post_type . '_list', $pgfw_taxonomy_settings ) ? $pgfw_taxonomy_settings[ 'pgfw_taxonomy_fields_' . $post_type . '_list' ] : array();
		$post_taxonomy_fields        = get_object_taxonomies( $post_type );
		$html1                       = '';
		if ( 'yes' === $pgfw_show_type_taxonomy_val ) {
			if ( is_array( $post_taxonomy_fields ) && count( $post_taxonomy_fields ) > 0 ) {
				foreach ( $post_taxonomy_fields as $taxonomy ) {
					$pgfw_show_taxonomy = array_key_exists( $taxonomy . '_checkbox', $pgfw_taxonomy_settings ) ? $pgfw_taxonomy_settings[ $taxonomy . '_checkbox' ] : '';
					if ( 'yes' === $pgfw_show_taxonomy ) {
						$pgfw_terms     = get_the_terms( $post, $taxonomy );
						$taxonomy_title = array_key_exists( $taxonomy, $pgfw_taxonomy_settings ) && '' !== $pgfw_taxonomy_settings[ $taxonomy ] ? $pgfw_taxonomy_settings[ $taxonomy ] : ucwords( str_replace( '_', ' ', $taxonomy ) );
						if ( is_array( $pgfw_terms ) ) {
							$html1 .= '<div><b>' . $taxonomy_title . '</b></div>';
							$html1 .= '<ol>';
							foreach ( $pgfw_terms as $category ) {
								$html1 .= '<li>' . $category->name . '</li>';
							}
							$html1 .= '</ol>';
						}
					}
				}
			}
		}
		return $html1;
	}

	/**
	 * Html for meta fields by pro plugin.
	 *
	 * @since 3.0.0
	 * @param string $html1 html in free for meta fields.
	 * @param object $_post object.
	 * @return string
	 */
	public function wpg_add_meta_fields_to_pdf( $html1, $_post ) {
		$post_type               = $_post->post_type;
		$pgfw_meta_settings      = get_option( 'pgfw_meta_fields_save_settings', array() );
		$pgfw_show_type_meta_val = array_key_exists( 'pgfw_meta_fields_' . $post_type . '_show', $pgfw_meta_settings ) ? $pgfw_meta_settings[ 'pgfw_meta_fields_' . $post_type . '_show' ] : '';
		$pgfw_show_type_meta_arr = array_key_exists( 'pgfw_meta_fields_' . $post_type . '_list', $pgfw_meta_settings ) ? $pgfw_meta_settings[ 'pgfw_meta_fields_' . $post_type . '_list' ] : array();
		$post_meta_fields        = get_option( 'wps_wpg_meta_fields_in_' . $post_type, array() );
		$html1                   = '';
		if ( 'yes' === $pgfw_show_type_meta_val ) {
			if ( is_array( $post_meta_fields ) ) {
				foreach ( $post_meta_fields as $meta_key ) {
					$wpg_meta_key_use = array_key_exists( $meta_key . '_checkbox', $pgfw_meta_settings ) ? $pgfw_meta_settings[ $meta_key . '_checkbox' ] : '';
					if ( 'yes' === $wpg_meta_key_use ) {
						$meta_val = get_post_meta( $_post->ID, $meta_key, true );
						if ( is_array( $meta_val ) ) {
							$meta_val = implode( ', ', $meta_val );
						}
						$meta_val          = apply_filters( 'wps_wpg_customize_template_meta_fields', $meta_val, $_post->ID, $meta_key );
						$wpg_meta_key_name = array_key_exists( $meta_key, $pgfw_meta_settings ) && '' !== $pgfw_meta_settings[ $meta_key ] ? $pgfw_meta_settings[ $meta_key ] : ucfirst( trim( str_replace( '_', ' ', $meta_key ) ) );
						if ( $meta_val ) {
							$html1 .= '<div><b>' . $wpg_meta_key_name . '</b><br>' . $meta_val . '</div>';
						}
					}
				}
			}
		}
		return $html1;
	}

	/**
	 * Insert file deatils in the db.
	 *
	 * @since 3.0.0
	 * @param string $postid postid of the pdf generated.
	 * @param string $user_name username which generated this file.
	 * @param string $email email ID of the user.
	 * @return void
	 */
	public function wpg_insert_file_details_indb( $postid, $user_name, $email ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'wps_pdflog';
		$wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
			$table_name,
			array(
				'postid'   => is_array( $postid ) ? wp_json_encode( $postid ) : $postid,
				'username' => esc_html( ( '' === $user_name || ! ( $user_name ) ) ? 'guest' : $user_name ),
				'email'    => esc_html( $email ),
				'time'     => current_time( 'mysql' ),
			)
		);
	}

	/**
	 * Initialising shortcodes to get various details of products.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_shortcode_to_get_product_details() {
		add_shortcode( 'WPS_WPG_TITLE', array( $this, 'wpg_shortcode_callback_return_title' ) );
		add_shortcode( 'WPS_WPG_DESCRIPTION', array( $this, 'wpg_shortcode_callback_return_description' ) );
		add_shortcode( 'WPS_WPG_METAFIELDS', array( $this, 'wpg_shortcode_callback_return_metafields' ) );
		add_shortcode( 'WPS_WPG_TAXONOMY', array( $this, 'wpg_shortcode_callback_return_taxonomy' ) );
		add_shortcode( 'WPS_WPG_POST_CREATEDDATE', array( $this, 'wpg_shortcode_callback_return_post_date' ) );
		add_shortcode( 'WPS_WPG_POST_AUTHOR', array( $this, 'wpg_shortcode_callback_return_post_author' ) );
		add_shortcode( 'WPS_WPG_THUMBNAIL', array( $this, 'wpg_shortcode_callback_return_post_thumbnail' ) );
		add_shortcode( 'WPS_POST_METAVALUE', array( $this, 'wpg_shortcode_callback_return_single_meta_value' ) );
	}

	/**
	 * Shortcode callback to get meta value.
	 *
	 * @param array $atts array containing the attributes of the shortcode.
	 * @since 3.0.2
	 * @return string
	 */
	public function wpg_shortcode_callback_return_single_meta_value( $atts ) {
		$atts     = shortcode_atts(
			array(
				'id'  => '',
				'key' => '',
			),
			$atts
		);
		$meta_val = get_post_meta( $atts['id'], $atts['key'], true );
		if ( is_array( $meta_val ) ) {
			$meta_val = implode( ', ', $meta_val );
		}
		return $meta_val;
	}

	/**
	 * Shortcode callback to get title.
	 *
	 * @since 3.0.0
	 * @param array $atts attributes of shortcode.
	 * @return string
	 */
	public function wpg_shortcode_callback_return_title( $atts ) {
		$atts = shortcode_atts(
			array(
				'id' => 0,
			),
			$atts
		);
		$post = get_post( $atts['id'] );
		return isset( $post->post_title ) ? do_shortcode( apply_filters( 'the_title', $post->post_title ) ) : '';
	}

	/**
	 * Shortcode callback to get description.
	 *
	 * @since 3.0.0
	 * @param array $atts attributes of shortcode.
	 * @return string
	 */
	public function wpg_shortcode_callback_return_description( $atts ) {
		$atts = shortcode_atts(
			array(
				'id' => 0,
			),
			$atts
		);
		$post = get_post( $atts['id'] );
		return isset( $post->post_content ) ? do_shortcode( apply_filters( 'the_content', apply_filters( 'wps_wpg_customize_template_post_content', $post->post_content, $post ) ) ) : '';
	}

	/**
	 * Shortcode callback to get metafields.
	 *
	 * @since 3.0.0
	 * @param array $atts attributes of shortcode.
	 * @return string
	 */
	public function wpg_shortcode_callback_return_metafields( $atts ) {
		$atts = shortcode_atts(
			array(
				'id' => 0,
			),
			$atts
		);
		$post = get_post( $atts['id'] );
		$html = $this->wpg_add_meta_fields_to_pdf( '', $post );
		return $html;
	}

	/**
	 * Shortcode callback to get taxonomy.
	 *
	 * @since 3.0.0
	 * @param array $atts attributes of shortcode.
	 * @return string
	 */
	public function wpg_shortcode_callback_return_taxonomy( $atts ) {
		$atts = shortcode_atts(
			array(
				'id' => 0,
			),
			$atts
		);
		$post = get_post( $atts['id'] );
		$html = $this->wpg_add_taxonomy_to_pdf( '', $post );
		return $html;
	}

	/**
	 * Shortcode callback to get taxonomy.
	 *
	 * @since 3.0.0
	 * @param array $atts attributes of shortcode.
	 * @return string
	 */
	public function wpg_shortcode_callback_return_post_date( $atts ) {
		$atts = shortcode_atts(
			array(
				'id' => 0,
			),
			$atts
		);

		$post                  = get_post( $atts['id'] );
		$created_date          = '';
		$general_settings_data = get_option( 'pgfw_general_settings_save', array() );
		$pgfw_show_post_date   = array_key_exists( 'pgfw_general_pdf_show_post_date', $general_settings_data ) ? $general_settings_data['pgfw_general_pdf_show_post_date'] : '';
		if ( 'yes' === $pgfw_show_post_date ) {
			$created_date = get_the_date( 'F Y', $post );
		}
		return $created_date;
	}

	/**
	 * Shortcode callback to get taxonomy.
	 *
	 * @since 3.0.0
	 * @param array $atts attributes of shortcode.
	 * @return string
	 */
	public function wpg_shortcode_callback_return_post_author( $atts ) {
		$atts        = shortcode_atts(
			array(
				'id' => 0,
			),
			$atts
		);
		$post        = get_post( $atts['id'] );
		$author_name = '';

		$general_settings_data = get_option( 'pgfw_general_settings_save', array() );
		$pgfw_show_post_author = array_key_exists( 'pgfw_general_pdf_show_author_name', $general_settings_data ) ? $general_settings_data['pgfw_general_pdf_show_author_name'] : '';
		if ( 'yes' === $pgfw_show_post_author ) {
			$author_id   = $post->post_author;
			$author_name = get_the_author_meta( 'user_nicename', $author_id );
		}
		return $author_name;
	}

	/**
	 * Shortcode callback to get taxonomy.
	 *
	 * @since 3.0.0
	 * @param array $atts attributes of shortcode.
	 * @return string
	 */
	public function wpg_shortcode_callback_return_post_thumbnail( $atts ) {
		$atts = shortcode_atts(
			array(
				'id'     => 0,
				'width'  => false,
				'height' => false,
			),
			$atts
		);

		$post          = get_post( $atts['id'] );
		$thumbnail_url = get_the_post_thumbnail_url( $post );
		if ( ! $atts['width'] && ! $atts['height'] ) {
			$thumbnail = '<img src=' . $thumbnail_url . ' alt="post thumbnail" />';
		} else {
			$thumbnail = '<img src=' . $thumbnail_url . ' alt="post thumbnail" width=' . $atts['width'] . ' height=' . $atts['height'] . '/>';
		}
		return $thumbnail;
	}
	/**
	 * Adding watermark image in pdf.
	 *
	 * @since 3.0.0
	 * @param string $html html to generate pdf for.
	 * @return string
	 */
	public function wpg_watermark_image_pdf_body_html( $html ) {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'common/templates/wordpress-pdf-generator-common-watermark-imagetemplate.php';
		$html = wpg_watermark_html( $html );
		return $html;
	}
	/**
	 * Returning custom template page for PDF generation.
	 *
	 * @since 3.0.0
	 * @param string  $template_file_path template file path to load PDF.
	 * @param string  $template_file_name file name of the template loading.
	 * @param integer $post_id post id to generate PDF for.
	 * @return string
	 */
	public function wpg_load_custom_template_for_pdf_generation( $template_file_path, $template_file_name, $post_id ) {
		$wpg_use_template_to_generate_pdf = get_option( 'wpg_use_template_to_generate_pdf' );
		$template_file_name_pro           = WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/partials/pdf_templates/wordpress-pdf-generator-admin-' . $template_file_name . '.php';
		$custom_template_data             = get_option( 'wpg_custom_templates_list', array() );
		if ( array_key_exists( $wpg_use_template_to_generate_pdf, $custom_template_data ) ) {
			return WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/partials/pdf_templates/wordpress-pdf-generator-custom-template.php';
		} elseif ( file_exists( $template_file_name_pro ) ) {
			return $template_file_name_pro;
		}
		return $template_file_path;
	}
	/**
	 * Preview for pdf generated after template selection.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_preview_for_generted_pdf() {
		if ( isset( $_GET['action'] ) && 'previewpdf' === $_GET['action'] ) { // phpcs:ignore WordPress.Security.NonceVerification
			$template                   = isset( $_GET['template'] ) ? sanitize_text_field( wp_unslash( $_GET['template'] ) ) : 'template1'; // phpcs:ignore WordPress.Security.NonceVerification
			$pdf_generator_common_class = $this->wpg_return_free_plugin_common_object();
			$custom_template_data       = get_option( 'wpg_custom_templates_list', array() );
			if ( array_key_exists( $template, $custom_template_data ) ) {
				$template_path = WORDPRESS_PDF_GENERATOR_DIR_PATH . 'admin/partials/pdf_templates/wordpress-pdf-generator-custom-template.php';
			} else {
				$template_path = PDF_GENERATOR_FOR_WP_DIR_PATH . 'admin/partials/pdf_templates/pdf-generator-for-wp-admin-' . $template . '.php';
			}
			$pgfw_advanced_settings  = get_option( 'pgfw_advanced_save_settings', array() );
			$pgfw_advanced_icon_show = array_key_exists( 'pgfw_advanced_show_post_type_icons', $pgfw_advanced_settings ) ? $pgfw_advanced_settings['pgfw_advanced_show_post_type_icons'] : array();

			$args        = array(
				'posts_per_page' => 1,
				'orderby'        => 'rand',
				'post_type'      => ( is_array( $pgfw_advanced_icon_show ) && array_key_exists( 'product', $pgfw_advanced_icon_show ) ) ? 'product' : 'post',
			);
			$single_post = get_posts( $args );
			$post_id     = false;
			if ( is_array( $single_post ) ) {
				foreach ( $single_post as $post ) {
					$post_id = isset( $post->ID ) ? $post->ID : '';
				}
			}
			if ( $post_id ) {
				$pdf_generator_common_class->pgfw_generate_pdf_from_library( $post_id, 'preview', 'preview', '', $template_path, $template );
			}
		}
	}
	/**
	 * Add cover page to the single PDF.
	 *
	 * @since 3.0.0
	 * @param string $html html for cover page.
	 * @return string
	 */
	public function wpg_add_cover_page_to_single_pdf( $html ) {
		$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
		$coverpage_single_enable     = array_key_exists( 'wpg_cover_page_single_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_single_enable'] : '';
		if ( 'yes' === $coverpage_single_enable ) {
			$wpg_use_cover_page_template = get_option( 'wpg_use_cover_page_template' );
			$html                        = $this->wpg_load_front_page_template( $wpg_use_cover_page_template );
		}
		return $html;
	}
	/**
	 * Load template for front page.
	 *
	 * @param int $wpg_use_cover_page_template template number to load.
	 * @return string
	 */
	public function wpg_load_front_page_template( $wpg_use_cover_page_template ) {
		switch ( (int) $wpg_use_cover_page_template ) {
			case 1:
				$html = $this->wpg_add_cover_page_template_one();
				break;
			case 2:
				$html = $this->wpg_add_cover_page_template_two();
				break;
			case 3:
				$html = $this->wpg_add_cover_page_template_three();
				break;
			case 4:
				$html = $this->wpg_add_cover_page_template_four();
				break;
			default:
				$html = $this->wpg_add_cover_page_template_one();
				break;
		}
		return $html;
	}
	/**
	 * Add cover page to the bulk PDF.
	 *
	 * @since 3.0.0
	 * @param string $html for cover page.
	 * @return string
	 */
	public function wpg_add_cover_page_to_bulk_pdf( $html ) {
		$wpg_coverpage_settings_data = get_option( 'pgfw_coverpage_setting_save', array() );
		$coverpage_bulk_enable       = array_key_exists( 'wpg_cover_page_bulk_enable', $wpg_coverpage_settings_data ) ? $wpg_coverpage_settings_data['wpg_cover_page_bulk_enable'] : '';
		if ( 'yes' === $coverpage_bulk_enable ) {
			$wpg_use_cover_page_template = get_option( 'wpg_use_cover_page_template' );
			$html                        = $this->wpg_load_front_page_template( $wpg_use_cover_page_template );
		}
		return $html;
	}
	/**
	 * Adding cover page template one to PDF.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public function wpg_add_cover_page_template_one() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'common/templates/wordpress-pdf-generator-common-coverpage-templates.php';
		$html = wpg_coverpage_template_1();
		return $html;
	}
	/**
	 * Adding cover page template two to PDF.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public function wpg_add_cover_page_template_two() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'common/templates/wordpress-pdf-generator-common-coverpage-templates.php';
		$html = wpg_coverpage_template_2();
		return $html;
	}
	/**
	 * Adding cover page template three to PDF.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public function wpg_add_cover_page_template_three() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'common/templates/wordpress-pdf-generator-common-coverpage-templates.php';
		$html = wpg_coverpage_template_3();
		return $html;
	}
	/**
	 * Adding cover page template four to PDF.
	 *
	 * @since 3.0.0
	 * @return string
	 */
	public function wpg_add_cover_page_template_four() {
		require_once WORDPRESS_PDF_GENERATOR_DIR_PATH . 'common/templates/wordpress-pdf-generator-common-coverpage-templates.php';
		$html = wpg_coverpage_template_4();
		return $html;
	}
	/**
	 * Validate license key.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wps_wpg_validate_license_key() {
		global $wpdb;
		check_ajax_referer( 'wps_wpg_license_nonce', 'nonce' );
		$wps_wpg_purchase_code = isset( $_POST['purchase_code'] ) ? sanitize_text_field( wp_unslash( $_POST['purchase_code'] ) ) : '';
		$api_params            = array(
			'slm_action'         => 'slm_activate',
			'secret_key'         => WORDPRESS_PDF_GENERATOR_SPECIAL_SECRET_KEY,
			'license_key'        => $wps_wpg_purchase_code,
			'_registered_domain' => isset( $_SERVER['SERVER_NAME'] ) ? sanitize_text_field( wp_unslash( $_SERVER['SERVER_NAME'] ) ) : '',
			'item_reference'     => rawurlencode( WORDPRESS_PDF_GENERATOR_ITEM_REFERENCE ),
			'product_reference'  => 'MWBPK-13249',
		);
		$query                 = esc_url_raw( add_query_arg( $api_params, WORDPRESS_PDF_GENERATOR_LICENSE_SERVER_URL ) );
		$request               = array(
			'method'      => 'GET',
			'timeout'     => 120,
			'redirection' => 5,
			'httpversion' => '1.0',
			'blocking'    => true,
			'cookies'     => array(),
			'sslverify'   => false,
		);
		$wps_wpg_response      = wp_remote_get( $query, $request );
		if ( is_wp_error( $wps_wpg_response ) ) {
			echo wp_json_encode(
				array(
					'status' => false,
					'msg'    => __( 'An unexpected error occurred. Please try again.', 'wordpress-pdf-generator' ),
				)
			);
		} else {
			$wps_wpg_license_data = json_decode( wp_remote_retrieve_body( $wps_wpg_response ) );
			if ( isset( $wps_wpg_license_data->result ) && 'success' === $wps_wpg_license_data->result ) {
				if ( is_multisite() ) {
					$blog_ids = $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" ); // phpcs:ignore WordPress
					foreach ( $blog_ids as $blog_id ) {
						switch_to_blog( $blog_id );
						update_option( 'wps_wpg_license_key', $wps_wpg_purchase_code );
						update_option( 'wps_wpg_license_check', true );
						restore_current_blog();
					}
				} else {
					update_option( 'wps_wpg_license_key', $wps_wpg_purchase_code );
					update_option( 'wps_wpg_license_check', true );
				}
				echo wp_json_encode(
					array(
						'status' => true,
						'msg'    => __( 'Successfully Verified. Please Wait.', 'wordpress-pdf-generator' ),
					)
				);
			} else {
				echo wp_json_encode(
					array(
						'status' => false,
						'msg'    => $wps_wpg_license_data->message,
					)
				);
			}
		}
		wp_die();
	}
	/**
	 * Wp bakery shortcode loader.
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function wpg_load_all_compatible_shortcode_loader() {
		// wp-bakery shortcode loader.
		if ( class_exists( 'WPBMap' ) ) {
			WPBMap::addAllMappedShortcodes();
		}
		// divi page builder shortcode loader.
		if ( function_exists( 'et_builder_add_main_elements' ) ) {
			et_builder_add_main_elements();
		}
	}
}
