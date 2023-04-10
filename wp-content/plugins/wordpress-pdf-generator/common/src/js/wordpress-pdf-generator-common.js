(function( $ ) {
	'use strict';
	/**
	 * All of the code for your common JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	jQuery(document).ready(function(){
		// create zip of bulk products.
		$(document).on("click", "#pgfw-create-zip-bulk", function(){
			var self = this;
			var cur_html = $(self).html();
			$(self).html('<img src="' + wpg_common_param.loader + '" style="width:20px;height:20px;display:inline;">');
			wpg_ajax_for_zip_or_pdf( 'pdf_bulk_download_zip' );
			$(self).html(cur_html);
		});
		// create pdf in continuation of bulk.
		$(document).on('click', '#pgfw-create-pdf-bulk', function() {
			var self = this;
			var cur_html = $(self).html();
			$(self).html('<img src="' + wpg_common_param.loader + '" style="width:20px;height:20px;display:inline;">');
			wpg_ajax_for_zip_or_pdf( 'pdf_bulk_download_continuation' );
			$(self).html(cur_html);
		});
		// ajax to create pdf for bulk and download it.
		function wpg_ajax_for_zip_or_pdf( name ) {
			$.ajax({
				url    : wpg_common_param.ajaxurl,
				method : 'post',
				data   : {
					action : 'wps_wpg_ajax_for_zip_or_pdf',
					nonce  : wpg_common_param.nonce,
					name   : name,
				},
				success: function( msg ) {
					$('#pgfw-download-zip-parent').html('<a href="' + msg + '" download id="pgfw-download-zip"></a>');
					$('#pgfw-download-zip')[0].click();
					$('#pgfw-download-zip-parent').html('');
				}
			});
		}
		// delete products from the bulk list ajax.
		$(document).on('click', '.pgfw-delete-this-products-bulk', function(e) {
			e.preventDefault();
			var self = this;
			var cur_html = $(self).html();
			$(self).html('<img src="' + wpg_common_param.loader + '" style="width:10px;height:10px;display:inline;">');
			var product_id = $(this).data('product-id');
			$.ajax({
				url    : wpg_common_param.ajaxurl,
				method : 'post',
				data   : {
					action     : 'wpg_delete_product_from_cookies',
					product_id : product_id,
					nonce      : wpg_common_param.nonce,
				},
				success : function( msg ) {
					$(self).html(cur_html);
					$('.wps_pgw-button_content').html(msg);
					var cur_count = $('.wps_pgfw-display-value').text();
					cur_count     = parseInt( cur_count ) -1;
					$('.wps_pgfw-display-value').text( cur_count );
					if ( cur_count <=0 ) {
						$('.wps_pgw-button_wrapper').hide();
					}
					location.reload();
				},
				error: function() {
					$(self).html(cur_html);
				}
			});
		});
		// user email submittion from modal on creating bulk PDF.
		$(document).on('click','#pgfw-submit-email-user-bulk',function(e){
			e.preventDefault();
			var email                  = $('#pgfw-user-email-input-bulk').val();
			var use_account_email      = $('#pgfw-user-email-from-account-bulk').is(':checked');
			var pdf_continuation_email = $('#pgfw-bulk-email-continuation-pdf').is(':checked');
			var pdf_zip_email          = $('#pgfw-bulk-email-zip-pdf').is(':checked');
			$('#pgfw-user-email-submittion-message-bulk').html(wpg_common_param.processing_html);
			$.ajax({
				url    : wpg_common_param.ajaxurl,
				method : 'post',
				data   : {
					action : 'wps_wpg_ajax_for_zip_or_pdf',
					nonce  : wpg_common_param.nonce,
					name   : ( pdf_continuation_email ) ? 'pdf_bulk_download_continuation' : 'pdf_bulk_download_zip',
					mode   : 'email',
					email  : ( use_account_email ) ? 'use_account_email' : email,
				},
				success : function( msg ) {
					$('#pgfw-user-email-submittion-message-bulk').html(msg);
					setTimeout(function(){ location.reload(); }, 5000);
				}, error : function() {
					$('#pgfw-user-email-submittion-message-bulk').html(wpg_common_param.email_submit_error);
				} 
			});
		});
		// add product to bulk ajax.
		$('#pgfw-bulk-product-add').on('click',function(e){
			e.preventDefault();
			var self = this;
			var cur_html = $(self).html();
			$(self).html('<img src="' + wpg_common_param.loader + '" style="width:20px;height:20px;display:inline;">');
			var product_id = $(self).data('product-id');
			$.ajax({
				url         : wpg_common_param.ajaxurl,
				method      : 'post',
				cache       : false,
				crossDomain : true,
				xhrFields   : {
					withCredentials: true
				},
				data : {
					action     : 'wpg_bulk_add_products_ajax',
					product_id : product_id,
					nonce      : wpg_common_param.nonce,
				},
				success : function( msg ) {
					$(self).html(cur_html);
					if ( msg <= 1 ) {
						location.reload();
					}
					$('.wps_pgfw-display-value').text(msg);
				},
				error : function() {
					$(self).html(cur_html);
				}
			});
		});
		// bulk display of products chart ajax.
		$('.wps_pgw-button').on('click',function(e){
			e.preventDefault();
			var self = this;
			var cur_html = $(self).html();
			$(self).html('<img src="' + wpg_common_param.loader + '" style="width:20px;height:20px;display:inline;">');
			$.ajax({
				url    : wpg_common_param.ajaxurl,
				method : 'post',
				data   : {
					action : 'wpg_build_html_from_cookies',
					nonce  : wpg_common_param.nonce,
				},
				success : function( msg ) {
					$('.wps_pgw-button_content').html(msg);
					$(self).html(cur_html);
				},
				error : function() {
					$(self).html(cur_html);
				}
			});
		});
	});
})( jQuery );
