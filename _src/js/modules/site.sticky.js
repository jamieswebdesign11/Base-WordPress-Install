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
