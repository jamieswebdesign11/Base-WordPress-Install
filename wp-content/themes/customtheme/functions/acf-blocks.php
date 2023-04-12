<?php
function customtheme_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'customtheme-blocks',
				'title' => __( 'Custom Theme Blocks', 'customtheme-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'customtheme_block_category', 10, 2);

add_action('acf/init', 'my_acf_init');
function my_acf_init() {
	
	// check function exists
	if( function_exists('acf_register_block') ) {
		
		//put custom blocks here
		
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