(function( $ ) {
	'use strict';
    jQuery(document).ready(function($){
        // remove bulk pdf download icon.
        $('#pgfw_bulk_pdf_icon_image_remove').on('click',function(e){
            e.preventDefault();
            $('.pgfw_bulk_pdf_icon_image').attr('src', '');
            $('.pgfw_bulk_pdf_icon_image').hide();
            $('#sub_pgfw_pdf_bulk_download_icon').val('');
            $(this).hide();
        });
        // insert bulk pdf download icon.
        $('#pgfw_pdf_bulk_download_icon').on('click',function(e) {
            e.preventDefault();
            if (this.window === undefined) {
                this.window = wp.media({
                    title    : pgfw_admin_custom_param.upload_image,
                    library  : {type: 'image'},
                    multiple : false,
                    button   : {text: pgfw_admin_custom_param.use_image}
                });
                var self = this;
                this.window.on('select', function() {
                    var response = self.window.state().get('selection').first().toJSON();
                    $('.pgfw_bulk_pdf_icon_image').attr('src', response.url);
                    $('.pgfw_bulk_pdf_icon_image').show();
                    $('#pgfw_bulk_pdf_icon_image_remove').show();
                    $('#sub_pgfw_pdf_bulk_download_icon').val( response.url );
                });
            }
            this.window.open();
            return false;
        });
        // remove logo watermark.
        $('#pgfw_watermark_image_remove').on('click',function(e){
            e.preventDefault();
            $('.pgfw_watermark_image').attr('src', '');
            $('.pgfw_watermark_image').hide();
            $('#sub_pgfw_watermark_image_upload').val('');
            $(this).hide();
        });
        // insert logo watermark.
        $('#pgfw_watermark_image_upload').on('click',function(e) {
            e.preventDefault();
            if (this.window === undefined) {
                this.window = wp.media({
                    title    : pgfw_admin_custom_param.upload_image,
                    library  : {type: 'image'},
                    multiple : false,
                    button   : {text: pgfw_admin_custom_param.use_image}
                });
                var self = this;
                this.window.on('select', function() {
                    var response = self.window.state().get('selection').first().toJSON();
                    $('.pgfw_watermark_image').attr('src', response.url);
                    $('.pgfw_watermark_image').show();
                    $('#pgfw_watermark_image_remove').show();
                    $('#sub_pgfw_watermark_image_upload').val( response.url );
                });
            }
            this.window.open();
            return false;
        });
        // add custom template.
        $('.wpg-add-custom-page-insertion').on('click',function(){
            var r = confirm(wpg_admin_custom_obj.insert_confirm);
            if ( r ) {
                $.ajax({
                    url    : wpg_admin_custom_obj.ajaxurl,
                    method : 'post',
                    data   : {
                        action : 'wpg_add_custom_template_page',
                        nonce  : wpg_admin_custom_obj.nonce,
                    },
                    success : function() {
                        window.location.hash = 'pageinserted';
                        location.reload();
                    },
                    error   : function() {
                        var notice_html   = wpg_notice_html( wpg_admin_custom_obj.template_add_error, 'notice-error' );
                        $('.wpg-admin-notice-custom').html('');
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        $('.wpg-admin-notice-custom').html(notice_html);
                    }
                });
            }
        });
        if (window.location.hash == '#pageinserted') {
            var notice_html   = wpg_notice_html( wpg_admin_custom_obj.template_add_success, 'notice-success' );
            $('.wpg-admin-notice-custom').html('');
            $('.wpg-admin-notice-custom').html(notice_html);
            window.location.hash = '';
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
        // deleting custom template.
        $('.wpg-delete-template').on('click',function(e){
            e.preventDefault();
            var template_name = $(this).data('template-name');
            var self          = this;
            var r             = confirm(wpg_admin_custom_obj.delete_confirm);
            var cur_html      = $(self).html();
            if ( r ) {
                $(self).html( wpg_admin_custom_obj.delete_loader );
                $.ajax({
                    url    : wpg_admin_custom_obj.ajaxurl,
                    method : 'post',
                    data   : {
                        action        : 'wpg_delete_custom_template_page',
                        nonce         : wpg_admin_custom_obj.nonce,
                        template_name : template_name
                    },
                    success : function(msg) {
                        window.location.hash = 'pagedeleted';
                        location.reload();
                    },
                    error   : function() {
                        $(self).html(cur_html);
                        var notice_html   = wpg_notice_html( wpg_admin_custom_obj.template_del_error, 'notice-error' );
                        $('.wpg-admin-notice-custom').html('');
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        $('.wpg-admin-notice-custom').html(notice_html);
                    }
                });
            }
            
        });
        if (window.location.hash == '#pagedeleted') {
            var notice_html   = wpg_notice_html( wpg_admin_custom_obj.template_del_success, 'notice-success' );
            $('.wpg-admin-notice-custom').html('');
            $('.wpg-admin-notice-custom').html(notice_html);
            window.location.hash               = '';
            document.body.scrollTop            = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
        function wpg_notice_html( msg, notice_class ) {
            var html = '<div class="notice '+ notice_class +' is-dismissible">\
                    <p>'+ msg +'</p>\
                </div>\
                <br/>';
            return html;
        }
        $('.wpg-submit-internal-page-setting').on('click',function(e){
            e.preventDefault();
            var template_name = $('input[name="wpg_use_template_current_status"]:checked').val();
            var self          = this;
            var cur_html      = $(self).html();
            if ( template_name != undefined ) {
                $(self).html( wpg_admin_custom_obj.saving );
                $.ajax({
                    url    : wpg_admin_custom_obj.ajaxurl,
                    method : 'post',
                    data   : {
                        action        : 'wpg_save_internal_page_template_setting',
                        nonce         : wpg_admin_custom_obj.nonce,
                        template_name : template_name
                    },
                    success : function(msg) {
                        $(self).html( wpg_admin_custom_obj.saved );
                        var notice_html   = wpg_notice_html( wpg_admin_custom_obj.settings_saved, 'notice-success' );
                        $('.wpg-admin-notice-custom').html('');
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        $('.wpg-admin-notice-custom').html(notice_html);
                    },
                    error   : function () {
                        $(self).html( cur_html );
                        var notice_html   = wpg_notice_html( wpg_admin_custom_obj.settings_error, 'notice-error' );
                        $('.wpg-admin-notice-custom').html('');
                        document.body.scrollTop = 0; // For Safari
                        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        $('.wpg-admin-notice-custom').html(notice_html);
                    }
                });
            } else {
                var notice_html   = wpg_notice_html( wpg_admin_custom_obj.temp_activate_error, 'notice-error' );
                $('.wpg-admin-notice-custom').html('');
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                $('.wpg-admin-notice-custom').html(notice_html);
            }
        });
        // remove cover page company.
        $('#pgfw_cover_page_company_logo_remove').on('click',function(e){
            e.preventDefault();
            $('.pgfw_cover_page_company_logo').attr('src', '');
            $('.pgfw_cover_page_company_logo').hide();
            $('#sub_pgfw_cover_page_company_logo_upload').val('');
            $(this).hide();
        });
        // insert cover page company logo.
        $('#pgfw_cover_page_company_logo_upload').on('click',function(e) {
            e.preventDefault();
            if (this.window === undefined) {
                this.window = wp.media({
                    title    : pgfw_admin_custom_param.upload_image,
                    library  : {type: 'image'},
                    multiple : false,
                    button   : {text: pgfw_admin_custom_param.use_image}
                });
                var self = this;
                this.window.on('select', function() {
                    var response = self.window.state().get('selection').first().toJSON();
                    $('.pgfw_cover_page_company_logo').attr('src', response.url);
                    $('.pgfw_cover_page_company_logo').show();
                    $('#pgfw_cover_page_company_logo_remove').show();
                    $('#sub_pgfw_cover_page_company_logo_upload').val( response.url );
                });
            }
            this.window.open();
            return false;
        });
        // remove cover page image.
        $('#pgfw_cover_page_image_remove').on('click',function(e){
            e.preventDefault();
            $('.pgfw_cover_page_image').attr('src', '');
            $('.pgfw_cover_page_image').hide();
            $('#sub_pgfw_cover_page_image_upload').val('');
            $(this).hide();
        });
        // insert cover page image.
        $('#pgfw_cover_page_image_upload').on('click',function(e) {
            e.preventDefault();
            if (this.window === undefined) {
                this.window = wp.media({
                    title    : pgfw_admin_custom_param.upload_image,
                    library  : {type: 'image'},
                    multiple : false,
                    button   : {text: pgfw_admin_custom_param.use_image}
                });
                var self = this;
                this.window.on('select', function() {
                    var response = self.window.state().get('selection').first().toJSON();
                    $('.pgfw_cover_page_image').attr('src', response.url);
                    $('.pgfw_cover_page_image').show();
                    $('#pgfw_cover_page_image_remove').show();
                    $('#sub_pgfw_cover_page_image_upload').val( response.url );
                });
            }
            this.window.open();
            return false;
        });
        $('.wpg-activate-coverpage-template').on('click',function(){
            var self     = this;
            var template = $(self).data('template-id');
            var cur_html = $(self).html();
            $(self).html( wpg_admin_custom_obj.activating );
            $.ajax({
                url    : wpg_admin_custom_obj.ajaxurl,
                method : 'post',
                data   : {
                    action   : 'wpg_activate_coverpage_template',
                    nonce    : wpg_admin_custom_obj.nonce,
                    template : template
                },
                success : function( msg ) {
                    $('.wpg-activate-coverpage-template').each(function(){
                        $(this).html(wpg_admin_custom_obj.activate);
                        $(this).closest('li').removeClass('wpg-active');
                    });
                    $(self).html( wpg_admin_custom_obj.activated );
                    $(self).closest('li').addClass('wpg-active');
                },
                error   : function() {
                    $(self).html( wpg_admin_custom_obj.error );
                }
            });
        });
        
    });
})( jQuery );