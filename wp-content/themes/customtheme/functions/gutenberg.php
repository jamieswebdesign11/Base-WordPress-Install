<?php


add_filter( 'allowed_block_types', 'misha_allowed_block_types' );
 
function misha_allowed_block_types( $allowed_blocks ) {
 
 return array (
    'acf/labeled-content',
    'acf/side-by-side-images',
    'acf/staff',
    'acf/form',
    'acf/copy-with-image',
    'core/separator',
    'core/paragraph',
	'core/image',
    //'core/gallery',
    'core/shortcode',
    'core/quote',
    'core/file',
    'core/heading',
    'core/embed',
    'core/buttons',
	'core/list'
	);
 
}

?>