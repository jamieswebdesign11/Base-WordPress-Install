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