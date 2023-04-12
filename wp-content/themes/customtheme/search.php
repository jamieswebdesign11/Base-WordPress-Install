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
 * @subpackage customtheme
 * @since customtheme 1.0
 */


get_header(); ?>
	
	<div id="searchresults" class="site-wrap">
	
		<?php get_template_part( 'template-parts/search/search', 'header' ); ?>
	
		<?php get_template_part( 'template-parts/search/search', 'filter' ); ?>
	
		<div class="search-results__listing wysiwyg">
	
		<?php
		if ( have_posts() ) {
			
			while ( have_posts() ) {
				the_post();
	
				get_template_part( 'template-parts/search/search', 'teaser');
			}
			
			echo '<div class="pagination-wrapper reveal">';
				$args = array(
					'prev_text'	=> __('Prev'),
					'mid_size'	=> 3,
				);
				the_posts_pagination($args);
				echo '<div class="pagination__return"><a href="#searchresults">Return to top</a></div>';
			echo '</div>';
	
		} else {
			echo '<div class="search__no-results">No results found.</div>';
		}
	?>
	
		</div>
	
	</div>

<?php get_footer(); ?>