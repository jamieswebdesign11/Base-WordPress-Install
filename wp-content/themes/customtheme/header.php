<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage lococo
 * @since lococo 1.0
 */
?>
<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	
  <meta name="format-detection" content="telephone=no">
  <meta name="google-site-verification" content="Bt_pMYTim4Hre7ei0MP_uq8sfiKEmKRWvMgJHT0YjhQ" />
  <link rel="apple-touch-icon" sizes="57x57" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"  href="<?php bloginfo('template_directory'); ?>/assets/images/icons/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php bloginfo('template_directory'); ?>/assets/images/icons/favicon-16x16.png">
  <link rel="manifest" href="<?php bloginfo('template_directory'); ?>/manifest.json">
  <meta name="msapplication-TileColor" content="#ACACAC">
  <meta name="msapplication-TileImage" content="<?php bloginfo('template_directory'); ?>/assets/images/icons/ms-icon-144x144.png">
  <meta name="theme-color" content="#ACACAC">
  
  <link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  
  
  <script>
    // Picture element HTML5 shiv
    document.createElement( "picture" );
  </script>
  
  <?php if ($_SERVER['HTTP_HOST'] == 'liveurl.com' || $_SERVER['HTTP_HOST'] == 'www.liveurl.com') {
    echo get_field('google_analytics','option');
  } ?>
  
  <?php wp_head(); ?>

</head>
<?php 
$bodyclass = 'site';
?>
<body <?php body_class($bodyclass); ?>>
  	<header role="main" class="site-header">
      <div class="site-header__wrap site-wrap">
        <a class="site-header__logo reveal" href="/">
          <?php include(ABSPATH.'wp-content/themes/customtheme/assets/images/logo.svg'); ?>
        </a>
        
        <div class="site-header__mobile-nav">
          <div class="site-header__mobile-nav--inner">
                
            <div class="site-header__navigation-bar reveal">
              <?php wp_nav_menu( array( 'theme_location' => 'tertiary','container' => 'nav','container_class' => 'site-header__tertiary-navigation menu-tertiary' ) ); ?>
              
              <?php get_search_form(); ?>
            </div>
            <div class="site-header__navigation--wrap">
              <div class="site-header__navigation--inner-wrap">
                <?php wp_nav_menu( array( 'theme_location' => 'primary','container' => 'nav','container_class' => 'site-header__navigation','menu_class' => 'menu-main-navigation')); ?>
      
                <?php get_template_part( 'template-parts/global/global', 'social-media' ); ?>
              </div>
              <button class="button__close js-menu-toggle">Close</button>
            </div>
        
          </div>
        </div>
        <button class="site-header__menu--toggle js-menu-toggle reveal">
          <span>Menu</span>
        </button>
      </div>
  	</header>
      <div id="content" class="site-content slideout-body">