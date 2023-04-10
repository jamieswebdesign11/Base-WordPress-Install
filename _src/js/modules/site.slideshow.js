(function(Site, $, undefined) {
  'use strict';


  Site.slideshow = function() {

    var $slider = $('.js-suite-portfolio-slider'),
        $hero = $('.js-hero-slider'),
        $stacked = $('.js-stacked-slider');
    
    if ($slider.length <= 0 && $hero.length <= 0 && $stacked.length <= 0) {
      return false;
    }
    
    /*
    prevArrow: '<button type="button" class="slick-prev"><span>Previous</span></button>',
    nextArrow: '<button type="button" class="slick-next"><span>Next</span></button>',
    
    
    // On before slide change
    */
    $hero.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var nexttext = nextSlide+1;
      $('.js-current-slide').text(nexttext);
      $('.initial-slide').removeClass('initial-slide');
    });
    
    $hero.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: false,
      dots: false, 
      infinite: true,
      speed: 0,
      variableWidth: true,
      fade: true,
      appendArrows: $('.hero-slideshow__navigation'),
    });
    
    $stacked.each(function(i,o) {
      //product-artist-teaser
      var $par = $(this).closest('.product-artist-teaser'),
          $arrows = $('.product-artist-teaser__arrows',$par);
      
      //js-stacked-current
      $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var nexttext = nextSlide+1;
        $('.js-stacked-current',$par).text(nexttext);;
      });
      
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        //autoplaySpeed: 3000,
        infinite: false,
        appendArrows: $arrows,
        dots: false, 
        variableWidth: false,
        fade: true,
        //centerMode: true,
      });
    });
    
    
    
    
    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: false,
      //autoplaySpeed: 3000,
      //appendArrows: $('.about-hero'),
      dots: false, 
      infinite: false,
      focusOnSelect: true,
      variableWidth: true,
      //centerMode: true,
      responsive: [
        {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                arrows: false,
              }
            }
      ]
    });
    
    var current = ($(window).width() >= 768) ? 'desktop' : 'mobie';
    
    function resetSlick() {
      console.log('reset');
      
    }
    
    function moveAbout() {
      if ($(window).width() >= 768) {
        if (current != 'desktop') {
          current = 'desktop';
          
          $('.product-teaser.portfolio-suite').each(function(i,o) {
            var $wrap = $('.js-suite-portfolio-slider',$(this));
            
            $('.product-teaser__about',$(this)).prependTo($(this));
            // Remove about from slider
            
          });
          
          resetSlick();
        }
        
        
      } else {
        if (current != 'mobile') {
          current = 'mobile';
          
          $('.product-teaser.portfolio-suite').each(function(i,o) {
            var $wrap = $('.js-suite-portfolio-slider',$(this));
            
            $('.product-teaser__about',$(this)).prependTo($wrap);
            // Add about to slider

          });
          
          resetSlick();
        }
      }

    }
    moveAbout();
    
    $(window).resize(function() {
      moveAbout();
    });
    
    
  };

}(window.Site = window.Site || {}, jQuery));
