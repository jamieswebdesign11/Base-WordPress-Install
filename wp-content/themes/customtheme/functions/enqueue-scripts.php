<?php

//1.0 - Deregister Scripts
/*
function customtheme_modify_jquery() {
	if (!is_admin()) { wp_deregister_script('jquery'); }
}
add_action('wp_enqueue_scripts', 'customtheme_modify_jquery');
*/

//2.0 - Enqueue scripts
function customtheme_scripts() {
	$verion = 21;
	// 2.1 - Style Sheets
	
	wp_enqueue_style( 'inter-google', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap', array(), true, 'all' );
	wp_enqueue_style( 'customtheme-style', get_template_directory_uri() . '/assets/css/site.min.css?v='.$verion, array(), true, 'all' );
	
	// 2.2 - Scripts 
    wp_enqueue_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), true );
    //wp_enqueue_script( 'vimeo', 'https://player.vimeo.com/api/player.js', array(), true );
    wp_enqueue_script( 'customtheme-scripts', get_template_directory_uri() . '/assets/javascript/site.min.js?v='.$version, array(), true );
}
add_action( 'wp_enqueue_scripts', 'customtheme_scripts' );