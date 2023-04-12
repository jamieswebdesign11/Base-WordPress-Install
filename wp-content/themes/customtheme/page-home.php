<?php
/*
	Template Name: Home
*/
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage customtheme
 * @since customtheme 1.0
 */

get_header(); ?>

  <?php while ( have_posts() ) : the_post(); ?>
  
    <div class="site-wrap">
  
        <div class="site-column wysiwyg">
          
          <?php the_content(); ?>
        
        </div>
      
    </div>
  
  <?php endwhile; ?>
  
<?php get_footer(); ?>