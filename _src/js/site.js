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
      Site.filter();
      Site.toggle();
      Site.sitereveal();
      Site.lightbox();
      Site.sticky();
      Site.print();
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