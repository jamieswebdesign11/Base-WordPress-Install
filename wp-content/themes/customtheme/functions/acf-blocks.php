<?php
function lococo_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'lococo-blocks',
				'title' => __( 'Lococo Blocks', 'lococo-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'lococo_block_category', 10, 2);

add_action('acf/init', 'my_acf_init');
function my_acf_init() {
	
	// check function exists
	if( function_exists('acf_register_block') ) {
		
		// Copy with Image Block
		acf_register_block(array(
			'name'				=> 'copy-with-image',
			'title'				=> __('Copy with Image'),
			'description'		=> __('Block contains a headline, short description, optional link and an image.'),
			'render_callback'	=> 'my_acf_block_render_callback',
			'category'			=> 'lococo-blocks',
			'icon'				=> 'edit-large',
			'keywords'			=> array( 'description', 'headline','image','copy','side by side' ),
      'supports' => array( 'anchor' => true ),
      'mode' => array('preview','edit'),
			'example'  => array(
					'attributes' => array(
							'mode' => 'preview',
							'data' => array(
								'preview_alt-content' => '/wp-content/themes/lococo/assets/images/blocks/preview_copy-with-image.jpg',
							)
					)
			)
		));
		
		// Form Block
		acf_register_block(array(
			'name'				=> 'form',
			'title'				=> __('Form'),
			'description'		=> __('Block with form and optional second column.'),
			'render_callback'	=> 'my_acf_block_render_callback',
			'category'			=> 'lococo-blocks',
			'icon'				=> 'edit-large',
			'keywords'			=> array( 'form', 'column'),
			'supports' => array( 'anchor' => true ),
			'mode' => array('preview','edit'),
			'example'  => array(
					'attributes' => array(
							'mode' => 'preview',
							'data' => array(
								'preview_form' => '/wp-content/themes/lococo/assets/images/blocks/preview_form.jpg',
							)
					)
			)
		));
		
		// Labeled Content Block
		acf_register_block(array(
			'name'				=> 'labeled-content',
			'title'				=> __('Labeled Content'),
			'description'		=> __('Block of copy with side label.'),
			'render_callback'	=> 'my_acf_block_render_callback',
			'category'			=> 'lococo-blocks',
			'icon'				=> 'edit-large',
			'keywords'			=> array( 'copy', 'label'),
			'supports' => array( 'anchor' => true ),
			'mode' => array('preview','edit'),
			'example'  => array(
					'attributes' => array(
							'mode' => 'preview',
							'data' => array(
								'preview_form' => '/wp-content/themes/lococo/assets/images/blocks/preview_labeled-content.jpg',
							)
					)
			)
		));
		
		
		// Side by Side Images Block
		acf_register_block(array(
			'name'				=> 'side-by-side-images',
			'title'				=> __('Side by Side Images'),
			'description'		=> __('Two images side by side.'),
			'render_callback'	=> 'my_acf_block_render_callback',
			'category'			=> 'lococo-blocks',
			'icon'				=> 'edit-large',
			'keywords'			=> array( 'image', 'side'),
			'supports' => array( 'anchor' => true ),
			'mode' => array('preview','edit'),
			'example'  => array(
					'attributes' => array(
							'mode' => 'preview',
							'data' => array(
								'preview_form' => '/wp-content/themes/lococo/assets/images/blocks/preview_side-by-side-images.jpg',
							)
					)
			)
		));
		
		// Staff Block
		acf_register_block(array(
			'name'				=> 'staff',
			'title'				=> __('Staff Block'),
			'description'		=> __('Grid of people (staff).'),
			'render_callback'	=> 'my_acf_block_render_callback',
			'category'			=> 'lococo-blocks',
			'icon'				=> 'edit-large',
			'keywords'			=> array( 'image', 'people','staff','team','grid'),
			'supports' => array( 'anchor' => true ),
			'mode' => array('preview','edit'),
			'example'  => array(
					'attributes' => array(
							'mode' => 'preview',
							'data' => array(
								'preview_form' => '/wp-content/themes/lococo/assets/images/blocks/preview_staff.jpg',
							)
					)
			)
		));
		
	}
}

function my_acf_block_render_callback( $block ) {
	
	// convert name ("acf/testimonial") into path friendly slug ("testimonial")
	$slug = str_replace('acf/', '', $block['name']);
	
	if( file_exists( get_theme_file_path("/blocks/content-{$slug}.php") ) ) {
		include( get_theme_file_path("/blocks/content-{$slug}.php") );
	}
}

function wpdocs_enqueue_custom_admin_style() {
  wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/blocks/blocks.css', false, '1.0.0' );
  wp_enqueue_style( 'custom_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'wpdocs_enqueue_custom_admin_style' );
?>