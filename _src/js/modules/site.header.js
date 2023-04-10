(function(Site, $, undefined) {
  'use strict';


  Site.header = function() {

    var $header = $('.site-header'),
        $toggle = $('.js-menu-toggle'),
        $searchtoggle = $('.js-search-toggle'),
        $newsletter = $('.js-mailing-list');
    
    $('.site-header__navigation li.menu-item-has-children[data-depth="0"]').hover(function(e) {
      $('.site-header').addClass('hovering');
    }, function() {
      $('.site-header').removeClass('hovering');
    });
    
    $newsletter.click(function(e) {      
      $('#newsletter').toggleClass("newsletter-open");
      e.preventDefault();
    });
    
    $toggle.click(function(e) {      
      $('body').toggleClass("menu-open");
      e.preventDefault();
    });
    
    $searchtoggle.click(function(e) {
      $('body').toggleClass("search-open");
      e.preventDefault();
    });
    
    $('.no-link > a').click(function(e) {
      e.preventDefault();
    });
    
    $('a[href^="#"]').click(function(e) {
      var href = $(this).attr('href');
          
          if (href !== '#') {
            var $id = $(href);
            var idtop = $id.offset().top;
            $('html,body').animate({'scrollTop':idtop},800);
          }
      e.preventDefault();
    });
    
    $(document).on('click', function(e) {
      //Hide the menus if visible
      if ($('.menu-open').length > 0 && $(e.target).is('body')) {
        $('body').toggleClass("menu-open");
      }
      if ($('.slideout-open').length > 0 && $(e.target).is('body')) {
        //$('body').toggleClass("menu-open");
        // Target open slideout close button
        $('.slideout.open .js-slideout').trigger('click');
      }
    });
    
    $('.grid-animation__label').click(function(e) {
      $(this).parent().toggleClass('hover-open');
    });
    
    $('.js-scroll-to').click(function(e) {
      e.preventDefault();
      
      var id = $(this).data('scroll'),
          idtop = $('#'+id).offset().top;
          
          $('html,body').animate({'scrollTop':idtop},800);
      
    });
    
    
    if ("ontouchstart" in document.documentElement) {
      $('html').addClass('is-touch');
    } else {
      $('html').addClass('no-touch');
    }
    
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
    
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
    
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    
    console.log('edition 3');
    
    $.fn.isInSmallViewport = function() {
        var percent = $(window).height() * 0.3;
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight() - percent;
    
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height() - percent;
    
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    
    //.products-grouped .product__header
    var lastScrollTop = 0;
    function checkscroll() {
      var st = $(window).scrollTop();
      
      if (st > lastScrollTop){
          // Scrolling Down
          $('body').addClass('scrolling');
          $('body').removeClass('scrolling-up');
       } else if (st > 0) {
          // Scrolling Up
          $('body').removeClass('scrolling');
          $('body').addClass('scrolling-up');
       } else {
          $('body').removeClass('scrolling');
          $('body').removeClass('scrolling-up');
       }
      
      if ($('.js-sticky').length > 0) {
        var stickytop = $('.js-sticky').offset().top,
            $parent = $('.js-sticky').parent(),
            parenttop = $parent.offset().top;
        
        if (st >= (parenttop - 90)) {
          $parent.addClass('sticky');
        } else {
          $parent.removeClass('sticky');
        }
        //console.log('stickytop: '+stickytop);
        //console.log('parenttop: '+parenttop);
        //console.log('st: '+st);
      }
      
      if ($('.js-switch-url').length > 0) {
 /*
        $('.js-switch-url').each(function(i,o) {
          var mystickytop = $(this).offset().top - 90,
              myid = $(this).attr('id');
          
          if (st >= mystickytop) {
            //$('.js-switch-url.sticky-url:not(#'+myid+')').removeClass('sticky-url');
            $(this).addClass('sticky-url');
            history.pushState(null, null, '#'+myid);
          } else {
            $(this).removeClass('sticky-url');
          }
        });

        */
        
        if ($('.site-footer').isInViewport()) {
          $('.js-switch-url.in-view').removeClass('in-view');
        } else {
          if ($('.product-group__quickinfo').isInViewport()) {
            $('.js-switch-url:eq(0)').addClass('absolute');
          } else {
            $('.js-switch-url:eq(0)').removeClass('absolute');
          }
          
          $('.js-switch-url').each(function(i,o) {
            if ($(this).isInSmallViewport()) {
                // do something
              $(this).addClass('in-view');
              var mystickytop = $(this).offset().top,
                  myid = $(this).attr('id');
              
              history.pushState(null, null, '#'+myid);
              //$('.js-switch-url:not('+i+')').removeClass('in-view');
            } else {
              $(this).removeClass('in-view');
            }
          });
        }
      }
      
      lastScrollTop = st;
    }
    
    $(window).on('scroll', function() {
      checkscroll();
    });
    
    checkscroll();
    /*
    $('.site-header__navigation .menu-item-has-children > a').click(function(e) {
      var toggleleft = $('.site-header__menu--toggle').offset().left;
      if (toggleleft > 0) {
        // If it's greater than zero it's visible and mobile.
        var $parent = $(this).closest('li'),
            $sub = $('.sub-menu',$parent);
            $parent.toggleClass('open');
            $sub.slideToggle();
        e.preventDefault();
      }
    });
    */
    
    
  };

}(window.Site = window.Site || {}, jQuery));
