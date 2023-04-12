<?php
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
  
    <article class="site-wrap">
      
        <?php get_template_part( 'template-parts/page/page', 'header' ); ?>
  
        <div id="top" class="site-column wysiwyg">
          
          <?php the_content(); ?>
        
        </div>
      
    </article>

  <?php endwhile; ?>
  
<?php get_footer(); ?>