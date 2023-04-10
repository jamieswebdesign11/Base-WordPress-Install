<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage lococo
 * @since lococo 1.0
 */


get_header(); ?>

  <div class="site-wrap">
    
      <?php get_template_part( 'template-parts/news/news', 'header' ); ?>
  
      <div id="news" class="news-landing">
        
        <?php
        if ( have_posts() ) {
          // Load posts loop.
          while ( have_posts() ) {
            the_post();
        
            get_template_part( 'template-parts/news/news', 'teaser');
          }
          
          echo '<div class="pagination-wrapper reveal">';
            the_posts_pagination();
            echo '<div class="pagination__return"><a href="#news">Return to top</a></div>';
          echo '</div>';
          
        } else {
        
          // If no content, include the "No posts found" template.
          //get_template_part( 'template-parts/content/content-none' );
        
        }
        ?>
      
      </div>
    
  </div>
  
<?php get_footer(); ?>