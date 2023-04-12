<?php
if ( ! function_exists( 'customtheme_setup' ) ) :
function customtheme_setup() {
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
  
  //add_image_size('small-gallery', 780, 500, true);
  
  add_theme_support('html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	));

	add_editor_style( 'editor-style.css' );
  
  remove_theme_support( 'core-block-patterns' );
  
  /*
  $authorarchives = get_page_by_title('Author Archives');
  add_rewrite_tag('%authorslug%', '([^&]+)');
  add_rewrite_tag('%currentpage%', '([^&]+)'); add_rewrite_rule('^insights-by-author/([^/]*)?/?([^/]*)?/?','index.php?page_id='.$authorarchives->ID.'&authorslug=$matches[1]&currentpage=$matches[2]','top');
  */

  
  register_nav_menus( array(
    'primary' => __( 'Main Navigation', 'customtheme' ),
    'tertiary' => __( 'Tertiary Navigation', 'customtheme' ),
    'footer' => __( 'Footer Navigation', 'customtheme' ),
    'footer-utility' => __( 'Footer Utility Navigation', 'customtheme' ),
	));
}
endif; // customtheme_setup
add_action( 'after_setup_theme', 'customtheme_setup' );


if( function_exists('acf_add_options_page') ) {	
	acf_add_options_page('Site Options');
}


function my_myme_types($mime_types){
    $mime_types['svg'] = 'image/svg+xml'; //Adding svg extension
    return $mime_types;
}
add_filter('upload_mimes', 'my_myme_types', 1, 1);



function new_excerpt_more( $more ) {
    return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');

function custom_excerpt_length( $length ) {
	return 15;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );


add_action( 'pre_get_posts', 'news_query_posts_per_page' );
function news_query_posts_per_page( $query ) {
  /*
  if ( ($query->is_main_query() && !is_admin() && is_archive('artists') && !is_tax('artist-type'))) {
    $taxarray = array(
      array(
          'taxonomy' => 'artist-type',
          'field'    => 'slug',
          'terms'    => 'published-artists',
      ),
    );
    $query->set('posts_per_page',-1);
    $query->set('tax_query',$taxarray);
  }
  */
  
  if ( $query->is_main_query() && !is_admin() && is_archive('artists')) {
    $query->set('posts_per_page',-1);
  }
  
  if ( $query->is_main_query() && !is_admin() && is_tax('product_cat')) {
    $query->set('posts_per_page',24);
    $query->set('orderby','date');
    $query->set('order','DESC');
  } 
}

// Function to change "posts" to "news" in the admin side menu
function change_post_menu_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'News';
    $submenu['edit.php'][5][0] = 'News';
    $submenu['edit.php'][10][0] = 'Add News';
    $submenu['edit.php'][16][0] = 'Tags';
    echo '';
}
add_action( 'admin_menu', 'change_post_menu_label' );
// Function to change post object labels to "news"
function change_post_object_label() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'News';
    $labels->singular_name = 'News';
    $labels->add_new = 'Add News';
    $labels->add_new_item = 'Add News';
    $labels->edit_item = 'Edit News';
    $labels->new_item = 'News';
    $labels->view_item = 'View News';
    $labels->search_items = 'Search News';
    $labels->not_found = 'No News found';
    $labels->not_found_in_trash = 'No News found in Trash';
}
add_action( 'init', 'change_post_object_label' );

add_filter( 'facetwp_facet_display_value', function( $label, $params ) {

    // only apply to a facet named "available"
    if ( 'available' == $params['facet']['name'] ) {

        // get the raw value
        $val = $params['row']['facet_value'];

        // use the raw value to generate the image URL
        $label = 'Available for Purchase';
        $label = str_replace( '{val}', $val, $label );
    }
    
    return $label;
}, 10, 2 );