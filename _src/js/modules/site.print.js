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