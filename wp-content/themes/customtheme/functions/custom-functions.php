<?php

function sharefacebook($url,$title) {
  return 'https://www.facebook.com/sharer/sharer.php?u='.$url;
}
function sharetwitter($url,$title) {
  return 'https://twitter.com/intent/tweet?text='.$title.'&url='.$url.'&via=';
}
function sharelinkedin($url,$title) {
  return 'https://www.linkedin.com/shareArticle?mini=true&url='.$url.'&title='.$title.'&source='.$url.'&summary=Short%20summary';
}

function sharemail($url,$title) {
  return 'mailto:?body='.$url.'&subject='.$title;
}

function slugify($string){
  if (is_string($string)) {
    return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string), '-'));
  }
}


function filteredPhone($phone) {
  $output = str_replace('(','',$phone);
  $output = str_replace(')','',$output);
  $output = str_replace('.','-',$output);
  $output = str_replace(' ','-',$output);
  //$output = '<a href="tel:1-'.$output.'">'.$phone.'</a>';
  return $output;
}


//[copyright]
function copyright_output( $atts ){
	return "&copy; ".date('Y');
}
add_shortcode( 'copyright', 'copyright_output' );

add_filter( 'display_post_states', 'ecs_add_post_state', 10, 2 );

function ecs_add_post_state( $post_states, $post ) {
  //print_r($post);
  if ( $post->post_title == 'Insights' ) {
    $post_states[] = 'Do not edit title or slug';
  }

  return $post_states;
}


function outputButton($button,$class = 'wp-block-button__link') {
  if (!empty($button['url'])) {
    $target = ($button['target'] != '') ? ' target="'.$button['target'].'"' : '';
    $output = '<a class="'.$class.'" href="'.$button['url'].'"'.$target.' data-text="'.$button['title'].'">'.$button['title'].'</a>';
  } else {
    $output = '';
  }
  return $output;
}

add_filter( 'gform_submit_button', 'form_submit_button', 10, 2 );
  function form_submit_button( $button, $form ) {
      return "<button type='submit' data-text='Submit' class='button__box gform_button' id='gform_submit_button_{$form['id']}'>Submit</button>";
  }
  
add_filter( 'facetwp_preload_url_vars', function( $url_vars ) {
    if ( 'art/editions' == FWP()->helper->get_uri() ) {
        if ( empty( $url_vars['available'] ) ) {
            $url_vars['available'] = [1];
        }
    }
    return $url_vars;
} );