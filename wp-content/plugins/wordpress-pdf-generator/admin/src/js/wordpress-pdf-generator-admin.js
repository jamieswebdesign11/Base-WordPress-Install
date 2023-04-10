(function( $ ) {
	'use strict';
	/**
	 * All of the code for your admin-facing JavaScript source
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
	 $(document).ready(function() {
		$("#wps_wpg_license_key").on("click", function(e) {
			$("#wps_wpg_license_activation_status").html("");
		});
		$("form#wps_wpg_license_form").on("submit", function(e) {
			e.preventDefault();
			var license_key = $("#wps_wpg_license_key").val();
			wps_wpg_send_license_request(license_key);
		});
		$(document).on('click', 'button.wps-wpg-copy-shortcode-meta-field', function(e){
			e.preventDefault();
			navigator.clipboard.writeText( $('span.wps-wpg-shortcode-meta-field-target').text() );
            $(this).text( wpg_admin_param.copied );
		});
		function wps_wpg_send_license_request(license_key) {
			$.ajax({
				type     : "POST",
				dataType : "JSON",
				url      : wpg_admin_param.ajaxurl,
				data     : {
					action        : "wps_wpg_validate_license_key",
					nonce         : wpg_admin_param.nonce,
					purchase_code : license_key,
				},
				success: function(data) {
					if (data.status == true) {
						$("#wps_wpg_license_activation_status").css("color", "#42b72a");
						jQuery("#wps_wpg_license_activation_status").html(data.msg);
						location = wpg_admin_param.wpg_admin_param_location;
					} else {
						$("#wps_wpg_license_activation_status").css("color", "#ff3333");
						jQuery("#wps_wpg_license_activation_status").html(data.msg);
						jQuery("#wps_wpg_license_key").val("");
					}
				},
			});
		}		 
	});
	})( jQuery );
