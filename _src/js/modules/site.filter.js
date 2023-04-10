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