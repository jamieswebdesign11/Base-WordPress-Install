<div id="search" class="site-header__search">
  <button class="search-toggle js-search-toggle">
    <?php include(ABSPATH.'wp-content/themes/customtheme/assets/images/icon-search.svg'); ?>
  </button>
  <div class="search-form__wrap">
    <form role="search" method="get" class="search-form form__search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
      <input type="search" class="search-field" placeholder="Search" value="<?php echo get_search_query(); ?>" name="s" />
      <button type="submit" class="search-submit button__box">Go</button>
    </form>
    <button class="search-close js-search-toggle button__close" data-slideout="search">Close</button>
  </div>
</div>