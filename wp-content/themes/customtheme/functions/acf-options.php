<?php

// Site Options
if( function_exists('acf_add_options_page') ) {
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Global Settings',
		'menu_title'	=> 'lococo',
		'parent_slug'	=> 'options-general.php',
	));
}

?>