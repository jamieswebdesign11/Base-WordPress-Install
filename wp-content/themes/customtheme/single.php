<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage lococo
 * @since lococo 1.0
 */

get_header(); ?>

  <?php while ( have_posts() ) : the_post(); ?>
  
    <article id="news" class="news-detail-wrapper site-wrap">
      
        <?php
        $categories = get_the_category();
        $terms = '';
        foreach ($categories as $cat) {
          $terms .= '<span class="news-item__category type__caps">'.$cat->name.'</span>';
        }
        
        echo '<header class="news-header">';
          echo '<h1 class="news-headline type__heading-one reveal">'.get_the_title().'</h1>';
          echo '<div class="news-header__post-meta reveal">';
            if (!empty($terms)) echo '<div class="news-item__category-list">'.$terms.'</div><span class="separator"> | </span><time class="news-item__date" datetime="'.get_the_date('Y-m-d').'">'.get_the_date('F j, Y').'</time>';
          echo '</div>';
        echo '</header>';
        ?>
        
        <?php
        // Post Thumbnail
        if (has_post_thumbnail()) {
          echo '<figure class="news-post-image wp-block-image size-large">';
            echo '<span class="img-hover reveal-img">';
            the_post_thumbnail('large');
            echo '</span>';
          echo '</figure>';
        }
        ?>
    
        <div class="site-column wysiwyg">
          
          <?php the_content(); ?>
        
        </div>
        
        <?php
        echo '<div class="pagination-wrapper reveal">';
          echo '<div class="pagination__back"><a class="wp-block-button__link back" href="/news/" data-text="View All News">View All News</a></div>';
          echo '<div class="pagination__return"><a href="#news">Return to top</a></div>';
        echo '</div>';
        ?>
      
    </article>

  <?php endwhile; ?>
  
<?php get_footer(); ?>