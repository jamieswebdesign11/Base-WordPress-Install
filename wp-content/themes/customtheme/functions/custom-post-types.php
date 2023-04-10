<?php
function custom_post_types_init() {
  
    $labels = array(
      'name' => _x('Artists', 'post type general name'),
      'singular_name' => _x('Artist', 'post type singular name'),
      'add_new' => _x('Add New Artist',''),
      'add_new_item' => __('Add Artist'),
      'edit_item' => __('Edit Artist'),
      'new_item' => __('New Artist'),
      'all_items' => __('All Artists'),
      'view_item' => __('View Artist'),
      'search_items' => __('Search Artists'),
      'not_found' =>  __('No Artists found'),
      'not_found_in_trash' => __('No Artists found in Trash'), 
      'parent_item_colon' => '',
      'menu_name' => __('Artists')
    );
    $args = array(
      'labels' => $labels,
      'public' => true,
      'exclude_from_search' => false,
      'show_in_menu' => true, 
      'has_archive' => true, 
      'menu_position' => null,
      'rewrite' => array('slug' => 'artists','with_front' => false),
      'show_in_rest' => true,
      'supports' => array('title')
    ); 
    register_post_type('artists',$args);
    
    $labels = array(
      'name'              => _x( 'Category', 'taxonomy general name' ),
      'singular_name'     => _x( 'Category', 'taxonomy singular name' ),
      'search_items'      => __( 'Search Categories' ),
      'all_items'         => __( 'All Categories' ),
      'parent_item'       => __( 'Parent Category' ),
      'parent_item_colon' => __( 'Parent Category:' ),
      'edit_item'         => __( 'Edit Category' ),
      'update_item'       => __( 'Update Category' ),
      'add_new_item'      => __( 'Add New Category' ),
      'new_item_name'     => __( 'New Category' ),
      'menu_name'         => __( 'Categories' ),
    );
    
    $args = array(
      'hierarchical'      => true,
      'labels'            => $labels,
      'show_ui'           => true,
      'show_in_rest'      => true,
      'rewrite' => array('slug' => 'artist-type','with_front' => false),
      'show_admin_column' => true,
      'query_var'         => true,
    );
    
    register_taxonomy( 'artist-type', array( 'artists' ), $args );
    
    
    $labels = array(
      'name'              => _x( 'Technique', 'taxonomy general name' ),
      'singular_name'     => _x( 'Technique', 'taxonomy singular name' ),
      'search_items'      => __( 'Search Techniques' ),
      'all_items'         => __( 'All Techniques' ),
      'parent_item'       => __( 'Parent Technique' ),
      'parent_item_colon' => __( 'Parent Technique:' ),
      'edit_item'         => __( 'Edit Technique' ),
      'update_item'       => __( 'Update Technique' ),
      'add_new_item'      => __( 'Add New Technique' ),
      'new_item_name'     => __( 'New Technique' ),
      'menu_name'         => __( 'Techniques' ),
    );
    
    $args = array(
      'hierarchical'      => true,
      'labels'            => $labels,
      'show_ui'           => true,
      'show_in_rest'      => true,
      'rewrite' => array('slug' => 'technique','with_front' => false),
      'show_admin_column' => true,
      'query_var'         => true,
    );
    
    register_taxonomy( 'technique', array( 'product' ), $args );
    
    $labels = array(
      'name'              => _x( 'Subject', 'taxonomy general name' ),
      'singular_name'     => _x( 'Subject', 'taxonomy singular name' ),
      'search_items'      => __( 'Search Subjects' ),
      'all_items'         => __( 'All Subjects' ),
      'parent_item'       => __( 'Parent Subject' ),
      'parent_item_colon' => __( 'Parent Subject:' ),
      'edit_item'         => __( 'Edit Subject' ),
      'update_item'       => __( 'Update Subject' ),
      'add_new_item'      => __( 'Add New Subject' ),
      'new_item_name'     => __( 'New Subject' ),
      'menu_name'         => __( 'Subjects' ),
    );
    
    $args = array(
      'hierarchical'      => true,
      'labels'            => $labels,
      'show_ui'           => true,
      'show_in_rest'      => true,
      'rewrite' => array('slug' => 'subject','with_front' => false),
      'show_admin_column' => true,
      'query_var'         => true,
    );
    
    register_taxonomy( 'subject', array( 'product' ), $args );
    
    $labels = array(
      'name'              => _x( 'Color', 'taxonomy general name' ),
      'singular_name'     => _x( 'Color', 'taxonomy singular name' ),
      'search_items'      => __( 'Search Colors' ),
      'all_items'         => __( 'All Colors' ),
      'parent_item'       => __( 'Parent Color' ),
      'parent_item_colon' => __( 'Parent Color:' ),
      'edit_item'         => __( 'Edit Color' ),
      'update_item'       => __( 'Update Color' ),
      'add_new_item'      => __( 'Add New Color' ),
      'new_item_name'     => __( 'New Color' ),
      'menu_name'         => __( 'Colors' ),
    );
    
    $args = array(
      'hierarchical'      => true,
      'labels'            => $labels,
      'show_ui'           => true,
      'show_in_rest'      => true,
      'rewrite' => array('slug' => 'color','with_front' => false),
      'show_admin_column' => true,
      'query_var'         => true,
    );
    
    register_taxonomy( 'color', array( 'product' ), $args );
}
add_action( 'init', 'custom_post_types_init' );

?>