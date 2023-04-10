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
