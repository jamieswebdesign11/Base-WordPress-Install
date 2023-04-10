  <?php  
  echo '<h5 class="type__label">Categories</h5>';
    // Category dropdown
    //wp_dropdown_categories(array('show_option_none' => ' Select Cateogry'));
    echo '<ul class="page__list simple">';
      wp_list_categories(array('title_li' => '','show_option_all' => 'All Articles'));
    echo '</ul>';
  ?>