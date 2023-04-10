<?php
function my_mce_before_init_insert_formats( $init_array ) {  
	// Define the style_formats array
	$style_formats = array(  
		// Each array child is a format with it's own settings
    array(
			'title' => 'Heading Two',
			'block' => 'h2',
      'classes' => 'type__heading-two'
		),
    array(  
			'title' => 'Heading Three',
			'block' => 'h3',
      'classes' => 'type__heading-three'
		),
		array(  
			'title' => 'Button',
			'block' => 'a',
			'classes' => 'wp-block-button__link'
		),
	);  
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array['style_formats'] = json_encode( $style_formats );  
	
	return $init_array;  
  
} 
// Attach callback to 'tiny_mce_before_init' 
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );  
?>