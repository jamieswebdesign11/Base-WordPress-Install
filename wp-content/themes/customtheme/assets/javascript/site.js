(function(Site, $, undefined) {
  'use strict';
  $.easing.def = "easeInOutQuart";

  var $window = $(window),
      $document = $(document);

  Site = $.extend(Site, {
    '$body': undefined,
    '$window': $window,
    '$document': $document,
    initDocumentReady: function() {
      // Ready...
      Site.$body = $('body');
      Site.header();
      Site.slideshow();
      Site.slideout();
      Site.filter();
      Site.toggle();
      Site.sitereveal();
      Site.lightbox();
      Site.pdf();
      Site.sticky();
      Site.fixedheader();
      Site.watch();
      Site.gallery();
      Site.print();
      //Site.scrollbar();
    },
    initWindowLoad: function() {
      // Load...
    },
    initAll: function() {
      Site.initDocumentReady();
      Site.initWindowLoad();
    }
  });

  $(function() {
    /*
    var imgs = document.images,
        len = imgs.length,
        counter = 0;

    [].forEach.call( imgs, function( img ) {
        if(img.complete)
          incrementCounter();
        else
          img.addEventListener( 'load', incrementCounter, false );
    });

    function incrementCounter() {
      counter++;
      if ( counter === len ) {
        Site.initDocumentReady();
      }
    }
*/
    Site.initDocumentReady();
  });
  

/*
  $window.load(function() {
    Site.initWindowLoad();
  });
*/
}(window.Site = window.Site || {}, jQuery));
(function(Site, $, undefined) {
  'use strict';


  Site.filter = function() {

    var $filterview = $('.js-filter-view');
    
    if ($filterview.length <= 0) {
      return false;
    }
    
    $filterview.click(function(e) {
      e.preventDefault();
      
      var view = $(this).data('view'),
          url = $('.filter__view--list').data('current-url'),
          nexturl = url+'?view='+view;
      
      $('.js-filter-view.active').removeClass('active');
      $('.js-view').removeClass('view-list view-thumbnails').addClass('view-'+view);
      
      history.pushState(null, null, nexturl);
      
      $(this).addClass('active');
    });
    
    $('.js-filter-button').click(function(e) {
      if ($('.js-filter-view.active').length > 0) {
        var view = $('.js-filter-view.active').data('view'),
            href = $(this).attr('href'),
            newhref = href+'?view='+view;
        
        $('.js-filter-view.active').attr('href',newhref);
        
        window.location.href = newhref;
        
        e.preventDefault();
      }
    });
    
  };

}(window.Site = window.Site || {}, jQuery));
(function(Site, $, undefined) {
	'use strict';


	Site.fixedheader = function() {

		var $fix = $('.js-fix');
		
		if ($fix.length <= 0) {
			return false;
		}
		
		//fixedheader
		function fixit() {
			var fh = $fix.outerHeight();
			$fix.addClass('fixed').next().addClass('fix-it').css('margin-top',fh+'px');
		}
		
		$(window).resize(function() {
			fixit();
		});
		
		setTimeout(fixit,500);
		
		
	};

}(window.Site = window.Site || {}, jQuery));

(function(Site, $, undefined) {
'use strict';


	Site.gallery = function() {

		var $gallery = $('.js-gallery');
		
		if ($gallery.length <= 0) {
			return false;
		}
		
		function shiftslide($parent,direction) {
			var total = $('.product-artist-teaser__suite-portfolio',$parent).length,
					current = parseInt($parent.attr('data-index')),
					next = current;
					
			if (direction == 'forward') {
				if (current < (total )) {
					var next = current + 1;
					$('.js-stacked-current',$parent).text(next);
					$parent.attr('data-index',next);
				}
			} else {
				if (current > 1) {
					var next = current - 1;
					$('.js-stacked-current',$parent).text(next);
					$parent.attr('data-index',next);
				}
			}
			
			var padding = $('.product-artist-teaser__suite-portfolio:eq('+(next-1)+')',$parent).data('padding');
			$('.product-artist-teaser__slider',$parent).css({'padding-bottom':padding+'%'});
			
			if (next == 1) {
				$('.product-stacked-arrow.next',$parent).removeClass('disabled');
				$('.product-stacked-arrow.previous',$parent).addClass('disabled');
			} else if (next == (total)) {
				$('.product-stacked-arrow.next',$parent).addClass('disabled');
				$('.product-stacked-arrow.previous',$parent).removeClass('disabled');
			} else {
				$('.product-stacked-arrow.next',$parent).removeClass('disabled');
				$('.product-stacked-arrow.previous',$parent).removeClass('disabled');
			}
		}
		
		$gallery.each(function(i,o) {
			var $parent = $(this),
					$previous = $('.product-stacked-arrow.previous',$parent),
					$next = $('.product-stacked-arrow.next',$parent);
			
			$next.click(function(e) {
				shiftslide($parent,'forward');
				e.preventDefault();
			});
			$previous.click(function(e) {
				shiftslide($parent,'backward');
				e.preventDefault();
			});
			/*
			setInterval(function() {
				
				shiftslide($parent);
				
			},4000);
			*/
		});
		
		
		
	};

}(window.Site = window.Site || {}, jQuery));
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

(function(Site, $, undefined) {
  'use strict';


  Site.lightbox = function() {

    var $lb = $('.js-lightbox'),
        $lbclose = $('.js-lightbox-close');
    
    if ($lb.length <= 0) {
      return false;
    }
    
    $lb.click(function(e) {
      var lightbox = $(this).data('lightbox');
      
      $('#'+lightbox).addClass('open');
      $('body').addClass('lightbox-open');
      
      e.preventDefault();
    });
    
    $lbclose.click(function(e) {
      var lightbox = $(this).data('lightbox');
      
      $('#'+lightbox).removeClass('open');
      $('body').removeClass('lightbox-open');
      
      e.preventDefault();
    });
    
    /*
    $lb.fancybox({
      
    });
    */
    
  };

}(window.Site = window.Site || {}, jQuery));

(function(Site, $, undefined) {
	'use strict';

	Site.pdf = function() {

		var $pdf = $('#pdf');
		
		function removeItem(myid) {
			console.log('wp-pdfgen101: '+$.cookie('wp-pdfgen101'));
			console.log('remove '+myid);
			var newcookie = $.cookie('wp-pdfgen101').replace('p'+myid+',','');
			$.cookie('wp-pdfgen101', newcookie, { expires: 2, path: '/'});
			$('#row'+myid).fadeTo(0,400,function() {
				$(this).remove();
			});
			console.log('wp-pdfgen101: '+$.cookie('wp-pdfgen101'));
			
			// update count
			var num = $("input[name=include]").length;
			$('.js-pdf-count').text(num);
		}
		
		function showButton() {
			if ($.cookie('wp-pdfgen101') == null || $.cookie('wp-pdfgen101') == '') {
				// If null, do nothing.
			} else {
				// Show the button.
				$('.pdf__button').removeClass('hide');
			}
		}	
		showButton();
		
		$('.js-pdf-delete-selected').click(function(e) {
			console.log('delete selected');
			$("input[name=include]").each(function(i,o) {
				var myid = $(this).val();
				if ($(this).is(':checked')) {
					removeItem(myid);
				}
			});
			
			e.preventDefault();
		});
		
		$('.for-checkbox input[type="checkbox"]').click(function(e) {
			
			if ($(this).attr('name') == 'checkall') {
				if ($(this).is(':checked')) {
					$("input[name=include]").closest('label').addClass('checked');
					$("input[name=include]").prop('checked', true);
				} else {
					$("input[name=include]").closest('label').removeClass('checked');
					$("input[name=include]").prop('checked', false);
				}
			} else {
				if ($(this).is(':checked')) {
					$(this).closest('label').addClass('checked');
				} else {
					$(this).closest('label').removeClass('checked');
				}
			}
			
			
		});
		
		//&products='.$output.'
		$('.js-pdf-launch').click(function(e) {
			e.preventDefault();
			
			var href = $(this).attr('href'),
					newappend = '&products=',
					mycount = $("input[name=include]").length;
			
			$("input[name=include]").each(function(i,o) {
				var myid = $(this).val();
				var sep = (i < (mycount - 1)) ? ',' : '';
				newappend = newappend + myid + sep;
			});
			
			$(this).attr('href',href+newappend);
			//location.href = $(this).attr('href');
			window.open($(this).attr('href'),'_blank');
			console.log($(this).attr('href'));
		});
		
		$('.js-add-to-pdf').click(function(e) {
			var id = $(this).data('id');
			console.log('add clicked');
			
			if ($(this).hasClass('added')) {
				// If this has class of added, we are now removing.
				removeItem(id);
				$(this).removeClass('added');
			} else {
				// We are adding to the cookie.
				var currentcookie = $.cookie('wp-pdfgen101');
				if (currentcookie == null || currentcookie == 'null') {
					currentcookie = '';
				}
				$.cookie('wp-pdfgen101', currentcookie+'p'+id+',', { expires: 2, path: '/'});
				
				var artist = $(this).data('artist'),
						title = $(this).data('title');
				
				var newhtml = '<div id="row'+id+'" class="tr pdf__listing--row sortable"><div class="td checkbox"><label class="for-checkbox"><input type="checkbox" name="include" value="'+id+'"></label></div><div class="td artist">'+artist+'</div><div class="td title"><i>'+title+'</i></div><div class="td icon-move">&nbsp;</div></div>';
				
				$('#pdftable').append(newhtml);
				$('.js-pdf-count').text($("input[name=include]").length);
				
				$(this).addClass('added');
			}
			
			console.log($.cookie('wp-pdfgen101'));
			showButton();
		});
		
		sortable('.js-sortable', {
			//forcePlaceholderSize: true,
			//placeholderClass: 'ph-class',
			//hoverClass: 'bg-maroon yellow',
			//items: 'tr:not(.disabled)',
		});
		
		$('.pdf-form__submit').click(function(e) {
			var href = $(this).attr('href'),
					val = '&products=';
			
			$('input[name="include"]:checked').each(function(i,o) {
				var myvalue = $(this).val(),
						sep = (i == 0) ? '' : ',';
				
				val = val + sep + myvalue;
			});
			
			window.location.href = href+val;
			
			e.preventDefault();
		});
		
	};

}(window.Site = window.Site || {}, jQuery));
(function(Site, $, undefined) {
'use strict';


	Site.print = function() {

		var $print = $('.js-print');
		
		if ($print.length <= 0) {
			return false;
		}
		
		$(document).on('click','.js-print', function(e) {
			e.preventDefault();
			
			window.print();	
		});
		
	};

}(window.Site = window.Site || {}, jQuery));
(function(Site, $, undefined) {
  'use strict';


  Site.sitereveal = function() {


    //Scroll Reveal
    (function($) {
      $.fn.visible = function(partial) {
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
  
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
      };
    })(jQuery);

    function reveal() {
      (function($) {
        $.fn.visible = function(partial) {
          var $t            = $(this),
              $w            = $(window),
              viewTop       = $w.scrollTop(),
              viewBottom    = viewTop + $w.height(),
              _top          = $t.offset().top,
              _bottom       = _top + $t.height(),
              compareTop    = partial === true ? _bottom : _top,
              compareBottom = partial === true ? _top : _bottom;
  
          return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        };
      })(jQuery);

      $(".reveal, .reveal-img, .wp-block-image.size-large img").each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("come-in"); 
        } 
      });
    }

    $(window).scroll(function(event) {
      $(".reveal, .reveal-img, .wp-block-image.size-large img").each(function(i, el) {
        var el = $(el);
        if (el.visible(true) && !el.hasClass('come-in')) {
          el.addClass("come-in"); 
        }
      });
    });
    
    $(".reveal, .reveal-img, .wp-block-image.size-large img").each(function(i, el) {
      var el = $(el);
      if (el.visible(true) && !el.hasClass('come-in')) {
        el.addClass("come-in"); 
      }
    });
    
  };

}(window.Site = window.Site || {}, jQuery));
(function(Site, $, undefined) {
  'use strict';


  Site.slideout = function() {

    var $slideout = $('.js-slideout');
    
    if ($slideout.length <= 0) {
      return false;
    }
    
    $(document).on('click','.js-slideout', function(e) {
      //$slideout.click(function(e) {
      e.preventDefault();
      
      var slideout = $(this).data('slideout');
      
      $('#'+slideout).toggleClass('open');
      
      
      if ($('#'+slideout).hasClass('wide-slideout')) {
        $('body').toggleClass('slideout-open slideout-'+slideout+' slideout-is-wide');
      } else if ($('#'+slideout).hasClass('enlarge')) {
        $('body').toggleClass('slideout-open slideout-'+slideout+' slideout-enlarge');
      } else {
        $('body').toggleClass('slideout-open slideout-'+slideout);
      }
      
      //$('body').toggleClass('slideout-open');
    });
    
    $(document).on('facetwp-loaded', function() {
        var qs = FWP.buildQueryString();
        if ( '' === qs ) { // no facets are selected
          $('.product-filter.reset').removeClass('show');
          //console.log('top qs');
        }
        else {
          $('.product-filter.reset').addClass('show');
          //console.log('bottom qs');
        }
        
        var $slider = $('.js-suite-portfolio-slider:not(.slick-slider)');
        
        if ($slider.length >= 1) {
          
          //Site.slideshow();
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
        }
    });
    
    //
    $(document).on('click','.facet-reset', function(e) {
      $('.measurements .pseudo-facetwp-number').val('');
    });
    
    $('.measurements .pseudo-facetwp-number').blur(function(e) {
      var myval = $(this).val(),
          mytype = $(this).closest('.pseudo-facetwp-facet').data('name'),
          myclasses = $(this).data('class'),
          newval = myval*2.54;
          
          // 1 cm = 0.393701 inches
          
      // Find equivalent 
      var $equiv = $('.facetwp-facet[data-name="'+mytype+'"] input[class="'+myclasses+'"]');
      $equiv.val(newval);
    });
    
    
    $(document).on('blur','.measurements .facetwp-number', function(e) {
      var myval = $(this).val(),
          mytype = $(this).closest('.facetwp-facet').data('name'),
          myclasses = $(this).attr('class'),
          newval = myval*0.393701;
          
          // 1 cm = 0.393701 inches
          
      // Find equivalent 
      console.log('myclasses: '+myclasses);
      console.log('mytype: '+mytype);
      var $equiv = $('.pseudo-facetwp-facet[data-name="'+mytype+'"] input[data-class="'+myclasses+'"]');
      $equiv.val(newval);
    });
    
    $(document).on('click','.measurements .pseudo-facetwp-submit', function(e) {
      var mytype = $(this).closest('.pseudo-facetwp-facet').data('name'),
          myclasses = $(this).attr('class');

      var $equiv = $('.facetwp-facet[data-name="'+mytype+'"] input.facetwp-submit');
      $equiv.trigger('click');
    });
    
    // 
    $(document).on('click','.js-switcher', function(e) {
      var id = $(this).attr('id');
      $('.product-filter__switch.active').removeClass('active');
      $('.product-filter__switch[data-measurement="'+id+'"]').addClass('active');
    });
    
    $(document).on('click', function(e) {
      //Hide the menus if visible      
      console.log($(e.target));
      if ($('.slideout-open').length > 0 && $(e.target).hasClass('slideout open')) {
        var slideout = $('.slideout.open').data('slideout');
        console.log('slideout: '+slideout);
        $('body').removeClass('slideout-open slideout-is-wide slideout-'+slideout);
        $('.slideout.open').removeClass('open');
      }
      /*
      if ($('.page-header__pulse.clicked').length > 0 && !$(e.target).hasClass('page-header__pulse')) {
        $('.page-header__pulse').removeClass("clicked");
      }
      */
    });
    
  };

}(window.Site = window.Site || {}, jQuery));
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

(function(Site, $, undefined) {
	'use strict';


	Site.sticky = function() {
		//console.log('sticky');
		/*
		var $sticky = $(".product-content .products-grouped .product-header__description--inner");

		$sticky.sticky({
			topSpacing:1000,
			bottomSpacing:10
		});
		
		$sticky.on('sticky-start', function() { 
			var currentsticky = $('.is-sticky').length - 1;			
			//$('.is-sticky').not(':eq('+currentsticky+')').unstick();
			
			var myid = $('.js-switch-url:eq('+currentsticky+')').attr('id');

			history.pushState(null, null, '#'+myid);
		});
		*/
		console.log('no sticky');
	};

}(window.Site = window.Site || {}, jQuery));

(function(Site, $, undefined) {
  'use strict';


  Site.toggle = function() {

    var $toggle = $('.js-toggler');
    
    if ($toggle.length <= 0) {
      return false;
    }
    
    $toggle.click(function(e) {
      
      var $parent = $(this).closest('.js-toggle'),
          $target = $('.js-togglee',$parent);
      
          $parent.toggleClass('open');
          $target.slideToggle(400);
      
      e.preventDefault();
    });
    
  };

}(window.Site = window.Site || {}, jQuery));
(function(Site, $, undefined) {
	'use strict';


	Site.watch = function() {

		var $watch = $('.js-watch-price');
		
		if ($watch.length <= 0) {
			return false;
		}
		
		$watch.click(function(e) {
			
			$('#qpn_watch_price_btn').trigger('click');
			
			e.preventDefault();
		});
		
	};

}(window.Site = window.Site || {}, jQuery));
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {
    
    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        
        value = String(value);
        
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/*
 * HTML5Sortable package
 * https://github.com/lukasoppermann/html5sortable
 *
 * Maintained by Lukas Oppermann <lukas@vea.re>
 *
 * Released under the MIT license.
 */
var sortable = (function () {
  'use strict';

  /**
   * Get or set data on element
   * @param {HTMLElement} element
   * @param {string} key
   * @param {any} value
   * @return {*}
   */
  function addData(element, key, value) {
      if (value === undefined) {
          return element && element.h5s && element.h5s.data && element.h5s.data[key];
      }
      else {
          element.h5s = element.h5s || {};
          element.h5s.data = element.h5s.data || {};
          element.h5s.data[key] = value;
      }
  }
  /**
   * Remove data from element
   * @param {HTMLElement} element
   */
  function removeData(element) {
      if (element.h5s) {
          delete element.h5s.data;
      }
  }

  /* eslint-env browser */
  /**
   * Filter only wanted nodes
   * @param {NodeList|HTMLCollection|Array} nodes
   * @param {String} selector
   * @returns {Array}
   */
  var filter = (function (nodes, selector) {
      if (!(nodes instanceof NodeList || nodes instanceof HTMLCollection || nodes instanceof Array)) {
          throw new Error('You must provide a nodeList/HTMLCollection/Array of elements to be filtered.');
      }
      if (typeof selector !== 'string') {
          return Array.from(nodes);
      }
      return Array.from(nodes).filter(function (item) { return item.nodeType === 1 && item.matches(selector); });
  });

  /* eslint-env browser */
  /* eslint-disable no-use-before-define */
  var stores = new Map();
  /* eslint-enable no-use-before-define */
  /**
   * Stores data & configurations per Sortable
   * @param {Object} config
   */
  var Store = /** @class */ (function () {
      function Store() {
          this._config = new Map(); // eslint-disable-line no-undef
          this._placeholder = undefined; // eslint-disable-line no-undef
          this._data = new Map(); // eslint-disable-line no-undef
      }
      Object.defineProperty(Store.prototype, "config", {
          /**
           * get the configuration map of a class instance
           * @method config
           * @return {object}
           */
          get: function () {
              // transform Map to object
              var config = {};
              this._config.forEach(function (value, key) {
                  config[key] = value;
              });
              // return object
              return config;
          },
          /**
           * set the configuration of a class instance
           * @method config
           * @param {object} config object of configurations
           */
          set: function (config) {
              if (typeof config !== 'object') {
                  throw new Error('You must provide a valid configuration object to the config setter.');
              }
              // combine config with default
              var mergedConfig = Object.assign({}, config);
              // add config to map
              this._config = new Map(Object.entries(mergedConfig));
          },
          enumerable: false,
          configurable: true
      });
      /**
       * set individual configuration of a class instance
       * @method setConfig
       * @param  key valid configuration key
       * @param  value any value
       * @return void
       */
      Store.prototype.setConfig = function (key, value) {
          if (!this._config.has(key)) {
              throw new Error("Trying to set invalid configuration item: " + key);
          }
          // set config
          this._config.set(key, value);
      };
      /**
       * get an individual configuration of a class instance
       * @method getConfig
       * @param  key valid configuration key
       * @return any configuration value
       */
      Store.prototype.getConfig = function (key) {
          if (!this._config.has(key)) {
              throw new Error("Invalid configuration item requested: " + key);
          }
          return this._config.get(key);
      };
      Object.defineProperty(Store.prototype, "placeholder", {
          /**
           * get the placeholder for a class instance
           * @method placeholder
           * @return {HTMLElement|null}
           */
          get: function () {
              return this._placeholder;
          },
          /**
           * set the placeholder for a class instance
           * @method placeholder
           * @param {HTMLElement} placeholder
           * @return {void}
           */
          set: function (placeholder) {
              if (!(placeholder instanceof HTMLElement) && placeholder !== null) {
                  throw new Error('A placeholder must be an html element or null.');
              }
              this._placeholder = placeholder;
          },
          enumerable: false,
          configurable: true
      });
      /**
       * set an data entry
       * @method setData
       * @param {string} key
       * @param {any} value
       * @return {void}
       */
      Store.prototype.setData = function (key, value) {
          if (typeof key !== 'string') {
              throw new Error('The key must be a string.');
          }
          this._data.set(key, value);
      };
      /**
       * get an data entry
       * @method getData
       * @param {string} key an existing key
       * @return {any}
       */
      Store.prototype.getData = function (key) {
          if (typeof key !== 'string') {
              throw new Error('The key must be a string.');
          }
          return this._data.get(key);
      };
      /**
       * delete an data entry
       * @method deleteData
       * @param {string} key an existing key
       * @return {boolean}
       */
      Store.prototype.deleteData = function (key) {
          if (typeof key !== 'string') {
              throw new Error('The key must be a string.');
          }
          return this._data.delete(key);
      };
      return Store;
  }());
  /**
   * @param {HTMLElement} sortableElement
   * @returns {Class: Store}
   */
  var store = (function (sortableElement) {
      // if sortableElement is wrong type
      if (!(sortableElement instanceof HTMLElement)) {
          throw new Error('Please provide a sortable to the store function.');
      }
      // create new instance if not avilable
      if (!stores.has(sortableElement)) {
          stores.set(sortableElement, new Store());
      }
      // return instance
      return stores.get(sortableElement);
  });

  /**
   * @param {Array|HTMLElement} element
   * @param {Function} callback
   * @param {string} event
   */
  function addEventListener(element, eventName, callback) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              addEventListener(element[i], eventName, callback);
          }
          return;
      }
      element.addEventListener(eventName, callback);
      store(element).setData("event" + eventName, callback);
  }
  /**
   * @param {Array<HTMLElement>|HTMLElement} element
   * @param {string} eventName
   */
  function removeEventListener(element, eventName) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              removeEventListener(element[i], eventName);
          }
          return;
      }
      element.removeEventListener(eventName, store(element).getData("event" + eventName));
      store(element).deleteData("event" + eventName);
  }

  /**
   * @param {Array<HTMLElement>|HTMLElement} element
   * @param {string} attribute
   * @param {string} value
   */
  function addAttribute(element, attribute, value) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              addAttribute(element[i], attribute, value);
          }
          return;
      }
      element.setAttribute(attribute, value);
  }
  /**
   * @param {Array|HTMLElement} element
   * @param {string} attribute
   */
  function removeAttribute(element, attribute) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              removeAttribute(element[i], attribute);
          }
          return;
      }
      element.removeAttribute(attribute);
  }

  /**
   * @param {HTMLElement} element
   * @returns {Object}
   */
  var offset = (function (element) {
      if (!element.parentElement || element.getClientRects().length === 0) {
          throw new Error('target element must be part of the dom');
      }
      var rect = element.getClientRects()[0];
      return {
          left: rect.left + window.pageXOffset,
          right: rect.right + window.pageXOffset,
          top: rect.top + window.pageYOffset,
          bottom: rect.bottom + window.pageYOffset
      };
  });

  /**
   * Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed
   * @param {Function} func to debounce
   * @param {number} time to wait before calling function with latest arguments, 0 - no debounce
   * @returns {function} - debounced function
   */
  var debounce = (function (func, wait) {
      if (wait === void 0) { wait = 0; }
      var timeout;
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          clearTimeout(timeout);
          timeout = setTimeout(function () {
              func.apply(void 0, args);
          }, wait);
      };
  });

  /* eslint-env browser */
  /**
   * Get position of the element relatively to its sibling elements
   * @param {HTMLElement} element
   * @returns {number}
   */
  var getIndex = (function (element, elementList) {
      if (!(element instanceof HTMLElement) || !(elementList instanceof NodeList || elementList instanceof HTMLCollection || elementList instanceof Array)) {
          throw new Error('You must provide an element and a list of elements.');
      }
      return Array.from(elementList).indexOf(element);
  });

  /* eslint-env browser */
  /**
   * Test whether element is in DOM
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  var isInDom = (function (element) {
      if (!(element instanceof HTMLElement)) {
          throw new Error('Element is not a node element.');
      }
      return element.parentNode !== null;
  });

  /* eslint-env browser */
  /**
   * Insert node before or after target
   * @param {HTMLElement} referenceNode - reference element
   * @param {HTMLElement} newElement - element to be inserted
   * @param {String} position - insert before or after reference element
   */
  var insertNode = function (referenceNode, newElement, position) {
      if (!(referenceNode instanceof HTMLElement) || !(referenceNode.parentElement instanceof HTMLElement)) {
          throw new Error('target and element must be a node');
      }
      referenceNode.parentElement.insertBefore(newElement, (position === 'before' ? referenceNode : referenceNode.nextElementSibling));
  };
  /**
   * Insert before target
   * @param {HTMLElement} target
   * @param {HTMLElement} element
   */
  var insertBefore = function (target, element) { return insertNode(target, element, 'before'); };
  /**
   * Insert after target
   * @param {HTMLElement} target
   * @param {HTMLElement} element
   */
  var insertAfter = function (target, element) { return insertNode(target, element, 'after'); };

  /* eslint-env browser */
  /**
   * Filter only wanted nodes
   * @param {HTMLElement} sortableContainer
   * @param {Function} customSerializer
   * @returns {Array}
   */
  var serialize = (function (sortableContainer, customItemSerializer, customContainerSerializer) {
      if (customItemSerializer === void 0) { customItemSerializer = function (serializedItem, sortableContainer) { return serializedItem; }; }
      if (customContainerSerializer === void 0) { customContainerSerializer = function (serializedContainer) { return serializedContainer; }; }
      // check for valid sortableContainer
      if (!(sortableContainer instanceof HTMLElement) || !sortableContainer.isSortable === true) {
          throw new Error('You need to provide a sortableContainer to be serialized.');
      }
      // check for valid serializers
      if (typeof customItemSerializer !== 'function' || typeof customContainerSerializer !== 'function') {
          throw new Error('You need to provide a valid serializer for items and the container.');
      }
      // get options
      var options = addData(sortableContainer, 'opts');
      var item = options.items;
      // serialize container
      var items = filter(sortableContainer.children, item);
      var serializedItems = items.map(function (item) {
          return {
              parent: sortableContainer,
              node: item,
              html: item.outerHTML,
              index: getIndex(item, items)
          };
      });
      // serialize container
      var container = {
          node: sortableContainer,
          itemCount: serializedItems.length
      };
      return {
          container: customContainerSerializer(container),
          items: serializedItems.map(function (item) { return customItemSerializer(item, sortableContainer); })
      };
  });

  /* eslint-env browser */
  /**
   * create a placeholder element
   * @param {HTMLElement} sortableElement a single sortable
   * @param {string|undefined} placeholder a string representing an html element
   * @param {string} placeholderClasses a string representing the classes that should be added to the placeholder
   */
  var makePlaceholder = (function (sortableElement, placeholder, placeholderClass) {
      var _a;
      if (placeholderClass === void 0) { placeholderClass = 'sortable-placeholder'; }
      if (!(sortableElement instanceof HTMLElement)) {
          throw new Error('You must provide a valid element as a sortable.');
      }
      // if placeholder is not an element
      if (!(placeholder instanceof HTMLElement) && placeholder !== undefined) {
          throw new Error('You must provide a valid element as a placeholder or set ot to undefined.');
      }
      // if no placeholder element is given
      if (placeholder === undefined) {
          if (['UL', 'OL'].includes(sortableElement.tagName)) {
              placeholder = document.createElement('li');
          }
          else if (['TABLE', 'TBODY'].includes(sortableElement.tagName)) {
              placeholder = document.createElement('tr');
              // set colspan to always all rows, otherwise the item can only be dropped in first column
              placeholder.innerHTML = '<td colspan="100"></td>';
          }
          else {
              placeholder = document.createElement('div');
          }
      }
      // add classes to placeholder
      if (typeof placeholderClass === 'string') {
          (_a = placeholder.classList).add.apply(_a, placeholderClass.split(' '));
      }
      return placeholder;
  });

  /* eslint-env browser */
  /**
   * Get height of an element including padding
   * @param {HTMLElement} element an dom element
   */
  var getElementHeight = (function (element) {
      if (!(element instanceof HTMLElement)) {
          throw new Error('You must provide a valid dom element');
      }
      // get calculated style of element
      var style = window.getComputedStyle(element);
      // get only height if element has box-sizing: border-box specified
      if (style.getPropertyValue('box-sizing') === 'border-box') {
          return parseInt(style.getPropertyValue('height'), 10);
      }
      // pick applicable properties, convert to int and reduce by adding
      return ['height', 'padding-top', 'padding-bottom']
          .map(function (key) {
          var int = parseInt(style.getPropertyValue(key), 10);
          return isNaN(int) ? 0 : int;
      })
          .reduce(function (sum, value) { return sum + value; });
  });

  /* eslint-env browser */
  /**
   * Get width of an element including padding
   * @param {HTMLElement} element an dom element
   */
  var getElementWidth = (function (element) {
      if (!(element instanceof HTMLElement)) {
          throw new Error('You must provide a valid dom element');
      }
      // get calculated style of element
      var style = window.getComputedStyle(element);
      // pick applicable properties, convert to int and reduce by adding
      return ['width', 'padding-left', 'padding-right']
          .map(function (key) {
          var int = parseInt(style.getPropertyValue(key), 10);
          return isNaN(int) ? 0 : int;
      })
          .reduce(function (sum, value) { return sum + value; });
  });

  /* eslint-env browser */
  /**
   * get handle or return item
   * @param {Array<HTMLElement>} items
   * @param {string} selector
   */
  var getHandles = (function (items, selector) {
      if (!(items instanceof Array)) {
          throw new Error('You must provide a Array of HTMLElements to be filtered.');
      }
      if (typeof selector !== 'string') {
          return items;
      }
      return items
          // remove items without handle from array
          .filter(function (item) {
          return item.querySelector(selector) instanceof HTMLElement ||
              (item.shadowRoot && item.shadowRoot.querySelector(selector) instanceof HTMLElement);
      })
          // replace item with handle in array
          .map(function (item) {
          return item.querySelector(selector) || (item.shadowRoot && item.shadowRoot.querySelector(selector));
      });
  });

  /**
   * @param {Event} event
   * @returns {HTMLElement}
   */
  var getEventTarget = (function (event) {
      return (event.composedPath && event.composedPath()[0]) || event.target;
  });

  /* eslint-env browser */
  /**
   * defaultDragImage returns the current item as dragged image
   * @param {HTMLElement} draggedElement - the item that the user drags
   * @param {object} elementOffset - an object with the offsets top, left, right & bottom
   * @param {Event} event - the original drag event object
   * @return {object} with element, posX and posY properties
   */
  var defaultDragImage = function (draggedElement, elementOffset, event) {
      return {
          element: draggedElement,
          posX: event.pageX - elementOffset.left,
          posY: event.pageY - elementOffset.top
      };
  };
  /**
   * attaches an element as the drag image to an event
   * @param {Event} event - the original drag event object
   * @param {HTMLElement} draggedElement - the item that the user drags
   * @param {Function} customDragImage - function to create a custom dragImage
   * @return void
   */
  var setDragImage = (function (event, draggedElement, customDragImage) {
      // check if event is provided
      if (!(event instanceof Event)) {
          throw new Error('setDragImage requires a DragEvent as the first argument.');
      }
      // check if draggedElement is provided
      if (!(draggedElement instanceof HTMLElement)) {
          throw new Error('setDragImage requires the dragged element as the second argument.');
      }
      // set default function of none provided
      if (!customDragImage) {
          customDragImage = defaultDragImage;
      }
      // check if setDragImage method is available
      if (event.dataTransfer && event.dataTransfer.setDragImage) {
          // get the elements offset
          var elementOffset = offset(draggedElement);
          // get the dragImage
          var dragImage = customDragImage(draggedElement, elementOffset, event);
          // check if custom function returns correct values
          if (!(dragImage.element instanceof HTMLElement) || typeof dragImage.posX !== 'number' || typeof dragImage.posY !== 'number') {
              throw new Error('The customDragImage function you provided must return and object with the properties element[string], posX[integer], posY[integer].');
          }
          // needs to be set for HTML5 drag & drop to work
          event.dataTransfer.effectAllowed = 'copyMove';
          // Firefox requires it to use the event target's id for the data
          event.dataTransfer.setData('text/plain', getEventTarget(event).id);
          // set the drag image on the event
          event.dataTransfer.setDragImage(dragImage.element, dragImage.posX, dragImage.posY);
      }
  });

  /**
   * Check if curList accepts items from destList
   * @param {sortable} destination the container an item is move to
   * @param {sortable} origin the container an item comes from
   */
  var listsConnected = (function (destination, origin) {
      // check if valid sortable
      if (destination.isSortable === true) {
          var acceptFrom = store(destination).getConfig('acceptFrom');
          // check if acceptFrom is valid
          if (acceptFrom !== null && acceptFrom !== false && typeof acceptFrom !== 'string') {
              throw new Error('HTML5Sortable: Wrong argument, "acceptFrom" must be "null", "false", or a valid selector string.');
          }
          if (acceptFrom !== null) {
              return acceptFrom !== false && acceptFrom.split(',').filter(function (sel) {
                  return sel.length > 0 && origin.matches(sel);
              }).length > 0;
          }
          // drop in same list
          if (destination === origin) {
              return true;
          }
          // check if lists are connected with connectWith
          if (store(destination).getConfig('connectWith') !== undefined && store(destination).getConfig('connectWith') !== null) {
              return store(destination).getConfig('connectWith') === store(origin).getConfig('connectWith');
          }
      }
      return false;
  });

  /**
   * default configurations
   */
  var defaultConfiguration = {
      items: null,
      // deprecated
      connectWith: null,
      // deprecated
      disableIEFix: null,
      acceptFrom: null,
      copy: false,
      placeholder: null,
      placeholderClass: 'sortable-placeholder',
      draggingClass: 'sortable-dragging',
      hoverClass: false,
      dropTargetContainerClass: false,
      debounce: 0,
      throttleTime: 100,
      maxItems: 0,
      itemSerializer: undefined,
      containerSerializer: undefined,
      customDragImage: null,
      orientation: 'vertical'
  };

  /**
   * make sure a function is only called once within the given amount of time
   * @param {Function} fn the function to throttle
   * @param {number} threshold time limit for throttling
   */
  // must use function to keep this context
  function throttle (fn, threshold) {
      var _this = this;
      if (threshold === void 0) { threshold = 250; }
      // check function
      if (typeof fn !== 'function') {
          throw new Error('You must provide a function as the first argument for throttle.');
      }
      // check threshold
      if (typeof threshold !== 'number') {
          throw new Error('You must provide a number as the second argument for throttle.');
      }
      var lastEventTimestamp = null;
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var now = Date.now();
          if (lastEventTimestamp === null || now - lastEventTimestamp >= threshold) {
              lastEventTimestamp = now;
              fn.apply(_this, args);
          }
      };
  }

  /* eslint-env browser */
  /**
   * enable or disable hoverClass on mouseenter/leave if container Items
   * @param {sortable} sortableContainer a valid sortableContainer
   * @param {boolean} enable enable or disable event
   */
  var enableHoverClass = (function (sortableContainer, enable) {
      if (typeof store(sortableContainer).getConfig('hoverClass') === 'string') {
          var hoverClasses_1 = store(sortableContainer).getConfig('hoverClass').split(' ');
          // add class on hover
          if (enable === true) {
              addEventListener(sortableContainer, 'mousemove', throttle(function (event) {
                  // check of no mouse button was pressed when mousemove started == no drag
                  if (event.buttons === 0) {
                      filter(sortableContainer.children, store(sortableContainer).getConfig('items')).forEach(function (item) {
                          var _a, _b;
                          if (item === event.target || item.contains(event.target)) {
                              (_a = item.classList).add.apply(_a, hoverClasses_1);
                          }
                          else {
                              (_b = item.classList).remove.apply(_b, hoverClasses_1);
                          }
                      });
                  }
              }, store(sortableContainer).getConfig('throttleTime')));
              // remove class on leave
              addEventListener(sortableContainer, 'mouseleave', function () {
                  filter(sortableContainer.children, store(sortableContainer).getConfig('items')).forEach(function (item) {
                      var _a;
                      (_a = item.classList).remove.apply(_a, hoverClasses_1);
                  });
              });
              // remove events
          }
          else {
              removeEventListener(sortableContainer, 'mousemove');
              removeEventListener(sortableContainer, 'mouseleave');
          }
      }
  });

  /* eslint-env browser */
  /*
   * variables global to the plugin
   */
  var dragging;
  var draggingHeight;
  var draggingWidth;
  /*
   * Keeps track of the initialy selected list, where 'dragstart' event was triggered
   * It allows us to move the data in between individual Sortable List instances
   */
  // Origin List - data from before any item was changed
  var originContainer;
  var originIndex;
  var originElementIndex;
  var originItemsBeforeUpdate;
  // Previous Sortable Container - we dispatch as sortenter event when a
  // dragged item enters a sortableContainer for the first time
  var previousContainer;
  // Destination List - data from before any item was changed
  var destinationItemsBeforeUpdate;
  /**
   * remove event handlers from items
   * @param {Array|NodeList} items
   */
  var removeItemEvents = function (items) {
      removeEventListener(items, 'dragstart');
      removeEventListener(items, 'dragend');
      removeEventListener(items, 'dragover');
      removeEventListener(items, 'dragenter');
      removeEventListener(items, 'drop');
      removeEventListener(items, 'mouseenter');
      removeEventListener(items, 'mouseleave');
  };
  // Remove container events
  var removeContainerEvents = function (originContainer, previousContainer) {
      if (originContainer) {
          removeEventListener(originContainer, 'dragleave');
      }
      if (previousContainer && (previousContainer !== originContainer)) {
          removeEventListener(previousContainer, 'dragleave');
      }
  };
  /**
   * getDragging returns the current element to drag or
   * a copy of the element.
   * Is Copy Active for sortable
   * @param {HTMLElement} draggedItem - the item that the user drags
   * @param {HTMLElement} sortable a single sortable
   */
  var getDragging = function (draggedItem, sortable) {
      var ditem = draggedItem;
      if (store(sortable).getConfig('copy') === true) {
          ditem = draggedItem.cloneNode(true);
          addAttribute(ditem, 'aria-copied', 'true');
          draggedItem.parentElement.appendChild(ditem);
          ditem.style.display = 'none';
          ditem.oldDisplay = draggedItem.style.display;
      }
      return ditem;
  };
  /**
   * Remove data from sortable
   * @param {HTMLElement} sortable a single sortable
   */
  var removeSortableData = function (sortable) {
      removeData(sortable);
      removeAttribute(sortable, 'aria-dropeffect');
  };
  /**
   * Remove data from items
   * @param {Array<HTMLElement>|HTMLElement} items
   */
  var removeItemData = function (items) {
      removeAttribute(items, 'aria-grabbed');
      removeAttribute(items, 'aria-copied');
      removeAttribute(items, 'draggable');
      removeAttribute(items, 'role');
  };
  /**
   * find sortable from element. travels up parent element until found or null.
   * @param {HTMLElement} element a single sortable
   * @param {Event} event - the current event. We need to pass it to be able to
   * find Sortable whith shadowRoot (document fragment has no parent)
   */
  function findSortable(element, event) {
      if (event.composedPath) {
          return event.composedPath().find(function (el) { return el.isSortable; });
      }
      while (element.isSortable !== true) {
          element = element.parentElement;
      }
      return element;
  }
  /**
   * Dragging event is on the sortable element. finds the top child that
   * contains the element.
   * @param {HTMLElement} sortableElement a single sortable
   * @param {HTMLElement} element is that being dragged
   */
  function findDragElement(sortableElement, element) {
      var options = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, options.items);
      var itemlist = items.filter(function (ele) {
          return ele.contains(element) || (ele.shadowRoot && ele.shadowRoot.contains(element));
      });
      return itemlist.length > 0 ? itemlist[0] : element;
  }
  /**
   * Destroy the sortable
   * @param {HTMLElement} sortableElement a single sortable
   */
  var destroySortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts') || {};
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      // disable adding hover class
      enableHoverClass(sortableElement, false);
      // remove event handlers & data from sortable
      removeEventListener(sortableElement, 'dragover');
      removeEventListener(sortableElement, 'dragenter');
      removeEventListener(sortableElement, 'dragstart');
      removeEventListener(sortableElement, 'dragend');
      removeEventListener(sortableElement, 'drop');
      // remove event data from sortable
      removeSortableData(sortableElement);
      // remove event handlers & data from items
      removeEventListener(handles, 'mousedown');
      removeItemEvents(items);
      removeItemData(items);
      removeContainerEvents(originContainer, previousContainer);
      // clear sortable flag
      sortableElement.isSortable = false;
  };
  /**
   * Enable the sortable
   * @param {HTMLElement} sortableElement a single sortable
   */
  var enableSortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      addAttribute(sortableElement, 'aria-dropeffect', 'move');
      addData(sortableElement, '_disabled', 'false');
      addAttribute(handles, 'draggable', 'true');
      // enable hover class
      enableHoverClass(sortableElement, true);
      // @todo: remove this fix
      // IE FIX for ghost
      // can be disabled as it has the side effect that other events
      // (e.g. click) will be ignored
      if (opts.disableIEFix === false) {
          var spanEl = (document || window.document).createElement('span');
          if (typeof spanEl.dragDrop === 'function') {
              addEventListener(handles, 'mousedown', function () {
                  if (items.indexOf(this) !== -1) {
                      this.dragDrop();
                  }
                  else {
                      var parent = this.parentElement;
                      while (items.indexOf(parent) === -1) {
                          parent = parent.parentElement;
                      }
                      parent.dragDrop();
                  }
              });
          }
      }
  };
  /**
   * Disable the sortable
   * @param {HTMLElement} sortableElement a single sortable
   */
  var disableSortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      addAttribute(sortableElement, 'aria-dropeffect', 'none');
      addData(sortableElement, '_disabled', 'true');
      addAttribute(handles, 'draggable', 'false');
      removeEventListener(handles, 'mousedown');
      enableHoverClass(sortableElement, false);
  };
  /**
   * Reload the sortable
   * @param {HTMLElement} sortableElement a single sortable
   * @description events need to be removed to not be double bound
   */
  var reloadSortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      addData(sortableElement, '_disabled', 'false');
      // remove event handlers from items
      removeItemEvents(items);
      removeContainerEvents(originContainer, previousContainer);
      removeEventListener(handles, 'mousedown');
      // remove event handlers from sortable
      removeEventListener(sortableElement, 'dragover');
      removeEventListener(sortableElement, 'dragenter');
      removeEventListener(sortableElement, 'drop');
  };
  /**
   * Public sortable object
   * @param {Array|NodeList} sortableElements
   * @param {object|string} options|method
   */
  function sortable(sortableElements, options) {
      // get method string to see if a method is called
      var method = String(options);
      options = options || {};
      // check if the user provided a selector instead of an element
      if (typeof sortableElements === 'string') {
          sortableElements = document.querySelectorAll(sortableElements);
      }
      // if the user provided an element, return it in an array to keep the return value consistant
      if (sortableElements instanceof HTMLElement) {
          sortableElements = [sortableElements];
      }
      sortableElements = Array.prototype.slice.call(sortableElements);
      if (/serialize/.test(method)) {
          return sortableElements.map(function (sortableContainer) {
              var opts = addData(sortableContainer, 'opts');
              return serialize(sortableContainer, opts.itemSerializer, opts.containerSerializer);
          });
      }
      sortableElements.forEach(function (sortableElement) {
          if (/enable|disable|destroy/.test(method)) {
              return sortable[method](sortableElement);
          }
          // log deprecation
          ['connectWith', 'disableIEFix'].forEach(function (configKey) {
              if (Object.prototype.hasOwnProperty.call(options, configKey) && options[configKey] !== null) {
                  console.warn("HTML5Sortable: You are using the deprecated configuration \"" + configKey + "\". This will be removed in an upcoming version, make sure to migrate to the new options when updating.");
              }
          });
          // merge options with default options
          options = Object.assign({}, defaultConfiguration, store(sortableElement).config, options);
          // init data store for sortable
          store(sortableElement).config = options;
          // set options on sortable
          addData(sortableElement, 'opts', options);
          // property to define as sortable
          sortableElement.isSortable = true;
          // reset sortable
          reloadSortable(sortableElement);
          // initialize
          var listItems = filter(sortableElement.children, options.items);
          // create element if user defined a placeholder element as a string
          var customPlaceholder;
          if (options.placeholder !== null && options.placeholder !== undefined) {
              var tempContainer = document.createElement(sortableElement.tagName);
              if (options.placeholder instanceof HTMLElement) {
                  tempContainer.appendChild(options.placeholder);
              }
              else {
                  tempContainer.innerHTML = options.placeholder;
              }
              customPlaceholder = tempContainer.children[0];
          }
          // add placeholder
          store(sortableElement).placeholder = makePlaceholder(sortableElement, customPlaceholder, options.placeholderClass);
          addData(sortableElement, 'items', options.items);
          if (options.acceptFrom) {
              addData(sortableElement, 'acceptFrom', options.acceptFrom);
          }
          else if (options.connectWith) {
              addData(sortableElement, 'connectWith', options.connectWith);
          }
          enableSortable(sortableElement);
          addAttribute(listItems, 'role', 'option');
          addAttribute(listItems, 'aria-grabbed', 'false');
          /*
           Handle drag events on draggable items
           Handle is set at the sortableElement level as it will bubble up
           from the item
           */
          addEventListener(sortableElement, 'dragstart', function (e) {
              // ignore dragstart events
              var target = getEventTarget(e);
              if (target.isSortable === true) {
                  return;
              }
              e.stopImmediatePropagation();
              if ((options.handle && !target.matches(options.handle)) || target.getAttribute('draggable') === 'false') {
                  return;
              }
              var sortableContainer = findSortable(target, e);
              var dragItem = findDragElement(sortableContainer, target);
              // grab values
              originItemsBeforeUpdate = filter(sortableContainer.children, options.items);
              originIndex = originItemsBeforeUpdate.indexOf(dragItem);
              originElementIndex = getIndex(dragItem, sortableContainer.children);
              originContainer = sortableContainer;
              // add transparent clone or other ghost to cursor
              setDragImage(e, dragItem, options.customDragImage);
              // cache selsection & add attr for dragging
              draggingHeight = getElementHeight(dragItem);
              draggingWidth = getElementWidth(dragItem);
              dragItem.classList.add(options.draggingClass);
              dragging = getDragging(dragItem, sortableContainer);
              addAttribute(dragging, 'aria-grabbed', 'true');
              // dispatch sortstart event on each element in group
              sortableContainer.dispatchEvent(new CustomEvent('sortstart', {
                  detail: {
                      origin: {
                          elementIndex: originElementIndex,
                          index: originIndex,
                          container: originContainer
                      },
                      item: dragging,
                      originalTarget: target
                  }
              }));
          });
          /*
           We are capturing targetSortable before modifications with 'dragenter' event
          */
          addEventListener(sortableElement, 'dragenter', function (e) {
              var target = getEventTarget(e);
              var sortableContainer = findSortable(target, e);
              if (sortableContainer && sortableContainer !== previousContainer) {
                  destinationItemsBeforeUpdate = filter(sortableContainer.children, addData(sortableContainer, 'items'))
                      .filter(function (item) { return item !== store(sortableElement).placeholder; });
                  if (options.dropTargetContainerClass) {
                      sortableContainer.classList.add(options.dropTargetContainerClass);
                  }
                  sortableContainer.dispatchEvent(new CustomEvent('sortenter', {
                      detail: {
                          origin: {
                              elementIndex: originElementIndex,
                              index: originIndex,
                              container: originContainer
                          },
                          destination: {
                              container: sortableContainer,
                              itemsBeforeUpdate: destinationItemsBeforeUpdate
                          },
                          item: dragging,
                          originalTarget: target
                      }
                  }));
                  addEventListener(sortableContainer, 'dragleave', function (e) {
                      // TODO: rename outTarget to be more self-explanatory
                      // e.fromElement for very old browsers, similar to relatedTarget
                      var outTarget = e.relatedTarget || e.fromElement;
                      if (!e.currentTarget.contains(outTarget)) {
                          if (options.dropTargetContainerClass) {
                              sortableContainer.classList.remove(options.dropTargetContainerClass);
                          }
                          sortableContainer.dispatchEvent(new CustomEvent('sortleave', {
                              detail: {
                                  origin: {
                                      elementIndex: originElementIndex,
                                      index: originIndex,
                                      container: sortableContainer
                                  },
                                  item: dragging,
                                  originalTarget: target
                              }
                          }));
                      }
                  });
              }
              previousContainer = sortableContainer;
          });
          /*
           * Dragend Event - https://developer.mozilla.org/en-US/docs/Web/Events/dragend
           * Fires each time dragEvent end, or ESC pressed
           * We are using it to clean up any draggable elements and placeholders
           */
          addEventListener(sortableElement, 'dragend', function (e) {
              if (!dragging) {
                  return;
              }
              dragging.classList.remove(options.draggingClass);
              addAttribute(dragging, 'aria-grabbed', 'false');
              if (dragging.getAttribute('aria-copied') === 'true' && addData(dragging, 'dropped') !== 'true') {
                  dragging.remove();
              }
              if (dragging.oldDisplay !== undefined) {
                  dragging.style.display = dragging.oldDisplay;
                  delete dragging.oldDisplay;
              }
              var visiblePlaceholder = Array.from(stores.values()).map(function (data) { return data.placeholder; })
                  .filter(function (placeholder) { return placeholder instanceof HTMLElement; })
                  .filter(isInDom)[0];
              if (visiblePlaceholder) {
                  visiblePlaceholder.remove();
              }
              // dispatch sortstart event on each element in group
              sortableElement.dispatchEvent(new CustomEvent('sortstop', {
                  detail: {
                      origin: {
                          elementIndex: originElementIndex,
                          index: originIndex,
                          container: originContainer
                      },
                      item: dragging
                  }
              }));
              previousContainer = null;
              dragging = null;
              draggingHeight = null;
              draggingWidth = null;
          });
          /*
           * Drop Event - https://developer.mozilla.org/en-US/docs/Web/Events/drop
           * Fires when valid drop target area is hit
           */
          addEventListener(sortableElement, 'drop', function (e) {
              if (!listsConnected(sortableElement, dragging.parentElement)) {
                  return;
              }
              e.preventDefault();
              e.stopPropagation();
              addData(dragging, 'dropped', 'true');
              // get the one placeholder that is currently visible
              var visiblePlaceholder = Array.from(stores.values()).map(function (data) {
                  return data.placeholder;
              })
                  // filter only HTMLElements
                  .filter(function (placeholder) { return placeholder instanceof HTMLElement; })
                  // only elements in DOM
                  .filter(isInDom)[0];
              if (visiblePlaceholder) {
                  visiblePlaceholder.replaceWith(dragging);
                  // to avoid flickering restoring element display immediately after replacing placeholder
                  if (dragging.oldDisplay !== undefined) {
                      dragging.style.display = dragging.oldDisplay;
                      delete dragging.oldDisplay;
                  }
              }
              else {
                  // set the dropped value to 'false' to delete copied dragging at the time of 'dragend'
                  addData(dragging, 'dropped', 'false');
                  return;
              }
              /*
               * Fires Custom Event - 'sortstop'
               */
              sortableElement.dispatchEvent(new CustomEvent('sortstop', {
                  detail: {
                      origin: {
                          elementIndex: originElementIndex,
                          index: originIndex,
                          container: originContainer
                      },
                      item: dragging
                  }
              }));
              var placeholder = store(sortableElement).placeholder;
              var originItems = filter(originContainer.children, options.items)
                  .filter(function (item) { return item !== placeholder; });
              var destinationContainer = this.isSortable === true ? this : this.parentElement;
              var destinationItems = filter(destinationContainer.children, addData(destinationContainer, 'items'))
                  .filter(function (item) { return item !== placeholder; });
              var destinationElementIndex = getIndex(dragging, Array.from(dragging.parentElement.children)
                  .filter(function (item) { return item !== placeholder; }));
              var destinationIndex = getIndex(dragging, destinationItems);
              if (options.dropTargetContainerClass) {
                  destinationContainer.classList.remove(options.dropTargetContainerClass);
              }
              /*
               * When a list item changed container lists or index within a list
               * Fires Custom Event - 'sortupdate'
               */
              if (originElementIndex !== destinationElementIndex || originContainer !== destinationContainer) {
                  sortableElement.dispatchEvent(new CustomEvent('sortupdate', {
                      detail: {
                          origin: {
                              elementIndex: originElementIndex,
                              index: originIndex,
                              container: originContainer,
                              itemsBeforeUpdate: originItemsBeforeUpdate,
                              items: originItems
                          },
                          destination: {
                              index: destinationIndex,
                              elementIndex: destinationElementIndex,
                              container: destinationContainer,
                              itemsBeforeUpdate: destinationItemsBeforeUpdate,
                              items: destinationItems
                          },
                          item: dragging
                      }
                  }));
              }
          });
          var debouncedDragOverEnter = debounce(function (sortableElement, element, pageX, pageY) {
              if (!dragging) {
                  return;
              }
              // set placeholder height if forcePlaceholderSize option is set
              if (options.forcePlaceholderSize) {
                  store(sortableElement).placeholder.style.height = draggingHeight + 'px';
                  store(sortableElement).placeholder.style.width = draggingWidth + 'px';
              }
              // if element the draggedItem is dragged onto is within the array of all elements in list
              // (not only items, but also disabled, etc.)
              if (Array.from(sortableElement.children).indexOf(element) > -1) {
                  var thisHeight = getElementHeight(element);
                  var thisWidth = getElementWidth(element);
                  var placeholderIndex = getIndex(store(sortableElement).placeholder, element.parentElement.children);
                  var thisIndex = getIndex(element, element.parentElement.children);
                  // Check if `element` is bigger than the draggable. If it is, we have to define a dead zone to prevent flickering
                  if (thisHeight > draggingHeight || thisWidth > draggingWidth) {
                      // Dead zone?
                      var deadZoneVertical = thisHeight - draggingHeight;
                      var deadZoneHorizontal = thisWidth - draggingWidth;
                      var offsetTop = offset(element).top;
                      var offsetLeft = offset(element).left;
                      if (placeholderIndex < thisIndex &&
                          ((options.orientation === 'vertical' && pageY < offsetTop) ||
                              (options.orientation === 'horizontal' && pageX < offsetLeft))) {
                          return;
                      }
                      if (placeholderIndex > thisIndex &&
                          ((options.orientation === 'vertical' && pageY > offsetTop + thisHeight - deadZoneVertical) ||
                              (options.orientation === 'horizontal' && pageX > offsetLeft + thisWidth - deadZoneHorizontal))) {
                          return;
                      }
                  }
                  if (dragging.oldDisplay === undefined) {
                      dragging.oldDisplay = dragging.style.display;
                  }
                  if (dragging.style.display !== 'none') {
                      dragging.style.display = 'none';
                  }
                  // To avoid flicker, determine where to position the placeholder
                  // based on where the mouse pointer is relative to the elements
                  // vertical center.
                  var placeAfter = false;
                  try {
                      var elementMiddleVertical = offset(element).top + element.offsetHeight / 2;
                      var elementMiddleHorizontal = offset(element).left + element.offsetWidth / 2;
                      placeAfter = (options.orientation === 'vertical' && (pageY >= elementMiddleVertical)) ||
                          (options.orientation === 'horizontal' && (pageX >= elementMiddleHorizontal));
                  }
                  catch (e) {
                      placeAfter = placeholderIndex < thisIndex;
                  }
                  if (placeAfter) {
                      insertAfter(element, store(sortableElement).placeholder);
                  }
                  else {
                      insertBefore(element, store(sortableElement).placeholder);
                  }
                  // get placeholders from all stores & remove all but current one
                  Array.from(stores.values())
                      // remove empty values
                      .filter(function (data) { return data.placeholder !== undefined; })
                      // foreach placeholder in array if outside of current sorableContainer -> remove from DOM
                      .forEach(function (data) {
                      if (data.placeholder !== store(sortableElement).placeholder) {
                          data.placeholder.remove();
                      }
                  });
              }
              else {
                  // get all placeholders from store
                  var placeholders = Array.from(stores.values())
                      .filter(function (data) { return data.placeholder !== undefined; })
                      .map(function (data) {
                      return data.placeholder;
                  });
                  // check if element is not in placeholders
                  if (placeholders.indexOf(element) === -1 && sortableElement === element && !filter(element.children, options.items).length) {
                      placeholders.forEach(function (element) { return element.remove(); });
                      element.appendChild(store(sortableElement).placeholder);
                  }
              }
          }, options.debounce);
          // Handle dragover and dragenter events on draggable items
          var onDragOverEnter = function (e) {
              var element = e.target;
              var sortableElement = element.isSortable === true ? element : findSortable(element, e);
              element = findDragElement(sortableElement, element);
              if (!dragging || !listsConnected(sortableElement, dragging.parentElement) || addData(sortableElement, '_disabled') === 'true') {
                  return;
              }
              var options = addData(sortableElement, 'opts');
              if (parseInt(options.maxItems) && filter(sortableElement.children, addData(sortableElement, 'items')).length > parseInt(options.maxItems) && dragging.parentElement !== sortableElement) {
                  return;
              }
              e.preventDefault();
              e.stopPropagation();
              e.dataTransfer.dropEffect = store(sortableElement).getConfig('copy') === true ? 'copy' : 'move';
              debouncedDragOverEnter(sortableElement, element, e.pageX, e.pageY);
          };
          addEventListener(listItems.concat(sortableElement), 'dragover', onDragOverEnter);
          addEventListener(listItems.concat(sortableElement), 'dragenter', onDragOverEnter);
      });
      return sortableElements;
  }
  sortable.destroy = function (sortableElement) {
      destroySortable(sortableElement);
  };
  sortable.enable = function (sortableElement) {
      enableSortable(sortableElement);
  };
  sortable.disable = function (sortableElement) {
      disableSortable(sortableElement);
  };
  /* START.TESTS_ONLY */
  sortable.__testing = {
      // add internal methods here for testing purposes
      data: addData,
      removeItemEvents: removeItemEvents,
      removeItemData: removeItemData,
      removeSortableData: removeSortableData,
      removeContainerEvents: removeContainerEvents
  };

  return sortable;

}());

// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
(function (window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function (stuff) {}
  };

  // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  }

  // Check if fancyBox is already initialized
  // ========================================

  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");

    return;
  }

  // Private default settings
  // ========================

  var defaults = {
    // Close existing modals
    // Set this to false if you do not need to stack multiple instances
    closeExisting: false,

    // Enable infinite gallery navigation
    loop: false,

    // Horizontal space between slides
    gutter: 50,

    // Enable keyboard navigation
    keyboard: true,

    // Should allow caption to overlap the content
    preventCaptionOverlap: true,

    // Should display navigation arrows at the screen edges
    arrows: true,

    // Should display counter at the top left corner
    infobar: true,

    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",

    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",

    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: [
      "zoom",
      //"share",
      "slideShow",
      //"fullScreen",
      //"download",
      "thumbs",
      "close"
    ],

    // Detect "idle" time in seconds
    idleTime: 3,

    // Disable right-click and use simple image protection for images
    protect: false,

    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,

    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },

    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },

    iframe: {
      // Iframe template
      tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',

      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,

      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},

      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },

    // For HTML5 video only
    video: {
      tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' +
        '<source src="{{src}}" type="{{format}}" />' +
        'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
        "</video>",
      format: "", // custom video format
      autoStart: true
    },

    // Default content type if cannot be detected automatically
    defaultType: "image",

    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",

    // Duration in ms for open/close animation
    animationDuration: 366,

    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",

    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",

    // Duration in ms for transition animation
    transitionDuration: 366,

    // Custom CSS class for slide element
    slideClass: "",

    // Custom CSS class for layout
    baseClass: "",

    // Base template for layout
    baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' +
      "</div>" +
      "</div>",

    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',

    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

    btnTpl: {
      download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
        "</a>",

      zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
        "</button>",

      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
        "</button>",

      // Arrows
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
        '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
        "</button>",

      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
        "</button>",

      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
        "</button>"
    },

    // Container is injected into this element
    parentEl: "body",

    // Hide browser vertical scrollbars; use at your own risk
    hideScrollbar: true,

    // Focus handling
    // ==============

    // Try to focus on the first focusable element after opening
    autoFocus: true,

    // Put focus back to active element after closing
    backFocus: true,

    // Do not let user to focus on element outside modal content
    trapFocus: true,

    // Module specific options
    // =======================

    fullScreen: {
      autoStart: false
    },

    // Set `touch: false` to disable panning/swiping
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning
    },

    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,

    // Customize or add new media types
    // Example:
    /*
      media : {
        youtube : {
          params : {
            autoplay : 0
          }
        }
      }
    */
    media: {},

    slideShow: {
      autoStart: false,
      speed: 3000
    },

    thumbs: {
      autoStart: false, // Display thumbnails on opening
      hideOnClose: true, // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container", // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling
    },

    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",

    // Callbacks
    //==========

    // See Documentation/API/Events for more information
    // Example:
    /*
      afterShow: function( instance, current ) {
        console.info( 'Clicked element:' );
        console.info( current.opts.$orig );
      }
    */

    onInit: $.noop, // When instance has been initialized

    beforeLoad: $.noop, // Before the content of a slide is being loaded
    afterLoad: $.noop, // When the content of a slide is done loading

    beforeShow: $.noop, // Before open animation starts
    afterShow: $.noop, // When content is done loading and animating

    beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop, // After instance has been closed

    onActivate: $.noop, // When instance is brought to front
    onDeactivate: $.noop, // When other instance has been activated

    // Interaction
    // ===========

    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing

    // Clicked on the content
    clickContent: function (current, event) {
      return current.type === "image" ? "zoom" : false;
    },

    // Clicked on the slide
    clickSlide: "close",

    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",

    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,

    // Custom options when mobile device is detected
    // =============================================

    mobile: {
      preventCaptionOverlap: false,
      idleTime: false,
      clickContent: function (current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function (current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function (current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function (current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },

    // Internationalization
    // ====================

    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schlie&szlig;en",
        NEXT: "Weiter",
        PREV: "Zur&uuml;ck",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Vergr&ouml;&szlig;ern"
      }
    }
  };

  // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);

  var called = 0;

  // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================
  var isQuery = function (obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  };

  // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================
  var requestAFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var cancelAFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function (id) {
        window.clearTimeout(id);
      }
    );
  })();

  // Detect the supported transition-end event property name
  // =======================================================
  var transitionEnd = (function () {
    var el = document.createElement("fakeelement"),
      t;

    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return "transitionend";
  })();

  // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================
  var forceRedraw = function ($el) {
    return $el && $el.length && $el[0].offsetHeight;
  };

  // Exclude array (`buttons`) options from deep merging
  // ===================================================
  var mergeOpts = function (opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);

    $.each(opts2, function (key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });

    return rez;
  };

  // How much of an element is visible in viewport
  // =============================================

  var inViewport = function (elem) {
    var elemCenter, rez;

    if (!elem || elem.ownerDocument !== document) {
      return false;
    }

    $(".fancybox-container").css("pointer-events", "none");

    elemCenter = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };

    rez = document.elementFromPoint(elemCenter.x, elemCenter.y) === elem;

    $(".fancybox-container").css("pointer-events", "");

    return rez;
  };

  // Class definition
  // ================

  var FancyBox = function (content, opts, index) {
    var self = this;

    self.opts = mergeOpts({
      index: index
    }, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;

    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;

    self.prevPos = null;
    self.currPos = 0;

    self.firstRun = true;

    // All group items
    self.group = [];

    // Existing slides (for current, next and previous gallery items)
    self.slides = {};

    // Create group elements
    self.addContent(content);

    if (!self.group.length) {
      return;
    }

    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================

    init: function () {
      var self = this,
        firstItem = self.group[self.currIndex],
        firstItemOpts = firstItem.opts,
        $container,
        buttonStr;

      if (firstItemOpts.closeExisting) {
        $.fancybox.close(true);
      }

      // Hide scrollbars
      // ===============

      $("body").addClass("fancybox-active");

      if (
        !$.fancybox.getInstance() &&
        firstItemOpts.hideScrollbar !== false &&
        !$.fancybox.isMobile &&
        document.body.scrollHeight > window.innerHeight
      ) {
        $("head").append(
          '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
          (window.innerWidth - document.documentElement.clientWidth) +
          "px;}</style>"
        );

        $("body").addClass("compensate-for-scrollbar");
      }

      // Build html markup and set references
      // ====================================

      // Build html code for buttons and insert into main template
      buttonStr = "";

      $.each(firstItemOpts.buttons, function (index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      });

      // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete
      $container = $(
          self.translate(
            self,
            firstItemOpts.baseTpl
            .replace("{{buttons}}", buttonStr)
            .replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight)
          )
        )
        .attr("id", "fancybox-container-" + self.id)
        .addClass(firstItemOpts.baseClass)
        .data("FancyBox", self)
        .appendTo(firstItemOpts.parentEl);

      // Create object holding references to jQuery wrapped nodes
      self.$refs = {
        container: $container
      };

      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });

      self.trigger("onInit");

      // Enable events, deactive previous instances
      self.activate();

      // Build slides, load and reveal content
      self.jumpTo(self.currIndex);
    },

    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================

    translate: function (obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en;

      return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
        return arr[n] === undefined ? match : arr[n];
      });
    },

    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================

    addContent: function (content) {
      var self = this,
        items = $.makeArray(content),
        thumbs;

      $.each(items, function (i, item) {
        var obj = {},
          opts = {},
          $item,
          type,
          found,
          src,
          srcParts;

        // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item);

          // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options);

          // Here we store clicked element
          opts.$orig = $item;

          obj.src = self.opts.src || opts.src || $item.attr("href");

          // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`
          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        }

        // Each gallery object has full collection of options
        obj.opts = $.extend(true, {}, self.opts, opts);

        // Do not merge buttons array
        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        }

        if ($.fancybox.isMobile && obj.opts.mobile) {
          obj.opts = mergeOpts(obj.opts, obj.opts.mobile);
        }

        // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================

        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if ((found = src.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))) {
            type = "video";

            if (!obj.opts.video.format) {
              obj.opts.video.format = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
            obj = $.extend(true, obj, {
              contentType: "pdf",
              opts: {
                iframe: {
                  preload: false
                }
              }
            });
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        }

        // Step 3 - Some adjustments
        // =========================

        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        }

        // Find thumbnail image, check if exists and if is in the viewport
        obj.$thumb = obj.opts.$thumb || null;

        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.$thumb = obj.opts.$trigger.find("img:first");

          if (obj.$thumb.length) {
            obj.opts.$orig = obj.opts.$trigger;
          }
        }

        if (!(obj.$thumb && obj.$thumb.length) && obj.opts.$orig) {
          obj.$thumb = obj.opts.$orig.find("img:first");
        }

        if (obj.$thumb && !obj.$thumb.length) {
          obj.$thumb = null;
        }

        obj.thumb = obj.opts.thumb || (obj.$thumb ? obj.$thumb[0].src : null);

        // "caption" is a "special" option, it can be used to customize caption per gallery item
        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        }

        // Make sure we have caption as a string or jQuery object
        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
        }

        // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"
        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();

            obj.opts.filter = srcParts.shift();
          }
        }

        // Hide all buttons and disable interactivity for modal items
        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            trapFocus: true,
            // Remove buttons
            infobar: 0,
            toolbar: 0,

            smallBtn: 0,

            // Disable keyboard navigation
            keyboard: 0,

            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,

            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        }

        // Step 4 - Add processed object to group
        // ======================================

        self.group.push(obj);
      });

      // Update controls if gallery is already opened
      if (Object.keys(self.slides).length) {
        self.updateControls();

        // Update thumbnails, if needed
        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();

          thumbs.focus();
        }
      }
    },

    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detecting inactivity
    // ======================================

    addEvents: function () {
      var self = this;

      self.removeEvents();

      // Make navigation elements clickable
      // ==================================

      self.$refs.container
        .on("click.fb-close", "[data-fancybox-close]", function (e) {
          e.stopPropagation();
          e.preventDefault();

          self.close(e);
        })
        .on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (e) {
          e.stopPropagation();
          e.preventDefault();

          self.previous();
        })
        .on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (e) {
          e.stopPropagation();
          e.preventDefault();

          self.next();
        })
        .on("click.fb", "[data-fancybox-zoom]", function (e) {
          // Click handler for zoom button
          self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
        });

      // Handle page scrolling and browser resizing
      // ==========================================

      $W.on("orientationchange.fb resize.fb", function (e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          if (self.requestId) {
            cancelAFrame(self.requestId);
          }

          self.requestId = requestAFrame(function () {
            self.update(e);
          });
        } else {
          if (self.current && self.current.type === "iframe") {
            self.$refs.stage.hide();
          }

          setTimeout(
            function () {
              self.$refs.stage.show();

              self.update(e);
            },
            $.fancybox.isMobile ? 600 : 250
          );
        }
      });

      $D.on("keydown.fb", function (e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null,
          current = instance.current,
          keycode = e.keyCode || e.which;

        // Trap keyboard focus inside of the modal
        // =======================================

        if (keycode == 9) {
          if (current.opts.trapFocus) {
            self.focus(e);
          }

          return;
        }

        // Enable keyboard navigation
        // ==========================

        if (!current.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input,textarea,video,audio,select")) {
          return;
        }

        // Backspace and Esc keys
        if (keycode === 8 || keycode === 27) {
          e.preventDefault();

          self.close(e);

          return;
        }

        // Left arrow and Up arrow
        if (keycode === 37 || keycode === 38) {
          e.preventDefault();

          self.previous();

          return;
        }

        // Righ arrow and Down arrow
        if (keycode === 39 || keycode === 40) {
          e.preventDefault();

          self.next();

          return;
        }

        self.trigger("afterKeydown", e, keycode);
      });

      // Hide controls after some inactivity period
      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;

        $D.on(
          "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
          function (e) {
            self.idleSecondsCounter = 0;

            if (self.isIdle) {
              self.showControls();
            }

            self.isIdle = false;
          }
        );

        self.idleInterval = window.setInterval(function () {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;

            self.hideControls();
          }
        }, 1000);
      }
    },

    // Remove events added by the core
    // ===============================

    removeEvents: function () {
      var self = this;

      $W.off("orientationchange.fb resize.fb");
      $D.off("keydown.fb .fb-idle");

      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);

        self.idleInterval = null;
      }
    },

    // Change to previous gallery item
    // ===============================

    previous: function (duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },

    // Change to next gallery item
    // ===========================

    next: function (duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },

    // Switch to selected gallery item
    // ===============================

    jumpTo: function (pos, duration) {
      var self = this,
        groupLen = self.group.length,
        firstRun,
        isMoved,
        loop,
        current,
        previous,
        slidePos,
        stagePos,
        prop,
        diff;

      if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) {
        return;
      }

      // Should loop?
      pos = parseInt(pos, 10);
      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      }

      // Check if opening for the first time; this helps to speed things up
      firstRun = self.firstRun = !Object.keys(self.slides).length;

      // Create slides
      previous = self.current;

      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos;

      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }

        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;

      self.trigger("beforeShow", firstRun);

      self.updateControls();

      // Validate duration length
      current.forcedDuration = undefined;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10);

      // Check if user has swiped the slides or if still animating
      isMoved = self.isMoved(current);

      // Make sure current slide is visible
      current.$slide.addClass("fancybox-slide--current");

      // Fresh start - reveal container, current slide and start loading content
      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.addClass("fancybox-is-open").trigger("focus");

        // Attempt to load content into slide
        // This will later call `afterLoad` -> `revealContent`
        self.loadSlide(current);

        self.preload("image");

        return;
      }

      // Get actual slide/stage positions (before cleaning up)
      slidePos = $.fancybox.getTranslate(previous.$slide);
      stagePos = $.fancybox.getTranslate(self.$refs.stage);

      // Clean up all slides
      $.each(self.slides, function (index, slide) {
        $.fancybox.stop(slide.$slide, true);
      });

      if (previous.pos !== current.pos) {
        previous.isComplete = false;
      }

      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current");

      // If slides are out of place, then animate them to correct position
      if (isMoved) {
        // Calculate horizontal swipe distance
        diff = slidePos.left - (previous.pos * slidePos.width + previous.pos * previous.opts.gutter);

        $.each(self.slides, function (index, slide) {
          slide.$slide.removeClass("fancybox-animated").removeClass(function (index, className) {
            return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
          });

          // Make sure that each slide is in equal distance
          // This is mostly needed for freshly added slides, because they are not yet positioned
          var leftPos = slide.pos * slidePos.width + slide.pos * slide.opts.gutter;

          $.fancybox.setTranslate(slide.$slide, {
            top: 0,
            left: leftPos - stagePos.left + diff
          });

          if (slide.pos !== current.pos) {
            slide.$slide.addClass("fancybox-slide--" + (slide.pos > current.pos ? "next" : "previous"));
          }

          // Redraw to make sure that transition will start
          forceRedraw(slide.$slide);

          // Animate the slide
          $.fancybox.animate(
            slide.$slide, {
              top: 0,
              left: (slide.pos - current.pos) * slidePos.width + (slide.pos - current.pos) * slide.opts.gutter
            },
            duration,
            function () {
              slide.$slide
                .css({
                  transform: "",
                  opacity: ""
                })
                .removeClass("fancybox-slide--next fancybox-slide--previous");

              if (slide.pos === self.currPos) {
                self.complete();
              }
            }
          );
        });
      } else if (duration && current.opts.transitionEffect) {
        // Set transition effect for previously active slide
        prop = "fancybox-animated fancybox-fx-" + current.opts.transitionEffect;

        previous.$slide.addClass("fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous"));

        $.fancybox.animate(
          previous.$slide,
          prop,
          duration,
          function () {
            previous.$slide.removeClass(prop).removeClass("fancybox-slide--next fancybox-slide--previous");
          },
          false
        );
      }

      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");
    },

    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================

    createSlide: function (pos) {
      var self = this,
        $slide,
        index;

      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });

        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },

    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================

    scaleToActual: function (x, y, duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        canvasWidth = $.fancybox.getTranslate(current.$slide).width,
        canvasHeight = $.fancybox.getTranslate(current.$slide).height,
        newImgWidth = current.width,
        newImgHeight = current.height,
        imgPos,
        posX,
        posY,
        scaleX,
        scaleY;

      if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      self.isAnimating = true;

      $.fancybox.stop($content);

      x = x === undefined ? canvasWidth * 0.5 : x;
      y = y === undefined ? canvasHeight * 0.5 : y;

      imgPos = $.fancybox.getTranslate($content);

      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;

      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height;

      // Get center position for original image
      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5;

      // Make sure image does not move away from edges
      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);

      $.fancybox.animate(
        $content, {
          top: posY,
          left: posX,
          scaleX: scaleX,
          scaleY: scaleY
        },
        duration || 366,
        function () {
          self.isAnimating = false;
        }
      );

      // Stop slideshow
      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },

    // Scale image to fit inside parent element
    // ========================================

    scaleToFit: function (duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        end;

      if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      self.isAnimating = true;

      $.fancybox.stop($content);

      end = self.getFitPos(current);

      self.updateCursor(end.width, end.height);

      $.fancybox.animate(
        $content, {
          top: end.top,
          left: end.left,
          scaleX: end.width / $content.width(),
          scaleY: end.height / $content.height()
        },
        duration || 366,
        function () {
          self.isAnimating = false;
        }
      );
    },

    // Calculate image size to fit inside viewport
    // ===========================================

    getFitPos: function (slide) {
      var self = this,
        $content = slide.$content,
        $slide = slide.$slide,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        maxWidth,
        maxHeight,
        minRatio,
        aspectRatio,
        rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      maxWidth = $.fancybox.getTranslate(self.$refs.stage).width;
      maxHeight = $.fancybox.getTranslate(self.$refs.stage).height;

      maxWidth -=
        parseFloat($slide.css("paddingLeft")) +
        parseFloat($slide.css("paddingRight")) +
        parseFloat($content.css("marginLeft")) +
        parseFloat($content.css("marginRight"));

      maxHeight -=
        parseFloat($slide.css("paddingTop")) +
        parseFloat($slide.css("paddingBottom")) +
        parseFloat($content.css("marginTop")) +
        parseFloat($content.css("marginBottom"));

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height);

      width = minRatio * width;
      height = minRatio * height;

      // Adjust width/height to precisely fit into container
      if (width > maxWidth - 0.5) {
        width = maxWidth;
      }

      if (height > maxHeight - 0.5) {
        height = maxHeight;
      }

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + parseFloat($slide.css("paddingTop"));
        rez.left = Math.floor((maxWidth - width) * 0.5) + parseFloat($slide.css("paddingLeft"));
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;

      return rez;
    },

    // Update content size and position for all slides
    // ==============================================

    update: function (e) {
      var self = this;

      $.each(self.slides, function (key, slide) {
        self.updateSlide(slide, e);
      });
    },

    // Update slide content position and size
    // ======================================

    updateSlide: function (slide, e) {
      var self = this,
        $content = slide && slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        $slide = slide.$slide;

      // First, prevent caption overlap, if needed
      self.adjustCaption(slide);

      // Then resize content to fit inside the slide
      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);

        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;

          self.updateCursor();
        }
      }

      // Then some adjustments
      self.adjustLayout(slide);

      if ($slide.length) {
        $slide.trigger("refresh");

        if (slide.pos === self.currPos) {
          self.$refs.toolbar
            .add(self.$refs.navigation.find(".fancybox-button--arrow_right"))
            .toggleClass("compensate-for-scrollbar", $slide.get(0).scrollHeight > $slide.get(0).clientHeight);
        }
      }

      self.trigger("onUpdate", slide, e);
    },

    // Horizontally center slide
    // =========================

    centerSlide: function (duration) {
      var self = this,
        current = self.current,
        $slide = current.$slide;

      if (self.isClosing || !current) {
        return;
      }

      $slide.siblings().css({
        transform: "",
        opacity: ""
      });

      $slide
        .parent()
        .children()
        .removeClass("fancybox-slide--previous fancybox-slide--next");

      $.fancybox.animate(
        $slide, {
          top: 0,
          left: 0,
          opacity: 1
        },
        duration === undefined ? 0 : duration,
        function () {
          // Clean up
          $slide.css({
            transform: "",
            opacity: ""
          });

          if (!current.isComplete) {
            self.complete();
          }
        },
        false
      );
    },

    // Check if current slide is moved (swiped)
    // ========================================

    isMoved: function (slide) {
      var current = slide || this.current,
        slidePos,
        stagePos;

      if (!current) {
        return false;
      }

      stagePos = $.fancybox.getTranslate(this.$refs.stage);
      slidePos = $.fancybox.getTranslate(current.$slide);

      return (
        !current.$slide.hasClass("fancybox-animated") &&
        (Math.abs(slidePos.top - stagePos.top) > 0.5 || Math.abs(slidePos.left - stagePos.left) > 0.5)
      );
    },

    // Update cursor style depending if content can be zoomed
    // ======================================================

    updateCursor: function (nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        $container = self.$refs.container,
        canPan,
        isZoomable;

      if (!current || self.isClosing || !self.Guestures) {
        return;
      }

      $container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan");

      canPan = self.canPan(nextWidth, nextHeight);

      isZoomable = canPan ? true : self.isZoomable();

      $container.toggleClass("fancybox-is-zoomable", isZoomable);

      $("[data-fancybox-zoom]").prop("disabled", !isZoomable);

      if (canPan) {
        $container.addClass("fancybox-can-pan");
      } else if (
        isZoomable &&
        (current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) == "zoom"))
      ) {
        $container.addClass("fancybox-can-zoomIn");
      } else if (current.opts.touch && (current.opts.touch.vertical || self.group.length > 1) && current.contentType !== "video") {
        $container.addClass("fancybox-can-swipe");
      }
    },

    // Check if current slide is zoomable
    // ==================================

    isZoomable: function () {
      var self = this,
        current = self.current,
        fitPos;

      // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area
      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (fitPos && (current.width > fitPos.width || current.height > fitPos.height)) {
          return true;
        }
      }

      return false;
    },

    // Check if current image dimensions are smaller than actual
    // =========================================================

    isScaledDown: function (nextWidth, nextHeight) {
      var self = this,
        rez = false,
        current = self.current,
        $content = current.$content;

      if (nextWidth !== undefined && nextHeight !== undefined) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },

    // Check if image dimensions exceed parent element
    // ===============================================

    canPan: function (nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        pos = null,
        rez = false;

      if (current.type === "image" && (current.isComplete || (nextWidth && nextHeight)) && !current.hasError) {
        rez = self.getFitPos(current);

        if (nextWidth !== undefined && nextHeight !== undefined) {
          pos = {
            width: nextWidth,
            height: nextHeight
          };
        } else if (current.isComplete) {
          pos = $.fancybox.getTranslate(current.$content);
        }

        if (pos && rez) {
          rez = Math.abs(pos.width - rez.width) > 1.5 || Math.abs(pos.height - rez.height) > 1.5;
        }
      }

      return rez;
    },

    // Load content into the slide
    // ===========================

    loadSlide: function (slide) {
      var self = this,
        type,
        $slide,
        ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;

      if (self.trigger("beforeLoad", slide) === false) {
        slide.isLoading = false;

        return false;
      }

      type = slide.type;
      $slide = slide.$slide;

      $slide
        .off("refresh")
        .trigger("onReset")
        .addClass(slide.opts.slideClass);

      // Create content depending on the type
      switch (type) {
        case "image":
          self.setImage(slide);

          break;

        case "iframe":
          self.setIframe(slide);

          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);

          break;

        case "video":
          self.setContent(
            slide,
            slide.opts.video.tpl
            .replace(/\{\{src\}\}/gi, slide.src)
            .replace("{{format}}", slide.opts.videoFormat || slide.opts.video.format || "")
            .replace("{{poster}}", slide.thumb || "")
          );

          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);

          ajaxLoad = $.ajax(
            $.extend({}, slide.opts.ajax.settings, {
              url: slide.src,
              success: function (data, textStatus) {
                if (textStatus === "success") {
                  self.setContent(slide, data);
                }
              },
              error: function (jqXHR, textStatus) {
                if (jqXHR && textStatus !== "abort") {
                  self.setError(slide);
                }
              }
            })
          );

          $slide.one("onReset", function () {
            ajaxLoad.abort();
          });

          break;

        default:
          self.setError(slide);

          break;
      }

      return true;
    },

    // Use thumbnail image, if possible
    // ================================

    setImage: function (slide) {
      var self = this,
        ghost;

      // Check if need to show loading icon
      setTimeout(function () {
        var $img = slide.$image;

        if (!self.isClosing && slide.isLoading && (!$img || !$img.length || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 50);

      //Check if image has srcset
      self.checkSrcset(slide);

      // This will be wrapper containing both ghost and actual image
      slide.$content = $('<div class="fancybox-content"></div>')
        .addClass("fancybox-is-hidden")
        .appendTo(slide.$slide.addClass("fancybox-slide--image"));

      // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually
      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && slide.thumb) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;

        ghost = document.createElement("img");

        ghost.onerror = function () {
          $(this).remove();

          slide.$ghost = null;
        };

        ghost.onload = function () {
          self.afterLoad(slide);
        };

        slide.$ghost = $(ghost)
          .addClass("fancybox-image")
          .appendTo(slide.$content)
          .attr("src", slide.thumb);
      }

      // Start loading actual image
      self.setBigImage(slide);
    },

    // Check if image has srcset and get the source
    // ============================================
    checkSrcset: function (slide) {
      var srcset = slide.opts.srcset || slide.opts.image.srcset,
        found,
        temp,
        pxRatio,
        windowWidth;

      // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.
      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;

        temp = srcset.split(",").map(function (el) {
          var ret = {};

          el.trim()
            .split(/\s+/)
            .forEach(function (el, i) {
              var value = parseInt(el.substring(0, el.length - 1), 10);

              if (i === 0) {
                return (ret.url = el);
              }

              if (value) {
                ret.value = value;
                ret.postfix = el[el.length - 1];
              }
            });

          return ret;
        });

        // Sort by value
        temp.sort(function (a, b) {
          return a.value - b.value;
        });

        // Ok, now we have an array of all srcset values
        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) {
            found = el;
            break;
          }
        }

        // If not found, take the last one
        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url;

          // If we have default width/height values, we can calculate height for matching source
          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = (slide.width / slide.height) * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      }
    },

    // Create full-size image
    // ======================

    setBigImage: function (slide) {
      var self = this,
        img = document.createElement("img"),
        $img = $(img);

      slide.$image = $img
        .one("error", function () {
          self.setError(slide);
        })
        .one("load", function () {
          var sizes;

          if (!slide.$ghost) {
            self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);

            self.afterLoad(slide);
          }

          if (self.isClosing) {
            return;
          }

          if (slide.opts.srcset) {
            sizes = slide.opts.sizes;

            if (!sizes || sizes === "auto") {
              sizes =
                (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round((slide.width / slide.height) * 100)) +
                "vw";
            }

            $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
          }

          // Hide temporary image after some delay
          if (slide.$ghost) {
            setTimeout(function () {
              if (slide.$ghost && !self.isClosing) {
                slide.$ghost.hide();
              }
            }, Math.min(300, Math.max(1000, slide.height / 1600)));
          }

          self.hideLoading(slide);
        })
        .addClass("fancybox-image")
        .attr("src", slide.src)
        .appendTo(slide.$content);

      if ((img.complete || img.readyState == "complete") && $img.naturalWidth && $img.naturalHeight) {
        $img.trigger("load");
      } else if (img.error) {
        $img.trigger("error");
      }
    },

    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================

    resolveImageSlideSize: function (slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
        maxHeight = parseInt(slide.opts.height, 10);

      // Sets the default values from the image
      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor((maxWidth * imgHeight) / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor((maxHeight * imgWidth) / imgHeight);
        slide.height = maxHeight;
      }
    },

    // Create iframe wrapper, iframe and bindings
    // ==========================================

    setIframe: function (slide) {
      var self = this,
        opts = slide.opts.iframe,
        $slide = slide.$slide,
        $iframe;

      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>')
        .css(opts.css)
        .appendTo($slide);

      $slide.addClass("fancybox-slide--" + slide.contentType);

      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime()))
        .attr(opts.attr)
        .appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide);

        // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function (e) {
          this.isReady = 1;

          slide.$slide.trigger("refresh");

          self.afterLoad(slide);
        });

        // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function () {
          var $content = slide.$content,
            frameWidth = opts.css.width,
            frameHeight = opts.css.height,
            $contents,
            $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {}

          // Calculate content dimensions, if it is accessible
          if ($body && $body.length && $body.children().length) {
            // Avoid scrolling to top (if multiple instances)
            $slide.css("overflow", "visible");

            $content.css({
              width: "100%",
              "max-width": "100%",
              height: "9999px"
            });

            if (frameWidth === undefined) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            $content.css("width", frameWidth ? frameWidth : "").css("max-width", "");

            if (frameHeight === undefined) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            $content.css("height", frameHeight ? frameHeight : "");

            $slide.css("overflow", "auto");
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        self.afterLoad(slide);
      }

      $iframe.attr("src", slide.src);

      // Remove iframe if closing or changing gallery item
      $slide.one("onReset", function () {
        // This helps IE not to throw errors when closing
        try {
          $(this)
            .find("iframe")
            .hide()
            .unbind()
            .attr("src", "//about:blank");
        } catch (ignore) {}

        $(this)
          .off("refresh.fb")
          .empty();

        slide.isLoaded = false;
        slide.isRevealed = false;
      });
    },

    // Wrap and append content to the slide
    // ======================================

    setContent: function (slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty();

      // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.
      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        if (content.hasClass("fancybox-content") || content.parent().hasClass("fancybox-content")) {
          content.parents(".fancybox-slide").trigger("onReset");
        }

        // Create temporary element marking original place of the content
        slide.$placeholder = $("<div>")
          .hide()
          .insertAfter(content);

        // Make sure content is visible
        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>")
            .append($.trim(content))
            .contents();
        }

        // If "filter" option is provided, then filter content
        if (slide.opts.filter) {
          content = $("<div>")
            .html(content)
            .find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function () {
        // Pause all html5 video/audio
        $(this)
          .find("video,audio")
          .trigger("pause");

        // Put content back
        if (slide.$placeholder) {
          slide.$placeholder.after(content.removeClass("fancybox-content").hide()).remove();

          slide.$placeholder = null;
        }

        // Remove custom close button
        if (slide.$smallBtn) {
          slide.$smallBtn.remove();

          slide.$smallBtn = null;
        }

        // Remove content and mark slide as not loaded
        if (!slide.hasError) {
          $(this).empty();

          slide.isLoaded = false;
          slide.isRevealed = false;
        }
      });

      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");

        $(content).wrap("<div></div>");

        slide.contentType = "video";

        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide
        .children()
        .filter("div,form,main,video,audio,article,.fancybox-content")
        .first();

      slide.$content.siblings().hide();

      // Re-check if there is a valid content
      // (in some cases, ajax response can contain various elements or plain text)
      if (!slide.$content.length) {
        slide.$content = slide.$slide
          .wrapInner("<div></div>")
          .children()
          .first();
      }

      slide.$content.addClass("fancybox-content");

      slide.$slide.addClass("fancybox-slide--" + slide.contentType);

      self.afterLoad(slide);
    },

    // Display error message
    // =====================

    setError: function (slide) {
      slide.hasError = true;

      slide.$slide
        .trigger("onReset")
        .removeClass("fancybox-slide--" + slide.contentType)
        .addClass("fancybox-slide--error");

      slide.contentType = "html";

      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },

    // Show loading icon inside the slide
    // ==================================

    showLoading: function (slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl))
          .appendTo(slide.$slide)
          .hide()
          .fadeIn("fast");
      }
    },

    // Remove loading icon from the slide
    // ==================================

    hideLoading: function (slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.stop().remove();

        delete slide.$spinner;
      }
    },

    // Adjustments after slide content has been loaded
    // ===============================================

    afterLoad: function (slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;

      self.trigger("afterLoad", slide);

      self.hideLoading(slide);

      // Add small close button
      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content);
      }

      // Disable right click
      if (slide.opts.protect && slide.$content && !slide.hasError) {
        slide.$content.on("contextmenu.fb", function (e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        });

        // Add fake element on top of the image
        // This makes a bit harder for user to select image
        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.adjustCaption(slide);

      self.adjustLayout(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      self.revealContent(slide);
    },

    // Prevent caption overlap,
    // fix css inconsistency across browsers
    // =====================================

    adjustCaption: function (slide) {
      var self = this,
        current = slide || self.current,
        caption = current.opts.caption,
        preventOverlap = current.opts.preventCaptionOverlap,
        $caption = self.$refs.caption,
        $clone,
        captionH = false;

      $caption.toggleClass("fancybox-caption--separate", preventOverlap);

      if (preventOverlap && caption && caption.length) {
        if (current.pos !== self.currPos) {
          $clone = $caption.clone().appendTo($caption.parent());

          $clone
            .children()
            .eq(0)
            .empty()
            .html(caption);

          captionH = $clone.outerHeight(true);

          $clone.empty().remove();
        } else if (self.$caption) {
          captionH = self.$caption.outerHeight(true);
        }

        current.$slide.css("padding-bottom", captionH || "");
      }
    },

    // Simple hack to fix inconsistency across browsers, described here (affects Edge, too):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=748518
    // ====================================================================================

    adjustLayout: function (slide) {
      var self = this,
        current = slide || self.current,
        scrollHeight,
        marginBottom,
        inlinePadding,
        actualPadding;

      if (current.isLoaded && current.opts.disableLayoutFix !== true) {
        current.$content.css("margin-bottom", "");

        // If we would always set margin-bottom for the content,
        // then it would potentially break vertical align
        if (current.$content.outerHeight() > current.$slide.height() + 0.5) {
          inlinePadding = current.$slide[0].style["padding-bottom"];
          actualPadding = current.$slide.css("padding-bottom");

          if (parseFloat(actualPadding) > 0) {
            scrollHeight = current.$slide[0].scrollHeight;

            current.$slide.css("padding-bottom", 0);

            if (Math.abs(scrollHeight - current.$slide[0].scrollHeight) < 1) {
              marginBottom = actualPadding;
            }

            current.$slide.css("padding-bottom", inlinePadding);
          }
        }

        current.$content.css("margin-bottom", marginBottom);
      }
    },

    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================

    revealContent: function (slide) {
      var self = this,
        $slide = slide.$slide,
        end = false,
        start = false,
        isMoved = self.isMoved(slide),
        isRevealed = slide.isRevealed,
        effect,
        effectClassName,
        duration,
        opacity;

      slide.isRevealed = true;

      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];

      duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);

      if (isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      }

      // Check if can zoom
      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      }

      // Zoom animation
      // ==============
      if (effect === "zoom") {
        self.isAnimating = true;

        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height;

        // Check if we need to animate opacity
        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        }

        // Draw image at start position
        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);

        forceRedraw(slide.$content);

        // Start animation
        $.fancybox.animate(slide.$content, end, duration, function () {
          self.isAnimating = false;

          self.complete();
        });

        return;
      }

      self.updateSlide(slide);

      // Simply show content if no effect
      // ================================
      if (!effect) {
        slide.$content.removeClass("fancybox-is-hidden");

        if (!isRevealed && isMoved && slide.type === "image" && !slide.hasError) {
          slide.$content.hide().fadeIn("fast");
        }

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      }

      // Prepare for CSS transiton
      // =========================
      $.fancybox.stop($slide);

      //effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;
      effectClassName = "fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + effect;

      $slide.addClass(effectClassName).removeClass("fancybox-slide--current"); //.addClass(effectClassName);

      slide.$content.removeClass("fancybox-is-hidden");

      // Force reflow
      forceRedraw($slide);

      if (slide.type !== "image") {
        slide.$content.hide().show(0);
      }

      $.fancybox.animate(
        $slide,
        "fancybox-slide--current",
        duration,
        function () {
          $slide.removeClass(effectClassName).css({
            transform: "",
            opacity: ""
          });

          if (slide.pos === self.currPos) {
            self.complete();
          }
        },
        true
      );
    },

    // Check if we can and have to zoom from thumbnail
    //================================================

    getThumbPos: function (slide) {
      var rez = false,
        $thumb = slide.$thumb,
        thumbPos,
        btw,
        brw,
        bbw,
        blw;

      if (!$thumb || !inViewport($thumb[0])) {
        return false;
      }

      thumbPos = $.fancybox.getTranslate($thumb);

      btw = parseFloat($thumb.css("border-top-width") || 0);
      brw = parseFloat($thumb.css("border-right-width") || 0);
      bbw = parseFloat($thumb.css("border-bottom-width") || 0);
      blw = parseFloat($thumb.css("border-left-width") || 0);

      rez = {
        top: thumbPos.top + btw,
        left: thumbPos.left + blw,
        width: thumbPos.width - brw - blw,
        height: thumbPos.height - btw - bbw,
        scaleX: 1,
        scaleY: 1
      };

      return thumbPos.width > 0 && thumbPos.height > 0 ? rez : false;
    },

    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================

    complete: function () {
      var self = this,
        current = self.current,
        slides = {},
        $el;

      if (self.isMoved() || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;

        current.$slide.siblings().trigger("onReset");

        self.preload("inline");

        // Trigger any CSS transiton inside the slide
        forceRedraw(current.$slide);

        current.$slide.addClass("fancybox-slide--complete");

        // Remove unnecessary slides
        $.each(self.slides, function (key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);

            slide.$slide.off().remove();
          }
        });

        self.slides = slides;
      }

      self.isAnimating = false;

      self.updateCursor();

      self.trigger("afterShow");

      // Autoplay first html5 video/audio
      if (!!current.opts.video.autoStart) {
        current.$slide
          .find("video,audio")
          .filter(":visible:first")
          .trigger("play")
          .one("ended", function () {
            if (Document.exitFullscreen) {
              Document.exitFullscreen();
            } else if (this.webkitExitFullscreen) {
              this.webkitExitFullscreen();
            }

            self.next();
          });
      }

      // Try to focus on the first focusable element
      if (current.opts.autoFocus && current.contentType === "html") {
        // Look for the first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if ($el.length) {
          $el.trigger("focus");
        } else {
          self.focus(null, true);
        }
      }

      // Avoid jumping
      current.$slide.scrollTop(0).scrollLeft(0);
    },

    // Preload next and previous slides
    // ================================

    preload: function (type) {
      var self = this,
        prev,
        next;

      if (self.group.length < 2) {
        return;
      }

      next = self.slides[self.currPos + 1];
      prev = self.slides[self.currPos - 1];

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }

      if (next && next.type === type) {
        self.loadSlide(next);
      }
    },

    // Try to find and focus on the first focusable element
    // ====================================================

    focus: function (e, firstRun) {
      var self = this,
        focusableStr = [
          "a[href]",
          "area[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "button:not([disabled]):not([aria-hidden])",
          "iframe",
          "object",
          "embed",
          "video",
          "audio",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])'
        ].join(","),
        focusableItems,
        focusedItemIndex;

      if (self.isClosing) {
        return;
      }

      if (e || !self.current || !self.current.isComplete) {
        // Focus on any element inside fancybox
        focusableItems = self.$refs.container.find("*:visible");
      } else {
        // Focus inside current slide
        focusableItems = self.current.$slide.find("*:visible" + (firstRun ? ":not(.fancybox-close-small)" : ""));
      }

      focusableItems = focusableItems.filter(focusableStr).filter(function () {
        return $(this).css("visibility") !== "hidden" && !$(this).hasClass("disabled");
      });

      if (focusableItems.length) {
        focusedItemIndex = focusableItems.index(document.activeElement);

        if (e && e.shiftKey) {
          // Back tab
          if (focusedItemIndex < 0 || focusedItemIndex == 0) {
            e.preventDefault();

            focusableItems.eq(focusableItems.length - 1).trigger("focus");
          }
        } else {
          // Outside or Forward tab
          if (focusedItemIndex < 0 || focusedItemIndex == focusableItems.length - 1) {
            if (e) {
              e.preventDefault();
            }

            focusableItems.eq(0).trigger("focus");
          }
        }
      } else {
        self.$refs.container.trigger("focus");
      }
    },

    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================

    activate: function () {
      var self = this;

      // Deactivate all instances
      $(".fancybox-container").each(function () {
        var instance = $(this).data("FancyBox");

        // Skip self and closing instances
        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");

          instance.removeEvents();

          instance.isVisible = false;
        }
      });

      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();

        self.updateControls();
      }

      self.trigger("onActivate");

      self.addEvents();
    },

    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================

    close: function (e, d) {
      var self = this,
        current = self.current,
        effect,
        duration,
        $content,
        domRect,
        opacity,
        start,
        end;

      var done = function () {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true;

      // If beforeClose callback prevents closing, make sure content is centered
      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;

        requestAFrame(function () {
          self.update();
        });

        return false;
      }

      // Remove all events
      // If there are multiple instances, they will be set again by "activate" method
      self.removeEvents();

      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;

      current.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

      if (e !== true) {
        $.fancybox.stop(current.$slide);
      } else {
        effect = false;
      }

      // Remove other slides
      current.$slide
        .siblings()
        .trigger("onReset")
        .remove();

      // Trigger animations
      if (duration) {
        self.$refs.container
          .removeClass("fancybox-is-open")
          .addClass("fancybox-is-closing")
          .css("transition-duration", duration + "ms");
      }

      // Clean up
      self.hideLoading(current);

      self.hideControls(true);

      self.updateCursor();

      // Check if possible to zoom-out
      if (
        effect === "zoom" &&
        !($content && duration && current.type === "image" && !self.isMoved() && !current.hasError && (end = self.getThumbPos(current)))
      ) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);

        domRect = $.fancybox.getTranslate($content);

        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        };

        // Check if we need to animate opacity
        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);

        forceRedraw($content);

        $.fancybox.animate($content, end, duration, done);

        return true;
      }

      if (effect && duration) {
        $.fancybox.animate(
          current.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"),
          "fancybox-animated fancybox-fx-" + effect,
          duration,
          done
        );
      } else {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          done();
        }
      }

      return true;
    },

    // Final adjustments after removing the instance
    // =============================================

    cleanUp: function (e) {
      var self = this,
        instance,
        $focus = self.current.opts.$orig,
        x,
        y;

      self.current.$slide.trigger("onReset");

      self.$refs.container.empty().remove();

      self.trigger("afterClose", e);

      // Place back focus
      if (!!self.current.opts.backFocus) {
        if (!$focus || !$focus.length || !$focus.is(":visible")) {
          $focus = self.$trigger;
        }

        if ($focus && $focus.length) {
          x = window.scrollX;
          y = window.scrollY;

          $focus.trigger("focus");

          $("html, body")
            .scrollTop(y)
            .scrollLeft(x);
        }
      }

      self.current = null;

      // Check if there are other instances
      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $("body").removeClass("fancybox-active compensate-for-scrollbar");

        $("#fancybox-style-noscroll").remove();
      }
    },

    // Call callback and trigger an event
    // ==================================

    trigger: function (name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
        self = this,
        obj = slide && slide.opts ? slide : self.current,
        rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },

    // Update infobar values, navigation button states and reveal caption
    // ==================================================================

    updateControls: function () {
      var self = this,
        current = self.current,
        index = current.index,
        $container = self.$refs.container,
        $caption = self.$refs.caption,
        caption = current.opts.caption;

      // Recalculate content dimensions
      current.$slide.trigger("refresh");

      // Set caption
      if (caption && caption.length) {
        self.$caption = $caption;

        $caption
          .children()
          .eq(0)
          .html(caption);
      } else {
        self.$caption = null;
      }

      if (!self.hasHiddenControls && !self.isIdle) {
        self.showControls();
      }

      // Update info and navigation elements
      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);

      $container.find("[data-fancybox-prev]").prop("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").prop("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container
          .find("[data-fancybox-zoom]")
          .show()
          .end()
          .find("[data-fancybox-download]")
          .attr("href", current.opts.image.src || current.src)
          .show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      }

      // Make sure focus is not on disabled button/element
      if ($(document.activeElement).is(":hidden,[disabled]")) {
        self.$refs.container.trigger("focus");
      }
    },

    // Hide toolbar and caption
    // ========================

    hideControls: function (andCaption) {
      var self = this,
        arr = ["infobar", "toolbar", "nav"];

      if (andCaption || !self.current.opts.preventCaptionOverlap) {
        arr.push("caption");
      }

      this.$refs.container.removeClass(
        arr
        .map(function (i) {
          return "fancybox-show-" + i;
        })
        .join(" ")
      );

      this.hasHiddenControls = true;
    },

    showControls: function () {
      var self = this,
        opts = self.current ? self.current.opts : self.opts,
        $container = self.$refs.container;

      self.hasHiddenControls = false;
      self.idleSecondsCounter = 0;

      $container
        .toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons))
        .toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1))
        .toggleClass("fancybox-show-caption", !!self.$caption)
        .toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1))
        .toggleClass("fancybox-is-modal", !!opts.modal);
    },

    // Toggle toolbar and caption
    // ==========================

    toggleControls: function () {
      if (this.hasHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });

  $.fancybox = {
    version: "3.5.7",
    defaults: defaults,

    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================

    getInstance: function (command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
        args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },

    // Create new instance
    // ===================

    open: function (items, opts, index) {
      return new FancyBox(items, opts, index);
    },

    // Close current or all instances
    // ==============================

    close: function (all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close();

        // Try to find and close next instance
        if (all === true) {
          this.close(all);
        }
      }
    },

    // Close all instances and unbind all events
    // =========================================

    destroy: function () {
      this.close(true);

      $D.add("body").off("click.fb-start", "**");
    },

    // Try to detect mobile devices
    // ============================

    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    // Detect if 'translate3d' support is available
    // ============================================

    use3d: (function () {
      var div = document.createElement("div");

      return (
        window.getComputedStyle &&
        window.getComputedStyle(div) &&
        window.getComputedStyle(div).getPropertyValue("transform") &&
        !(document.documentMode && document.documentMode < 11)
      );
    })(),

    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================

    getTranslate: function ($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();

      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },

    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================

    setTranslate: function ($el, props) {
      var str = "",
        css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined || props.top !== undefined) {
        str =
          (props.left === undefined ? $el.position().left : props.left) +
          "px, " +
          (props.top === undefined ? $el.position().top : props.top) +
          "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined && props.scaleY !== undefined) {
        str += " scale(" + props.scaleX + ", " + props.scaleY + ")";
      } else if (props.scaleX !== undefined) {
        str += " scaleX(" + props.scaleX + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined) {
        css.width = props.width;
      }

      if (props.height !== undefined) {
        css.height = props.height;
      }

      return $el.css(css);
    },

    // Simple CSS transition handler
    // =============================

    animate: function ($el, to, duration, callback, leaveAnimationName) {
      var self = this,
        from;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      self.stop($el);

      from = self.getTranslate($el);

      $el.on(transitionEnd, function (e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        self.stop($el);

        if ($.isNumeric(duration)) {
          $el.css("transition-duration", "");
        }

        if ($.isPlainObject(to)) {
          if (to.scaleX !== undefined && to.scaleY !== undefined) {
            self.setTranslate($el, {
              top: to.top,
              left: to.left,
              width: from.width * to.scaleX,
              height: from.height * to.scaleY,
              scaleX: 1,
              scaleY: 1
            });
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      }

      // Start animation by changing CSS properties or class name
      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined && to.scaleY !== undefined) {
          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      }

      // Make sure that `transitionend` callback gets fired
      $el.data(
        "timer",
        setTimeout(function () {
          $el.trigger(transitionEnd);
        }, duration + 33)
      );
    },

    stop: function ($el, callCallback) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));

        if (callCallback) {
          $el.trigger(transitionEnd);
        }

        $el.off(transitionEnd).css("transition-duration", "");

        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  };

  // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
      index = 0,
      $target,
      value,
      instance;

    // Avoid opening multiple times
    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();

    opts = opts || {};

    if (e && e.data) {
      opts = mergeOpts(e.data.options, opts);
    }

    $target = opts.$target || $(e.currentTarget).trigger("blur");
    instance = $.fancybox.getInstance();

    if (instance && instance.$trigger && instance.$trigger.is($target)) {
      return;
    }

    if (opts.selector) {
      items = $(opts.selector);
    } else {
      // Get all related items and find index for clicked one
      value = $target.attr("data-fancybox") || "";

      if (value) {
        items = e.data ? e.data.items : [];
        items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');
      } else {
        items = [$target];
      }
    }

    index = $(items).index($target);

    // Sometimes current item can not be found
    if (index < 0) {
      index = 0;
    }

    instance = $.fancybox.open(items, opts, index);

    // Save last active element
    instance.$trigger = $target;
  }

  // Create a jQuery plugin
  // ======================

  $.fn.fancybox = function (options) {
    var selector;

    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body")
        .off("click.fb-start", selector)
        .on("click.fb-start", selector, {
          options: options
        }, _run);
    } else {
      this.off("click.fb-start").on(
        "click.fb-start", {
          items: this,
          options: options
        },
        _run
      );
    }

    return this;
  };

  // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================

  $D.on("click.fb-start", "[data-fancybox]", _run);

  // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-fancybox-trigger]", function (e) {
    $('[data-fancybox="' + $(this).attr("data-fancybox-trigger") + '"]')
      .eq($(this).attr("data-fancybox-index") || 0)
      .trigger("click.fb-start", {
        $trigger: $(this)
      });
  });

  // Track focus event for better accessibility styling
  // ==================================================
  (function () {
    var buttonStr = ".fancybox-button",
      focusStr = "fancybox-focus",
      $pressed = null;

    $D.on("mousedown mouseup focus blur", buttonStr, function (e) {
      switch (e.type) {
        case "mousedown":
          $pressed = $(this);
          break;
        case "mouseup":
          $pressed = null;
          break;
        case "focusin":
          $(buttonStr).removeClass(focusStr);

          if (!$(this).is($pressed) && !$(this).is("[disabled]")) {
            $(this).addClass(focusStr);
          }
          break;
        case "focusout":
          $(buttonStr).removeClass(focusStr);
          break;
      }
    });
  })();
})(window, document, jQuery);
// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function ($) {
  "use strict";

  // Object containing properties for each media type
  var defaults = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {
        autoplay: 1,
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      paramPlace: 8,
      type: "iframe",
      url: "https://www.youtube-nocookie.com/embed/$4",
      thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
    },

    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {
        autoplay: 1,
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1
      },
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },

    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },

    // Examples:
    // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
    // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
    // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
    // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function (rez) {
        return (
          "//maps.google." +
          rez[2] +
          "/?ll=" +
          (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
          "&output=" +
          (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
        );
      }
    },

    // Examples:
    // https://www.google.com/maps/search/Empire+State+Building/
    // https://www.google.com/maps/search/?api=1&query=centurylink+field
    // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function (rez) {
        return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
      }
    }
  };

  // Formats matching url to final form
  var format = function (url, rez, params) {
    if (!url) {
      return;
    }

    params = params || "";

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function (key, value) {
      url = url.replace("$" + key, value || "");
    });

    if (params.length) {
      url += (url.indexOf("?") > 0 ? "&" : "?") + params;
    }

    return url;
  };

  $(document).on("objectNeedsType.fb", function (e, instance, item) {
    var url = item.src || "",
      type = false,
      media,
      thumb,
      rez,
      params,
      urlParams,
      paramObj,
      provider;

    media = $.extend(true, {}, defaults, item.opts.media);

    // Look for any matching media type
    $.each(media, function (providerName, providerOpts) {
      rez = url.match(providerOpts.matcher);

      if (!rez) {
        return;
      }

      type = providerOpts.type;
      provider = providerName;
      paramObj = {};

      if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
        urlParams = rez[providerOpts.paramPlace];

        if (urlParams[0] == "?") {
          urlParams = urlParams.substring(1);
        }

        urlParams = urlParams.split("&");

        for (var m = 0; m < urlParams.length; ++m) {
          var p = urlParams[m].split("=", 2);

          if (p.length == 2) {
            paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }

      params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);

      url =
        $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);

      thumb =
        $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

      if (providerName === "youtube") {
        url = url.replace(/&t=((\d+)m)?(\d+)s/, function (match, p1, m, s) {
          return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
        });
      } else if (providerName === "vimeo") {
        url = url.replace("&%23", "#");
      }

      return false;
    });

    // If it is found, then change content type and update the url

    if (type) {
      if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
        item.opts.thumb = thumb;
      }

      if (type === "iframe") {
        item.opts = $.extend(true, item.opts, {
          iframe: {
            preload: false,
            attr: {
              scrolling: "no"
            }
          }
        });
      }

      $.extend(item, {
        type: type,
        src: url,
        origSrc: item.src,
        contentSource: provider,
        contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
      });
    } else if (url) {
      item.type = item.opts.defaultType;
    }
  });

  // Load YouTube/Video API on request to detect when video finished playing
  var VideoAPILoader = {
    youtube: {
      src: "https://www.youtube.com/iframe_api",
      class: "YT",
      loading: false,
      loaded: false
    },

    vimeo: {
      src: "https://player.vimeo.com/api/player.js",
      class: "Vimeo",
      loading: false,
      loaded: false
    },

    load: function (vendor) {
      var _this = this,
        script;

      if (this[vendor].loaded) {
        setTimeout(function () {
          _this.done(vendor);
        });
        return;
      }

      if (this[vendor].loading) {
        return;
      }

      this[vendor].loading = true;

      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this[vendor].src;

      if (vendor === "youtube") {
        window.onYouTubeIframeAPIReady = function () {
          _this[vendor].loaded = true;
          _this.done(vendor);
        };
      } else {
        script.onload = function () {
          _this[vendor].loaded = true;
          _this.done(vendor);
        };
      }

      document.body.appendChild(script);
    },
    done: function (vendor) {
      var instance, $el, player;

      if (vendor === "youtube") {
        delete window.onYouTubeIframeAPIReady;
      }

      instance = $.fancybox.getInstance();

      if (instance) {
        $el = instance.current.$content.find("iframe");

        if (vendor === "youtube" && YT !== undefined && YT) {
          player = new YT.Player($el.attr("id"), {
            events: {
              onStateChange: function (e) {
                if (e.data == 0) {
                  instance.next();
                }
              }
            }
          });
        } else if (vendor === "vimeo" && Vimeo !== undefined && Vimeo) {
          player = new Vimeo.Player($el);

          player.on("ended", function () {
            instance.next();
          });
        }
      }
    }
  };

  $(document).on({
    "afterShow.fb": function (e, instance, current) {
      if (instance.group.length > 1 && (current.contentSource === "youtube" || current.contentSource === "vimeo")) {
        VideoAPILoader.load(current.contentSource);
      }
    }
  });
})(jQuery);
// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
(function (window, document, $) {
  "use strict";

  var requestAFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var cancelAFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function (id) {
        window.clearTimeout(id);
      }
    );
  })();

  var getPointerXY = function (e) {
    var result = [];

    e = e.originalEvent || e || window.e;
    e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

    for (var key in e) {
      if (e[key].pageX) {
        result.push({
          x: e[key].pageX,
          y: e[key].pageY
        });
      } else if (e[key].clientX) {
        result.push({
          x: e[key].clientX,
          y: e[key].clientY
        });
      }
    }

    return result;
  };

  var distance = function (point2, point1, what) {
    if (!point1 || !point2) {
      return 0;
    }

    if (what === "x") {
      return point2.x - point1.x;
    } else if (what === "y") {
      return point2.y - point1.y;
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  var isClickable = function ($el) {
    if (
      $el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') ||
      $.isFunction($el.get(0).onclick) ||
      $el.data("selectable")
    ) {
      return true;
    }

    // Check for attributes like data-fancybox-next or data-fancybox-close
    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
      if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
        return true;
      }
    }

    return false;
  };

  var hasScrollbars = function (el) {
    var overflowY = window.getComputedStyle(el)["overflow-y"],
      overflowX = window.getComputedStyle(el)["overflow-x"],
      vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
      horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;

    return vertical || horizontal;
  };

  var isScrollable = function ($el) {
    var rez = false;

    while (true) {
      rez = hasScrollbars($el.get(0));

      if (rez) {
        break;
      }

      $el = $el.parent();

      if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
        break;
      }
    }

    return rez;
  };

  var Guestures = function (instance) {
    var self = this;

    self.instance = instance;

    self.$bg = instance.$refs.bg;
    self.$stage = instance.$refs.stage;
    self.$container = instance.$refs.container;

    self.destroy();

    self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
  };

  Guestures.prototype.destroy = function () {
    var self = this;

    self.$container.off(".fb.touch");

    $(document).off(".fb.touch");

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    if (self.tapped) {
      clearTimeout(self.tapped);
      self.tapped = null;
    }
  };

  Guestures.prototype.ontouchstart = function (e) {
    var self = this,
      $target = $(e.target),
      instance = self.instance,
      current = instance.current,
      $slide = current.$slide,
      $content = current.$content,
      isTouchDevice = e.type == "touchstart";

    // Do not respond to both (touch and mouse) events
    if (isTouchDevice) {
      self.$container.off("mousedown.fb.touch");
    }

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Ignore taping on links, buttons, input elements
    if (!$slide.length || !$target.length || isClickable($target) || isClickable($target.parent())) {
      return;
    }
    // Ignore clicks on the scrollbar
    if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Ignore clicks while zooming or closing
    if (!current || instance.isAnimating || current.$slide.hasClass("fancybox-animated")) {
      e.stopPropagation();
      e.preventDefault();

      return;
    }

    self.realPoints = self.startPoints = getPointerXY(e);

    if (!self.startPoints.length) {
      return;
    }

    // Allow other scripts to catch touch event if "touch" is set to false
    if (current.touch) {
      e.stopPropagation();
    }

    self.startEvent = e;

    self.canTap = true;
    self.$target = $target;
    self.$content = $content;
    self.opts = current.opts.touch;

    self.isPanning = false;
    self.isSwiping = false;
    self.isZooming = false;
    self.isScrolling = false;
    self.canPan = instance.canPan();

    self.startTime = new Date().getTime();
    self.distanceX = self.distanceY = self.distance = 0;

    self.canvasWidth = Math.round($slide[0].clientWidth);
    self.canvasHeight = Math.round($slide[0].clientHeight);

    self.contentLastPos = null;
    self.contentStartPos = $.fancybox.getTranslate(self.$content) || {
      top: 0,
      left: 0
    };
    self.sliderStartPos = $.fancybox.getTranslate($slide);

    // Since position will be absolute, but we need to make it relative to the stage
    self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);

    self.sliderStartPos.top -= self.stagePos.top;
    self.sliderStartPos.left -= self.stagePos.left;

    self.contentStartPos.top -= self.stagePos.top;
    self.contentStartPos.left -= self.stagePos.left;

    $(document)
      .off(".fb.touch")
      .on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend"))
      .on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));

    if ($.fancybox.isMobile) {
      document.addEventListener("scroll", self.onscroll, true);
    }

    // Skip if clicked outside the sliding area
    if (!(self.opts || self.canPan) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      if ($target.is(".fancybox-image")) {
        e.preventDefault();
      }

      if (!($.fancybox.isMobile && $target.parents(".fancybox-caption").length)) {
        return;
      }
    }

    self.isScrollable = isScrollable($target) || isScrollable($target.parent());

    // Check if element is scrollable and try to prevent default behavior (scrolling)
    if (!($.fancybox.isMobile && self.isScrollable)) {
      e.preventDefault();
    }

    // One finger or mouse click - swipe or pan an image
    if (self.startPoints.length === 1 || current.hasError) {
      if (self.canPan) {
        $.fancybox.stop(self.$content);

        self.isPanning = true;
      } else {
        self.isSwiping = true;
      }

      self.$container.addClass("fancybox-is-grabbing");
    }

    // Two fingers - zoom image
    if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
      self.canTap = false;
      self.isSwiping = false;
      self.isPanning = false;

      self.isZooming = true;

      $.fancybox.stop(self.$content);

      self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
      self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();

      self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
      self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;

      self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
    }
  };

  Guestures.prototype.onscroll = function (e) {
    var self = this;

    self.isScrolling = true;

    document.removeEventListener("scroll", self.onscroll, true);
  };

  Guestures.prototype.ontouchmove = function (e) {
    var self = this;

    // Make sure user has not released over iframe or disabled element
    if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
      self.ontouchend(e);
      return;
    }

    if (self.isScrolling) {
      self.canTap = false;
      return;
    }

    self.newPoints = getPointerXY(e);

    if (!(self.opts || self.canPan) || !self.newPoints.length || !self.newPoints.length) {
      return;
    }

    if (!(self.isSwiping && self.isSwiping === true)) {
      e.preventDefault();
    }

    self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
    self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");

    self.distance = distance(self.newPoints[0], self.startPoints[0]);

    // Skip false ontouchmove events (Chrome)
    if (self.distance > 0) {
      if (self.isSwiping) {
        self.onSwipe(e);
      } else if (self.isPanning) {
        self.onPan();
      } else if (self.isZooming) {
        self.onZoom();
      }
    }
  };

  Guestures.prototype.onSwipe = function (e) {
    var self = this,
      instance = self.instance,
      swiping = self.isSwiping,
      left = self.sliderStartPos.left || 0,
      angle;

    // If direction is not yet determined
    if (swiping === true) {
      // We need at least 10px distance to correctly calculate an angle
      if (Math.abs(self.distance) > 10) {
        self.canTap = false;

        if (instance.group.length < 2 && self.opts.vertical) {
          self.isSwiping = "y";
        } else if (instance.isDragging || self.opts.vertical === false || (self.opts.vertical === "auto" && $(window).width() > 800)) {
          self.isSwiping = "x";
        } else {
          angle = Math.abs((Math.atan2(self.distanceY, self.distanceX) * 180) / Math.PI);

          self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
        }

        if (self.isSwiping === "y" && $.fancybox.isMobile && self.isScrollable) {
          self.isScrolling = true;

          return;
        }

        instance.isDragging = self.isSwiping;

        // Reset points to avoid jumping, because we dropped first swipes to calculate the angle
        self.startPoints = self.newPoints;

        $.each(instance.slides, function (index, slide) {
          var slidePos, stagePos;

          $.fancybox.stop(slide.$slide);

          slidePos = $.fancybox.getTranslate(slide.$slide);
          stagePos = $.fancybox.getTranslate(instance.$refs.stage);

          slide.$slide
            .css({
              transform: "",
              opacity: "",
              "transition-duration": ""
            })
            .removeClass("fancybox-animated")
            .removeClass(function (index, className) {
              return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
            });

          if (slide.pos === instance.current.pos) {
            self.sliderStartPos.top = slidePos.top - stagePos.top;
            self.sliderStartPos.left = slidePos.left - stagePos.left;
          }

          $.fancybox.setTranslate(slide.$slide, {
            top: slidePos.top - stagePos.top,
            left: slidePos.left - stagePos.left
          });
        });

        // Stop slideshow
        if (instance.SlideShow && instance.SlideShow.isActive) {
          instance.SlideShow.stop();
        }
      }

      return;
    }

    // Sticky edges
    if (swiping == "x") {
      if (
        self.distanceX > 0 &&
        (self.instance.group.length < 2 || (self.instance.current.index === 0 && !self.instance.current.opts.loop))
      ) {
        left = left + Math.pow(self.distanceX, 0.8);
      } else if (
        self.distanceX < 0 &&
        (self.instance.group.length < 2 ||
          (self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop))
      ) {
        left = left - Math.pow(-self.distanceX, 0.8);
      } else {
        left = left + self.distanceX;
      }
    }

    self.sliderLastPos = {
      top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
      left: left
    };

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function () {
      if (self.sliderLastPos) {
        $.each(self.instance.slides, function (index, slide) {
          var pos = slide.pos - self.instance.currPos;

          $.fancybox.setTranslate(slide.$slide, {
            top: self.sliderLastPos.top,
            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
          });
        });

        self.$container.addClass("fancybox-is-sliding");
      }
    });
  };

  Guestures.prototype.onPan = function () {
    var self = this;

    // Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)
    if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
      self.startPoints = self.newPoints;
      return;
    }

    self.canTap = false;

    self.contentLastPos = self.limitMovement();

    if (self.requestId) {
      cancelAFrame(self.requestId);
    }

    self.requestId = requestAFrame(function () {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  // Make panning sticky to the edges
  Guestures.prototype.limitMovement = function () {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    var distanceX = self.distanceX;
    var distanceY = self.distanceY;

    var contentStartPos = self.contentStartPos;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;

    if (currentWidth > canvasWidth) {
      newOffsetX = currentOffsetX + distanceX;
    } else {
      newOffsetX = currentOffsetX;
    }

    newOffsetY = currentOffsetY + distanceY;

    // Slow down proportionally to traveled distance
    minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
    minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);

    maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
    maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5);

    //   ->
    if (distanceX > 0 && newOffsetX > minTranslateX) {
      newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
    }

    //    <-
    if (distanceX < 0 && newOffsetX < maxTranslateX) {
      newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
    }

    //   \/
    if (distanceY > 0 && newOffsetY > minTranslateY) {
      newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
    }

    //   /\
    if (distanceY < 0 && newOffsetY < maxTranslateY) {
      newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.limitPosition = function (newOffsetX, newOffsetY, newWidth, newHeight) {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    if (newWidth > canvasWidth) {
      newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
      newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
    } else {
      // Center horizontally
      newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
    }

    if (newHeight > canvasHeight) {
      newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
      newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
    } else {
      // Center vertically
      newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.onZoom = function () {
    var self = this;

    // Calculate current distance between points to get pinch ratio and new width and height
    var contentStartPos = self.contentStartPos;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);

    var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;

    var newWidth = Math.floor(currentWidth * pinchRatio);
    var newHeight = Math.floor(currentHeight * pinchRatio);

    // This is the translation due to pinch-zooming
    var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
    var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;

    // Point between the two touches
    var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
    var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop();

    // And this is the translation due to translation of the centerpoint
    // between the two fingers
    var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
    var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;

    // The new offset is the old/current one plus the total translation
    var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
    var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);

    var newPos = {
      top: newOffsetY,
      left: newOffsetX,
      scaleX: pinchRatio,
      scaleY: pinchRatio
    };

    self.canTap = false;

    self.newWidth = newWidth;
    self.newHeight = newHeight;

    self.contentLastPos = newPos;

    if (self.requestId) {
      cancelAFrame(self.requestId);
    }

    self.requestId = requestAFrame(function () {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  Guestures.prototype.ontouchend = function (e) {
    var self = this;

    var swiping = self.isSwiping;
    var panning = self.isPanning;
    var zooming = self.isZooming;
    var scrolling = self.isScrolling;

    self.endPoints = getPointerXY(e);
    self.dMs = Math.max(new Date().getTime() - self.startTime, 1);

    self.$container.removeClass("fancybox-is-grabbing");

    $(document).off(".fb.touch");

    document.removeEventListener("scroll", self.onscroll, true);

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.isSwiping = false;
    self.isPanning = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.instance.isDragging = false;

    if (self.canTap) {
      return self.onTap(e);
    }

    self.speed = 100;

    // Speed in px/ms
    self.velocityX = (self.distanceX / self.dMs) * 0.5;
    self.velocityY = (self.distanceY / self.dMs) * 0.5;

    if (panning) {
      self.endPanning();
    } else if (zooming) {
      self.endZooming();
    } else {
      self.endSwiping(swiping, scrolling);
    }

    return;
  };

  Guestures.prototype.endSwiping = function (swiping, scrolling) {
    var self = this,
      ret = false,
      len = self.instance.group.length,
      distanceX = Math.abs(self.distanceX),
      canAdvance = swiping == "x" && len > 1 && ((self.dMs > 130 && distanceX > 10) || distanceX > 50),
      speedX = 300;

    self.sliderLastPos = null;

    // Close if swiped vertically / navigate if horizontally
    if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
      // Continue vertical movement
      $.fancybox.animate(
        self.instance.current.$slide, {
          top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
          opacity: 0
        },
        200
      );
      ret = self.instance.close(true, 250);
    } else if (canAdvance && self.distanceX > 0) {
      ret = self.instance.previous(speedX);
    } else if (canAdvance && self.distanceX < 0) {
      ret = self.instance.next(speedX);
    }

    if (ret === false && (swiping == "x" || swiping == "y")) {
      self.instance.centerSlide(200);
    }

    self.$container.removeClass("fancybox-is-sliding");
  };

  // Limit panning from edges
  // ========================
  Guestures.prototype.endPanning = function () {
    var self = this,
      newOffsetX,
      newOffsetY,
      newPos;

    if (!self.contentLastPos) {
      return;
    }

    if (self.opts.momentum === false || self.dMs > 350) {
      newOffsetX = self.contentLastPos.left;
      newOffsetY = self.contentLastPos.top;
    } else {
      // Continue movement
      newOffsetX = self.contentLastPos.left + self.velocityX * 500;
      newOffsetY = self.contentLastPos.top + self.velocityY * 500;
    }

    newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);

    newPos.width = self.contentStartPos.width;
    newPos.height = self.contentStartPos.height;

    $.fancybox.animate(self.$content, newPos, 366);
  };

  Guestures.prototype.endZooming = function () {
    var self = this;

    var current = self.instance.current;

    var newOffsetX, newOffsetY, newPos, reset;

    var newWidth = self.newWidth;
    var newHeight = self.newHeight;

    if (!self.contentLastPos) {
      return;
    }

    newOffsetX = self.contentLastPos.left;
    newOffsetY = self.contentLastPos.top;

    reset = {
      top: newOffsetY,
      left: newOffsetX,
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1
    };

    // Reset scalex/scaleY values; this helps for perfomance and does not break animation
    $.fancybox.setTranslate(self.$content, reset);

    if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
      self.instance.scaleToFit(150);
    } else if (newWidth > current.width || newHeight > current.height) {
      self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
    } else {
      newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);

      $.fancybox.animate(self.$content, newPos, 150);
    }
  };

  Guestures.prototype.onTap = function (e) {
    var self = this;
    var $target = $(e.target);

    var instance = self.instance;
    var current = instance.current;

    var endPoints = (e && getPointerXY(e)) || self.startPoints;

    var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
    var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;

    var where;

    var process = function (prefix) {
      var action = current.opts[prefix];

      if ($.isFunction(action)) {
        action = action.apply(instance, [current, e]);
      }

      if (!action) {
        return;
      }

      switch (action) {
        case "close":
          instance.close(self.startEvent);

          break;

        case "toggleControls":
          instance.toggleControls();

          break;

        case "next":
          instance.next();

          break;

        case "nextOrClose":
          if (instance.group.length > 1) {
            instance.next();
          } else {
            instance.close(self.startEvent);
          }

          break;

        case "zoom":
          if (current.type == "image" && (current.isLoaded || current.$ghost)) {
            if (instance.canPan()) {
              instance.scaleToFit();
            } else if (instance.isScaledDown()) {
              instance.scaleToActual(tapX, tapY);
            } else if (instance.group.length < 2) {
              instance.close(self.startEvent);
            }
          }

          break;
      }
    };

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Skip if clicked on the scrollbar
    if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Check where is clicked
    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
      where = "Outside";
    } else if ($target.is(".fancybox-slide")) {
      where = "Slide";
    } else if (
      instance.current.$content &&
      instance.current.$content
      .find($target)
      .addBack()
      .filter($target).length
    ) {
      where = "Content";
    } else {
      return;
    }

    // Check if this is a double tap
    if (self.tapped) {
      // Stop previously created single tap
      clearTimeout(self.tapped);
      self.tapped = null;

      // Skip if distance between taps is too big
      if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
        return this;
      }

      // OK, now we assume that this is a double-tap
      process("dblclick" + where);
    } else {
      // Single tap will be processed if user has not clicked second time within 300ms
      // or there is no need to wait for double-tap
      self.tapX = tapX;
      self.tapY = tapY;

      if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
        self.tapped = setTimeout(function () {
          self.tapped = null;

          if (!instance.isAnimating) {
            process("click" + where);
          }
        }, 500);
      } else {
        process("click" + where);
      }
    }

    return this;
  };

  $(document)
    .on("onActivate.fb", function (e, instance) {
      if (instance && !instance.Guestures) {
        instance.Guestures = new Guestures(instance);
      }
    })
    .on("beforeClose.fb", function (e, instance) {
      if (instance && instance.Guestures) {
        instance.Guestures.destroy();
      }
    });
})(window, document, jQuery);
// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function (document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg>' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg>' +
        "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000,
      progress: true
    }
  });

  var SlideShow = function (instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,

    init: function () {
      var self = this,
        instance = self.instance,
        opts = instance.group[instance.currIndex].opts.slideShow;

      self.$button = instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        self.toggle();
      });

      if (instance.group.length < 2 || !opts) {
        self.$button.hide();
      } else if (opts.progress) {
        self.$progress = $('<div class="fancybox-progress"></div>').appendTo(instance.$refs.inner);
      }
    },

    set: function (force) {
      var self = this,
        instance = self.instance,
        current = instance.current;

      // Check if reached last element
      if (current && (force === true || current.opts.loop || instance.currIndex < instance.group.length - 1)) {
        if (self.isActive && current.contentType !== "video") {
          if (self.$progress) {
            $.fancybox.animate(self.$progress.show(), {
              scaleX: 1
            }, current.opts.slideShow.speed);
          }

          self.timer = setTimeout(function () {
            if (!instance.current.opts.loop && instance.current.index == instance.group.length - 1) {
              instance.jumpTo(0);
            } else {
              instance.next();
            }
          }, current.opts.slideShow.speed);
        }
      } else {
        self.stop();
        instance.idleSecondsCounter = 0;
        instance.showControls();
      }
    },

    clear: function () {
      var self = this;

      clearTimeout(self.timer);

      self.timer = null;

      if (self.$progress) {
        self.$progress.removeAttr("style").hide();
      }
    },

    start: function () {
      var self = this,
        current = self.instance.current;

      if (current) {
        self.$button
          .attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_STOP)
          .removeClass("fancybox-button--play")
          .addClass("fancybox-button--pause");

        self.isActive = true;

        if (current.isComplete) {
          self.set(true);
        }

        self.instance.trigger("onSlideShowChange", true);
      }
    },

    stop: function () {
      var self = this,
        current = self.instance.current;

      self.clear();

      self.$button
        .attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_START)
        .removeClass("fancybox-button--pause")
        .addClass("fancybox-button--play");

      self.isActive = false;

      self.instance.trigger("onSlideShowChange", false);

      if (self.$progress) {
        self.$progress.removeAttr("style").hide();
      }
    },

    toggle: function () {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });

  $(document).on({
    "onInit.fb": function (e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },

    "beforeShow.fb": function (e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },

    "afterShow.fb": function (e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },

    "afterKeydown.fb": function (e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow;

      // "P" or Spacebar
      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();

        SlideShow.toggle();
      }
    },

    "beforeClose.fb onDeactivate.fb": function (e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  });

  // Page Visibility API to pause slideshow when window is not active
  $(document).on("visibilitychange", function () {
    var instance = $.fancybox.getInstance(),
      SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, jQuery);
// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
(function (document, $) {
  "use strict";

  // Collection of methods supported by user browser
  var fn = (function () {
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      // new WebKit
      [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      // old WebKit (Safari 5.1)
      [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
      ],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];

    var ret = {};

    for (var i = 0; i < fnMap.length; i++) {
      var val = fnMap[i];

      if (val && val[1] in document) {
        for (var j = 0; j < val.length; j++) {
          ret[fnMap[0][j]] = val[j];
        }

        return ret;
      }
    }

    return false;
  })();

  if (fn) {
    var FullScreen = {
      request: function (elem) {
        elem = elem || document.documentElement;

        elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
      },
      exit: function () {
        document[fn.exitFullscreen]();
      },
      toggle: function (elem) {
        elem = elem || document.documentElement;

        if (this.isFullscreen()) {
          this.exit();
        } else {
          this.request(elem);
        }
      },
      isFullscreen: function () {
        return Boolean(document[fn.fullscreenElement]);
      },
      enabled: function () {
        return Boolean(document[fn.fullscreenEnabled]);
      }
    };

    $.extend(true, $.fancybox.defaults, {
      btnTpl: {
        fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>' +
          "</button>"
      },
      fullScreen: {
        autoStart: false
      }
    });

    $(document).on(fn.fullscreenchange, function () {
      var isFullscreen = FullScreen.isFullscreen(),
        instance = $.fancybox.getInstance();

      if (instance) {
        // If image is zooming, then force to stop and reposition properly
        if (instance.current && instance.current.type === "image" && instance.isAnimating) {
          instance.isAnimating = false;

          instance.update(true, true, 0);

          if (!instance.isComplete) {
            instance.complete();
          }
        }

        instance.trigger("onFullscreenChange", isFullscreen);

        instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);

        instance.$refs.toolbar
          .find("[data-fancybox-fullscreen]")
          .toggleClass("fancybox-button--fsenter", !isFullscreen)
          .toggleClass("fancybox-button--fsexit", isFullscreen);
      }
    });
  }

  $(document).on({
    "onInit.fb": function (e, instance) {
      var $container;

      if (!fn) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();

        return;
      }

      if (instance && instance.group[instance.currIndex].opts.fullScreen) {
        $container = instance.$refs.container;

        $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (e) {
          e.stopPropagation();
          e.preventDefault();

          FullScreen.toggle();
        });

        if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
          FullScreen.request();
        }

        // Expose API
        instance.FullScreen = FullScreen;
      } else if (instance) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      }
    },

    "afterKeydown.fb": function (e, instance, current, keypress, keycode) {
      // "F"
      if (instance && instance.FullScreen && keycode === 70) {
        keypress.preventDefault();

        instance.FullScreen.toggle();
      }
    },

    "beforeClose.fb": function (e, instance) {
      if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
        FullScreen.exit();
      }
    }
  });
})(document, jQuery);
// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function (document, $) {
  "use strict";

  var CLASS = "fancybox-thumbs",
    CLASS_ACTIVE = CLASS + "-active";

  // Make sure there are default values
  $.fancybox.defaults = $.extend(
    true, {
      btnTpl: {
        thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg>' +
          "</button>"
      },
      thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
      }
    },
    $.fancybox.defaults
  );

  var FancyThumbs = function (instance) {
    this.init(instance);
  };

  $.extend(FancyThumbs.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: false,
    isActive: false,

    init: function (instance) {
      var self = this,
        group = instance.group,
        enabled = 0;

      self.instance = instance;
      self.opts = group[instance.currIndex].opts.thumbs;

      instance.Thumbs = self;

      self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");

      // Enable thumbs if at least two group items have thumbnails
      for (var i = 0, len = group.length; i < len; i++) {
        if (group[i].thumb) {
          enabled++;
        }

        if (enabled > 1) {
          break;
        }
      }

      if (enabled > 1 && !!self.opts) {
        self.$button.removeAttr("style").on("click", function () {
          self.toggle();
        });

        self.isActive = true;
      } else {
        self.$button.hide();
      }
    },

    create: function () {
      var self = this,
        instance = self.instance,
        parentEl = self.opts.parentEl,
        list = [],
        src;

      if (!self.$grid) {
        // Create main element
        self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(
          instance.$refs.container
          .find(parentEl)
          .addBack()
          .filter(parentEl)
        );

        // Add "click" event that performs gallery navigation
        self.$grid.on("click", "a", function () {
          instance.jumpTo($(this).attr("data-index"));
        });
      }

      // Build the list
      if (!self.$list) {
        self.$list = $('<div class="' + CLASS + '__list">').appendTo(self.$grid);
      }

      $.each(instance.group, function (i, item) {
        src = item.thumb;

        if (!src && item.type === "image") {
          src = item.src;
        }

        list.push(
          '<a href="javascript:;" tabindex="0" data-index="' +
          i +
          '"' +
          (src && src.length ? ' style="background-image:url(' + src + ')"' : 'class="fancybox-thumbs-missing"') +
          "></a>"
        );
      });

      self.$list[0].innerHTML = list.join("");

      if (self.opts.axis === "x") {
        // Set fixed width for list element to enable horizontal scrolling
        self.$list.width(
          parseInt(self.$grid.css("padding-right"), 10) +
          instance.group.length *
          self.$list
          .children()
          .eq(0)
          .outerWidth(true)
        );
      }
    },

    focus: function (duration) {
      var self = this,
        $list = self.$list,
        $grid = self.$grid,
        thumb,
        thumbPos;

      if (!self.instance.current) {
        return;
      }

      thumb = $list
        .children()
        .removeClass(CLASS_ACTIVE)
        .filter('[data-index="' + self.instance.current.index + '"]')
        .addClass(CLASS_ACTIVE);

      thumbPos = thumb.position();

      // Check if need to scroll to make current thumb visible
      if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
        $list.stop().animate({
            scrollTop: $list.scrollTop() + thumbPos.top
          },
          duration
        );
      } else if (
        self.opts.axis === "x" &&
        (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))
      ) {
        $list
          .parent()
          .stop()
          .animate({
              scrollLeft: thumbPos.left
            },
            duration
          );
      }
    },

    update: function () {
      var that = this;
      that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);

      if (that.isVisible) {
        if (!that.$grid) {
          that.create();
        }

        that.instance.trigger("onThumbsShow");

        that.focus(0);
      } else if (that.$grid) {
        that.instance.trigger("onThumbsHide");
      }

      // Update content position
      that.instance.update();
    },

    hide: function () {
      this.isVisible = false;
      this.update();
    },

    show: function () {
      this.isVisible = true;
      this.update();
    },

    toggle: function () {
      this.isVisible = !this.isVisible;
      this.update();
    }
  });

  $(document).on({
    "onInit.fb": function (e, instance) {
      var Thumbs;

      if (instance && !instance.Thumbs) {
        Thumbs = new FancyThumbs(instance);

        if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
          Thumbs.show();
        }
      }
    },

    "beforeShow.fb": function (e, instance, item, firstRun) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible) {
        Thumbs.focus(firstRun ? 0 : 250);
      }
    },

    "afterKeydown.fb": function (e, instance, current, keypress, keycode) {
      var Thumbs = instance && instance.Thumbs;

      // "G"
      if (Thumbs && Thumbs.isActive && keycode === 71) {
        keypress.preventDefault();

        Thumbs.toggle();
      }
    },

    "beforeClose.fb": function (e, instance) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
        Thumbs.$grid.hide();
      }
    }
  });
})(document, jQuery);
//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function (document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg>' +
        "</button>"
    },
    share: {
      url: function (instance, item) {
        return (
          (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location
        );
      },
      tpl: '<div class="fancybox-share">' +
        "<h1>{{SHARE}}</h1>" +
        "<p>" +
        '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' +
        "<span>Facebook</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' +
        "<span>Twitter</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' +
        "<span>Pinterest</span>" +
        "</a>" +
        "</p>" +
        '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p>' +
        "</div>"
    }
  });

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };

    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  }

  $(document).on("click", "[data-fancybox-share]", function () {
    var instance = $.fancybox.getInstance(),
      current = instance.current || null,
      url,
      tpl;

    if (!current) {
      return;
    }

    if ($.type(current.opts.share.url) === "function") {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl
      .replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "")
      .replace(/\{\{url\}\}/g, encodeURIComponent(url))
      .replace(/\{\{url_raw\}\}/g, escapeHtml(url))
      .replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");

    $.fancybox.open({
      src: instance.translate(instance, tpl),
      type: "html",
      opts: {
        touch: false,
        animationEffect: false,
        afterLoad: function (shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          instance.$refs.container.one("beforeClose.fb", function () {
            shareInstance.close(null, 0);
          });

          // Opening links in a popup window
          shareCurrent.$content.find(".fancybox-share__button").click(function () {
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        },
        mobile: {
          autoFocus: false
        }
      }
    });
  });
})(document, jQuery);
// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function (window, document, $) {
  "use strict";

  // Simple $.escapeSelector polyfill (for jQuery prior v3)
  if (!$.escapeSelector) {
    $.escapeSelector = function (sel) {
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      var fcssescape = function (ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === "\0") {
            return "\uFFFD";
          }

          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }

        // Other potentially-special ASCII characters get backslash-escaped
        return "\\" + ch;
      };

      return (sel + "").replace(rcssescape, fcssescape);
    };
  }

  // Get info about gallery name and current index from url
  function parseUrl() {
    var hash = window.location.hash.substr(1),
      rez = hash.split("-"),
      index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
      gallery = rez.join("-");

    return {
      hash: hash,
      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  }

  // Trigger click evnt on links to open new fancyBox instance
  function triggerFromUrl(url) {
    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute,
      // then triggering click event should start fancyBox
      $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']")
        .eq(url.index - 1)
        .focus()
        .trigger("click.fb-start");
    }
  }

  // Get gallery name from current instance
  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.current ? instance.current.opts : instance.opts;
    ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") || opts.$orig.data("fancybox-trigger") : "");

    return ret === "" ? false : ret;
  }

  // Start when DOM becomes ready
  $(function () {
    // Check if user has disabled this module
    if ($.fancybox.defaults.hash === false) {
      return;
    }

    // Update hash when opening/closing fancyBox
    $(document).on({
      "onInit.fb": function (e, instance) {
        var url, gallery;

        if (instance.group[instance.currIndex].opts.hash === false) {
          return;
        }

        url = parseUrl();
        gallery = getGalleryID(instance);

        // Make sure gallery start index matches index from hash
        if (gallery && url.gallery && gallery == url.gallery) {
          instance.currIndex = url.index - 1;
        }
      },

      "beforeShow.fb": function (e, instance, current, firstRun) {
        var gallery;

        if (!current || current.opts.hash === false) {
          return;
        }

        // Check if need to update window hash
        gallery = getGalleryID(instance);

        if (!gallery) {
          return;
        }

        // Variable containing last hash value set by fancyBox
        // It will be used to determine if fancyBox needs to close after hash change is detected
        instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : "");

        // If current hash is the same (this instance most likely is opened by hashchange), then do nothing
        if (window.location.hash === "#" + instance.currentHash) {
          return;
        }

        if (firstRun && !instance.origHash) {
          instance.origHash = window.location.hash;
        }

        if (instance.hashTimer) {
          clearTimeout(instance.hashTimer);
        }

        // Update hash
        instance.hashTimer = setTimeout(function () {
          if ("replaceState" in window.history) {
            window.history[firstRun ? "pushState" : "replaceState"]({},
              document.title,
              window.location.pathname + window.location.search + "#" + instance.currentHash
            );

            if (firstRun) {
              instance.hasCreatedHistory = true;
            }
          } else {
            window.location.hash = instance.currentHash;
          }

          instance.hashTimer = null;
        }, 300);
      },

      "beforeClose.fb": function (e, instance, current) {
        if (!current || current.opts.hash === false) {
          return;
        }

        clearTimeout(instance.hashTimer);

        // Goto previous history entry
        if (instance.currentHash && instance.hasCreatedHistory) {
          window.history.back();
        } else if (instance.currentHash) {
          if ("replaceState" in window.history) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
          } else {
            window.location.hash = instance.origHash;
          }
        }

        instance.currentHash = null;
      }
    });

    // Check if need to start/close after url has changed
    $(window).on("hashchange.fb", function () {
      var url = parseUrl(),
        fb = null;

      // Find last fancyBox instance that has "hash"
      $.each(
        $(".fancybox-container")
        .get()
        .reverse(),
        function (index, value) {
          var tmp = $(value).data("FancyBox");

          if (tmp && tmp.currentHash) {
            fb = tmp;
            return false;
          }
        }
      );

      if (fb) {
        // Now, compare hash values
        if (fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
          fb.currentHash = null;

          fb.close();
        }
      } else if (url.gallery !== "") {
        triggerFromUrl(url);
      }
    });

    // Check current hash and trigger click event on matching element to start fancyBox, if needed
    setTimeout(function () {
      if (!$.fancybox.getInstance()) {
        triggerFromUrl(parseUrl());
      }
    }, 50);
  });
})(window, document, jQuery);
// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function (document, $) {
  "use strict";

  var prevTime = new Date().getTime();

  $(document).on({
    "onInit.fb": function (e, instance, current) {
      instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (e) {
        var current = instance.current,
          currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.type !== "image")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.$slide.hasClass("fancybox-animated")) {
          return;
        }

        e = e.originalEvent || e;

        if (currTime - prevTime < 250) {
          return;
        }

        prevTime = currTime;

        instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
      });
    }
  });
})(document, jQuery);
// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true, // works only when .getWidthFrom is empty
      responsiveWidth: false,
      zIndex: 'inherit'
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        //update height in case of dynamic content
        s.stickyWrapper.css('height', s.stickyElement.outerHeight());

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'z-index': ''
              });
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop !== newTop) {
            var newWidth;
            if (s.getWidthFrom) {
                padding =  s.stickyElement.innerWidth() - s.stickyElement.width();
                newWidth = $(s.getWidthFrom).width() - padding || null;
            } else if (s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if (newWidth == null) {
                newWidth = s.stickyElement.width();
            }
            s.stickyElement
              .css('width', newWidth)
              .css('position', 'fixed')
              .css('top', newTop)
              .css('z-index', s.zIndex);

            s.stickyElement.parent().addClass(s.className);

            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              // sticky is started but it have to be repositioned
              s.stickyElement.trigger('sticky-update', [s]);
            }

            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              // just reached bottom || just started to stick but bottom is already reached
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              // sticky is started && sticked at topSpacing && overflowing from top just finished
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }

            s.currentTop = newTop;
          }

          // Check if sticky has reached end of container and stop sticking
          var stickyWrapperContainer = s.stickyWrapper.parent();
          var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

          if( unstick ) {
            s.stickyElement
              .css('position', 'absolute')
              .css('top', '')
              .css('bottom', 0)
              .css('z-index', '');
          } else {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop)
              .css('bottom', '')
              .css('z-index', s.zIndex);
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i];
        var newWidth = null;
        if (s.getWidthFrom) {
            if (s.responsiveWidth) {
                newWidth = $(s.getWidthFrom).width();
            }
        } else if(s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
        }
        if (newWidth != null) {
            s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function(options) {
        return this.each(function() {
          var o = $.extend({}, defaults, options);
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
          var wrapper = $('<div></div>')
            .attr('id', wrapperId)
            .addClass(o.wrapperClassName);

          stickyElement.wrapAll(function() {
            if ($(this).parent("#" + wrapperId).length == 0) {
                    return wrapper;
            }
});

          var stickyWrapper = stickyElement.parent();

          if (o.center) {
            stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") === "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop    = null;

          sticked.push(o);

          methods.setWrapperHeight(this);
          methods.setupChangeListeners(this);
        });
      },

      setWrapperHeight: function(stickyElement) {
        var element = $(stickyElement);
        var stickyWrapper = element.parent();
        if (stickyWrapper) {
          stickyWrapper.css('height', element.outerHeight());
        }
      },

      setupChangeListeners: function(stickyElement) {
        if (window.MutationObserver) {
          var mutationObserver = new window.MutationObserver(function(mutations) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
              methods.setWrapperHeight(stickyElement);
            }
          });
          mutationObserver.observe(stickyElement, {subtree: true, childList: true});
        } else {
          if (window.addEventListener) {
            stickyElement.addEventListener('DOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
            stickyElement.addEventListener('DOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
          } else if (window.attachEvent) {
            stickyElement.attachEvent('onDOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            });
            stickyElement.attachEvent('onDOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            });
          }
        }
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var that = this;
          var unstickyElement = $(that);

          var removeIdx = -1;
          var i = sticked.length;
          while (i-- > 0) {
            if (sticked[i].stickyElement.get(0) === that) {
                splice.call(sticked,i,1);
                removeIdx = i;
            }
          }
          if(removeIdx !== -1) {
            unstickyElement.unwrap();
            unstickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'float': '',
                'z-index': ''
              })
            ;
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
}));

/*


   Magic Zoom Plus v5.3.7 
   Copyright 2021 Magic Toolbox
   Buy a license: https://www.magictoolbox.com/magiczoomplus/
   License agreement: https://www.magictoolbox.com/license/


*/
eval(function(m,a,g,i,c,k){c=function(e){return(e<a?'':c(parseInt(e/a)))+((e=e%a)>35?String.fromCharCode(e+29):e.toString(36))};if(!''.replace(/^/,String)){while(g--){k[c(g)]=i[g]||c(g)}i=[function(e){return k[e]}];c=function(){return'\\w+'};g=1};while(g--){if(i[g]){m=m.replace(new RegExp('\\b'+c(g)+'\\b','g'),i[g])}}return m}('1n.aH=(17(){1a B,q;B=q=(17(){1a W={4C:"jg.3.7",ds:0,8y:{},$bC:17(aa){1b(aa.$6M||(aa.$6M=++Q.ds))},b1:17(aa){1b(Q.8y[aa]||(Q.8y[aa]={}))},$F:17(){},$1k:17(){1b 1k},$1s:17(){1b 1s},ga:"fg-"+1q.4P(1q.6c()*1v bK().fV()),3F:17(aa){1b(aa!=1h)},bn:17(ab,aa){1b(ab!=1h)?ab:aa},a3:17(aa){1b!!(aa)},1V:17(ac){1a aa=gU;17 ab(ad){1b 7S ad==="5Z"&&ad>-1&&ad%1===0&&ad<=aa}if(!Q.3F(ac)){1b 1k}if(ac.$4V){1b ac.$4V}if(!!ac.6Q){if(ac.6Q===1){1b"6S"}if(ac.6Q===3){1b"fJ"}}if(ac===1n){1b"1n"}if(ac===1p){1b"1p"}if(ac 3U 1n.bR){1b"17"}if(ac 3U 1n.6E){1b"1S"}if(ac 3U 1n.51){1b"4H"}if(ac 3U 1n.bK){1b"fv"}if(ac 3U 1n.fd){1b"hn"}if(ab(ac.1I)&&ac.dB){1b"hg"}if(ab(ac.1I)&&ac.aU){1b"2i"}if((ac 3U 1n.7r||ac 3U 1n.bR)&&ac.5z===Q.3V){1b"4l"}if(Q.1f.5n){if(Q.3F(ac.e8)){1b"1t"}}1j{if(ac===1n.1t||ac.5z===1n.1u||ac.5z===1n.eS||ac.5z===1n.fF||ac.5z===1n.iB||ac.5z===1n.iz){1b"1t"}}1b 7S(ac)},2c:17(af,ae){if(!(af 3U 1n.51)){af=[af]}if(!ae){1b af[0]}1U(1a ad=0,ab=af.1I;ad<ab;ad++){if(!Q.3F(af)){9k}1U(1a ac in ae){if(!7r.2t.4g.2g(ae,ac)){9k}3d{af[ad][ac]=ae[ac]}3p(aa){}}}1b af[0]},9K:17(ae,ad){if(!(ae 3U 1n.51)){ae=[ae]}1U(1a ac=0,aa=ae.1I;ac<aa;ac++){if(!Q.3F(ae[ac])){9k}if(!ae[ac].2t){9k}1U(1a ab in(ad||{})){if(!ae[ac].2t[ab]){ae[ac].2t[ab]=ad[ab]}}}1b ae[0]},fU:17(ac,ab){if(!Q.3F(ac)){1b ac}1U(1a aa in(ab||{})){if(!ac[aa]){ac[aa]=ab[aa]}}1b ac},$3d:17(){1U(1a ab=0,aa=2i.1I;ab<aa;ab++){3d{1b 2i[ab]()}3p(ac){}}1b 1h},$A:17(ac){if(!Q.3F(ac)){1b Q.$([])}if(ac.dv){1b Q.$(ac.dv())}if(ac.dB){1a ab=ac.1I||0,aa=1v 51(ab);5v(ab--){aa[ab]=ac[ab]}1b Q.$(aa)}1b Q.$(51.2t.7D.2g(ac))},69:17(){1b 1v bK().fV()},3A:17(ae){1a ac;4E(Q.1V(ae)){1E"9o":ac={};1U(1a ad in ae){ac[ad]=Q.3A(ae[ad])}1J;1E"4H":ac=[];1U(1a ab=0,aa=ae.1I;ab<aa;ab++){ac[ab]=Q.3A(ae[ab])}1J;1T:1b ae}1b Q.$(ac)},$:17(ac){1a aa=1s;if(!Q.3F(ac)){1b 1h}if(ac.$be){1b ac}4E(Q.1V(ac)){1E"4H":ac=Q.fU(ac,Q.2c(Q.51,{$be:Q.$F}));ac.3e=ac.az;ac.4o=Q.51.4o;1b ac;1J;1E"1S":1a ab=1p.da(ac);if(Q.3F(ab)){1b Q.$(ab)}1b 1h;1J;1E"1n":1E"1p":Q.$bC(ac);ac=Q.2c(ac,Q.3K);1J;1E"6S":Q.$bC(ac);ac=Q.2c(ac,Q.4f);1J;1E"1t":ac=Q.2c(ac,Q.1u);1J;1E"fJ":1E"17":1E"fv":1T:aa=1k;1J}if(aa){1b Q.2c(ac,{$be:Q.$F})}1j{1b ac}},$1v:17(aa,ac,ab){1b Q.$(Q.7C.8r(aa)).8I(ac||{}).1z(ab||{})},6q:17(ad,ae,ab){1a aa,ag,ac,ai=[],ah=-1;ab||(ab=Q.ga);aa=Q.$(ab)||Q.$1v("2k",{id:ab,1x:"aX/52"}).29((1p.hB||1p.3l),"1H");ag=aa.eR||aa.f5;if(Q.1V(ae)!=="1S"){1U(1a ac in ae){ai.33(ac+":"+ae[ac])}ae=ai.7n(";")}if(ag.ej){ah=ag.ej(ad+" {"+ae+"}",ag.hL.1I)}1j{3d{ah=ag.hO(ad,ae,ag.hQ.1I)}3p(af){}}1b ah},iX:17(ad,aa){1a ac,ab;ac=Q.$(ad);if(Q.1V(ac)!=="6S"){1b}ab=ac.eR||ac.f5;if(ab.g8){ab.g8(aa)}1j{if(ab.gh){ab.gh(aa)}}},iC:17(){1b"gs-gB-gE-gv-gI".4v(/[h9]/g,17(ac){1a ab=1q.6c()*16|0,aa=ac==="x"?ab:(ab&3|8);1b aa.9j(16)}).8k()},6J:(17(){1a aa;1b 17(ab){if(!aa){aa=1p.8r("a")}aa.3b("7h",ab);1b("!!"+aa.7h).4v("!!","")}})(),hb:17(ac){1a ad=0,aa=ac.1I;1U(1a ab=0;ab<aa;++ab){ad=31*ad+ac.fx(ab);ad%=he}1b ad}};1a Q=W;1a R=W.$;if(!1n.fj){1n.fj=W;1n.$fg=W.$}Q.51={$4V:"4H",4U:17(ad,ae){1a aa=13.1I;1U(1a ab=13.1I,ac=(ae<0)?1q.2e(0,ab+ae):ae||0;ac<ab;ac++){if(13[ac]===ad){1b ac}}1b-1},4o:17(aa,ab){1b 13.4U(aa,ab)!=-1},az:17(aa,ad){1U(1a ac=0,ab=13.1I;ac<ab;ac++){if(ac in 13){aa.2g(ad,13[ac],ac,13)}}},3a:17(aa,af){1a ae=[];1U(1a ad=0,ab=13.1I;ad<ab;ad++){if(ad in 13){1a ac=13[ad];if(aa.2g(af,13[ad],ad,13)){ae.33(ac)}}}1b ae},h5:17(aa,ae){1a ad=[];1U(1a ac=0,ab=13.1I;ac<ab;ac++){if(ac in 13){ad[ac]=aa.2g(ae,13[ac],ac,13)}}1b ad}};Q.9K(6E,{$4V:"1S",5g:17(){1b 13.4v(/^\\s+|\\s+$/g,"")},eq:17(aa,ab){1b(ab||1k)?(13.9j()===aa.9j()):(13.5e().9j()===aa.5e().9j())},6i:17(){1b 13.4v(/-\\D/g,17(aa){1b aa.9A(1).8k()})},9t:17(){1b 13.4v(/[A-Z]/g,17(aa){1b("-"+aa.9A(0).5e())})},gS:17(aa){1b 6k(13,aa||10)},h3:17(){1b 2A(13)},dL:17(){1b!13.4v(/1s/i,"").5g()},3u:17(ab,aa){aa=aa||"";1b(aa+13+aa).4U(aa+ab+aa)>-1}});W.9K(bR,{$4V:"17",1D:17(){1a ab=Q.$A(2i),aa=13,ac=ab.7w();1b 17(){1b aa.6u(ac||1h,ab.67(Q.$A(2i)))}},2H:17(){1a ab=Q.$A(2i),aa=13,ac=ab.7w();1b 17(ad){1b aa.6u(ac||1h,Q.$([ad||(Q.1f.2L?1n.1t:1h)]).67(ab))}},2G:17(){1a ab=Q.$A(2i),aa=13,ac=ab.7w();1b 1n.4K(17(){1b aa.6u(aa,ab)},ac||0)},e0:17(){1a ab=Q.$A(2i),aa=13;1b 17(){1b aa.2G.6u(aa,ab)}},dA:17(){1a ab=Q.$A(2i),aa=13,ac=ab.7w();1b 1n.gm(17(){1b aa.6u(aa,ab)},ac||0)}});1a X={};1a P=3I.h2.5e();1a O=P.3L(/(3W|76|5n|ba)\\/(\\d+\\.?\\d*)/i);1a T=P.3L(/(h1|bf)\\/(\\d+\\.?\\d*)/i)||P.3L(/(g5|6a|9x|g4|72|bf)\\/(\\d+\\.?\\d*)/i);1a V=P.3L(/4C\\/(\\d+\\.?\\d*)/i);1a K=1p.57.2k;17 L(ab){1a aa=ab.9A(0).8k()+ab.7D(1);1b ab in K||("g1"+aa)in K||("g6"+aa)in K||("6V"+aa)in K||("O"+aa)in K}Q.1f={2N:{h0:!!(1p.gZ),gY:!!(1n.9X),bH:!!(1p.bs),5o:!!(1p.gX||1p.gV||1p.9L||1p.fR||1p.gT||1p.gR||1p.gQ||1p.jf||1p.gP),di:!!(1n.gO)&&!!(1n.gN)&&(1n.9Q&&"gM"in 1v 9Q),26:L("26"),2p:L("2p"),9M:L("9M"),g2:L("g2"),5p:1k,eP:1k,8M:1k,6g:1k,8j:(17(){1b 1p.gL.gK("bW://bY.bZ.c2/h4/hi/hr#hq","1.1")}())},9w:(17(){1b"ho"in 1n||(1n.ep&&1p 3U ep)||(3I.hm>0)||(3I.hl>0)}()),2J:!!P.3L(/(89|bb\\d+|hk).+|hj|hh\\/|h7|hf|hd|hc|ha|h8|h6|ip(f6|f3|ad)|gG|gy|gA |gz|gC|gw|2J.+g4|gu|72 m(gF|in)i|gD( gx)?|fD|p(gr|gt)\\/|gq|hs|hp|hu(4|6)0|iq|iN|iL\\.(1f|3X)|iI|iG|iE (ce|fD)|iA|iw/),5Q:(O&&O[1])?O[1].5e():(1n.72)?"ba":!!(1n.ht)?"5n":(1p.je!==2Q||1n.jd!==1h)?"76":(1n.jc!==1h||!3I.jb)?"3W":"j4",4C:(O&&O[2])?2A(O[2]):0,4M:(T&&T[1])?T[1].5e():"",7t:(T&&T[2])?2A(T[2]):0,9a:"",bd:"",5j:"",2L:0,4F:P.3L(/ip(?:ad|f3|f6)/)?"8e":(P.3L(/(?:iY|89)/)||3I.4F.3L(/gi|b0|iW/i)||["iU"])[0].5e(),ge:1p.9O&&1p.9O.5e()==="fl",eF:0,4u:17(){1b(1p.9O&&1p.9O.5e()==="fl")?1p.3l:1p.57},5p:1n.5p||1n.iQ||1n.hU||1n.im||1n.hM||2Q,aN:1n.aN||1n.ey||1n.ey||1n.hI||1n.hG||1n.hv||2Q,2q:1k,7J:17(){if(Q.1f.2q){1b}1a ad;1a ac;Q.1f.2q=1s;Q.3l=Q.$(1p.3l);Q.b0=Q.$(1n);3d{1a ab=Q.$1v("2Z").1z({1e:2P,1g:2P,8g:"6R",2n:"5S",1H:-hF}).29(1p.3l);Q.1f.eF=ab.dN-ab.cX;ab.2X()}3p(aa){}3d{ad=Q.$1v("2Z");ac=ad.2k;ac.eU="fs:1Y(cC://),1Y(cC://),hE 1Y(cC://)";Q.1f.2N.eP=(/(1Y\\s*\\(.*?){3}/).3j(ac.fs);ac=1h;ad=1h}3p(aa){}if(!Q.1f.7L){Q.1f.7L=Q.9s("2p").9t()}3d{ad=Q.$1v("2Z");ad.2k.eU=Q.9s("3a").9t()+":5J(hC);";Q.1f.2N.8M=!!ad.2k.1I&&(!Q.1f.2L||Q.1f.2L>9);ad=1h}3p(aa){}if(!Q.1f.2N.8M){Q.$(1p.57).1B("6p-hA-2W")}3d{Q.1f.2N.6g=(17(){1a ae=Q.$1v("6g");1b!!(ae.g3&&ae.g3("2d"))}())}3p(aa){}if(1n.hz===2Q&&1n.hy!==2Q){X.2U="hx"}Q.3K.36.2g(Q.$(1p),"9W")}};(17(){1a ab=[],ae,ad,af;17 aa(){1b!!(2i.aU.bS)}4E(Q.1f.5Q){1E"5n":if(!Q.1f.4C){Q.1f.4C=!!(1n.9Q)?3:2}1J;1E"76":Q.1f.4C=(T&&T[2])?2A(T[2]):0;1J}Q.1f[Q.1f.5Q]=1s;if(T&&T[1]==="g5"){Q.1f.4M="6a"}if(!!1n.6a){Q.1f.6a=1s}if(T&&T[1]==="bf"){Q.1f.4M="72";Q.1f.72=1s}if(Q.1f.4M==="9x"&&(V&&V[1])){Q.1f.7t=2A(V[1])}if(Q.1f.4F==="89"&&Q.1f.3W&&(V&&V[1])){Q.1f.8N=1s}ae=({76:["-g9-","g6","g9"],3W:["-3W-","g1","3W"],5n:["-6V-","6V","6V"],ba:["-o-","O","o"]})[Q.1f.5Q]||["","",""];Q.1f.9a=ae[0];Q.1f.bd=ae[1];Q.1f.5j=ae[2];Q.1f.2L=!Q.1f.5n?2Q:(1p.go)?1p.go:(17(){1a ag=0;if(Q.1f.ge){1b 5}4E(Q.1f.4C){1E 2:ag=6;1J;1E 3:ag=7;1J}1b ag}());if(!Q.1f.2J&&Q.1f.4F==="gi"&&Q.1f.9w){Q.1f.2J=1s;Q.1f.4F="8e"}ab.33(Q.1f.4F+"-2W");if(Q.1f.2J){ab.33("2J-2W")}if(Q.1f.8N){ab.33("89-1f-2W")}if(Q.1f.2L){Q.1f.4M="ie";Q.1f.7t=Q.1f.2L;ab.33("ie"+Q.1f.2L+"-2W");1U(ad=11;ad>Q.1f.2L;ad--){ab.33("lt-ie"+ad+"-2W")}}if(Q.1f.3W&&Q.1f.4C<hT){Q.1f.2N.5o=1k}if(Q.1f.5p){Q.1f.5p.2g(1n,17(){Q.1f.2N.5p=1s})}if(Q.1f.2N.8j){ab.33("8j-2W")}1j{ab.33("6p-8j-2W")}af=(1p.57.6O||"").3L(/\\S+/g)||[];1p.57.6O=Q.$(af).67(ab).7n(" ");3d{1p.57.3b("3m-2W-gg",Q.1f.4M);1p.57.3b("3m-2W-gg-fZ",Q.1f.7t);1p.57.3b("3m-2W-5Q",Q.1f.5Q);1p.57.3b("3m-2W-5Q-fZ",Q.1f.4C)}3p(ac){}if(Q.1f.2L&&Q.1f.2L<9){1p.8r("5L");1p.8r("fX")}if(!1n.3I.7a){Q.$(["il","ik","ij","ii","ig"]).3e(17(ag){X["ic"+ag.5e()]=1n.3I.8B?"ia"+ag:-1})}}());(17(){Q.1f.5o={a5:Q.1f.2N.5o,4Q:17(){1b!!(1p.i9||1p[Q.1f.5j+"i8"]||1p.5o||1p.i6||1p[Q.1f.5j+"hV"])},cH:17(aa,ab){if(!ab){ab={}}if(13.a5){Q.$(1p).1C(13.bw,13.fO=17(ac){if(13.4Q()){if(ab.cE){ab.cE()}}1j{Q.$(1p).1N(13.bw,13.fO);if(ab.cL){ab.cL()}}}.2H(13));Q.$(1p).1C(13.bL,13.6r=17(ac){if(ab.8G){ab.8G()}Q.$(1p).1N(13.bL,13.6r)}.2H(13));(aa.i4||aa[Q.1f.5j+"i3"]||aa[Q.1f.5j+"i2"]||17(){}).2g(aa)}1j{if(ab.8G){ab.8G()}}},fh:(1p.9L||1p.fR||1p[Q.1f.5j+"i1"]||1p[Q.1f.5j+"i0"]||17(){}).1D(1p),bw:1p.fW?"hZ":(1p.9L?"":Q.1f.5j)+"hY",bL:1p.fW?"gH":(1p.9L?"":Q.1f.5j)+"j3",hW:Q.1f.5j,hX:1h}}());1a Z=/\\S+/g,N=/^(3T(d6|dh|d7|cY)i5)|((7K|8A)(d6|dh|d7|cY))$/,S={"ib":("2Q"===7S(K.d2))?"ih":"d2"},U={eH:1s,em:1s,2y:1s,eB:1s,1l:1s},M=(1n.dU)?17(ac,aa){1a ab=1n.dU(ac,1h);1b ab?ab.i7(aa)||ab[aa]:1h}:17(ad,ab){1a ac=ad.hH,aa=1h;aa=ac?ac[ab]:1h;if(1h==aa&&ad.2k&&ad.2k[ab]){aa=ad.2k[ab]}1b aa};17 Y(ac){1a aa,ab;ab=(Q.1f.3W&&"3a"==ac)?1k:(ac in K);if(!ab){aa=Q.1f.bd+ac.9A(0).8k()+ac.7D(1);if(aa in K){1b aa}}1b ac}Q.9s=Y;Q.4f={e7:17(aa){1b!(aa||"").3u(" ")&&(13.6O||"").3u(aa," ")},1B:17(ae){1a ab=(13.6O||"").3L(Z)||[],ad=(ae||"").3L(Z)||[],aa=ad.1I,ac=0;1U(;ac<aa;ac++){if(!Q.$(ab).4o(ad[ac])){ab.33(ad[ac])}}13.6O=ab.7n(" ");1b 13},1Q:17(af){1a ab=(13.6O||"").3L(Z)||[],ae=(af||"").3L(Z)||[],aa=ae.1I,ad=0,ac;1U(;ad<aa;ad++){if((ac=Q.$(ab).4U(ae[ad]))>-1){ab.8V(ac,1)}}13.6O=af?ab.7n(" "):"";1b 13},hS:17(aa){1b 13.e7(aa)?13.1Q(aa):13.1B(aa)},3D:17(ab){1a ac=ab.6i(),aa=1h;ab=S[ac]||(S[ac]=Y(ac));aa=M(13,ab);if("2z"===aa){aa=1h}if(1h!==aa){if("2y"==ab){1b Q.3F(aa)?2A(aa):1}if(N.3j(ab)){aa=6k(aa,10)?aa:"6B"}}1b aa},3R:17(ab,aa){1a ad=ab.6i();3d{if("2y"==ab){13.dw(aa);1b 13}ab=S[ad]||(S[ad]=Y(ad));13.2k[ab]=aa+(("5Z"==Q.1V(aa)&&!U[ad])?"2D":"")}3p(ac){}1b 13},1z:17(ab){1U(1a aa in ab){13.3R(aa,ab[aa])}1b 13},hw:17(){1a aa={};Q.$A(2i).3e(17(ab){aa[ab]=13.3D(ab)},13);1b aa},dw:17(ac,aa){1a ab;aa=aa||1k;13.2k.2y=ac;ac=6k(2A(ac)*2P);if(aa){if(0===ac){if("3t"!=13.2k.4Z){13.2k.4Z="3t"}}1j{if("5M"!=13.2k.4Z){13.2k.4Z="5M"}}}if(Q.1f.2L&&Q.1f.2L<9){if(!a7(ac)){if(!~13.2k.3a.4U("bV")){13.2k.3a+=" dC:dI.dK.bV(a0="+ac+")"}1j{13.2k.3a=13.2k.3a.4v(/a0=\\d*/i,"a0="+ac)}}1j{13.2k.3a=13.2k.3a.4v(/dC:dI.dK.bV\\(a0=\\d*\\)/i,"").5g();if(""===13.2k.3a){13.2k.5l("3a")}}}1b 13},8I:17(aa){1U(1a ab in aa){if("4l"===ab){13.1B(""+aa[ab])}1j{13.3b(ab,""+aa[ab])}}1b 13},hD:17(){1a ab=0,aa=0;ab=13.3D("26-5C");aa=13.3D("26-cl");ab=ab.4U("6V")>-1?2A(ab):ab.4U("s")>-1?2A(ab)*bc:0;aa=aa.4U("6V")>-1?2A(aa):aa.4U("s")>-1?2A(aa)*bc:0;1b ab+aa},4c:17(){1b 13.1z({6C:"38",4Z:"3t"})},5A:17(){1b 13.1z({6C:"",4Z:"5M"})},1F:17(){1b{1e:13.dN,1g:13.hJ}},9e:17(ab){1a aa=13.1F();aa.1e-=(2A(13.3D("3T-1P-1e")||0)+2A(13.3D("3T-2M-1e")||0));aa.1g-=(2A(13.3D("3T-1H-1e")||0)+2A(13.3D("3T-2K-1e")||0));if(!ab){aa.1e-=(2A(13.3D("7K-1P")||0)+2A(13.3D("7K-2M")||0));aa.1g-=(2A(13.3D("7K-1H")||0)+2A(13.3D("7K-2K")||0))}1b aa},7d:17(){1b{1H:13.8T,1P:13.8W}},hK:17(){1a aa=13,ab={1H:0,1P:0};do{ab.1P+=aa.8W||0;ab.1H+=aa.8T||0;aa=aa.49}5v(aa);1b ab},9c:17(){1a ae=13,ab=0,ad=0;if(Q.3F(1p.57.6L)){1a aa=13.6L(),ac=Q.$(1p).7d(),af=Q.1f.4u();1b{1H:aa.1H+ac.y-af.hN,1P:aa.1P+ac.x-af.hP}}do{ab+=ae.e4||0;ad+=ae.e2||0;ae=ae.dX}5v(ae&&!(/^(?:3l|9R)$/i).3j(ae.8P));1b{1H:ad,1P:ab}},hR:17(){1a aa=13;1a ac=0;1a ab=0;do{ac+=aa.e4||0;ab+=aa.e2||0;aa=aa.dX}5v(aa&&!(/^(?:3l|9R)$/i).3j(aa.8P));1b{1H:ab,1P:ac}},7E:17(){1a ab=13.9c();1a aa=13.1F();1b{1H:ab.1H,2K:ab.1H+aa.1g,1P:ab.1P,2M:ab.1P+aa.1e}},5V:17(ab){3d{13.io=ab}3p(aa){13.iS=ab}1b 13},2X:17(){1b(13.49)?13.49.c6(13):13},5m:17(){Q.$A(13.iT).3e(17(aa){if(3==aa.6Q||8==aa.6Q){1b}Q.$(aa).5m()});13.2X();13.cO();if(13.$6M){Q.8y[13.$6M]=1h;4S Q.8y[13.$6M]}1b 1h},3f:17(ac,ab){ab=ab||"2K";1a aa=13.4x;("1H"==ab&&aa)?13.iV(ac,aa):13.bF(ac);1b 13},29:17(ac,ab){1a aa=Q.$(ac).3f(13,ab);1b 13},ft:17(aa){13.3f(aa.49.80(13,aa));1b 13},aB:17(aa){if("6S"!==Q.1V("1S"==Q.1V(aa)?aa=1p.da(aa):aa)){1b 1k}1b(13==aa)?1k:(13.4o&&!(Q.1f.dM))?(13.4o(aa)):(13.d5)?!!(13.d5(aa)&16):Q.$A(13.8H(aa.8P)).4o(aa)}};Q.4f.iZ=Q.4f.3D;Q.4f.j0=Q.4f.1z;if(!1n.4f){1n.4f=Q.$F;if(Q.1f.5Q.3W){1n.1p.8r("j1")}1n.4f.2t=(Q.1f.5Q.3W)?1n["[[iR.2t]]"]:{}}Q.9K(1n.4f,{$4V:"6S"});Q.3K={1F:17(){if(Q.1f.9w||Q.1f.j2||Q.1f.dM){1b{1e:1n.5x,1g:1n.4I}}1b{1e:Q.1f.4u().cX,1g:Q.1f.4u().j5}},7d:17(){1b{x:1n.j6||Q.1f.4u().8W,y:1n.j7||Q.1f.4u().8T}},j8:17(){1a aa=13.1F();1b{1e:1q.2e(Q.1f.4u().j9,aa.1e),1g:1q.2e(Q.1f.4u().ja,aa.1g)}}};Q.2c(1p,{$4V:"1p"});Q.2c(1n,{$4V:"1n"});Q.2c([Q.4f,Q.3K],{1R:17(ad,ab){1a aa=Q.b1(13.$6M),ac=aa[ad];if(2Q!==ab&&2Q===ac){ac=aa[ad]=ab}1b(Q.3F(ac)?ac:1h)},2O:17(ac,ab){1a aa=Q.b1(13.$6M);aa[ac]=ab;1b 13},2B:17(ab){1a aa=Q.b1(13.$6M);4S aa[ab];1b 13}});if(!(1n.cj&&1n.cj.2t&&1n.cj.2t.ck)){Q.2c([Q.4f,Q.3K],{ck:17(aa){1b Q.$A(13.b2("*")).3a(17(ac){3d{1b(1==ac.6Q&&ac.6O.3u(aa," "))}3p(ab){}})}})}Q.2c([Q.4f,Q.3K],{aI:17(){1b 13.ck(2i[0])},8H:17(){1b 13.b2(2i[0])}});if(Q.1f.5o.a5&&!1p.cZ){Q.4f.cZ=17(){Q.1f.5o.cH(13)}}Q.1u={$4V:"1t",6W:Q.$1k,2j:17(){1b 13.5w().4W()},5w:17(){if(13.dY){13.dY()}1j{13.e8=1s}1b 13},4W:17(){if(13.ea){13.ea()}1j{13.iP=1k}1b 13},4m:17(){13.6W=Q.$1s;1b 13},7P:17(){1a aa=(/3v/i).3j(13.1x)?13.4X[0]:13;1b!Q.3F(aa)?{x:0,y:0}:{x:aa.3C,y:aa.3E}},5Y:17(){1a aa=(/3v/i).3j(13.1x)?13.4X[0]:13;1b!Q.3F(aa)?{x:0,y:0}:{x:aa.3P||aa.3C+Q.1f.4u().8W,y:aa.3N||aa.3E+Q.1f.4u().8T}},cb:17(){1a aa=13.41||13.iD;5v(aa&&aa.6Q===3){aa=aa.49}1b aa},8w:17(){1a ab=1h;4E(13.1x){1E"8m":1E"iO":1E"is":ab=13.aM||13.it;1J;1E"8C":1E"cS":1E"eX":ab=13.aM||13.iu;1J;1T:1b ab}3d{5v(ab&&ab.6Q===3){ab=ab.49}}3p(aa){ab=1h}1b ab},7x:17(){if(!13.eg&&13.2u!==2Q){1b(13.2u&1?1:(13.2u&2?3:(13.2u&4?2:0)))}1b 13.eg},6T:17(){1b(13.2r&&(13.2r==="3v"||13.2r===13.6D))||(/3v/i).3j(13.1x)},5q:17(){if(13.2r){1b(13.2r==="3v"||13.6D===13.2r)&&13.7F}1j{if(13 3U 1n.7M){1b 13.4X.1I===1&&(13.6U.1I?13.6U.1I===1&&13.6U[0].6j===13.4X[0].6j:1s)}}1b 1k},71:17(){if(13.2r){1b 13.7F&&(13.2r==="3v"||13.6D===13.2r)?13:1h}1j{if(13 3U 1n.7M){1b 13.4X[0]}}1b 1h},9p:17(){if(13.2r){1b 13.7F&&(13.2r==="3v"||13.6D===13.2r)?13.4j:1h}1j{if(13 3U 1n.7M){1b 13.4X[0].6j}}1b 1h}};Q.cA="dT";Q.b8="iv";Q.b4="";if(!1p.dT){Q.cA="ix";Q.b8="iy";Q.b4="9i"}Q.1u.1w={1x:"",x:1h,y:1h,2Y:1h,2u:1h,41:1h,aM:1h,$4V:"1t.4z",6W:Q.$1k,6Z:Q.$([]),4w:17(aa){1a ab=aa;13.6Z.33(ab)},2j:17(){1b 13.5w().4W()},5w:17(){13.6Z.3e(17(ab){3d{ab.5w()}3p(aa){}});1b 13},4W:17(){13.6Z.3e(17(ab){3d{ab.4W()}3p(aa){}});1b 13},4m:17(){13.6W=Q.$1s;1b 13},7P:17(){1b{x:13.3C,y:13.3E}},5Y:17(){1b{x:13.x,y:13.y}},cb:17(){1b 13.41},8w:17(){1b 13.aM},7x:17(){1b 13.2u},gl:17(){1b 13.6Z.1I>0?13.6Z[0].cb():2Q},6T:17(){1b(13.2r&&(13.2r==="3v"||13.2r===13.6D))||(/3v/i).3j(13.1x)},5q:17(){if(13.2r){1b(13.2r==="3v"||13.6D===13.2r)&&13.7F}1j{if(13 3U 1n.7M){1b 13.4X.1I===1&&(13.6U.1I?13.6U[0].6j===13.4X[0].6j:1s)}}1b 1k},71:17(){if(13.2r){1b 13.7F&&(13.2r==="3v"||13.6D===13.2r)?13:1h}1j{if(13 3U 1n.7M){1b 13.4X[0]}}1b 1h},9p:17(){if(13.2r){1b 13.7F&&(13.2r==="3v"||13.6D===13.2r)?13.4j:1h}1j{if(13 3U 1n.7M){1b 13.4X[0].6j}}1b 1h}};Q.2c([Q.4f,Q.3K],{1C:17(ac,ae,af,ai){1a ah,aa,ad,ag,ab;if(Q.1V(ac)==="1S"){ab=ac.92(" ");if(ab.1I>1){ac=ab}}if(Q.1V(ac)==="4H"){Q.$(ac).3e(13.1C.2H(13,ae,af,ai));1b 13}ac=X[ac]||ac;if(!ac||!ae||Q.1V(ac)!=="1S"||Q.1V(ae)!=="17"){1b 13}if(ac==="9W"&&Q.1f.2q){ae.2g(13);1b 13}af=6k(af||50,10);if(!ae.$aY){ae.$aY=1q.4P(1q.6c()*Q.69())}ah=Q.3K.1R.2g(13,"8u",{});aa=ah[ac];if(!aa){ah[ac]=aa=Q.$([]);ad=13;if(Q.1u.1w[ac]){Q.1u.1w[ac].1L.6f.2g(13,ai)}1j{aa.3z=17(aj){aj=Q.2c(aj||1n.e,{$4V:"1t"});Q.3K.36.2g(ad,ac,Q.$(aj))};13[Q.cA](Q.b4+ac,aa.3z,1k)}}ag={1x:ac,fn:ae,cI:af,dR:ae.$aY};aa.33(ag);aa.ir(17(ak,aj){1b ak.cI-aj.cI});1b 13},1N:17(ag){1a ae=Q.3K.1R.2g(13,"8u",{});1a ac;1a aa;1a ab;1a ah;1a af;1a ad;af=2i.1I>1?2i[1]:-2P;if(Q.1V(ag)==="1S"){ad=ag.92(" ");if(ad.1I>1){ag=ad}}if(Q.1V(ag)==="4H"){Q.$(ag).3e(13.1N.2H(13,af));1b 13}ag=X[ag]||ag;if(!ag||Q.1V(ag)!=="1S"||!ae||!ae[ag]){1b 13}ac=ae[ag]||[];1U(ab=0;ab<ac.1I;ab++){aa=ac[ab];if(af===-2P||!!af&&af.$aY===aa.dR){ah=ac.8V(ab--,1)}}if(ac.1I===0){if(Q.1u.1w[ag]){Q.1u.1w[ag].1L.2X.2g(13)}1j{13[Q.b8](Q.b4+ag,ac.3z,1k)}4S ae[ag]}1b 13},36:17(ad,af){1a ac=Q.3K.1R.2g(13,"8u",{});1a ab;1a aa;ad=X[ad]||ad;if(!ad||Q.1V(ad)!=="1S"||!ac||!ac[ad]){1b 13}3d{af=Q.2c(af||{},{1x:ad})}3p(ae){}if(af.2Y===2Q){af.2Y=Q.69()}ab=ac[ad]||[];1U(aa=0;aa<ab.1I&&!(af.6W&&af.6W());aa++){ab[aa].fn.2g(13,af)}},ci:17(ab,aa){1a ae=(ab!=="9W");1a ad=13;1a ac;ab=X[ab]||ab;if(!ae){Q.3K.36.2g(13,ab);1b 13}if(ad===1p&&1p.aZ&&!ad.bv){ad=1p.57}if(1p.aZ){ac=1p.aZ(ab);ac.5d(aa,1s,1s)}1j{ac=1p.iF();ac.9V=ab}if(1p.aZ){ad.bv(ac)}1j{ad.iH("9i"+aa,ac)}1b ac},cO:17(){1a ab=Q.3K.1R.2g(13,"8u");if(!ab){1b 13}1U(1a aa in ab){Q.3K.1N.2g(13,aa)}Q.3K.2B.2g(13,"8u");1b 13}});(17(aa){if(1p.9h==="8U"){1b aa.1f.7J.2G(1)}if(aa.1f.3W&&aa.1f.4C<iJ){(17(){if(aa.$(["2h","8U"]).4o(1p.9h)){aa.1f.7J()}1j{2i.aU.2G(50)}}())}1j{if(aa.1f.5n&&aa.1f.2L<9&&1n===1H){(17(){if(aa.$3d(17(){aa.1f.4u().iK("1P");1b 1s})){aa.1f.7J()}1j{2i.aU.2G(50)}}())}1j{aa.3K.1C.2g(aa.$(1p),"iM",aa.1f.7J);aa.3K.1C.2g(aa.$(1n),"5D",aa.1f.7J)}}}(W));Q.3V=17(){1a ae=1h,ab=Q.$A(2i);if("4l"==Q.1V(ab[0])){ae=ab.7w()}1a aa=17(){1U(1a ah in 13){13[ah]=Q.3A(13[ah])}if(13.5z.$40){13.$40={};1a aj=13.5z.$40;1U(1a ai in aj){1a ag=aj[ai];4E(Q.1V(ag)){1E"17":13.$40[ai]=Q.3V.ef(13,ag);1J;1E"9o":13.$40[ai]=Q.3A(ag);1J;1E"4H":13.$40[ai]=Q.3A(ag);1J}}}1a af=(13.3Y)?13.3Y.6u(13,2i):13;4S 13.bS;1b af};if(!aa.2t.3Y){aa.2t.3Y=Q.$F}if(ae){1a ad=17(){};ad.2t=ae.2t;aa.2t=1v ad;aa.$40={};1U(1a ac in ae.2t){aa.$40[ac]=ae.2t[ac]}}1j{aa.$40=1h}aa.5z=Q.3V;aa.2t.5z=aa;Q.2c(aa.2t,ab[0]);Q.2c(aa,{$4V:"4l"});1b aa};W.3V.ef=17(aa,ab){1b 17(){1a ad=13.bS;1a ac=ab.6u(aa,2i);1b ac}};(17(ad){1a ac=ad.$;1a aa=5,ab=bD;ad.1u.1w.1X=1v ad.3V(ad.2c(ad.1u.1w,{1x:"1X",3Y:17(ag,af){1a ae=af.5Y();13.x=ae.x;13.y=ae.y;13.3C=af.3C;13.3E=af.3E;13.2Y=af.2Y;13.2u=af.7x();13.41=ag;13.4w(af)}}));ad.1u.1w.1X.1L={1y:{7V:ab,2u:1},6f:17(ae){13.2O("1t:1X:1y",ad.2c(ad.3A(ad.1u.1w.1X.1L.1y),ae||{}));13.1C("7b",ad.1u.1w.1X.1L.3z,1);13.1C("6w",ad.1u.1w.1X.1L.3z,1);13.1C("2I",ad.1u.1w.1X.1L.bB,1);if(ad.1f.5n&&ad.1f.2L<9){13.1C("aV",ad.1u.1w.1X.1L.3z,1)}},2X:17(){13.1N("7b",ad.1u.1w.1X.1L.3z);13.1N("6w",ad.1u.1w.1X.1L.3z);13.1N("2I",ad.1u.1w.1X.1L.bB);if(ad.1f.5n&&ad.1f.2L<9){13.1N("aV",ad.1u.1w.1X.1L.3z)}},bB:17(ae){ae.4W()},3z:17(ah){1a ag,ae,af;ae=13.1R("1t:1X:1y");if(ah.1x!="aV"&&ah.7x()!=ae.2u){1b}if(13.1R("1t:1X:bQ")){13.2B("1t:1X:bQ");1b}if("7b"==ah.1x){ag=1v ad.1u.1w.1X(13,ah);13.2O("1t:1X:9C",ag)}1j{if("6w"==ah.1x){ag=13.1R("1t:1X:9C");if(!ag){1b}af=ah.5Y();13.2B("1t:1X:9C");ag.4w(ah);if(ah.2Y-ag.2Y<=ae.7V&&1q.9F(1q.5s(af.x-ag.x,2)+1q.5s(af.y-ag.y,2))<=aa){13.36("1X",ag)}1p.36("6w",ah)}1j{if(ah.1x=="aV"){ag=1v ad.1u.1w.1X(13,ah);13.36("1X",ag)}}}}}})(W);(17(ab){1a aa=ab.$;ab.1u.1w.2S=1v ab.3V(ab.2c(ab.1u.1w,{1x:"2S",2b:"3Z",5G:1k,3Y:17(af,ae,ad){1a ac=ae.5Y();13.x=ac.x;13.y=ac.y;13.3C=ae.3C;13.3E=ae.3E;13.2Y=ae.2Y;13.2u=ae.7x();13.41=af;13.4w(ae);13.2b=ad}}));ab.1u.1w.2S.1L={6f:17(){1a ad=ab.1u.1w.2S.1L.d0.2H(13);1a ac=ab.1u.1w.2S.1L.b3.2H(13);13.1C("7b",ab.1u.1w.2S.1L.bG,1);13.1C("6w",ab.1u.1w.2S.1L.b3,1);1p.1C("78",ad,1);1p.1C("6w",ac,1);13.2O("1t:2S:3k:1p:62",ad);13.2O("1t:2S:3k:1p:7T",ac)},2X:17(){13.1N("7b",ab.1u.1w.2S.1L.bG);13.1N("6w",ab.1u.1w.2S.1L.b3);aa(1p).1N("78",13.1R("1t:2S:3k:1p:62")||ab.$F);aa(1p).1N("6w",13.1R("1t:2S:3k:1p:7T")||ab.$F);13.2B("1t:2S:3k:1p:62");13.2B("1t:2S:3k:1p:7T")},bG:17(ad){1a ac;if(ad.7x()!==1){1b}ac=1v ab.1u.1w.2S(13,ad,"3Z");13.2O("1t:2S:3Z",ac)},b3:17(ad){1a ac;ac=13.1R("1t:2S:3Z");if(!ac){1b}if(ac.5G){ad.4W()}ac=1v ab.1u.1w.2S(13,ad,"aA");13.2B("1t:2S:3Z");13.36("2S",ac)},d0:17(ad){1a ac;ac=13.1R("1t:2S:3Z");if(!ac){1b}ad.4W();if(!ac.5G){ac.5G=1s;13.36("2S",ac)}ac=1v ab.1u.1w.2S(13,ad,"db");13.36("2S",ac)}}})(W);(17(ab){1a aa=ab.$;ab.1u.1w.4t=1v ab.3V(ab.2c(ab.1u.1w,{1x:"4t",7A:1k,7z:1h,3Y:17(ae,ad){1a ac=ad.5Y();13.x=ac.x;13.y=ac.y;13.3C=ad.3C;13.3E=ad.3E;13.2Y=ad.2Y;13.2u=ad.7x();13.41=ae;13.4w(ad)}}));ab.1u.1w.4t.1L={1y:{7V:8h},6f:17(ac){13.2O("1t:4t:1y",ab.2c(ab.3A(ab.1u.1w.4t.1L.1y),ac||{}));13.1C("1X",ab.1u.1w.4t.1L.3z,1)},2X:17(){13.1N("1X",ab.1u.1w.4t.1L.3z)},3z:17(ae){1a ad,ac;ad=13.1R("1t:4t:1t");ac=13.1R("1t:4t:1y");if(!ad){ad=1v ab.1u.1w.4t(13,ae);ad.7z=4K(17(){ad.7A=1s;ae.6W=ab.$1k;13.36("1X",ae);13.2B("1t:4t:1t")}.1D(13),ac.7V+10);13.2O("1t:4t:1t",ad);ae.4m()}1j{3w(ad.7z);13.2B("1t:4t:1t");if(!ad.7A){ad.4w(ae);ae.4m().2j();13.36("4t",ad)}1j{}}}}})(W);(17(ad){1a ac=ad.$;1a aa=10;1a ab=8h;ad.1u.1w.2a=1v ad.3V(ad.2c(ad.1u.1w,{1x:"2a",id:1h,3Y:17(af,ae){1a ag=ae.71();13.id=ag.4j||ag.6j;13.x=ag.3P;13.y=ag.3N;13.3P=ag.3P;13.3N=ag.3N;13.3C=ag.3C;13.3E=ag.3E;13.2Y=ae.2Y;13.2u=0;13.41=af;13.4w(ae)}}));ad.1u.1w.2a.1L={6f:17(ae){13.1C(["5t","5X"],ad.1u.1w.2a.1L.64,1);13.1C(["4a","4h"],ad.1u.1w.2a.1L.5h,1);13.1C("2I",ad.1u.1w.2a.1L.8o,1)},2X:17(){13.1N(["5t","5X"],ad.1u.1w.2a.1L.64);13.1N(["4a","4h"],ad.1u.1w.2a.1L.5h);13.1N("2I",ad.1u.1w.2a.1L.8o)},8o:17(ae){ae.4W()},64:17(ae){if(!ae.5q()){13.2B("1t:2a:1t");1b}13.2O("1t:2a:1t",1v ad.1u.1w.2a(13,ae));13.2O("1t:1X:bQ",1s)},5h:17(ah){1a af=ad.69();1a ag=13.1R("1t:2a:1t");1a ae=13.1R("1t:2a:1y");if(!ag||!ah.5q()){1b}13.2B("1t:2a:1t");if(ag.id===ah.9p()&&ah.2Y-ag.2Y<=ab&&1q.9F(1q.5s(ah.71().3P-ag.x,2)+1q.5s(ah.71().3N-ag.y,2))<=aa){13.2B("1t:1X:9C");ah.2j();ag.4w(ah);13.36("2a",ag)}}}}(W));Q.1u.1w.3B=1v Q.3V(Q.2c(Q.1u.1w,{1x:"3B",7A:1k,7z:1h,3Y:17(ab,aa){13.x=aa.x;13.y=aa.y;13.3C=aa.3C;13.3E=aa.3E;13.2Y=aa.2Y;13.2u=0;13.41=ab;13.4w(aa)}}));Q.1u.1w.3B.1L={1y:{7V:bD},6f:17(aa){13.2O("1t:3B:1y",Q.2c(Q.3A(Q.1u.1w.3B.1L.1y),aa||{}));13.1C("2a",Q.1u.1w.3B.1L.3z,1)},2X:17(){13.1N("2a",Q.1u.1w.3B.1L.3z)},3z:17(ac){1a ab,aa;ab=13.1R("1t:3B:1t");aa=13.1R("1t:3B:1y");if(!ab){ab=1v Q.1u.1w.3B(13,ac);ab.7z=4K(17(){ab.7A=1s;ac.6W=Q.$1k;13.36("2a",ac)}.1D(13),aa.7V+10);13.2O("1t:3B:1t",ab);ac.4m()}1j{3w(ab.7z);13.2B("1t:3B:1t");if(!ab.7A){ab.4w(ac);ac.4m().2j();13.36("3B",ab)}1j{}}}};(17(ac){1a ab=ac.$;1a aa=10;ac.1u.1w.2w=1v ac.3V(ac.2c(ac.1u.1w,{1x:"2w",2b:"3Z",id:1h,5G:1k,3Y:17(af,ae,ad){1a ag=ae.71();13.id=ag.4j||ag.6j;13.3C=ag.3C;13.3E=ag.3E;13.3P=ag.3P;13.3N=ag.3N;13.x=ag.3P;13.y=ag.3N;13.2Y=ae.2Y;13.2u=0;13.41=af;13.4w(ae);13.2b=ad}}));ac.1u.1w.2w.1L={6f:17(){1a ae=ac.1u.1w.2w.1L.6y.1D(13);1a ad=ac.1u.1w.2w.1L.5h.1D(13);13.1C(["5t","5X"],ac.1u.1w.2w.1L.64,1);13.1C(["4a","4h"],ac.1u.1w.2w.1L.5h,1);13.1C(["6P","4B"],ac.1u.1w.2w.1L.6y,1);13.2O("1t:2w:3k:1p:62",ae);13.2O("1t:2w:3k:1p:7T",ad);ab(1p).1C("4B",ae,1);ab(1p).1C("4h",ad,1)},2X:17(){13.1N(["5t","5X"],ac.1u.1w.2w.1L.64);13.1N(["4a","4h"],ac.1u.1w.2w.1L.5h);13.1N(["6P","4B"],ac.1u.1w.2w.1L.6y);ab(1p).1N("4B",13.1R("1t:2w:3k:1p:62")||ac.$F,1);ab(1p).1N("4h",13.1R("1t:2w:3k:1p:7T")||ac.$F,1);13.2B("1t:2w:3k:1p:62");13.2B("1t:2w:3k:1p:7T")},64:17(ae){1a ad;if(!ae.5q()){1b}ad=1v ac.1u.1w.2w(13,ae,"3Z");13.2O("1t:2w:3Z",ad)},5h:17(ae){1a ad;ad=13.1R("1t:2w:3Z");if(!ad||!ad.5G||ad.id!==ae.9p()){1b}ad=1v ac.1u.1w.2w(13,ae,"aA");13.2B("1t:2w:3Z");13.36("2w",ad)},6y:17(ae){1a ad;ad=13.1R("1t:2w:3Z");if(!ad||!ae.5q()){1b}if(ad.id!==ae.9p()){13.2B("1t:2w:3Z");1b}if(!ad.5G&&1q.9F(1q.5s(ae.71().3P-ad.x,2)+1q.5s(ae.71().3N-ad.y,2))>aa){ad.5G=1s;13.36("2w",ad)}if(!ad.5G){1b}ad=1v ac.1u.1w.2w(13,ae,"db");13.36("2w",ad)}}}(W));(17(ad){1a ah=ad.$;1a ae=1h;17 aa(aq,ap){1a ao=ap.x-aq.x;1a ar=ap.y-aq.y;1b 1q.9F(ao*ao+ar*ar)}17 aj(av,aw){1a au=51.2t.7D.2g(av);1a at=1q.3c(au[1].3P-au[0].3P);1a aq=1q.3c(au[1].3N-au[0].3N);1a ar=1q.2f(au[1].3P,au[0].3P)+at/2;1a ap=1q.2f(au[1].3N,au[0].3N)+aq/2;1a ao=0;aw.6t=[au[0],au[1]];ao=1q.5s(aa({x:au[0].3P,y:au[0].3N},{x:au[1].3P,y:au[1].3N}),2);aw.6v={x:ar,y:ap};aw.x=aw.6v.x;aw.y=aw.6v.y;1b ao}17 am(ao){1b ao/ae}17 ab(aq,ap){1a ao;if(aq.6U&&aq.4X){if(aq.6U){ao=aq.6U}1j{ao=aq.4X}ao=51.2t.7D.2g(ao)}1j{ao=[];if(ap){ap.az(17(ar){ao.33(ar)})}}1b ao}17 ac(ar,aq,ap){1a ao=1k;if(ar.4j&&ar.2r==="3v"&&(!ap||aq.3u(ar.4j))){aq.7k(ar.4j,ar);ao=1s}1b ao}17 ai(ap,ao){if(ap.4j&&ap.2r==="3v"&&ao&&ao.3u(ap.4j)){ao["4S"](ap.4j)}}17 al(ap){1a ao;if(ap.4j&&ap.2r==="3v"){ao=ap.4j}1j{ao=ap.6j}1b ao}17 ag(ar,ap){1a aq;1a at;1a ao=1k;1U(aq=0;aq<ar.1I;aq++){if(ap.1I===2){1J}1j{at=al(ar[aq]);if(!ap.4o(at)){ap.33(at);ao=1s}}}1b ao}17 ak(ap){1a ao=ah([]);ap.az(17(aq){ao.33(al(aq))});1b ao}17 an(at,ap){1a aq;1a ar;1a ao=1k;if(ap){ar=ak(at);1U(aq=0;aq<ap.1I;aq++){if(!ar.4o(ap[aq])){ap.8V(aq,1);ao=1s;1J}}}1b ao}17 af(ar,ap){1a aq;1a ao=ah([]);1U(aq=0;aq<ar.1I;aq++){if(ap.4o(al(ar[aq]))){ao.33(ar[aq]);if(ao.1I===2){1J}}}1b ao}ad.1u.1w.1O=1v ad.3V(ad.2c(ad.1u.1w,{1x:"1O",2b:"66",3Y:17(aq,ap,ao,ar){13.41=aq;13.2b=ao;13.x=ar.x;13.y=ar.y;13.2Y=ap.2Y;13.3Q=ar.3Q;13.5I=ar.5I;13.1l=ar.1l;13.2b=ao;13.6v=ar.6v;13.6t=ar.6t;13.4w(ap)}}));ad.1u.1w.1O.1L={5T:{x:0,y:0,5I:0,3Q:1,1l:0,bT:0,gJ:1,a4:1k,5G:1k,6t:[],6v:{x:0,y:0}},6f:17(aq){if(!ae){ae=(17(){1a ar=ah(1n).1F();ar.1e=1q.2f(ar.1e,ar.1g);ar.1g=ar.1e;1b 1q.5s(aa({x:0,y:0},{x:ar.1e,y:ar.1g}),2)})()}1a ap=ad.1u.1w.1O.1L.6y.1D(13);1a ao=ad.1u.1w.1O.1L.5h.1D(13);13.1C(["2I","2a"],ad.1u.1w.1O.1L.8o,1);13.1C(["5t","5X"],ad.1u.1w.1O.1L.64,1);13.1C(["4a","4h"],ad.1u.1w.1O.1L.5h,1);13.1C(["6P","4B"],ad.1u.1w.1O.1L.6y,1);13.2O("1t:1O:3k:6P",ap);13.2O("1t:1O:3k:4a",ao);ad.7C.1C("4B",ap,1);ad.7C.1C("4h",ao,1)},2X:17(){13.1N(["2I","2a"],ad.1u.1w.1O.1L.8o);13.1N(["5t","5X"],ad.1u.1w.1O.1L.64);13.1N(["4a","4h"],ad.1u.1w.1O.1L.5h);13.1N(["6P","4B"],ad.1u.1w.1O.1L.6y);ad.7C.1N("4B",13.1R("1t:1O:3k:6P"));ad.7C.1N("4h",13.1R("1t:1O:3k:4a"));13.2B("1t:1O:3k:6P");13.2B("1t:1O:3k:4a");13.2B("1t:1O:66");13.2B("1t:1O:5T");13.2B("1t:1O:7N");1a ao=13.1R("1t:1O:75");if(ao){ao.dD()}13.2B("1t:1O:75")},8o:17(ao){ao.2j()},aR:17(ap,aq){1a ao=aq.5I;if(ap.1I>1){aq.5I=aj(ap,aq);if(!aq.bT){aq.bT=aq.5I}if(ao>aq.5I){aq.1l=-1}1j{if(ao<aq.5I){aq.1l=1}1j{aq.1l=0}}aq.3Q=am(aq.5I)}1j{aq.6t=51.2t.7D.2g(ap,0,2)}},6y:17(aq){1a ap;1a ao=13.1R("1t:1O:75");1a at=13.1R("1t:1O:5T")||ad.2c({},ad.1u.1w.1O.1L.5T);1a ar=13.1R("1t:1O:7N");if(at.a4){if(aq.4j&&!ac(aq,ao,1s)){1b}aq.2j();ad.1u.1w.1O.1L.aR(af(ab(aq,ao),ar),at);ap=1v ad.1u.1w.1O(13,aq,"eW",at);13.36("1O",ap)}},64:17(ar){1a ap;1a au;1a aq;1a ao=13.1R("1t:1O:75");1a at=13.1R("1t:1O:7N");if(ar.2r==="f4"){1b}if(!at){at=ah([]);13.2O("1t:1O:7N",at)}if(!at.1I){ah(ar.41).1C(["4a","4h"],13.1R("1t:1O:3k:4a"),1)}if(!ao){ao=1v gW();13.2O("1t:1O:75",ao)}ac(ar,ao);aq=ab(ar,ao);ag(aq,at);if(aq.1I===2){ap=13.1R("1t:1O:66");au=13.1R("1t:1O:5T")||ad.2c({},ad.1u.1w.1O.1L.5T);ad.1u.1w.1O.1L.aR(af(aq,at),au);if(!ap){ap=1v ad.1u.1w.1O(13,ar,"66",au);13.2O("1t:1O:66",ap);13.2O("1t:1O:5T",au);ae=au.5I;13.36("1O",ap);au.a4=1s}}},5h:17(au){1a at;1a ar;1a aw;1a ap;1a aq=13.1R("1t:1O:75");1a av;1a ao;if(au.2r==="f4"||au.4j&&(!aq||!aq.3u(au.4j))){1b}ar=13.1R("1t:1O:66");aw=13.1R("1t:1O:5T");av=13.1R("1t:1O:7N");at=ab(au,aq);ai(au,aq);ao=an(at,av);if(!ar||!aw||!aw.a4||!ao||!av){1b}if(ao){ag(at,av)}ap="f0";if(at.1I>1){ap="eY"}1j{au.41.1N(["4a","4h"],13.1R("1t:1O:3k:4a"));if(aq){aq.dD()}13.2B("1t:1O:66");13.2B("1t:1O:5T");13.2B("1t:1O:75");13.2B("1t:1O:7N")}ad.1u.1w.1O.1L.aR(af(at,av),aw);ar=1v ad.1u.1w.1O(13,au,ap,aw);13.36("1O",ar)}}}(W));(17(af){1a ad=af.$;af.1u.1w.4T=1v af.3V(af.2c(af.1u.1w,{1x:"4T",3Y:17(al,ak,an,ah,ag,am,ai){1a aj=ak.5Y();13.x=aj.x;13.y=aj.y;13.2Y=ak.2Y;13.41=al;13.m1=an||0;13.cP=ah||0;13.8s=ag||0;13.lE=am||0;13.l3=ai||0;13.bN=ak.bN||0;13.cK=1k;13.4w(ak)}}));1a ae,ab;17 aa(){ae=1h}17 ac(ag,ah){1b(ag>50)||(1===ah&&!("b0"==af.1f.4F&&ag<1))||(0===ag%12)||(0==ag%4.l1)}af.1u.1w.4T.1L={9V:"kX"in 1p||af.1f.2L>8?"lf":"ls",6f:17(){13.1C(af.1u.1w.4T.1L.9V,af.1u.1w.4T.1L.3z,1)},2X:17(){13.1N(af.1u.1w.4T.1L.9V,af.1u.1w.4T.1L.3z,1)},3z:17(al){1a am=0,aj=0,ah=0,ag=0,ak,ai;if(al.d8){ah=al.d8*-1}if(al.dk!==2Q){ah=al.dk}if(al.ei!==2Q){ah=al.ei}if(al.dd!==2Q){aj=al.dd*-1}if(al.8s){ah=-1*al.8s}if(al.cP){aj=al.cP}if(0===ah&&0===aj){1b}am=0===ah?aj:ah;ag=1q.2e(1q.3c(ah),1q.3c(aj));if(!ae||ag<ae){ae=ag}ak=am>0?"4P":"4i";am=1q[ak](am/ae);aj=1q[ak](aj/ae);ah=1q[ak](ah/ae);if(ab){3w(ab)}ab=4K(aa,8h);ai=1v af.1u.1w.4T(13,al,am,aj,ah,0,ae);ai.cK=ac(ae,al.bN||0);13.36("4T",ai)}}})(W);Q.b0=Q.$(1n);Q.7C=Q.$(1p);1b W})();(17(M){if(!M){6l"7o 6h 7q"}1a L=M.$;1a K=1n.lu||1n.lb||1h;B.bj=1v M.3V({1Z:1h,2q:1k,1y:{a6:M.$F,6I:M.$F,c1:M.$F,6r:M.$F,7O:M.$F,cW:M.$F,aC:1k,df:1s},1A:1h,91:1h,bx:0,8c:{a6:17(N){if(N.41&&(8h===N.41.aE||ec===N.41.aE)&&N.lF){13.1y.a6.1D(1h,(N.2h-(13.1y.df?13.bx:0))/N.lj).2G(1);13.bx=N.2h}},6I:17(N){if(N){L(N).2j()}13.8R();if(13.2q){1b}13.2q=1s;13.8Y();!13.1y.aC&&13.1y.a6.1D(1h,1).2G(1);13.1y.6I.1D(1h,13).2G(1);13.1y.7O.1D(1h,13).2G(1)},c1:17(N){if(N){L(N).2j()}13.8R();13.2q=1k;13.8Y();13.1y.c1.1D(1h,13).2G(1);13.1y.7O.1D(1h,13).2G(1)},6r:17(N){if(N){L(N).2j()}13.8R();13.2q=1k;13.8Y();13.1y.6r.1D(1h,13).2G(1);13.1y.7O.1D(1h,13).2G(1)}},aL:17(){L(["5D","cN","e1"]).3e(17(N){13.1Z.1C(N,13.8c["9i"+N].2H(13).e0(1))},13)},8R:17(){if(13.91){3d{3w(13.91)}3p(N){}13.91=1h}L(["5D","cN","e1"]).3e(17(O){13.1Z.1N(O)},13)},8Y:17(){13.1F();if(13.1Z.1R("1v")){1a N=13.1Z.49;13.1Z.2X().2B("1v").1z({2n:"lk",1H:"2z"});N.5m()}},dp:17(O){1a P=1v 9Q(),N;L(["cN","ll"]).3e(17(Q){P["9i"+Q]=L(17(R){13.8c["9i"+Q].2g(13,R)}).1D(13)},13);P.6r=L(17(){13.1y.cW.1D(1h,13).2G(1);13.1y.aC=1k;13.aL();13.1Z.24=O}).1D(13);P.6I=L(17(){if(8h!==P.aE&&ec!==P.aE){13.8c.6r.2g(13);1b}N=P.lm;13.aL();if(K&&!M.1f.5n&&!("8e"===M.1f.4F&&M.1f.4C<ln)){13.1Z.3b("24",K.lo(N))}1j{13.1Z.24=O}}).1D(13);P.93("lp",O);P.lq="lh";P.lr()},3Y:17(O,N){13.1y=M.2c(13.1y,N);13.1Z=L(O)||M.$1v("1Z").1z({5y:"38",6n:"38"}).29(M.$1v("2Z").1B("2W-7j-1Z").1z({2n:"5S",1H:-eO,1e:10,1g:10,8g:"3t"}).29(1p.3l)).2O("1v",1s);if(N.dg){13.1Z.3b("lv",N.dg)}if(M.1f.2N.di&&13.1y.aC&&M.1V(O)==="1S"){13.dp(O);1b}1a P=17(){if(13.eb()){13.8c.6I.2g(13)}1j{13.8c.6r.2g(13)}P=1h}.1D(13);13.aL();if("1S"==M.1V(O)){13.1Z.24=O}1j{if(M.1f.5n&&5==M.1f.4C&&M.1f.2L<9){13.1Z.e5=17(){if(/2h|8U/.3j(13.1Z.9h)){13.1Z.e5=1h;P&&P()}}.1D(13)}13.1Z.24=O.2o("24")}13.1Z&&13.1Z.8U&&P&&(13.91=P.2G(2P))},lw:17(){13.8R();13.8Y();13.2q=1k;1b 13},eb:17(){1a N=13.1Z;1b(N.9N)?(N.9N>0):(N.9h)?("8U"==N.9h):N.1e>0},1F:17(){1b 13.1A||(13.1A={1e:13.1Z.9N||13.1Z.1e,1g:13.1Z.d4||13.1Z.1g})}})})(B);(17(L){if(!L){6l"7o 6h 7q"}if(L.6o){1b}1a K=L.$;L.6o=1v L.3V({3Y:17(N,M){1a O;13.el=L.$(N);13.1y=L.2c(13.1y,M);13.5R=1k;13.7Y=13.cQ;O=L.6o.8K[13.1y.26]||13.1y.26;if("17"===L.1V(O)){13.7Y=O}1j{13.5U=13.8Q(O)||13.8Q("6x")}if("1S"==L.1V(13.1y.7R)){13.1y.7R="lx"===13.1y.7R?6m:6k(13.1y.7R)||1}},1y:{dE:60,5C:9z,26:"6x",7R:1,5r:"ly",dz:L.$F,87:L.$F,cq:L.$F,dO:L.$F,aD:1k,lz:1k},4D:1h,5U:1h,7Y:1h,lB:17(M){13.1y.26=M;M=L.6o.8K[13.1y.26]||13.1y.26;if("17"===L.1V(M)){13.7Y=M}1j{13.7Y=13.cQ;13.5U=13.8Q(M)||13.8Q("6x")}},4O:17(O){1a M=/\\%$/,N;13.4D=O||{};13.br=0;13.2b=0;13.lC=0;13.9S={};13.7G="7G"===13.1y.5r||"7G-56"===13.1y.5r;13.7H="7H"===13.1y.5r||"7H-56"===13.1y.5r;1U(N in 13.4D){M.3j(13.4D[N][0])&&(13.9S[N]=1s);if("56"===13.1y.5r||"7G-56"===13.1y.5r||"7H-56"===13.1y.5r){13.4D[N].56()}}13.bh=L.69();13.dG=13.bh+13.1y.5C;13.1y.dz.2g();if(0===13.1y.5C){13.7f(1);13.1y.87.2g()}1j{13.aJ=13.dt.1D(13);if(!13.1y.aD&&L.1f.2N.5p){13.5R=L.1f.5p.2g(1n,13.aJ)}1j{13.5R=13.aJ.dA(1q.5H(bc/13.1y.dE))}}1b 13},bm:17(){if(13.5R){if(!13.1y.aD&&L.1f.2N.5p&&L.1f.aN){L.1f.aN.2g(1n,13.5R)}1j{fi(13.5R)}13.5R=1k}},2j:17(M){M=L.3F(M)?M:1k;13.bm();if(M){13.7f(1);13.1y.87.2G(10)}1b 13},b5:17(O,N,M){O=2A(O);N=2A(N);1b(N-O)*M+O},dt:17(){1a N=L.69(),M=(N-13.bh)/13.1y.5C,O=1q.4P(M);if(N>=13.dG&&O>=13.1y.7R){13.bm();13.7f(1);13.1y.87.2G(10);1b 13}if(13.7G&&13.br<O){1U(1a P in 13.4D){13.4D[P].56()}}13.br=O;if(!13.1y.aD&&L.1f.2N.5p){13.5R=L.1f.5p.2g(1n,13.aJ)}13.7f((13.7H?O:0)+13.7Y(M%1))},7f:17(M){1a N={},P=M;1U(1a O in 13.4D){if("2y"===O){N[O]=1q.5H(13.b5(13.4D[O][0],13.4D[O][1],M)*2P)/2P}1j{N[O]=13.b5(13.4D[O][0],13.4D[O][1],M);13.9S[O]&&(N[O]+="%")}}13.1y.cq(N,13.el);13.7k(N);13.1y.dO(N,13.el)},7k:17(M){1b 13.el.1z(M)},8Q:17(M){1a N,O=1h;if("1S"!==L.1V(M)){1b 1h}4E(M){1E"9E":O=K([0,0,1,1]);1J;1E"6x":O=K([0.25,0.1,0.25,1]);1J;1E"6x-in":O=K([0.42,0,1,1]);1J;1E"6x-dP":O=K([0,0,0.58,1]);1J;1E"6x-in-dP":O=K([0.42,0,0.58,1]);1J;1E"dj":O=K([0.47,0,0.l5,0.le]);1J;1E"cU":O=K([0.39,0.kW,0.kU,1]);1J;1E"kY":O=K([0.kZ,0.cz,0.55,0.95]);1J;1E"dW":O=K([0.55,0.l0,0.68,0.53]);1J;1E"dZ":O=K([0.25,0.46,0.45,0.94]);1J;1E"kV":O=K([0.l4,0.du,0.l6,0.l7]);1J;1E"e3":O=K([0.55,0.l8,0.l9,0.19]);1J;1E"dr":O=K([0.la,0.61,0.dF,1]);1J;1E"lc":O=K([0.ld,0.bt,0.dF,1]);1J;1E"lD":O=K([0.en,0.du,0.eo,0.22]);1J;1E"lg":O=K([0.d9,0.84,0.44,1]);1J;1E"m2":O=K([0.77,0,0.a1,1]);1J;1E"m6":O=K([0.m4,0.cz,0.m5,0.m0]);1J;1E"m7":O=K([0.23,1,0.32,1]);1J;1E"lZ":O=K([0.86,0,0.lP,1]);1J;1E"cV":O=K([0.95,0.cz,0.lY,0.lH]);1J;1E"de":O=K([0.19,1,0.22,1]);1J;1E"lJ":O=K([1,0,0,1]);1J;1E"lK":O=K([0.6,0.lL,0.98,0.lM]);1J;1E"lN":O=K([0.lG,0.82,0.d9,1]);1J;1E"lQ":O=K([0.lR,0.lS,0.15,0.86]);1J;1E"e6":O=K([0.6,-0.28,0.ek,0.bt]);1J;1E"e9":O=K([0.a1,0.cy,0.32,1.lT]);1J;1E"lU":O=K([0.68,-0.55,0.lW,1.55]);1J;1T:M=M.4v(/\\s/g,"");if(M.3L(/^6d-6e\\((?:-?[0-9\\.]{0,}[0-9]{1,},){3}(?:-?[0-9\\.]{0,}[0-9]{1,})\\)$/)){O=M.4v(/^6d-6e\\s*\\(|\\)$/g,"").92(",");1U(N=O.1I-1;N>=0;N--){O[N]=2A(O[N])}}}1b K(O)},cQ:17(Y){1a M=0,X=0,U=0,Z=0,W=0,S=0,T=13.1y.5C;17 R(aa){1b((M*aa+X)*aa+U)*aa}17 Q(aa){1b((Z*aa+W)*aa+S)*aa}17 O(aa){1b(3*M*aa+2*X)*aa+U}17 V(aa){1b 1/(8h*aa)}17 N(aa,ab){1b Q(P(aa,ab))}17 P(ah,ai){1a ag,af,ae,ab,aa,ad;17 ac(aj){if(aj>=0){1b aj}1j{1b 0-aj}}1U(ae=ah,ad=0;ad<8;ad++){ab=R(ae)-ah;if(ac(ab)<ai){1b ae}aa=O(ae);if(ac(aa)<0.bp){1J}ae=ae-ab/aa}ag=0;af=1;ae=ah;if(ae<ag){1b ag}if(ae>af){1b af}5v(ag<af){ab=R(ae);if(ac(ab-ah)<ai){1b ae}if(ah>ab){ag=ae}1j{af=ae}ae=(af-ag)*0.5+ag}1b ae}U=3*13.5U[0];X=3*(13.5U[2]-13.5U[0])-U;M=1-U-X;S=3*13.5U[1];W=3*(13.5U[3]-13.5U[1])-S;Z=1-S-W;1b N(Y,V(T))}});L.6o.8K={9E:"9E",k5:"dj",kS:"cU",jI:"cV",jJ:"de",jK:"dW",jL:"dZ",jM:"e3",jN:"dr",jO:"e6",jP:"e9",ed:17(N,M){M=M||[];1b 1q.5s(2,10*--N)*1q.dc(20*N*1q.dl*(M[0]||1)/3)},jQ:17(N,M){1b 1-L.6o.8K.ed(1-N,M)},eh:17(O){1U(1a N=0,M=1;1;N+=M,M/=2){if(O>=(7-4*N)/11){1b M*M-1q.5s((11-6*N-11*O)/4,2)}}},jR:17(M){1b 1-L.6o.8K.eh(1-M)},38:17(M){1b 0}}})(B);(17(L){if(!L){6l"7o 6h 7q"}if(L.ay){1b}1a K=L.$;L.ay=1v L.3V(L.6o,{3Y:17(M,N){13.cG=M;13.1y=L.2c(13.1y,N);13.5R=1k;13.$40.3Y()},4O:17(Q){1a M=/\\%$/,P,O,N=Q.1I;13.cD=Q;13.a2=1v 51(N);1U(O=0;O<N;O++){13.a2[O]={};1U(P in Q[O]){M.3j(Q[O][P][0])&&(13.a2[O][P]=1s);if("56"===13.1y.5r||"7G-56"===13.1y.5r||"7H-56"===13.1y.5r){13.cD[O][P].56()}}}13.$40.4O({});1b 13},7f:17(M){1U(1a N=0;N<13.cG.1I;N++){13.el=L.$(13.cG[N]);13.4D=13.cD[N];13.9S=13.a2[N];13.$40.7f(M)}}})})(B);(17(L){if(!L){6l"7o 6h 7q";1b}if(L.cR){1b}1a K=L.$;L.cR=17(N,O){1a M=13.83=L.$1v("2Z",1h,{2n:"5S","z-8z":dV}).1B("jT");L.$(N).1C("8m",17(){M.29(1p.3l)});L.$(N).1C("8C",17(){M.2X()});L.$(N).1C("78",17(T){1a V=20,S=L.$(T).5Y(),R=M.1F(),Q=L.$(1n).1F(),U=L.$(1n).7d();17 P(Y,W,X){1b(X<(Y-W)/2)?X:((X>(Y+W)/2)?(X-W):(Y-W)/2)}M.1z({1P:U.x+P(Q.1e,R.1e+2*V,S.x-U.x)+V,1H:U.y+P(Q.1g,R.1g+2*V,S.y-U.y)+V})});13.aX(O)};L.cR.2t.aX=17(M){13.83.4x&&13.83.c6(13.83.4x);13.83.3f(1p.9D(M))}})(B);(17(L){if(!L){6l"7o 6h 7q";1b}if(L.jU){1b}1a K=L.$;L.9G=17(P,O,N,M){13.9u=1h;13.5u=L.$1v("cf",1h,{2n:"5S","z-8z":dV,4Z:"3t",2y:0.8}).1B(M||"").29(N||1p.3l);13.dQ(P);13.5A(O)};L.9G.2t.5A=17(M){13.5u.5A();13.9u=13.4c.1D(13).2G(L.bn(M,jV))};L.9G.2t.4c=17(M){3w(13.9u);13.9u=1h;if(13.5u&&!13.bo){13.bo=1v B.6o(13.5u,{5C:L.bn(M,cn),87:17(){13.5u.5m();4S 13.5u;13.bo=1h}.1D(13)}).4O({2y:[13.5u.3D("2y"),0]})}};L.9G.2t.dQ=17(M){13.5u.4x&&13.83.c6(13.5u.4x);13.5u.3f(1p.9D(M))}})(B);(17(L){if(!L){6l"7o 6h 7q"}if(L.7X){1b}1a O=L.$,K=1h,S={"3g":1,4H:2,5Z:3,"17":4,1S:2P},M={"3g":17(V,U,T){if("3g"!=L.1V(U)){if(T||"1S"!=L.1V(U)){1b 1k}1j{if(!/^(1s|1k)$/.3j(U)){1b 1k}1j{U=U.dL()}}}if(V.4g("2E")&&!O(V["2E"]).4o(U)){1b 1k}K=U;1b 1s},1S:17(V,U,T){if("1S"!==L.1V(U)){1b 1k}1j{if(V.4g("2E")&&!O(V["2E"]).4o(U)){1b 1k}1j{K=""+U;1b 1s}}},5Z:17(W,V,U){1a T=1k,Y=/%$/,X=(L.1V(V)=="1S"&&Y.3j(V));if(U&&!"5Z"==7S V){1b 1k}V=2A(V);if(a7(V)){1b 1k}if(a7(W.8a)){W.8a=dJ.jW}if(a7(W.bi)){W.bi=dJ.kT}if(W.4g("2E")&&!O(W["2E"]).4o(V)){1b 1k}if(W.8a>V||V>W.bi){1b 1k}K=X?(V+"%"):V;1b 1s},4H:17(W,U,T){if("1S"===L.1V(U)){3d{U=1n.jY.jZ(U)}3p(V){1b 1k}}if(L.1V(U)==="4H"){K=U;1b 1s}1j{1b 1k}},"17":17(V,U,T){if(L.1V(U)==="17"){K=U;1b 1s}1j{1b 1k}}},N=17(Y,X,U){1a W;W=Y.4g("3i")?Y.3i:[Y];if("4H"!=L.1V(W)){1b 1k}1U(1a V=0,T=W.1I-1;V<=T;V++){if(M[W[V].1x](W[V],X,U)){1b 1s}}1b 1k},Q=17(Y){1a W,V,X,T,U;if(Y.4g("3i")){T=Y.3i.1I;1U(W=0;W<T;W++){1U(V=W+1;V<T;V++){if(S[Y.3i[W]["1x"]]>S[Y.3i[V].1x]){U=Y.3i[W];Y.3i[W]=Y.3i[V];Y.3i[V]=U}}}}1b Y},R=17(W){1a V;V=W.4g("3i")?W.3i:[W];if("4H"!=L.1V(V)){1b 1k}1U(1a U=V.1I-1;U>=0;U--){if(!V[U].1x||!S.4g(V[U].1x)){1b 1k}if(L.3F(V[U]["2E"])){if("4H"!==L.1V(V[U]["2E"])){1b 1k}1U(1a T=V[U]["2E"].1I-1;T>=0;T--){if(!M[V[U].1x]({1x:V[U].1x},V[U]["2E"][T],1s)){1b 1k}}}}if(W.4g("1T")&&!N(W,W["1T"],1s)){1b 1k}1b 1s},P=17(T){13.4Y={};13.1y={};13.dH(T)};L.2c(P.2t,{dH:17(V){1a U,T,W;1U(U in V){if(!V.4g(U)){9k}T=(U+"").5g().6i();if(!13.4Y.4g(T)){13.4Y[T]=Q(V[U]);if(!R(13.4Y[T])){6l"k0 k1 k2 jS \'"+U+"\' jF in "+V}13.1y[T]=2Q}}},7k:17(U,T){U=(U+"").5g().6i();if(L.1V(T)=="1S"){T=T.5g()}if(13.4Y.4g(U)){K=T;if(N(13.4Y[U],T)){13.1y[U]=K}K=1h}},gk:17(T){T=(T+"").5g().6i();if(13.4Y.4g(T)){1b L.3F(13.1y[T])?13.1y[T]:13.4Y[T]["1T"]}},8Z:17(U){1U(1a T in U){13.7k(T,U[T])}},gc:17(){1a U=L.2c({},13.1y);1U(1a T in U){if(2Q===U[T]&&2Q!==13.4Y[T]["1T"]){U[T]=13.4Y[T]["1T"]}}1b U},9I:17(T){O(T.92(";")).3e(O(17(U){U=U.92(":");13.7k(U.7w().5g(),U.7n(":"))}).1D(13))},a3:17(T){T=(T+"").5g().6i();1b 13.4Y.4g(T)},jt:17(T){T=(T+"").5g().6i();1b 13.a3(T)&&L.3F(13.1y[T])},2X:17(T){T=(T+"").5g().6i();if(13.a3(T)){4S 13.1y[T];4S 13.4Y[T]}}});L.7X=P})(B);(17(O){if(!O){6l"7o 6h 7q";1b}1a N=O.$;if(O.9P){1b}1a M="bW://bY.bZ.c2/jE/8j",L="bW://bY.bZ.c2/jj/jk";1a K=17(P){13.7s={};13.8b=N(P);13.6g=N(1p.9y(M,"8j"));13.6g.3b("1e",13.8b.9N||13.8b.1e);13.6g.3b("1g",13.8b.d4||13.8b.1g);13.1i=N(1p.9y(M,"1i"));13.1i.jl(L,"7h",13.8b.2o("24"));13.1i.3b("1e","2P%");13.1i.3b("1g","2P%");13.1i.29(13.6g)};K.2t.7l=17(){1b 13.6g};K.2t.5J=17(P){if(1q.5H(P)<1){1b}if(!13.7s.5J){13.7s.5J=N(1p.9y(M,"3a"));13.7s.5J.3b("id","d3");13.7s.5J.bF(N(1p.9y(M,"jm")).8I({"in":"jn",d1:P}));13.7s.5J.29(13.6g);13.1i.3b("3a","1Y(#d3)")}1j{13.7s.5J.4x.3b("d1",P)}1b 13};O.9P=K}(B));1a E=(17(M){1a L=M.$;1a K=17(O,N){13.3y={9a:"2W",3M:"9d",2n:"2K",1A:{jo:"2D",1e:"2z",1g:"2z"},jp:["1g","1e"]};13.40=O;13.5c=1h;13.7p=1h;13.2V=1h;13.2v={};13.dm=[];13.6A=1h;13.by=1h;13.5P=1h;13.3y=M.2c(13.3y,N);13.3x=13.3y.9a+"-c8";13.9b=13.3y.9a+"-79";13.dn()};K.2t={dn:17(){13.5c=M.$1v("2Z").1B(13.3x).1B(13.3x+"-"+13.3y.3M).1z({4Z:"3t"});13.7p=M.$1v("2Z").1B(13.3x+"-7p").29(13.5c);13.5c.29(13.40);L(["4p","4r"]).3e(17(N){13.2v[N]=M.$1v("2u").1B(13.3x+"-2u").1B(13.3x+"-2u-"+N).29(13.5c).1C("1X 2a",(17(P,O){L(P).6Z[0].2j().4m();L(P).5w();13.6R(O)}).2H(13,N))}.1D(13));13.2v.4p.1B(13.3x+"-2u-4b");13.2V=M.$1v("jq").1C("1X 2a",17(N){N.2j()})},fk:17(O){1a N=M.$1v("li").1B(13.9b).3f(O).29(13.2V);1v M.bj(O,{7O:13.9J.1D(13)});13.dm.33(N);1b N},fo:17(O){1a N=13.6A||13.2V.aI(13.9b+"-7e")[0];if(N){L(N).1Q(13.9b+"-7e")}13.6A=L(O);if(!13.6A){1b}13.6A.1B(13.9b+"-7e");13.6R(13.6A)},bO:17(){if(13.7p!==13.2V.49){L(13.2V).29(13.7p);13.dq();L(1n).1C("7u",13.5P=13.9J.1D(13));13.bO.1D(13).2G(1);1b}1a N=13.40.1F();if(N.1g>0&&N.1g>N.1e){13.9f("5f")}1j{13.9f("9d")}13.9J();13.5c.1z({4Z:""})},2j:17(){if(13.5P){L(1n).1N("7u",13.5P)}13.5c.5m()},6R:17(aa,Q){1a S={x:0,y:0},ad="5f"==13.3y.3M?"1H":"1P",V="5f"==13.3y.3M?"1g":"1e",R="5f"==13.3y.3M?"y":"x",Z=13.2V.49.1F()[V],W=13.2V.49.9c(),P=13.2V.1F()[V],Y,N,ac,T,O,X,U,ab=[];if(13.by){13.by.2j()}1j{13.2V.1z("26",M.1f.7L+6E.7Z(32)+"9U")}if(2Q===Q){Q=9z}Y=13.2V.9c();if("1S"==M.1V(aa)){S[R]=("4r"==aa)?1q.2e(Y[ad]-W[ad]-Z,Z-P):1q.2f(Y[ad]-W[ad]+Z,0)}1j{if("6S"==M.1V(aa)){N=aa.1F();ac=aa.9c();S[R]=1q.2f(0,1q.2e(Z-P,Y[ad]+Z/2-ac[ad]-N[V]/2))}1j{1b}}if(M.1f.76&&"89"==M.1f.4F||M.1f.2L&&M.1f.2L<10){if("1S"==M.1V(aa)&&S[R]==Y[ad]-W[ad]){Y[ad]+=0===Y[ad]-W[ad]?30:-30}S["8A-"+ad]=[((P<=Z)?0:(Y[ad]-W[ad])),S[R]];4S S.x;4S S.y;if(!13.bA){13.bA=1v M.ay([13.2V],{5C:cn})}ab.33(S);13.bA.4O(ab);U=S["8A-"+ad][1]}1j{13.2V.1z({26:M.1f.7L+6E.7Z(32)+Q+"6V 6x",2p:"4N("+S.x+"2D, "+S.y+"2D, 0)"});U=S[R]}if(U>=0){13.2v.4p.1B(13.3x+"-2u-4b");13.2v.4p.4b=1s}1j{13.2v.4p.1Q(13.3x+"-2u-4b");13.2v.4p.4b=1k}if(U<=Z-P){13.2v.4r.1B(13.3x+"-2u-4b");13.2v.4r.4b=1s}1j{13.2v.4r.1Q(13.3x+"-2u-4b");13.2v.4r.4b=1k}U=1h},dq:17(){1a P,O,Q,X,W,Z,R,V,U,Y,ae,ab,ac,aa={x:0,y:0},N,T,S=bD,ad=17(ah){1a ag,af=0;1U(ag=1.5;ag<=90;ag+=1.5){af+=(ah*1q.dc(ag/1q.dl/2))}(X<0)&&(af*=(-1));1b af};W=L(17(af){aa={x:0,y:0};N="5f"==13.3y.3M?"1H":"1P";T="5f"==13.3y.3M?"1g":"1e";P="5f"==13.3y.3M?"y":"x";ab=13.2V.49.1F()[T];ae=13.2V.1F()[T];Q=ab-ae;if(Q>=0){1b}if(af.2b=="3Z"){if(2Q===ac){ac=0}13.2V.3R("26",M.1f.7L+6E.7Z(32)+"fr");Z=af[P];U=af.y;V=af.x;Y=1k}1j{if("aA"==af.2b){if(Y){1b}R=ad(1q.3c(X));ac+=R;(ac<=Q)&&(ac=Q);(ac>=0)&&(ac=0);aa[P]=ac;13.2V.3R("26",M.1f.7L+6E.7Z(32)+S+"6V  6d-6e(.0, .0, .0, 1)");13.2V.3R("2p","4N("+aa.x+"2D, "+aa.y+"2D, 6B)");X=0}1j{if(Y){1b}if("9d"==13.3y.3M&&1q.3c(af.x-V)>1q.3c(af.y-U)||"5f"==13.3y.3M&&1q.3c(af.x-V)<1q.3c(af.y-U)){af.2j();X=af[P]-Z;ac+=X;aa[P]=ac;13.2V.3R("2p","4N("+aa.x+"2D, "+aa.y+"2D, 6B)");if(ac>=0){13.2v.4p.1B(13.3x+"-2u-4b")}1j{13.2v.4p.1Q(13.3x+"-2u-4b")}if(ac<=Q){13.2v.4r.1B(13.3x+"-2u-4b")}1j{13.2v.4r.1Q(13.3x+"-2u-4b")}}1j{Y=1s}}Z=af[P]}}).1D(13);13.2V.1C("2w",W)},9J:17(){1a Q,P,N,O=13.40.1F();if(O.1g>0&&O.1g>O.1e){13.9f("5f")}1j{13.9f("9d")}Q="5f"==13.3y.3M?"1g":"1e";P=13.2V.1F()[Q];N=13.5c.1F()[Q];if(P<=N){13.5c.1B("6p-2v");13.2V.3R("26","").1F();13.2V.3R("2p","4N(0,0,0)");13.2v.4p.1B(13.3x+"-2u-4b");13.2v.4r.1Q(13.3x+"-2u-4b")}1j{13.5c.1Q("6p-2v")}if(13.6A){13.6R(13.6A,0)}},9f:17(N){if("5f"!==N&&"9d"!==N||N==13.3y.3M){1b}13.5c.1Q(13.3x+"-"+13.3y.3M);13.3y.3M=N;13.5c.1B(13.3x+"-"+13.3y.3M);13.2V.3R("26","38").1F();13.2V.3R("2p","").3R("8A","")}};1b K})(B);1a v=q.$;if(7S 7r.c0!=="17"){7r.c0=17(N){if(N==1h){6l 1v ji("js ju 2Q bE 1h 6G 9o")}N=7r(N);1U(1a K=1;K<2i.1I;K++){1a M=2i[K];if(M!=1h){1U(1a L in M){if(7r.2t.4g.2g(M,L)){N[L]=M[L]}}}}1b N}}if(!q.1f.9q){q.1f.9q=q.9s("2p").9t()}1a b={4G:{1x:"1S","2E":["2I","7B"],"1T":"7B"},4n:{3i:[{1x:"1S","2E":["1l","2C","4L","4e"],"1T":"1l"},{1x:"3g","2E":[1k]}],"1T":"1l"},ew:{3i:[{1x:"1S","2E":["2z"]},{1x:"5Z",8a:1}],"1T":"2z"},ev:{3i:[{1x:"1S","2E":["2z"]},{1x:"5Z",8a:1}],"1T":"2z"},cM:{1x:"1S","1T":"2M"},jv:{1x:"5Z",8a:0,"1T":15},8t:{3i:[{1x:"1S","2E":["2K","1H","4e"],"1T":"4e"},{1x:"3g","2E":[1k]}],"1T":"4e"},2l:{3i:[{1x:"1S","2E":["1n","fP","4e"]},{1x:"3g","2E":[1k]}],"1T":"1n"},59:{3i:[{1x:"1S","2E":["1l","2C","4e"],"1T":"1l"},{1x:"3g","2E":[1k]}],"1T":"1l"},3n:{1x:"1S","2E":["2I","2T"],"1T":"2I"},3S:{1x:"3g","1T":1s},fu:{1x:"3g","1T":1s},5i:{1x:"3g","1T":1s},3o:{3i:[{1x:"1S","2E":["bl","2T","4e"]},{1x:"3g","2E":[1k]}],"1T":"bl"},fE:{1x:"3g","1T":1s},f7:{1x:"3g","1T":1s},ez:{1x:"3g","1T":1k},88:{1x:"3g","1T":1k},c3:{1x:"3g","1T":1s},eQ:{1x:"3g","1T":1k},fc:{1x:"3g","1T":1s},cm:{1x:"1S","2E":["2I","7B"],"1T":"2I"},5W:{1x:"1S"},9Y:{1x:"3g","1T":1k},cg:{1x:"1S","1T":"jw 6G 1l"},9T:{1x:"1S","1T":"fL 6G 1l"},jx:{1x:"1S","1T":"jy"},jz:{1x:"1S","1T":"jA"},jB:{1x:"1S","1T":"jC"},9B:{1x:"1S","1T":"fL 6G 2l"}};1a D={4n:{3i:[{1x:"1S","2E":["1l","2C","4e"],"1T":"1l"},{1x:"3g","2E":[1k]}],"1T":"1l"},3n:{1x:"1S","2E":["2I","2T"],"1T":"2I"},9B:{1x:"1S","1T":"jD bE 1O 6G 2l"},cg:{1x:"1S","1T":"k3 6G 1l"},9T:{1x:"1S","1T":"jG 2a bE 1O 6G 1l"}};1a a="aH";1a j="1m";1a k=20;1a u=["cs","eD","bz","eK","fz","fG"];1a w=9z;1a x=1.1;1a c=0.5;1a e;1a F={};1a t=v([]);1a r;1a f=1n.k4||1;1a p;1a l=1s;1a d=q.1f.2N.9M?"4N(":"aT(";1a C=q.1f.2N.9M?",0)":")";1a h=1h;1a G;1a H=(17(){1a L,O,N,M,K;1b K})();1a y=17(){1b"ku$jh"+"p".8k()+" kw$"+"fq.3.7".4v("v","")+" kx$"+"c".8k()+((1n.bX$c4&&q.1V(1n.bX$c4)==="1S")?" ky$"+1n.bX$c4.5e():"")};17 i(M){1a L,K;L="";1U(K=0;K<M.1I;K++){L+=6E.7Z(14^M.fx(K))}1b L}17 n(M){1a L=[],K=1h;(M&&(K=v(M)))&&(L=t.3a(17(N){1b N.3J===K}));1b L.1I?L[0]:1h}17 s(M){1a L=v(1n).1F();1a K=v(1n).7d();M=M||0;1b{1P:M,2M:L.1e-M,1H:M,2K:L.1g-M,x:K.x,y:K.y}}17 m(K){1b 7r.c0({},K,{1x:K.1x,3P:K.3P,3N:K.3N,fK:K.fK,gf:K.gf,3C:K.3C,3E:K.3E,eV:1s})}17 I(){1a M=q.$A(2i);1a L=M.7w();1a K=F[L];if(K){1U(1a N=0;N<K.1I;N++){K[N].6u(1h,M)}}}17 g(){1a O=2i[0],K,N,L=[];3d{do{N=O.8P;if(/^[A-bU-z]*$/.3j(N)){if(K=O.2o("id")){if(/^[A-bU-z][-A-bU-kz-kA]*/.3j(K)){N+="#"+K}}L.33(N)}O=O.49}5v(O&&O!==1p.57);L=L.56();q.6q(L.7n(" ")+"> .1m-5L > 1Z",{26:"38",2p:"38"},"1m-9X-52",1s);q.6q(L.7n(" ")+":6h(.1m-6p-gj-1e-52)> .1m-5L:6h(.1m-6p-gj-1e-52) > 1Z",{1e:"2P% !2m;"},"1m-9X-52",1s)}3p(M){}}17 J(){1a L=1h,M=1h,K=17(){1n.kB(1p.3l.8W,1p.3l.8T);1n.bv(1v 1u("7u"))};M=gm(17(){1a P=1n.3M===90||1n.3M===-90;1a O=1n.4I;1a N=(P?gp.kC:gp.kD)*0.85;if((L===1h||L===1k)&&((P&&O<N)||(!P&&O<N))){L=1s;K()}1j{if((L===1h||L===1s)&&((P&&O>N)||(!P&&O>N))){L=1k;K()}}},kE);1b M}17 A(){q.6q(".2W-3t-7p, .2W-7j-1Z",{6C:"g7 !2m","2f-1g":"0 !2m","2f-1e":"0 !2m","2e-1g":"38 !2m","2e-1e":"38 !2m",1e:"g0 !2m",1g:"g0 !2m",2n:"5S !2m",1H:"-c5 !2m",1P:"0 !2m",8g:"3t !2m","-3W-2p":"38 !2m",2p:"38 !2m","-3W-26":"38 !2m",26:"38 !2m"},"9m-9n-52");q.6q(".2W-7j-1Z 1Z, .2W-7j-1Z b6",{6C:"cd-g7 !2m",3T:"0 !2m",7K:"0 !2m","2f-1g":"0 !2m","2f-1e":"0 !2m","2e-1g":"38 !2m","2e-1e":"38 !2m","-3W-2p":"38 !2m",2p:"38 !2m","-3W-26":"38 !2m",26:"38 !2m"},"9m-9n-52");q.6q(".2W-7j-1Z b6, .2W-7j-1Z b6 > 1Z",{1e:"2z !2m",1g:"2z !2m"},"9m-9n-52");if(q.1f.8N){q.6q(".2J-2W .1m-2l .1m-2l-bg",{6C:"38 !2m"},"9m-9n-52")}if(q.1f.8N&&(q.1f.4M!=="6a"||q.1f.7t===44)){q.6q(".2J-2W .1m-1l-1n.1m-2C, .2J-2W .1m-1l-1n.1m-2C:kF",{"3T-kv":"0 !2m"},"9m-9n-52")}}1a o=17(N,O,L,M,K){13.1M={24:1h,1Y:1h,6H:1,1d:1h,2b:0,1A:{1e:0,1g:0},2h:1k};13.1l={24:1h,1Y:1h,6H:1,1d:1h,2b:0,1A:{1e:0,1g:0},2h:1k};if(q.1V(N)==="9o"){13.1M=N}1j{if(q.1V(N)==="1S"){13.1M.1Y=q.6J(N)}}if(q.1V(O)==="9o"){13.1l=O}1j{if(q.1V(O)==="1S"){13.1l.1Y=q.6J(O)}}13.3H="";13.3q=L;13.1y=M;13.4y=K;13.7Q=1h;13.3X=1h;13.1d=1h};o.2t={as:17(M,L,K){1a N=M.8H("1Z")[0];if(K){13.1M.1d=N||q.$1v("1Z").29(M)}if(f>1){13.1M.1Y=M.2o("3m-1i-2x");if(13.1M.1Y){13.1M.6H=2}13.1l.1Y=M.2o("3m-1l-1i-2x");if(13.1l.1Y){13.1l.6H=2}}13.1M.24=M.2o("3m-1i")||M.2o("kI")||(N?N.8i||N.2o("24"):1h);if(13.1M.24){13.1M.24=q.6J(13.1M.24)}13.1M.1Y=13.1M.1Y||13.1M.24;if(13.1M.1Y){13.1M.1Y=q.6J(13.1M.1Y)}13.1l.24=M.2o("3m-1l-1i")||M.2o("7h");if(13.1l.24){13.1l.24=q.6J(13.1l.24)}13.1l.1Y=13.1l.1Y||13.1l.24;if(13.1l.1Y){13.1l.1Y=q.6J(13.1l.1Y)}13.3q=M.2o("3m-3q")||M.2o("7g")||L;13.3X=M.2o("3m-3X");13.4y=M;if(N){13.3H=N.2o("3H")||""}1b 13},bk:17(K){1a L=1h;if(2i.1I>1&&q.1V(2i[1])==="17"){L=2i[1]}if(13[K].2b!==0){if(13[K].2h){13.6I(L)}1b}if(13[K].1Y&&13[K].1d&&!13[K].1d.2o("24")&&!13[K].1d.2o("ct")){13[K].1d.3b("24",13[K].1Y)}13[K].2b=1;1v q.bj(13[K].1d||13[K].1Y,{7O:v(17(M){13[K].2h=1s;13[K].2b=M.2q?2:-1;if(M.2q){if(13[K].1A.1e===0&&13[K].1A.1g===0){13[K].1A=M.1F()}if(!13[K].1d){13[K].1d=v(M.1Z);13[K].1d.2o("2k");13[K].1d.5l("2k");13[K].1d.3H=13.3H;13[K].1A.1e/=13[K].6H;13[K].1A.1g/=13[K].6H}1j{13[K].1d.1z({5y:13[K].1A.1e,6n:13[K].1A.1g});if(13[K].1d.8i&&13[K].1d.8i!==13[K].1d.24){13[K].1Y=13[K].1d.8i}1j{if(q.6J(13[K].1d.2o("24")||"")!==13[K].1Y){13[K].1d.3b("24",13[K].1Y)}}}}13.6I(L)}).1D(13)})},8v:17(){13.bk("1M",2i[0])},cx:17(){13.bk("1l",2i[0])},5D:17(){13.7Q=1h;if(2i.1I>0&&q.1V(2i[0])==="17"){13.7Q=2i[0]}13.8v();13.cx()},6I:17(K){if(K){K.2g(1h,13)}if(13.7Q&&13.1M.2h&&13.1l.2h){13.7Q.2g(1h,13);13.7Q=1h;1b}},2h:17(){1b(13.1M.2h&&13.1l.2h)},2q:17(){1b(13.1M.2b===2&&13.1l.2b===2)},6F:17(L){1a K=L==="1M"?"1l":"1M";if(!13[L].2h||(13[L].2h&&13[L].2b===2)){1b 13[L].1Y}1j{if(!13[K].2h||(13[K].2h&&13[K].2b===2)){1b 13[K].1Y}}1b 1h},7l:17(L){1a K=L==="1M"?"1l":"1M";if(!13[L].2h||(13[L].2h&&13[L].2b===2)){1b 13[L].1d}1j{if(!13[K].2h||(13[K].2h&&13[K].2b===2)){1b 13[K].1d}}1b 1h},1F:17(L){1a K=L==="1M"?"1l":"1M";if(!13[L].2h||(13[L].2h&&13[L].2b===2)){1b 13[L].1A}1j{if(!13[K].2h||(13[K].2h&&13[K].2b===2)){1b 13[K].1A}}1b{1e:0,1g:0}},6b:17(L,K){13[L].1A=K},cJ:17(L){1a K=L==="1M"?"1l":"1M";if(!13[L].2h||(13[L].2h&&13[L].2b===2)){1b 13[L].6H}1j{if(!13[K].2h||(13[K].2h&&13[K].2b===2)){1b 13[K].6H}}1b 1},7m:17(K){13.1d=13.7l(K)}};1a z=17(L,K){13.1y=1v q.7X(b);13.1o=v(17(){if(2i.1I>1){1b 13.7k(2i[0],2i[1])}1b 13.gk(2i[0])}).1D(13.1y);13.gb=1v q.7X(D);13.3G=[];13.1i=1h;13.7y=1h;13.3J=v(L).1C("3Z kJ 2I",17(M){M.2j()});13.id=1h;13.1d=1h;13.8S=1h;13.43=1h;13.8L=1h;13.7i=1h;13.8n={1e:0,1g:0};13.1A={1e:0,1g:0};13.1K={1e:0,1g:0};13.3r={1e:0,1g:0};13.21={1H:0,1P:0,2K:0,2M:0};13.2q=1k;13.1G=1k;13.63=1h;13.bq=1h;13.5P=v(17(){if(13.1G){if(G){13.3h.1z({1g:1n.4I,1H:1q.3c(G.6L().1H)})}13.1i.1d.1z({"2e-1g":1q.2f(13.1i.1F("1l").1g,13.7v())});13.1i.1d.1z({"2e-1e":1q.2f(13.1i.1F("1l").1e,13.8f())})}13.8d(2i[0])}).1D(13);13.c9=v(17(M){3w(13.bq);13.bq=v(13.5P).2G(10,M.1x==="6R")}).2H(13);13.cF=v(17(M){if(!M.2b&&13.1G){13.5a()}if(M.2b&&M.2b.ax===13.id&&!13.1G){13.2l()}}).2H(13);if(y){r.3f(q.$1v("2Z",{},{6C:"38",4Z:"3t"}).3f(1p.9D(y)));y=2Q}13.1r=1h;13.1c=1h;13.3o=1h;13.ca=1h;13.6X=0;13.8X=1s;13.6K=1h;13.5k=1h;13.79=1h;13.3h=1h;13.4d=1h;13.3S=1h;13.5O=1h;13.6N=1h;13.5N=1h;13.7U=1h;13.5F=1h;13.4J=1h;13.4R=[];13.2v={};13.9H=0;13.co=1h;13.4O(K)};z.2t={fy:17(K){13.1y.8Z(1n[j+"7X"]||{});13.1y.9I(13.3J.2o("3m-1y")||"");if(!q.1f.9w){13.1o("9Y",1k)}if(q.1f.2J||13.1o("9Y")){13.1y.8Z(13.gb.gc());13.1y.8Z(1n[j+"kK"]||{});13.1y.9I(13.3J.2o("3m-2J-1y")||"")}if(q.1V(K)==="1S"){13.1y.9I(K||"")}1j{13.1y.8Z(K||{})}if(13.1o("5W")){13.1o("5W",13.1o("5W").4v(","," "))}if(13.1o("8t")===1k){13.1o("8t","4e")}if(13.1o("3o")===1k){13.1o("3o","4e")}4E(13.1o("3o")){1E"4e":13.6X=0;1J;1E"2T":13.6X=6m;1J;1E"bl":1T:13.6X=2;1J}if(13.1o("4n")==="4e"){13.1o("4n",1k)}if(13.1o("2l")==="4e"){13.1o("2l",1k)}if(13.1o("59")==="4e"){13.1o("59",1k)}if(q.1f.2J&&13.1o("4n")==="1l"&&13.1o("cM")==="2F"){if(13.1o("2l")){13.1o("4n",1k)}1j{13.1o("4G","2I")}}},4O:17(N){1a L;1a K=13;1a M;if(13.9H<1){13.fy(N);if(l&&!13.1o("c3")){1b}13.43=13.3J.bs("1Z");13.8L=13.43?13.43.2o("24"):1h;13.7i=v(13.3J).2o("7g");v(13.3J).5l("7g");if(13.43&&13.43.49.8P==="kL"){13.8L=1h;1a R=q.$1v("2Z").1B("2W-7j-1Z").29(1p.3l);1a P=13.43.49.b9(1s);P.2o("2k");P.5l("2k");1a O=P.bs("1Z");O.2o("2k");O.5l("2k");v(O).1C("5D",17(){K.1A=v(O).1F();R.5m();1a S=K.43.b9(1k);v(S).1z({5y:K.1A.1e,6n:K.1A.1g}).3b("24",K.43.8i||K.43.24);K.43=K.3J.80(S,K.43.49);K.4O()});R.3f(P);++13.9H;1b}}M=1v o().as(13.3J,13.7i,1s);M.6b("1M",13.1A);if(!M.1M.1Y){if(++13.9H<=w){13.co=4K(17(){K.4O()},2P)}1b}13.7y=M;13.1i=13.7y;g(13.3J);13.id=13.3J.2o("id")||"1m-"+1q.4P(1q.6c()*q.69());13.3J.3b("id",13.id);13.1d=q.$1v("5L").1B("1m-5L");13.1d.ft(13.1i.1M.1d).1B(13.1o("5W"));if(13.1o("eQ")!==1s){13.1d.1C("kM",17(S){S.2j();1b 1k})}13.1d.1B("1m-"+13.1o("4G")+"-1l");if(!13.1o("2l")){13.1d.1B("1m-6p-2l")}13.1r={1d:q.$1v("2Z",{"4l":"1m-1r"},{1H:0}).29(13.1d),1i:q.$1v("1Z",{24:"3m:1i/eN;eM,eL/eJ="},{2n:"5S",1H:0,1P:0}),1e:0,1g:0,34:{x:0,y:0},48:{x:0,y:0},1A:{1e:0,1g:0},3T:{x:0,y:0},dx:0,dy:0,65:1k,4c:17(){if(q.1f.2N.2p){13.1d.1z({2p:"aT(-c5, -c5)"})}1j{13.1d.1z({1H:-eO})}}};13.1r.4c();13.1r.1d.3f(13.1r.1i);13.1c={1d:q.$1v("2Z",{"4l":"1m-1l-1n"},{1H:-eI}).1B(13.1o("5W")).29(r),1i:q.$1v("1Z",{24:"3m:1i/eN;eM,eL/eJ="},{2n:"5S"}),ch:0,1e:0,1g:0,5x:0,4I:0,1A:{1e:"2z",73:"2D",1g:"2z",74:"2D"},1W:13.1o("4n"),2n:13.1o("cM"),8l:13.1o("4G"),4z:1k,2s:1k,2R:1k,4Q:1k,6Y:v(17(){13.1c.4Q=2i[0]!==1k;13.1d[13.1c.4Q?"1Q":"1B"]("1m-6p-1l")}).1D(13),4c:v(17(){1a S=v(13.1d).1R("cr");13.1c.1d.1N("2U");13.1c.1d.1z({1H:-eI}).29(r);13.1c.1d.1Q("1m-97 1m-p-"+(13.1c.1W==="1l"?13.1c.2n:13.1c.1W));if(!13.1G&&S){S.2X()}13.1c.1i.2o("2k");13.1c.1i.5l("2k")}).1D(13),a9:v(17(S){13.1d[S===1k?"1B":"1Q"]("1m-6p-1l");13.1d[S==="2C"?"1B":"1Q"]("1m-2C-1l");13.1c.1d[S==="2C"?"1B":"1Q"]("1m-2C");13.1c.1d[S==="4L"?"1B":"1Q"]("1m-4L");if(S!=="1l"){13.1d.1Q("1m-2F-1l");13.1c.1d.1Q("1m-2F")}13.1c.1W=S;if(S===1k){13.1c.6Y(1k)}}).1D(13)};13.1c.1d.3f(13.1c.1i);13.1c.a9(13.1o("4n"));13.1c.1i.5l("1e");13.1c.1i.5l("1g");if(7S(H)!=="2Q"){1a Q=1q.4P(1q.6c()*q.69());v(13.1d).2O("cr",q.$1v(((1q.4P(1q.6c()*bP)+1)%2)?"cf":"2Z").8I({id:"8J"+Q}).1z({6C:"cd",8g:"3t",4Z:"5M",eA:H[1],kN:H[2],eH:H[3],kO:"kP-kQ",2n:"5S",1H:8,1P:8,8A:"2z",1e:"2z",kR:"2M",em:"kH",eB:ex}).5V(i(H[0])));if(v(v(13.1d).1R("cr")).8H("a")[0]){v(v(v(13.1d).1R("cr")).8H("a")[0]).1C("2a 1X",17(S){S.5w();1n.93(13.7h)}).8I({id:"cc"+Q})}q.6q("#"+13.id+" > 5L.1m-5L > #"+("8J"+Q)+",#"+13.id+" > 5L.1m-5L > #"+("8J"+Q)+" > #"+("cc"+Q)+",9R 3l .1m-2l > #"+("8J"+Q)+",9R 3l .1m-2l > #"+("8J"+Q)+" > #"+("cc"+Q),{6C:"cd !2m;",4Z:"5M !2m;",eA:H[1]+" !2m;","kt-1A":H[2]+"2D !2m;","z-8z":"ex !2m;"},"1m-9X-52",1s)}if((L=(""+13.1o("ew")).3L(/^([0-9]+)?(2D|%)?$/))){13.1c.1A.73=L[2]||"2D";13.1c.1A.1e=(2A(L[1])||"2z")}if((L=(""+13.1o("ev")).3L(/^([0-9]+)?(2D|%)?$/))){13.1c.1A.74=L[2]||"2D";13.1c.1A.1g=(2A(L[1])||"2z")}if(13.1c.1W==="2C"){13.1d.1B("1m-2C-1l");13.1c.1d.1B("1m-2C");if(13.1c.1A.1e==="2z"){13.1c.1A.73="%";13.1c.1A.1e=70}if(13.1c.1A.1g==="2z"){13.1c.1A.74="%"}}1j{if(13.1o("1l-2n").3L(/^#/)){if(13.1c.4z=v(13.1o("1l-2n").4v(/^#/,""))){if(v(13.1c.4z).1F().1g>50){if(13.1c.1A.1e==="2z"){13.1c.1A.73="%";13.1c.1A.1e=2P}if(13.1c.1A.1g==="2z"){13.1c.1A.74="%";13.1c.1A.1g=2P}}}1j{13.1o("1l-2n","2M")}}if(13.1c.1W==="4L"){if(13.1c.1A.1e==="2z"){13.1c.1A.73="2D"}if(13.1c.1A.1g==="2z"){13.1c.1A.74="2D"}}if(13.1c.1W==="1l"){if(13.1c.1A.1e==="2z"||13.1o("1l-2n")==="2F"){13.1c.1A.73="%";13.1c.1A.1e=2P}if(13.1c.1A.1g==="2z"||13.1o("1l-2n")==="2F"){13.1c.1A.74="%";13.1c.1A.1g=2P}}if(13.1o("1l-2n")==="2F"){13.1d.1B("1m-2F-1l")}}13.1c.2n=13.1c.4z?"4z":13.1o("1l-2n");13.1r.3T.x=2A(13.1r.1d.3D("3T-1P-1e")||"0");13.1r.3T.y=2A(13.1r.1d.3D("3T-1H-1e")||"0");13.1i.8v(17(){if(13.1i.1M.2b!==2){1b}13.1i.7m("1M");13.1A=13.1i.1d.1F();13.f1();13.2q=1s;if(13.1o("88")===1s){I("cs",13.id);if(q.1f.2J){13.8d()}1j{13.5K()}}}.1D(13));if(13.1o("88")!==1s||13.1o("4G")==="2T"){13.1i.5D(v(17(S){13.7c(S,1s)}).1D(13));13.5k=v(13.7I).1D(13).2G(9l)}13.fb();13.eZ()},2j:17(){3w(13.co);13.eE();if(13.1c){13.1c.1d.5m()}if(13.4J){13.4J.2j();13.4J=1h}if(13.3h){13.3h.5m()}if(13.1G){v(q.1f.4u()).1z({8g:""})}v(13.3G).3e(17(K){v(K.4y).1Q("1m-79-7e").1Q(13.1o("5W")||"1m-$ks-52-4l-6G-2X$")},13);if(13.43){13.3J.3f(13.43);if(13.8L){13.43.3b("24",13.8L)}}if(13.7i){13.3J.3b("7g",13.7i)}if(13.1d){13.1d.5m()}},7c:17(L,M){1a K=13.1i;if(L.1l.2b!==2){13.1i=L;13.2q=1s;13.1c.6Y(1k);1b}13.1i=L;13.1i.7m(13.1G?"1l":"1M");13.1c.1i.24=13.1i.6F("1l");13.1c.1i.3H=13.1i.3H;13.1c.1d.1Q("1m-4L");13.1c.1i.2o("2k");13.1c.1i.5l("2k");13.1c.1d.1F();4K(v(17(){1a O=13.1c.1i.1F();1a N;13.3r=13.1i.1F("1l");if(O.1e*O.1g>1&&O.1e*O.1g<13.3r.1e*13.3r.1g){13.3r=O}13.1K=q.3A(13.3r);if(13.1c.1W==="4L"){13.1c.1d.1B("1m-4L")}13.fp();13.1r.1i.24=13.1i.1d.8i||13.1i.1d.24;13.1r.1i.3H=13.1i.3H;13.1c.6Y(13.1c.1W&&!(13.1G&&13.1c.1W==="4L"));13.2q=1s;13.63=1h;13.5P();13.1d.1B("1m-2q");13.cB();if(K!==13.1i){I("eD",13.id,K.4y,13.1i.4y);if(13.a8){N=13.a8;13.a8=1h;13.4A(N.1i,N.ff)}}1j{if(!!M){I("cs",13.id)}}if(13.5d){13.1d.36(13.5d.1x,13.5d)}1j{if(13.1G&&13.1o("3n")==="2T"){13.5b()}1j{if(!!M){13.5K()}}}}).1D(13),k7)},fb:17(){1a L=13.id;1a K;1a M;M=1v fd("1l\\\\-id(\\\\s+)?:(\\\\s+)?"+L+"($|;)");if(q.1f.2N.bH){K=q.$A(1p.bI(\'[3m-1l-id="\'+13.id+\'"]\'));K=v(K).67(q.$A(1p.bI(\'[cv*="1l-id"]\')).3a(17(N){1b M.3j(N.2o("cv")||"")}))}1j{K=q.$A(1p.b2("A")).3a(17(N){1b L===N.2o("3m-1l-id")||M.3j(N.2o("cv")||"")})}v(K).3e(17(O){1a N;1a P;v(O).1C("2I",17(Q){Q.4W()});N=1v o().as(O,13.7i);if((13.1i.1l.24.3u(N.1l.1Y)||13.1i.1l.1Y.3u(N.1l.1Y))&&(13.1i.1M.24.3u(N.1M.1Y)||13.1i.1M.1Y.3u(N.1M.1Y))){v(N.4y).1B("1m-79-7e");N=13.1i;N.4y=O}if(!N.3X&&13.1i.3X){N.3X=13.1i.3X}P=v(17(){13.4A(N)}).1D(13);v(O).1C("7b",17(Q){if("fe"in Q){Q.fe()}},5);v(O).1C("2a "+(13.1o("cm")==="7B"?"8m 8C":"1X"),v(17(R,Q){if(13.6z){3w(13.6z)}13.6z=1k;if(R.1x==="8m"){13.6z=v(P).2G(Q)}1j{if(R.1x==="2a"||R.1x==="1X"){P()}}}).2H(13,60)).1B(13.1o("5W")).1B("1m-79");if(13.1o("88")!==1s){N.8v();N.cx()}13.3G.33(N)},13)},4A:17(K,M){if(!13.2q){13.a8={1i:K,ff:M};1b}if(!K||K===13.1i){1b 1k}13.4k(1h,1s);13.2q=1k;13.1d.1Q("1m-2q");13.5k=v(13.7I).1D(13).2G(9l);1a L=v(17(T){1a N,U,S,P,O,R,Q=(q.1f.2L<10)?"1F":"6L";13.cB();T.7m("1M");if(!T.1d){13.2q=1s;13.1d.1B("1m-2q");1b}13.9Z(T);N=13.1i.1d[Q]();if(13.1G){T.7m("1l");S=q.$1v("2Z").1B("1m-2l-bg");if(q.1f.2N.8M||q.1f.2L<10){S.3f(q.$1v("1Z",{ct:T.6F("1l")+" "+T.cJ("1l")+"x",24:T.6F("1l"),3H:T.3H}).1z({2y:0}))}1j{S.3f(1v q.9P(T.1d).5J(k).7l().1z({2y:0}))}v(S).1z({"z-8z":-99}).29(13.3h)}if(13.1G&&13.1c.1W==="1l"&&13.1o("3n")==="2T"){v(T.1d).1z({2y:0}).29(13.1d);U=N;O=[T.1d,13.1i.1d];R=[{2y:[0,1]},{2y:[1,0]}];v(T.1d).1z({"2e-1e":1q.2f(T.1F("1l").1e,13.8f()),"2e-1g":1q.2f(T.1F("1l").1g,13.7v())})}1j{13.1d.1z({1g:13.1d[Q]().1g});13.1i.1d.1z({2n:"5S",1H:0,1P:0,2K:0,2M:0,1e:"2P%",1g:"2P%","2e-1e":"","2e-1g":""});v(T.1d).1z({"2e-1e":1q.2f(T.1F(13.1G?"1l":"1M").1e,13.1G?13.8f():6m),"2e-1g":1q.2f(T.1F(13.1G?"1l":"1M").1g,13.1G?13.7v():6m),2n:"k9",1H:0,1P:0,2y:0,2p:""}).29(13.1d);U=v(T.1d)[Q]();if(!M){v(T.1d).1z({"2f-1e":N.1e,1g:N.1g,"2e-1e":N.1e,"2e-1g":""})}13.1d.1z({1g:"",8g:""}).1F();v(T.1d).1F();O=[T.1d,13.1i.1d];R=[q.2c({2y:[0,1]},M?{3Q:[0.6,1]}:{"2f-1e":[N.1e,U.1e],"2e-1e":[N.1e,U.1e],1g:[N.1g,U.1g]}),{2y:[1,0]}]}if(13.1G){if(13.4d.4x&&S.4x){P=v(13.4d.4x).3D("2y");if(q.1f.76){O=O.67([S.4x]);R=R.67([{2y:[0.cw,P]}])}1j{O=O.67([S.4x,13.4d.4x]);R=R.67([{2y:[0.cw,P]},{2y:[P,0.cw]}])}}}1v q.ay(O,{5C:(M||13.1o("fc"))?M?ka:kb:0,26:M?"6d-6e(0.a1, 0.cy, 0.gn, 1)":(N.1e===U.1e)?"9E":"6d-6e(0.25, .1, .1, 1)",87:v(17(){13.1i.1d.2X().2o("2k");13.1i.1d.5l("2k");v(T.1d).1z(13.1G?{1e:"2z",1g:"2z"}:{1e:"",1g:""}).1z({"2f-1e":"","2f-1g":"",2y:"","2e-1e":1q.2f(T.1F(13.1G?"1l":"1M").1e,13.1G?13.8f():6m),"2e-1g":1q.2f(T.1F(13.1G?"1l":"1M").1g,13.1G?13.7v():6m)});if(13.1G){13.4d.2X();13.4d=2Q;13.4d=S.3R("z-8z",-2P);v(13.4d.4x).1z({2y:""});if(13.3S){if(T.3q){if(T.3X){13.3S.5V("").3f(q.$1v("a",{7h:T.3X}).1C("2a 1X",13.aQ.1D(13)).5V(T.3q))}1j{13.3S.5V(T.3q).1B("1m-5A")}}1j{13.3S.1Q("1m-5A")}}}13.7c(T)}).1D(13),cq:v(17(V,W){if(2Q!==V.3Q){W.3R("2p","3Q("+V.3Q+")")}})}).4O(R)}).1D(13);if(13.1G){K.5D(L)}1j{K.8v(L)}},9Z:17(L){1a K=1k;v(13.3G).3e(17(M){v(M.4y).1Q("1m-79-7e");if(M===L){K=1s}});if(K&&L.4y){v(L.4y).1B("1m-79-7e")}if(13.4J){13.4J.fo(L.fa)}},fp:17(K){if(13.1i.3q&&13.1o("8t")!=="4e"&&13.1c.1W!=="2C"){if(!13.1c.3q){13.1c.3q=q.$1v("2Z",{"4l":"1m-3q"}).29(13.1c.1d.1B("3q-"+13.1o("8t")))}13.1c.3q.5V(13.1i.3q)}},5K:17(K,N,L){1a M;if(!13.1G){if(13.6X<=0){1b}if(L!==1s){13.6X--}}if(N===2Q||N===1h){if(!13.1c.2s&&!13.1c.2R){if(13.1o("4n")&&(13.1c.4Q||!13.1i.2h())&&!(q.1f.2J&&13.1o("2l")&&13.1c.1W==="1l"&&13.1c.2n==="2F")){if(13.1c.8l==="7B"){N=13.1o("cg")}1j{if(13.1c.8l==="2I"){N=13.1o("9T")}}}1j{N=13.1o("2l")?13.1o("9B"):""}}1j{N=13.1o("2l")?13.1o("9B"):""}}if(!N){13.c7();1b}M=13.1d;if(!13.3o){13.3o=q.$1v("2Z",{"4l":"1m-3o"});13.ca=q.$1v("cf",{"4l":"1m-3o-kd"}).3f(1p.9D(N)).29(13.3o);v(13.3o).29(13.1d)}1j{v(13.ca).5V(N)}13.3o.1z({"26-cl":""}).1Q("1m-3o-3t");if(13.1G){M=13.5N}1j{if((13.1c.2s||13.1c.2R)&&13.1c.1W!=="2C"&&13.1c.2n==="2F"){M=13.1c.1d}}if(K===1s){4K(v(17(){13.3o.1B("1m-3o-3t")}).1D(13),16)}13.3o.29(M)},c7:17(){if(13.3o){13.3o.1z({"26-cl":"fr"}).1B("1m-3o-3t")}},7I:17(){if(!13.6K){13.6K=q.$1v("2Z",{"4l":"1m-ke"});13.1d.3f(13.6K);13.6K.1F()}13.6K.1B("f9")},cB:17(){3w(13.5k);13.5k=1h;if(13.6K){v(13.6K).1Q("f9")}},6b:17(M,Q){1a P=q.3A(13.1c.1A),O=(!13.1G&&13.1c.4z)?v(13.1c.4z).1F():{1e:0,1g:0},L,K,N=13.1A,R={x:0,y:0};Q=Q||13.1c.2n;13.8n=13.1i.1d.1F();13.1A=13.1i.1d.1F();13.21=13.1i.1d.6L();if(!O.1g){O=13.1A}if(13.1o("f7")===1k||13.1c.1W===1k||13.1c.1W==="4L"){M=1k}if(13.1c.1W==="4L"){if(P.1e==="2z"){P.1e=13.3r.1e}if(P.1g==="2z"){P.1g=13.3r.1g}}if(13.1G&&13.1c.1W==="2C"){P.1e=70;P.1g="2z"}if(13.1c.1W==="2C"&&P.1g==="2z"){13.1c.1e=2A(P.1e/2P)*1q.2f(O.1e,O.1g);13.1c.1g=13.1c.1e}1j{if(13.1c.1W==="1l"&&Q==="2F"){13.1A=13.1d.1F();O=13.1A;13.21=13.1d.6L();13.1c.1e=O.1e;13.1c.1g=O.1g}1j{13.1c.1e=(P.73==="%")?2A(P.1e/2P)*O.1e:6k(P.1e);13.1c.1g=(P.74==="%")?2A(P.1g/2P)*O.1g:6k(P.1g)}}if(13.1c.1W==="4L"){K=1q.2f(1q.2f(13.1c.1e/13.3r.1e,13.1c.1g/13.3r.1g),1);13.1c.1e=13.3r.1e*K;13.1c.1g=13.3r.1g*K}13.1c.1e=1q.4i(13.1c.1e);13.1c.1g=1q.4i(13.1c.1g);13.1c.ch=13.1c.1e/13.1c.1g;13.1c.1d.1z({1e:13.1c.1e,1g:13.1c.1g});if(M){O=13.1G?13.3h.1F():13.1c.1d.1F();if(!13.1G&&(13.8n.1e*13.8n.1g)/(13.3r.1e*13.3r.1g)>0.8){13.1K.1e=1.5*13.3r.1e;13.1K.1g=1.5*13.3r.1g}1j{13.1K=q.3A(13.3r)}}if(13.1c.1W!==1k&&!13.1c.2s&&!(13.1G&&13.1o("3n")==="2T")){if((13.8n.1e*13.8n.1g)/(13.1K.1e*13.1K.1g)>0.8){13.1K=q.3A(13.3r);13.1c.6Y(1k)}1j{13.1c.6Y(1s)}}13.1c.1i.1z({1e:13.1K.1e,1g:13.1K.1g});13.1K.5y=13.1K.1e;13.1K.6n=13.1K.1g;L=13.1c.1d.9e();13.1c.5x=1q.4i(L.1e);13.1c.4I=1q.4i(L.1g);13.1r.1e=1q.4i(13.1c.5x/(13.1K.1e/13.1A.1e));13.1r.1g=1q.4i(13.1c.4I/(13.1K.1g/13.1A.1g));13.1r.1d.1z({1e:13.1r.1e,1g:13.1r.1g});13.1r.1i.1z(13.1A);q.2c(13.1r,13.1r.1d.1F());if(13.1c.2s){3w(13.3O);13.3O=1h;if(13.1r.65){13.1r.34.x*=(13.1A.1e/N.1e);13.1r.34.y*=(13.1A.1g/N.1g);R.x=13.1r.48.x;R.y=13.1r.48.y}1j{R.x=13.21.1P+13.1r.1e/2+(13.1r.34.x*(13.1A.1e/N.1e));R.y=13.21.1H+13.1r.1g/2+(13.1r.34.y*(13.1A.1g/N.1g))}13.5E(1h,R)}},8d:17(O){1a R;1a Q;1a K;1a P;1a N;1a M;1a L=v(13.1d).1R("cr");K=s(5);N=13.1c.2n;P=13.1G?"2F":13.1c.4z?"4z":13.1o("1l-2n");M=13.1G&&13.1c.1W==="1l"?13.6N:1p.3l;if(13.1G){K.y=0;K.x=0}if(!O){13.6b(1s,P)}R=13.21.1H;if(13.1c.1W!=="2C"){if(O){13.6b(1k);1b}4E(P){1E"2F":1E"4z":R=0;Q=0;1J;1E"1H":R=13.21.1H-13.1c.1g-13.1o("1l-5B");if(K.1H>R){R=13.21.2K+13.1o("1l-5B");P="2K"}Q=13.21.1P;1J;1E"2K":R=13.21.2K+13.1o("1l-5B");if(K.2K<R+13.1c.1g){R=13.21.1H-13.1c.1g-13.1o("1l-5B");P="1H"}Q=13.21.1P;1J;1E"1P":Q=13.21.1P-13.1c.1e-13.1o("1l-5B");if(K.1P>Q&&K.2M>=13.21.2M+13.1o("1l-5B")+13.1c.1e){Q=13.21.2M+13.1o("1l-5B");P="2M"}1J;1E"2M":1T:Q=13.21.2M+13.1o("1l-5B");if(K.2M<Q+13.1c.1e&&K.1P<=13.21.1P-13.1c.1e-13.1o("1l-5B")){Q=13.21.1P-13.1c.1e-13.1o("1l-5B");P="1P"}1J}4E(13.1o("1l-2n")){1E"1H":1E"2K":if(K.1H>R||K.2K<R+13.1c.1g){P="2F"}1J;1E"1P":1E"2M":if(K.1P>Q||K.2M<Q+13.1c.1e){P="2F"}1J;1T:}13.1c.2n=P;if(!13.1c.2R&&!13.1c.2s){if(q.1f.2J&&!13.1G&&(13.1c.1W==="1l"||13.1c.1W===1k&&13.1o("2l"))){if(13.1o("2l")){13.1c.6Y(P!=="2F")}1j{if(13.1o("4G")!=="2I"){13.1c.8l=P==="2F"?"2I":13.1o("4G");13.aF();13.aP();13.8D(13.1c.8l==="2I");13.8q(13.1c.8l==="2I"&&!13.1o("2l"))}}13.5K(1k,1h,!(13.1o("88")&&13.1i.2h()))}1b}13.6b(1k);if(O){1b}if(P==="4z"){M=13.1c.4z;K.y=0;K.x=0}if(P==="2F"){if(13.1c.1W!=="4L"){13.1c.1d.1B("1m-2F");13.1d.1B("1m-2F-1l")}13.1r.4c();R=13.21.1H+K.y;Q=13.21.1P+K.x;R=0;Q=0;if(!13.1G){M=13.1d}}1j{R+=K.y;Q+=K.x;13.1d.1Q("1m-2F-1l");13.1c.1d.1Q("1m-2F")}13.1c.1d.1z({1H:R,1P:Q})}1j{13.6b(1k);M=13.1d;if(q.1f.2J&&!13.1G&&!13.1c.2R&&!13.1c.2s){13.5K(1k,1h,!(13.1o("88")&&13.1i.2h()))}}13.1c.1d[13.1G?"1B":"1Q"]("1m-1G");if(!13.1G&&L){L.29(13.1c.1W==="1l"&&P==="2F"?13.1c.1d:13.1d,((1q.4P(1q.6c()*bP)+1)%2)?"1H":"2K")}13.1c.1d.29(M)},eC:17(Q){1a M;1a K;1a O;1a N;1a P=1k;1a L=Q.cK?5:3/54;if(!13.1c.2s){1b}v(Q).2j();L=(2P+L*1q.3c(Q.8s))/2P;if(Q.8s<0){L=1/L}if(13.1c.1W==="2C"){K=1q.2e(2P,1q.5H(13.1c.1e*L));K=1q.2f(K,13.1A.1e*0.9);O=K/13.1c.ch;13.1c.1e=1q.4i(K);13.1c.1g=1q.4i(O);13.1c.1d.1z({1e:13.1c.1e,1g:13.1c.1g});M=13.1c.1d.9e();13.1c.5x=1q.4i(M.1e);13.1c.4I=1q.4i(M.1g);P=1s}1j{if(!13.1G&&13.1c.1W==="1l"){K=1q.2e(13.1A.1e,1q.5H(13.1K.1e*L));K=1q.2f(K,13.1K.5y);O=K/(13.1K.5y/13.1K.6n);13.1K.1e=1q.4i(K);13.1K.1g=1q.4i(O)}1j{1b}}N=v(1n).7d();13.1r.1e=(13.1c.5x/(13.1K.1e/13.1A.1e));13.1r.1g=(13.1c.4I/(13.1K.1g/13.1A.1g));13.1r.1d.1z({1e:13.1r.1e,1g:13.1r.1g});q.2c(13.1r,13.1r.1d.1F());if(13.1c.2s){3w(13.3O);13.3O=1h;if(P){13.3O=1s}13.5E(1h,{x:Q.x-N.x,y:Q.y-N.y});if(P){13.3O=1h}}},8D:17(M){1a L;1a K=M?"3B 1X":"5t"+(1n.3I.7a?" 5X":1n.3I.8B?" f2":"")+(1n.3I.7a?" 4B":1n.3I.8B?" aG":" 78");1a N=13.1d.1R("1m:4q:5b:fn",(!M)?v(17(O){if(O.6T()&&!O.5q()){1b}if(O&&O.2r==="3v"&&O.1x!=="5X"){1b}L=(q.1f.2L<9)?q.2c({},O):O;if(!13.63){3w(13.63);13.63=4K(v(17(){13.5b(L)}).1D(13),kf)}}).2H(13):v(13.5b).2H(13));13.1d.2O("1m:4q:5b:1t",K).1C(K,N,10)},aF:17(){1a K=13.1d.1R("1m:4q:5b:1t");1a L=13.1d.1R("1m:4q:5b:fn");13.1d.1N(K,L);13.1d.2B("1m:4q:5b:fn")},8q:17(L){1a K="4a";if(1n.3I.7a){K+=" 4h cS 4B"}1j{if(1n.3I.8B){K+=" eT eX aG"}1j{K+=" 8C 78"}}if(L){if(13.1G||q.1f.2J){K="3B 1X"}1j{K+=" 3B 1X"}}1a M=13.1d.1R("1m:4q:4k:fn",v(17(O){if(O.6T()&&!O.5q()){1b}if(O&&O.1x==="4h"&&O.2r!=="3v"){1b}if(O&&(O.1x==="4B"||O.1x==="aG"||O.1x==="78")){if(!13.2q||!13.1c.4Q||!13.1c.2s){1b}1a N=O.7P();if(N.x<13.21.1P||N.x>13.21.2M||N.y<13.21.1H||N.y>13.21.2K){13.4k(O);1b}}1j{if(13.1c.1d!==O.8w()&&!((13.1c.2n==="2F"||13.1c.1W==="2C")&&13.1c.1d.aB(O.8w()))&&!13.1d.aB(O.8w())){13.4k(O);1b}}}).2H(13));13.1d.2O("1m:4q:4k:1t",K).1C(K,M,20)},aP:17(){1a K=13.1d.1R("1m:4q:4k:1t");1a L=13.1d.1R("1m:4q:4k:fn");13.1d.1N(K,L);13.1d.2B("1m:4q:4k:fn")},aK:17(){1a K="6P";if(q.1f.4F!=="89"){if(1n.3I.7a){K+=" 4B"}1j{if(1n.3I.8B){K+=" aG"}1j{K+=" 78"}}}1a L=13.1d.1R("1m:4q:5E:fn",v(13.5E).2H(13));13.1d.2O("1m:4q:5E:1t",K).1C(K,L)},f8:17(){1a K=13.1d.1R("1m:4q:5E:1t");1a L=13.1d.1R("1m:4q:5E:fn");13.1d.1N(K,L)},f1:17(){13.fT=13.62.1D(13);13.1d.1C(["5t",1n.3I.7a?"5X":"f2"],v(17(K){if((q.1f.8N)&&13.1o("4n")&&13.1o("4G")!=="2I"&&K.1x==="5t"){K.4W();if(q.1f.76){K.5w()}}if(!13.1c.2s){1b}if(13.1c.2n==="2F"&&K.5q()){13.1r.48=K.7P()}}).2H(13),10);13.1d.1C(["4a",1n.3I.7a?"4h":"eT"],v(17(K){if(K.6T()&&K.5q()){13.1r.7W=1k}}).2H(13),10);13.aK();if(13.1o("4n")){13.8D(13.1o("4G")==="2I");13.8q(13.1o("4G")==="2I")}13.1d.1C("7b",17(K){K.5w()},10).1C("1X",v(17(K){13.1d.ci("eS","2I");if(13.1G){13.3h.36("1X",K)}}).1D(13),15);if(13.1o("2l")){13.1d.1C("2a 1X",v(13.2l).2H(13),15)}1j{13.1d.1C("2a 1X",v(13.aQ).2H(13),15)}if(13.3G.1I>1){13.bM()}if(!q.1f.2J&&13.1o("ez")){13.1d.1C("4T",13.eC.2H(13))}if(q.1f.2J){13.et()}v(1n).1C(q.1f.2J?"7u":"7u 6R",13.c9);if(13.1o("5i")){v(1n).1C("eG",13.cF)}},eE:17(){if(13.1d){13.1d.1N("4T")}v(1n).1N("7u 6R",13.c9);if(13.1o("5i")){v(1n).1N("eG",13.cF)}v(13.3G).3e(17(K){v(K.4y).cO()})},5b:17(Q){1a R;1a P;1a N;1a O;1a K;1a L=0;1a M=0;if(!13.1i.2h()||!13.2q||!13.1c.4Q||13.1c.2s||13.1c.2R){if(!13.1i.2h()&&!13.5d){if(Q){13.5d=m(Q);Q.4m()}13.1i.5D(13.7c.1D(13));if(!13.5k){13.5k=v(13.7I).1D(13).2G(9l)}}1b}if(Q&&Q.1x==="4B"&&Q.2r==="3v"){1b}if(!13.1o("4n")&&13.1o("2l")&&!13.1G){13.1c.2s=1s;1b}13.1c.2R=1s;if(13.1G&&13.1c.1W==="1l"){O=13.1i.1d.7E();13.5O.1B("1m-1l-in");K=13.5N.7E();M=((O.1P+O.2M)/2-(K.1P+K.2M)/2);L=((O.1H+O.2K)/2-(K.1H+K.2K)/2)}13.1c.1i.1N("2U");13.1c.1d.1Q("1m-97").1N("2U");13.1c.1d.1B("1m-2R");13.1d.1B("1m-2R");13.8d();P=(13.1c.1W==="1l")?13.1c.2n:13.1c.1W;if(q.1f.2N.26&&!(13.1G&&13.1o("3n")==="2T")){if(P==="2F"){N=13.1i.1d.1F();13.1c.1i.1z({2p:"4N(0,"+L+"2D, 0) 3Q("+N.1e/13.1K.1e+", "+N.1g/13.1K.1g+")"}).1F();13.1c.1i.1C("2U",v(17(){13.1c.1i.1N("2U");13.1c.1d.1Q("1m-2R 1m-p-"+P);13.1c.2R=1k;13.1c.2s=1s}).1D(13));13.1c.1d.1B("1m-p-"+P).1F();if(!q.1f.2J&&q.1f.6a&&(q.1f.4M==="6a"||q.1f.4M==="72")){13.1c.2R=1k;13.1c.2s=1s}}1j{13.1c.1d.1C("2U",v(17(){13.1c.1d.1N("2U");13.1c.1d.1Q("1m-2R 1m-p-"+P)}).1D(13));13.1c.1d.1z({26:"38"});13.1c.1d.1B("1m-p-"+P).1F();13.1c.1d.1z({26:""}).1F();13.1c.1d.1Q("1m-p-"+P);13.1c.2R=1k;13.1c.2s=1s}}1j{13.1c.1d.1Q("1m-2R");13.1c.2R=1k;13.1c.2s=1s}if(!13.1G){13.5K(1s)}if(Q){Q.2j().4m();R=Q.7P();if(13.1c.1W==="2C"&&(/2a/i).3j(Q.1x)){R.y-=13.1c.1g/2+10}if(P==="2F"&&((/2a/i).3j(Q.1x)||Q.6T())){13.1r.34={x:0,y:0};R.x=-(R.x-13.21.1P-13.1A.1e/2)*(13.1K.1e/13.1A.1e);R.y=-(R.y-13.21.1H-13.1A.1g/2)*(13.1K.1g/13.1A.1g)}}1j{R={x:13.21.1P+(13.21.2M-13.21.1P)/2,y:13.21.1H+(13.21.2K-13.21.1H)/2};if(q.1f.2J&&13.1G&&13.1o("3n")==="2T"){13.1r.65=1s;13.1r.34={x:0,y:0};R.x=-(R.x-13.21.1P-13.1A.1e/2)*(13.1K.1e/13.1A.1e);R.y=-(R.y-13.21.1H-13.1A.1g/2)*(13.1K.1g/13.1A.1g)}}13.1d.1Q("1m-2R").1B("1m-2s");R.x+=-M;R.y+=-L;13.1r.48={x:0,y:0};13.1r.dx=0;13.1r.dy=0;13.5E(Q,R,1s);I("bz",13.id)},4k:17(M,R){1a P;1a N;1a K;1a L;1a O=0;1a Q=0;1a S=13.1c.2s;13.5d=1h;if(!13.2q){1b}if(M&&M.1x==="cS"&&M.2r==="3v"){1b}3w(13.3O);13.3O=1h;3w(13.63);13.63=1h;13.1c.2R=1k;13.1c.2s=1k;if(R!==1s&&!13.1G){if(S){if(q.1f.2J&&!13.1G&&13.1c.1W==="1l"){13.8d()}1j{13.5K()}}}if(!13.1c.4Q){1b}if(M){M.2j()}13.1c.1i.1N("2U");13.1c.1d.1Q("1m-2R").1N("2U");if(13.1G){L=13.5N.7E();if(13.1o("3n")!=="2T"){13.5O.1Q("1m-1l-in")}13.1i.1d.1z({"2e-1g":13.7v()});K=13.1i.1d.7E();Q=((K.1P+K.2M)/2-(L.1P+L.2M)/2);O=((K.1H+K.2K)/2-(L.1H+L.2K)/2)}P=(13.1c.1W==="1l")?13.1c.2n:13.1c.1W;if(q.1f.2N.26&&M&&!(13.1G&&13.1o("3n")==="2T")){if(P==="2F"){13.1c.1i.1C("2U",v(17(){13.1c.1i.1N("2U");13.1d.1Q("1m-2s");4K(v(17(){13.1c.4c()}).1D(13),32)}).1D(13));N=13.1i.1d.1F();13.1c.1d.1B("1m-97 1m-p-"+P).1F();13.1c.1i.1z({2p:"4N(0,"+O+"2D,0) 3Q("+N.1e/13.1K.5y+", "+N.1g/13.1K.6n+")"})}1j{13.1c.1d.1C("2U",v(17(){13.1c.4c();13.1d.1Q("1m-2s")}).1D(13));13.1c.1d.3D("2y");13.1c.1d.1B("1m-97 1m-p-"+P);13.1d.1Q("1m-2s")}}1j{13.1c.4c();13.1d.1Q("1m-2s")}13.1r.dx=0;13.1r.dy=0;13.1r.48={x:0,y:0};13.1r.4c();if(S){I("eK",13.id)}},5E:17(U,T,S){1a M=T;1a O;1a N;1a Q=0;1a L;1a P=0;1a K;1a V;1a R=1k;if(!13.1c.2s&&!S){1b}if(U){v(U).4W().5w();if(U.6T()&&!U.5q()){1b}R=(/2a/i).3j(U.1x)||U.6T();if(R&&!13.1r.7W){13.1r.7W=R}if(!M){M=U.7P()}}if(13.1c.1W==="4L"){1b}if(13.1c.1W==="1l"&&13.1c.2n==="2F"&&(U&&R||!U&&13.1r.65)){13.1r.65=1s;O=13.1r.34.x+(M.x-13.1r.48.x);N=13.1r.34.y+(M.y-13.1r.48.y);13.1r.48=M;Q=1q.2f(0,13.1c.5x-13.1K.1e)/2;L=-Q;P=1q.2f(0,13.1c.4I-13.1K.1g)/2;K=-P}1j{13.1r.65=1k;if(13.1c.1W==="2C"){M.y=1q.2e(13.21.1H,1q.2f(M.y,13.21.2K));M.x=1q.2e(13.21.1P,1q.2f(M.x,13.21.2M))}O=M.x-13.21.1P;N=M.y-13.21.1H;L=13.1A.1e-13.1r.1e;K=13.1A.1g-13.1r.1g;O-=13.1r.1e/2;N-=13.1r.1g/2}if(13.1c.1W!=="2C"){O=1q.2e(Q,1q.2f(O,L));N=1q.2e(P,1q.2f(N,K))}13.1r.34.x=O;13.1r.34.y=N;if(13.1c.1W==="1l"){if(q.1f.2N.2p){13.1r.1d.1z({2p:"aT("+13.1r.34.x+"2D,"+13.1r.34.y+"2D)"});13.1r.1i.1z({2p:"aT("+-(13.1r.34.x+13.1r.3T.x)+"2D, "+-(13.1r.34.y+13.1r.3T.y)+"2D)"})}1j{13.1r.1d.1z({1H:13.1r.34.y,1P:13.1r.34.x});13.1r.1i.1z({1H:-(13.1r.34.y+13.1r.3T.y),1P:-(13.1r.34.x+13.1r.3T.x)})}}if(13.1c.1W==="2C"){if(13.1r.7W&&!(U&&U.1x==="3B")){M.y-=13.1c.1g/2+10}13.1c.1d.1z({1H:M.y-13.21.1H-13.1c.1g/2,1P:M.x-13.21.1P-13.1c.1e/2})}if(!13.3O){13.1r.dx=0;13.1r.dy=0;13.62(1)}},62:17(P){1a N;1a L;1a K;1a Q;1a O;1a M;if(!kj(P)){if(13.1r.65){P=13.1r.7W?0.4:0.16}1j{P=13.1o("fE")?0.2:13.1r.7W?0.4:0.8}}N=((13.1r.34.x-13.1r.dx)*P);L=((13.1r.34.y-13.1r.dy)*P);13.1r.dx+=N;13.1r.dy+=L;if(!13.3O||1q.3c(N)>0.bp||1q.3c(L)>0.bp){if(13.1r.65){K=13.1r.dx;Q=13.1r.dy}1j{K=(13.1r.dx*(13.1K.1e/13.1A.1e)-1q.2e(0,13.1K.1e-13.1c.5x)/2);Q=(13.1r.dy*(13.1K.1g/13.1A.1g)-1q.2e(0,13.1K.1g-13.1c.4I)/2);if(13.1c.1W==="2C"){K=1q.5H(K);Q=1q.5H(Q)}K=-K;Q=-Q}O=13.1K.1e/13.1K.5y;M=13.1K.1g/13.1K.6n;13.1c.1i.1z(q.1f.2N.2p?{2p:d+K+"2D,"+Q+"2D"+C+" 3Q("+O+","+M+")"}:{1e:13.1K.1e,1g:13.1K.1g,1P:-(13.1r.dx*(13.1K.1e/13.1A.1e)+1q.2f(0,13.1K.1e-13.1c.5x)/2),1H:-(13.1r.dy*(13.1K.1g/13.1A.1g)+1q.2f(0,13.1K.1g-13.1c.4I)/2)})}if(13.1c.1W==="2C"){1b}13.3O=4K(13.fT,16)},bM:17(){1a W;1a M;1a R=30;1a O=kn;1a T;1a U="";1a L={};1a K;1a Q;1a V=0;1a X={26:q.1f.9q+6E.7Z(32)+"gd 6d-6e(.18,.35,.58,1)"};1a N;1a S;1a P=v(17(Y){if(!13.2q||13.1c.2s){1b}if(Y.2b==="3Z"){3w(13.63);13.63=1h;V=0;L={x:Y.x,y:Y.y,fQ:Y.2Y};W=13.1A.1e;M=W/2;13.1i.1d.1N("2U");13.1i.1d.3R("26","");13.1i.1d.3R("2p","4N(0, 0, 0)");S=1h}1j{K=(Y.x-L.x);Q={x:0,y:0,z:0};if(S===1h){S=(1q.3c(Y.x-L.x)<1q.3c(Y.y-L.y))}if(S){1b}Y.2j();if(Y.2b==="aA"){V=0;N=1h;T=Y.2Y-L.fQ;if(1q.3c(K)>M||(T<O&&1q.3c(K)>R)){if((U=(K>0)?"fH":(K<=0)?"kr":"")){if(U==="fH"){N=13.8x();V+=W*10}1j{N=13.8O();V-=W*10}}}Q.x=V;Q.eu=-90*(Q.x/W);13.1i.1d.1C("2U",v(17(Z){13.1i.1d.1N("2U");13.1i.1d.3R("26","");if(N){13.1i.1d.1z({2p:"4N("+Q.x+"2D, 6B, 6B)"});13.4A(N,1s)}}).1D(13));13.1i.1d.1z(X);13.1i.1d.1z({"26-5C":Q.x?"jX":"gd",2y:1-0.2*1q.3c(Q.x/W),2p:"4N("+Q.x+"2D, 6B, 6B)"});K=0;1b}Q.x=K;Q.z=-50*1q.3c(Q.x/M);Q.eu=-60*(Q.x/M);13.1i.1d.1z({2y:1-0.2*1q.3c(Q.x/M),2p:"4N("+Q.x+"2D, 6B, "+Q.z+"2D)"})}}).1D(13);13.1d.1C("2w",P)},et:17(){1a M={1e:0,1g:0};1a O=1k;1a N;1a L=v(17(T,P,S){1a Q;1a R;if(!13.1c.2s&&!S){1b}1a U=q.3A(13.1K);Q=1q.2e(N.1e,1q.5H(M.1e*T));Q=1q.2f(Q,13.1K.5y);R=Q/(13.1K.5y/13.1K.6n);13.1K.1e=1q.4P(Q);13.1K.1g=1q.4P(R);13.1r.1e=1q.4i(13.1c.5x/(13.1K.1e/N.1e));13.1r.1g=1q.4i(13.1c.4I/(13.1K.1g/N.1g));13.1r.1d.1z({1e:13.1r.1e,1g:13.1r.1g});q.2c(13.1r,13.1r.1d.1F());3w(13.3O);13.3O=1h;P.x=13.1r.48.x*(13.1K.1e/U.1e)+(P.x-13.21.1P-13.1A.1e/2)*(1-(13.1K.1e/U.1e));P.y=13.1r.48.y*(13.1K.1g/U.1g)+(P.y-13.21.1H-13.1A.1g/2)*(1-(13.1K.1g/U.1g));13.1r.48={x:0,y:0};13.1r.34={x:0,y:0};13.1r.65=1s;13.5E(1h,{x:P.x,y:P.y});3w(13.3O);13.3O=1h}).1D(13);1a K=v(17(R){if(!O&&R.2b!=="66"&&!R.eV){1b}R.2j();1a Q=v(1n).7d();1a P=1k;1a S={x:R.6v.x-Q.x,y:R.6v.y-Q.y};4E(R.2b){1E"66":13.f8();M=q.3A(13.1K);if(13.1G){N=13.1i.1d.1F()}1j{N=13.1A}3w(13.3O);13.3O=1h;if(13.1c.2s){13.1r.48=q.3A(13.1r.34)}O=1s;1J;1E"f0":O=1k;if(13.1c.2s){if(13.1o("3n")!=="2T"&&13.1K.1e<=N.1e&&13.1K.1g<=N.1g){O=1k;13.4k(1h)}1j{if(R.6t.1I>0){13.1r.48={x:R.6t[0].3C,y:R.6t[0].3E}}}}13.aK();1J;1E"eY":1J;1E"eW":if(13.1G&&R.1l===-1&&(!13.1c.2s||13.1o("3n")==="2T")){if(R.3Q<c){13.5a()}}1j{if(13.1G&&R.1l===1&&13.1o("3n")==="2T"){}1j{if(13.1o("2l")&&!13.1G){if(R.3Q>x){O=1k;13.aK();13.2l(R);1b}}1j{if(R.1l===1&&!13.1c.2s){if(!13.1i.2h()||!13.2q||!13.1c.4Q){if(!13.1i.2h()&&!13.5d){if(R){13.5d=m(R);R.4m()}13.1i.5D(13.7c.1D(13));if(!13.5k){13.5k=v(13.7I).1D(13).2G(9l)}}1b}13.1c.2R=1s;if(13.1G&&13.1c.1W==="1l"){13.5O.1B("1m-1l-in")}13.1c.1i.1N("2U");13.1c.1d.1Q("1m-97").1N("2U");13.1c.1d.1B("1m-2R");13.1d.1B("1m-2R");13.8d();13.1K.1e=N.1e;13.1K.1g=N.1g;13.1c.2R=1k;13.1c.2s=1s;M=q.3A(13.1K);13.1c.1d.1Q("1m-2R");13.1d.1Q("1m-2R").1B("1m-2s");13.1r.48={x:0,y:0};13.1r.34={x:0,y:0};P=1s;if(!13.1G){13.5K(1s)}}L(R.3Q,S,P);if(P){I("bz",13.id)}}}}1J}}).1D(13);13.1d.1C("1O",K)},eZ:17(){1a K=1p.kq();v(["4p","4r","5a"]).3e(17(M){1a L="1m-2u";13.2v[M]=q.$1v("2u",{1x:"2u",7g:13.1o("aX-kp-"+M)}).1B(L).1B(L+"-"+M);K.bF(13.2v[M]);4E(M){1E"4p":13.2v[M].1C("2a 1X",17(N){N.2j();13.4A(13.8x())}.2H(13));1J;1E"4r":13.2v[M].1C("2a 1X",17(N){N.2j();13.4A(13.8O())}.2H(13));1J;1E"5a":13.2v[M].1C("2a 1X",17(N){N.2j();13.5a()}.2H(13)).4c();1J;1T:}},13);13.9r(13.3G.1I>1);13.7U=q.$1v("2Z").1B("1m-ko-b7").3f(K).29(13.1d)},9r:17(K){if(K){13.2v.4r.5A();13.2v.4p.5A()}1j{13.2v.4r.4c();13.2v.4p.4c()}},fN:17(){1a L;1a K;if(13.3G.1I){13.4R=13.3G}1j{L=13.3J.2o("3m-aW");if(L){if(q.1f.2N.bH){K=q.$A(1p.bI(\'.aH[3m-aW="\'+L+\'"], .9v[3m-aW="\'+L+\'"]\'))}1j{K=q.$A(1p.b2("A")).3a(17(M){1b L===M.2o("3m-aW")})}v(K).3e(17(N){1a M;1a O;M=n(N);if(M&&M.3G.1I>0){1b}if(M){O=1v o(M.1i.1M.1Y,M.1i.1l.1Y,M.1i.3q,1h,M.1i.4y);O.3X=M.1i.3X;O.3H=M.1i.3H}1j{O=1v o().as(N,M?M.7i:1h)}if((13.1i.1l.24.3u(O.1l.1Y)||13.1i.1l.1Y.3u(O.1l.1Y))&&(13.1i.1M.24.3u(O.1M.1Y)||13.1i.1M.1Y.3u(O.1M.1Y))){O=13.1i}13.4R.33(O)},13);13.7y=13.1i}}if(!13.81){13.81=1q.4P(1q.6c()*q.69())}if(13.4R.1I>1){13.5O.1B("fm-c8");13.5F=q.$1v("2Z",{"4l":"1m-2l-km"}).29(13.5O);13.4J=1v E(13.5F);v(13.4R).3e(17(M){1a N=v(17(O){13.9Z(M);13.4A(M)}).1D(13);M.fa=13.4J.fk(q.$1v("1Z",{24:M.6F("1M"),3H:M.3H}).1C("2a 1X",17(O){O.2j()}).1C("2a "+(13.1o("cm")==="7B"?"8m 8C":"1X"),v(17(P,O){if(13.6z){3w(13.6z)}13.6z=1k;if(P.1x==="8m"){13.6z=v(N).2G(O)}1j{if(P.1x==="2a"||P.1x==="1X"){N()}}}).2H(13,60)))},13)}1j{13.5O.1Q("fm-c8")}13.9r(13.4R.1I>1);13.2v.5a.5A()},fA:17(){1a K;if(13.4J){13.4J.2j();13.4J=1h}if(13.5F){13.5F.2X();13.5F=1h}13.9r(13.3G.1I>1);13.2v.5a.4c();if(13.4R.1I>1&&!13.3G.1I){13.1d.1N("2w");13.1i.1d.2X().2o("2k");13.1i.1d.5l("2k");13.7y.1d.29(13.1d);13.7c(13.7y);5v(K=13.4R.kl()){if(K!==13.7y){if(K.1M.1d){K.1M.1d.5m();K.1M.1d=1h}if(K.1l.1d){K.1l.1d.5m();K.1l.1d=1h}K=1h}}}13.4R=[]},5a:17(){if(!13.2q||!13.1G){1b}if(q.1f.4F==="8e"&&q.1f.4M==="9x"&&6k(q.1f.7t)===7){fi(h);h=1h}v(1p).1N("bJ",13.aS);13.4k(1h,1s);13.2q=1k;if(q.1f.5o.a5&&q.1f.5o.4Q()){q.1f.5o.fh()}1j{if(q.1f.2N.26){13.1d.1N("2U").1z({26:""});13.1d.1C("2U",13.8E);if(q.1f.3W){4K(v(17(){13.8E()}).1D(13),kk)}13.4d.1N("2U").1z({26:""});13.4d.1z({26:"es 0.6s 6d-6e(0.en, 0.ki, 0.eo, 0.kg) 0.9U"}).1F();13.1d.1z({26:"es .3s 6d-6e(0.9z, 0, 0.ek, 0.bt) 9U"}).1F();if(13.1c.1W!==1k&&13.1o("3n")==="2T"&&13.1o("59")!=="2C"){13.1i.1d.1z({"2e-1g":13.1i.1F("1l").1g});13.1i.1d.1z({"2e-1e":13.1i.1F("1l").1e})}13.4d.1z({2y:0.4});13.1d.1z({2y:0.k6,2p:"3Q(0.4)"})}1j{13.8E()}}},2l:17(L){if(!13.1i.2h()||!13.2q||13.1G){if(!13.1i.2h()&&!13.5d){if(L){13.5d=m(L);L.4m();if(L.1x==="2a"){L.6Z[1].4m()}}13.1i.5D(13.7c.1D(13));if(!13.5k){13.5k=v(13.7I).1D(13).2G(9l)}}1b}if(L){L.4m()}1a K=v(13.1d).1R("cr");13.c7();13.6X--;13.4k(1h,1s);13.aF();13.aP();13.2q=1k;if(!13.3h){13.3h=q.$1v("2Z").1B("1m-2l").1B(13.1o("5W")).1z({2y:0});13.5O=q.$1v("2Z").1B("1m-2l-fM").29(13.3h);13.3h.1C("4T 5t 3B",v(17(M){v(M).2j()}));if(13.1o("fu")){13.3h.1C("2a 1X",17(O){1a N=O.5Y();1a M=v(13.1o("59")==="2C"?13.1c.1d:13.1c.1i).7E();if(13.1o("3n")!=="2T"&&M.1H<=N.y&&N.y<=M.2K&&M.1P<=N.x&&N.x<=M.2M){O.4m();13.4k(O);1b}if(13.1o("3n")!=="2T"&&13.1d.aB(O.gl())){1b}O.2j();13.5a()}.2H(13))}13.aS=v(17(N){1a M=1h;if(N.8p!==27&&N.8p!==37&&N.8p!==39){1b}v(N).2j();if(N.8p===27){13.5a()}1j{M=(N.8p===37)?13.8x():13.8O();if(M){13.4A(M)}}}).2H(13);13.8F=v(17(){1a O;13.1d.1N("2U").1z({26:"",2p:"4N(0, 0, 0)"});if(13.1G){1b}13.1G=1s;if(13.1o("5i")){3d{1a M="#1m-1G-aO-"+13.81;if(1n.fB.fC!==M){if(5i.2b&&5i.2b.cp&&5i.2b.ax){5i.kc({cp:13.81,ax:13.id},1p.7g,M)}1j{5i.k8({cp:13.81,ax:13.id},1p.7g,M)}}}3p(N){}}13.3h.1Q("1m-2l-kh").1z({2y:1});13.1c.a9(13.1o("59"));13.1K=q.3A(13.3r);13.5P();if(13.3S&&13.1i.3q){13.3S.1B("1m-5A")}if(13.1o("3n")!=="2T"){13.8D(1s);13.8q(1s)}13.2q=1s;if(13.1o("3n")==="2T"){if(13.1c.1W!==1k){13.1c.6Y(1s)}if(q.1f.2J&&13.8X){13.8X=1k}13.5b()}if((q.1f.2J||13.1o("9Y"))&&13.8X&&13.1c.4Q){13.5K(1s,13.1o("9T"));if(13.6X!==6m){13.8X=1k}}13.7U.1Q("1m-3t").1B("1m-9g 1m-5M");if(13.5F){13.5F.1Q("1m-3t").1B("1m-9g 1m-5M")}if(13.4J){13.4J.bO();13.9Z(13.1i)}if(K){K.29(13.3h,((1q.4P(1q.6c()*bP)+1)%2)?"1H":"2K")}if(13.4R.1I>1&&!13.3G.1I){13.bM()}v(1p).1C("bJ",13.aS);if(q.1f.4F==="8e"&&q.1f.4M==="9x"&&6k(q.1f.7t)===7){h=J()}I("fz",13.id)}).1D(13);13.8E=v(17(){13.1d.1N("2U");if(!13.1G){1b}if(13.1G){v(1p).1N("bJ",13.aS);13.4k(1h,1s)}13.6b(1s);13.fA();13.1G=1k;if(13.1o("5i")){if(1n.fB.fC==="#1m-1G-aO-"+13.81){5i.kG()}}13.1c.a9(13.1o("4n"));13.1d.80(13.1i.7l("1M"),13.1i.1d);13.1i.7m("1M");v(13.1i.1d).1z({1e:"",1g:"","2e-1e":1q.2f(13.1i.1F("1M").1e),"2e-1g":1q.2f(13.1i.1F("1M").1g)});13.1r.1i.24=13.1i.6F("1M");13.1d.1z({2y:"",26:""});13.1d.1z({2p:"4N(0, 0, 0)"});v(13.3J).80(13.1d,13.8S);13.7U.1Q("1m-2l-b7").1Q("1m-3t").1B("1m-9g 1m-5M").29(13.1d);13.6b(1s);if(13.3S){13.3S.2X();13.3S=1h}13.aF();13.aP();if(13.1o("4G")==="2T"){13.5b()}1j{if(13.1o("4n")!==1k){13.8D(13.1o("4G")==="2I");13.8q(13.1o("4G")==="2I")}}13.5K();13.4d.1N("2U");13.3h.2X();13.4d.2X();13.4d=1h;if(G){G.2X()}v(q.1f.4u()).1Q("1m-1G-aO-93");13.2q=1s;if(q.1f.2L<10){13.5P()}1j{v(1n).ci("fF","7u")}I("fG",13.id)}).1D(13);13.6N=q.$1v("2Z",{"4l":"1m-1i-fM"}).29(13.5O);13.5N=q.$1v("5L").29(13.6N);13.8S=13.1d.b9(1k)}13.7U.1B("1m-2l-b7").29(13.6N);13.fN();if(G){G.29(1p.3l)}v(q.1f.4u()).1B("1m-1G-aO-93");v(1p.3l).1F();if(13.1o("2l")==="fP"){13.cu();q.1f.5o.cH(13.3h,{cE:v(17(){13.8F()}).1D(13),cL:13.8E,8G:v(17(){13.bu()}).1D(13)})}1j{4K(v(17(){13.cu();13.bu()}).1D(13),96)}},cu:17(){1a L;1a K;L=q.$1v("1Z",{ct:13.1i.6F("1l")+" "+13.1i.cJ("1l")+"x",24:13.1i.6F("1l"),3H:13.1i.3H});13.4d=q.$1v("2Z").1B("1m-2l-bg").3f((q.1f.2N.8M||q.1f.2L<10)?L:1v q.9P(L).5J(k).7l()).29(13.3h);if(13.1o("3n")==="2T"&&13.1o("59")!==1k){13.5O.1B("1m-2T-1l"+(13.1o("59")==="1l"?" 1m-1l-in":"")).1F()}K=v(13.1d)[(q.1f.2L<10)?"1F":"6L"]();v(13.8S).1z({1e:K.1e,1g:K.1g});13.1d.80(13.1i.7l("1l"),13.1i.1d);13.1i.7m("1l");13.3h.29(1p.3l);if(G){13.3h.1z({1g:1n.4I,6n:"ee",1H:1q.3c(G.6L().1H)})}13.8f=17(){1a M=13.6N;if(v(13.5N).1F().1e>50){M=13.5N}1b 17(){1b 13.1o("3n")==="2T"&&13.1o("59")!==1k&&13.1o("59")!=="2C"?6m:1q.5H(v(M).9e().1e)}}.2g(13);13.7v=17(){1a M=13.6N;if(v(13.5N).1F().1g>50){M=13.5N}1b 17(){1b 13.1o("3n")==="2T"&&13.1o("59")!==1k&&13.1o("59")!=="2C"?6m:1q.5H(v(M).9e().1g)}}.2g(13);13.7U.1Q("1m-9g 1m-5M").1B("1m-3t");if(13.5F){13.5F.1Q("1m-9g 1m-5M").1B("1m-3t")}if(13.1o("3S")){13.3S=q.$1v("fX",{"4l":"1m-3q"}).29(13.6N);if(13.3S&&13.1i.3q){if(13.1i.3X){13.3S.3f(q.$1v("a",{7h:13.1i.3X}).1C("2a 1X",13.aQ.1D(13)).5V(13.1i.3q))}1j{13.3S.5V(13.1i.3q)}}}13.1i.1d.1z({"2e-1g":1q.2f(13.1i.1F("1l").1g,13.7v())});13.1i.1d.1z({"2e-1e":1q.2f(13.1i.1F("1l").1e,13.8f())});13.5N.3f(v(13.3J).80(13.8S,13.1d))},bu:17(){13.1d.1z({26:""});13.1d.1z({2p:"3Q(0.6)"}).1F();13.1d.1z({26:q.1f.9q+" 0.4s 6d-6e(0.a1, 0.cy, 0.gn, 1) 9U"});if(q.1f.2N.26){13.1d.1C("2U",13.8F);if(q.1f.6a&&(q.1f.4M==="6a"||q.1f.4M==="72")){4K(v(17(){13.8F()}).1D(13),cn)}}1j{13.8F.2G(16,13)}13.3h.1z({2y:1});13.1d.1z({2p:"3Q(1)"})},aQ:17(){if(13.1i.3X){1n.93(13.1i.3X,"jr")}},8O:17(){1a K=(13.1G?13.4R:13.3G).3a(17(N){1b(N.1M.2b!==-1||N.1l.2b!==-1)});1a L=K.1I;1a M=v(K).4U(13.1i)+1;1b(L<=1)?1h:K[(M>=L)?0:M]},8x:17(){1a K=(13.1G?13.4R:13.3G).3a(17(N){1b(N.1M.2b!==-1||N.1l.2b!==-1)});1a L=K.1I;1a M=v(K).4U(13.1i)-1;1b(L<=1)?1h:K[(M<0)?L-1:M]},fS:17(L,M){1a K=13.3G.3a(17(N){1b((N.1l.24.3u(L)||N.1l.1Y.3u(L))&&(N.1M.24.3u(M)||N.1M.1Y.3u(M)))})||[];1b K[0]||((M&&L&&q.1V(M)==="1S"&&q.1V(L)==="1S")?1v o(M,L):1h)},cT:17(L){1a K=13.3G.3a(17(M){1b(M.4y===L)})||[];1b K[0]},er:17(K){1b 13.3G[K]}};e={4C:"fq.3.7 (jH)",4O:17(N,L){1a M=1h;1a K=[];q.$A((N?[v(N)]:q.$A(1p.aI("aH")).67(q.$A(1p.aI("9v"))))).3e(v(17(O){if(v(O)){if(!n(O)){M=1v z(O,L);if(l&&!M.1o("c3")){M.2j();M=1h}1j{t.33(M);K.33(M)}}}}).1D(13));1b N?K[0]:K},2j:17(N){1a L,M,K;if(N){(M=n(N))&&(M=t.8V(t.4U(M),1))&&M[0].2j()&&(4S M[0]);1b}5v(L=t.1I){M=t.8V(L-1,1);M[0].2j();4S M[0]}},lV:17(K){13.2j(K);1b 13.4O(K)},4A:17(P,O,N,L){1a M=n(P);1a K;if(M){K=q.1V(O)==="6S"?M.cT(O):M.fS(O,N);if(K){M.4A(K)}}},lO:17(N,M){1a L=n(N);1a K;if(L){4E(q.1V(M)){1E"6S":K=L.cT(M);1J;1E"5Z":K=L.er(M);1J;1T:}if(K){L.4A(K)}}},4p:17(L){1a K;(K=n(L))&&K.4A(K.8x())},4r:17(L){1a K;(K=n(L))&&K.4A(K.8O())},lI:17(L){1a K;(K=n(L))&&K.5b()},lX:17(L){1a K;(K=n(L))&&K.4k()},2l:17(L){1a K;(K=n(L))&&K.2l()},5a:17(L){1a K;(K=n(L))&&K.5a()},dS:17(K,L){if(!F[K]){F[K]=[]}if(q.1V(L)==="17"){F[K].33(L)}},m3:17(K){1b!!n(K)}};v(1p).1C("9W",17(){1a L=1n[j+"7X"]||{};y=y();A();r=q.$1v("2Z",{"4l":"2W-3t-7p"}).29(1p.3l);p=(q.1f.2J&&1n.fY&&1n.fY("(2e-fw-1e: fI), (2e-fw-1g: fI)").l2);if(q.1f.2J){q.2c(b,D)}if(p&&q.1f.4F==="8e"){G=q.$1v("2Z").1z({2n:"lA",1H:0,1e:0,1g:"ee"})}1U(1a K=0;K<u.1I;K++){if(L[u[K]]&&q.$F!==L[u[K]]){e.dS(u[K],L[u[K]])}}e.4O();l=1k});1n.9v=1n.9v||{};1b e})();',62,1372,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this||||function|||var|return|zoomBox|node|width|browser|height|null|image|else|false|zoom|mz|window|option|document|Math|lens|true|event|Event|new|Custom|type|options|jSetCss|size|jAddClass|jAddEvent|jBind|case|jGetSize|expanded|top|length|break|zoomSize|handler|small|jRemoveEvent|pinch|left|jRemoveClass|jFetch|string|default|for|jTypeOf|mode|btnclick|url|img||boundaries|||src||transition|||jAppendTo|tap|state|extend||max|min|call|loaded|arguments|stop|style|expand|important|position|getAttribute|transform|ready|pointerType|active|prototype|button|buttons|touchdrag||opacity|auto|parseFloat|jDel|magnifier|px|enum|inner|jDelay|jBindAsEvent|click|mobile|bottom|ieMode|right|features|jStore|100|undefined|activating|mousedrag|always|transitionend|context|magic|jRemove|timeStamp|div||||push|pos||jCallEvent||none||filter|setAttribute|abs|try|jEach|append|boolean|expandBox|oneOf|test|listeners|body|data|expandZoomOn|hint|catch|caption|zoomSizeOrigin||hidden|has|touch|clearTimeout|rootCSS|settings|handle|detach|dbltap|clientX|jGetCss|clientY|defined|additionalImages|alt|navigator|placeholder|Doc|match|orientation|pageY|moveTimer|pageX|scale|jSetCssProp|expandCaption|border|instanceof|Class|webkit|link|init|dragstart|parent|target||originalImg|||||spos|parentNode|touchend|disabled|hide|expandBg|off|Element|hasOwnProperty|pointerup|ceil|pointerId|deactivate|class|stopQueue|zoomMode|contains|prev|handlers|next||dblbtnclick|getDoc|replace|pushToEvents|firstChild|origin|custom|update|pointermove|version|styles|switch|platform|zoomOn|array|innerHeight|expandThumbs|setTimeout|preview|uaName|translate3d|start|floor|enabled|expandGallery|delete|mousescroll|indexOf|J_TYPE|stopDefaults|changedTouches|schema|visibility||Array|css||||reverse|documentElement||expandZoomMode|close|activate|root|initEvent|toLowerCase|vertical|jTrim|onTouchEnd|history|domPrefix|loadTimer|removeAttribute|kill|trident|fullScreen|requestAnimationFrame|isPrimaryTouch|direction|pow|touchstart|messageBox|while|stopDistribution|innerWidth|maxWidth|constructor|show|distance|duration|load|animate|expandNav|dragged|round|space|blur|showHint|figure|visible|expandFigure|expandStage|resizeCallback|engine|timer|absolute|variables|cubicBezier|changeContent|cssClass|pointerdown|jGetPageXY|number|||move|activateTimer|onTouchStart|innertouch|pinchstart|concat||now|chrome|setSize|random|cubic|bezier|add|canvas|not|jCamelize|identifier|parseInt|throw|Infinity|maxHeight|FX|no|addCSS|onerror||points|apply|centerPoint|mouseup|ease|onTouchMove|updateTimer|selectedItem|0px|display|MSPOINTER_TYPE_TOUCH|String|getURL|to|dppx|onload|getAbsoluteURL|loadingBox|getBoundingClientRect|J_UUID|expandImageStage|className|touchmove|nodeType|scroll|element|isTouchEvent|targetTouches|ms|isQueueStopped|hintRuns|enable|events||getPrimaryTouch|opera|wunits|hunits|cache|gecko||mousemove|thumb|pointerEnabled|mousedown|setupZoom|jGetScroll|selected|render|title|href|originalTitle|temporary|set|getNode|setCurNode|join|MagicJS|wrapper|found|Object|filters|uaVersion|resize|expandMaxHeight|shift|getButton|primaryImage|tm|timedout|hover|doc|slice|jGetRect|isPrimary|alternate|continuous|showLoading|onready|padding|cssTransformProp|TouchEvent|activepoints|oncomplete|getClientXY|callback|cycles|typeof|end|navControlsLayer|threshold|touchmovement|Options|easeFn|fromCharCode|replaceChild|expandedViewId||tooltip||||onComplete|lazyZoom|android|minimum|originalImage|_handlers|reflowZoom|ios|expandMaxWidth|overflow|200|currentSrc|svg|toUpperCase|trigger|mouseover|normalSize|onClick|keyCode|registerDeactivateEvent|createElement|deltaY|zoomCaption|_EVENTS_|loadSmall|getRelated|getPrev|storage|index|margin|msPointerEnabled|mouseout|registerActivateEvent|onClose|onExpand|fallback|byTag|setProps|crMz|Transition|originalImgSrc|cssFilters|androidBrowser|getNext|tagName|parseCubicBezier|_unbind|stubNode|scrollTop|complete|splice|scrollLeft|mobileZoomHint|_cleanup|fromJSON||_timer|split|open||||deactivating|||cssPrefix|itemCSS|jGetPosition|horizontal|getInnerSize|setOrientation|fade|readyState|on|toString|continue|400|magiczoom|reset|object|getPrimaryTouchId|cssTransform|toggleNavButtons|normalizeCSS|dashize|hideTimer|MagicZoomPlus|touchScreen|safari|createElementNS|600|charAt|textExpandHint|btnclickEvent|createTextNode|linear|sqrt|Message|startAttempts|fromString|reflow|implement|exitFullscreen|perspective|naturalWidth|compatMode|SVGImage|XMLHttpRequest|html|pStyles|textClickZoomHint|0s|eventType|domready|runtime|forceTouch|setActiveThumb|Opacity|175|pStyles_arr|exists|started|capable|onprogress|isNaN|nextImage|setMode|||||||||||||||||||parseNode|||||mzId|PFX|forEach|dragend|hasChild|xhr|forceAnimation|status|unregisterActivateEvent|MSPointerMove|MagicZoom|byClass|loopBind|registerAnimateEvent|_bind|relatedTarget|cancelAnimationFrame|view|unregisterDeactivateEvent|openLink|setVariables|keyboardCallback|translate|callee|dblclick|gallery|text|J_EUID|createEvent|win|getStorage|getElementsByTagName|handleMouseUp|_event_prefix_|calc|picture|controls|_event_del_|cloneNode|presto||1000|cssDomPrefix|J_EXT|opr||startTime|maximum|ImageLoader|loadImg|once|stopAnimation|ifndef|hideFX|000001|resizeTimer|cycle|querySelector|045|expandToWindow|dispatchEvent|changeEventName|loadedBytes|scrollFX|onZoomIn|selectorsMoveFX|onclick|uuid|300|or|appendChild|handleMouseDown|query|querySelectorAll|keydown|Date|errorEventName|swipe|deltaMode|run|101|ignore|Function|caller|startSpace|Za|Alpha|http|mgctlbx|www|w3|assign|onabort|org|autostart|Pltm|10000px|removeChild|hideHint|thumbs|onResize|hintMessage|getTarget|mzCrA|inline||span|textHoverZoomHint|aspectRatio|jRaiseEvent|HTMLElement|getElementsByClassName|delay|selectorTrigger|500|startTimer|expandedView|onBeforeRender||onZoomReady|srcset|prepareExpandedView|rel|0001|loadZoom|885|05|_event_add_|hideLoading|https|styles_arr|onEnter|onHistoryStateChange|el_arr|request|priority|getRatio|isMouse|onExit|zoomPosition|abort|jClearEvents|deltaX|cubicBezierAtTime|Tooltip|pointerout|imageByOrigin|easeOutSine|easeInExpo|onxhrerror|clientWidth|Right|requestFullScreen|handleMouseMove|stdDeviation|styleFloat|filterBlur|naturalHeight|compareDocumentPosition|Top|Left|detail|165|getElementById|dragmove|cos|wheelDeltaX|easeOutExpo|progressiveLoad|referrerPolicy|Bottom|xhr2|easeInSine|wheelDelta|PI|items|setupContent||loadBlob|initDrag|easeOutCubic|UUID|loop|03|toArray|jSetOpacity|||onStart|interval|item|progid|clear|fps|355|finishTime|parseSchema|DXImageTransform|Number|Microsoft|jToBool|webkit419|offsetWidth|onAfterRender|out|setMessage|euid|registerCallback|addEventListener|getComputedStyle|999|easeInQuad|offsetParent|stopPropagation|easeOutQuad|jDefer|error|offsetTop|easeInCubic|offsetLeft|onreadystatechange|easeInBack|jHasClass|cancelBubble|easeOutBack|preventDefault|isReady|304|elasticIn|100vh|wrap|which|bounceIn|wheelDeltaY|insertRule|735||lineHeight|895|685|DocumentTouch||imageByIndex|all|pinchToZoom|deg|zoomHeight|zoomWidth|2147483647|mozCancelAnimationFrame|variableZoom|color|zIndex|changeZoomLevel|onUpdate|unregisterEvents|scrollbarsWidth|popstate|fontWeight|100000|ACwAAAAAAQABAAACADs|onZoomOut|R0lGODlhAQABAAD|base64|gif|10000|multibackground|rightClick|sheet|MouseEvent|MSPointerUp|cssText|cloned|pinchmove|MSPointerOut|pinchresize|setupButtons|pinchend|registerEvents|MSPointerDown|od|mouse|styleSheet|hone|upscale|unregisterAnimateEvent|shown|selector|setupSelectors|transitionEffect|RegExp|stopImmediatePropagation|onswipe|mjs|cancel|clearInterval|magicJS|addItem|backcompat|with||selectItem|setCaption|v5|0ms|background|enclose|closeOnClickOutside|date|device|charCodeAt|loadOptions|onExpandOpen|destroyExpandGallery|location|hash|phone|smoothing|UIEvent|onExpandClose|backward|767px|textnode|screenX|Click|stage|setupExpandGallery|onchange|fullscreen|ts|cancelFullScreen|imageByURL|moveBind|nativize|getTime|msExitFullscreen|figcaption|matchMedia|ver|10px|Webkit|animation|getContext|firefox|crios|Moz|block|deleteRule|moz|stylesId|touchOptions|getJSON|300ms|backCompat|screenY|ua|removeRule|mac|rt|get|getOriginalTarget|setInterval|320|documentMode|screen|plucker|ixi|xxxxxxxx|re|netfront|yxxx|mmp|os|kindle|maemo|lge|xxxx|midp|palm|4xxx|ob|iris|MSFullscreenError|xxxxxxxxxxxx|startScale|hasFeature|implementation|withCredentials|FormData|ProgressEvent|msCancelFullScreen|mozCancelFullScreen|webkitCancelFullScreen|jToInt|webkitexitFullscreen|9007199254740991|msFullscreenEnabled|Map|fullscreenEnabled|air|evaluate|xpath|edge|userAgent|toFloat|TR|map|iemobile|blackberry|hiptop|xy|fennec|getHashCode|elaine|compal|4294967296|blazer|collection|bada|SVG11|avantgo|meego|msMaxTouchPoints|maxTouchPoints|regexp|ontouchstart|psp|Image|feature|pocket|ActiveXObject|series|webkitCancelRequestAnimationFrame|jGetStyles|webkitTransitionEnd|WebKitTransitionEvent|TransitionEvent|cssfilters|head|2px|jGetTransitionDuration|red|9999|msCancelAnimationFrame|currentStyle|oCancelAnimationFrame|offsetHeight|jGetFullScroll|cssRules|msRequestAnimationFrame|clientTop|addRule|clientLeft|rules|jGetOffset|jToggleClass|536|webkitRequestAnimationFrame|FullScreen|prefix|activeElement|fullscreenchange|MSFullscreenChange|CancelFullScreen|ExitFullscreen|RequestFullScreen|RequestFullscreen|requestFullscreen|Width|webkitIsFullScreen|getPropertyValue|FullscreenElement|fullscreenElement|MSPointer|float|pointer||||Out|cssFloat|Over|Move|Up|Down|oRequestAnimationFrame||innerHTML||symbian|sort|MSPointerOver|fromElement|toElement|removeEventListener|xiino|attachEvent|detachEvent|KeyEvent|xda|KeyboardEvent|generateUUID|srcElement|windows|createEventObject|wap|fireEvent|vodafone|420|doScroll|up|DOMContentLoaded|treo|pointerover|returnValue|mozRequestAnimationFrame|DOMElement|innerText|childNodes|other|insertBefore|linux|removeCSS|webos|jGetStyle|jSetStyle|iframe|presto925|fullscreenerror|unknown|clientHeight|pageXOffset|pageYOffset|jGetFullSize|scrollWidth|scrollHeight|taintEnabled|WebKitPoint|mozInnerScreenY|getBoxObjectFor|oCancelFullScreen|v3|MZ|TypeError|1999|xlink|setAttributeNS|feGaussianBlur|SourceGraphic|units|sides|ul|_self|Cannot|isset|convert|zoomDistance|Hover|textBtnNext|Next|textBtnPrev|Previous|textBtnClose|Close|Tap|2000|parameter|Double|Plus|expoIn|expoOut|quadIn|quadOut|cubicIn|cubicOut|backIn|backOut|elasticOut|bounceOut|the|MagicToolboxTooltip|MessageBox|5000|NEGATIVE_INFINITY|100ms|JSON|parse|Incorrect|definition|of|Touch|devicePixelRatio|sineIn|01|256|pushState|relative|160|350|replaceState|message|loading|120|220|opening|030|isFinite|260|pop|thumbnails|201|nav|btn|createDocumentFragment|forward|dummy|font|mgctlbxN|radius|mgctlbxV|mgctlbxL|mgctlbxP|z0|9_|scrollTo|availWidth|availHeight|250|before|back|2em|rev|selectstart|MobileOptions|PICTURE|contextmenu|fontSize|fontFamily|sans|serif|textAlign|sineOut|POSITIVE_INFINITY|565|easeInOutQuad|575|onwheel|easeInOutSine|445|085|000244140625|matches|deltaFactor|455|745|515|955|055|675|215|webkitURL|easeInOutCubic|645|715|wheel|easeOutQuart|blob||total|static|progress|response|537|createObjectURL|GET|responseType|send|mousewheel||URL|referrerpolicy|destroy|infinite|normal|roundCss|fixed|setTransition|curFrame|easeInQuart|deltaZ|lengthComputable|075|035|zoomIn|easeInOutExpo|easeInCirc|04|335|easeOutCirc|switchTo|07|easeInOutCirc|785|135|275|easeInOutBack|refresh|265|zoomOut|795|easeInOutQuint|06|delta|easeInOutQuart|running|755|855|easeInQuint|easeOutQuint'.split('|'),0,{}));

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick',
                '*:not(.slick-arrow)', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            _.setPosition();

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));
