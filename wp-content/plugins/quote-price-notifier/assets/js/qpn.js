(function($) {
    /**
     * Shows given message in a simple jQuery dialog
     *
     * @param {string} msg
     */
    function showMessage(msg) {
        $('<div/>')
            .html(msg)
            .dialog({
                modal: true,
                buttons: [{
                    text: QpnPopups.l10n.dialogButtonOk,
                    click: function() {
                        $(this).dialog('close');
                    }
                }],
                close: function() {
                    $(this).dialog('destroy');
                }
            });
    }

    /**
     * Used to validate form inputs
     *
     * @param {jQuery|string} wrapper
     * @constructor
     */
    var FormValidation = function(wrapper) {
        wrapper = $(wrapper);

        // Bind handlers to remove validation-error class on inputs blur
        wrapper.on('blur', 'input.validation-required, input.validation-email, input.validation-positive-number', function() {
            $(this).removeClass('validation-error');
        });

        /**
         * Checks if form inputs are valid, adds validation-error class to invalid inputs
         *
         * @return {boolean}
         */
        this.validate = function() {
            var valid = true;

            var required = wrapper.find('input.validation-required');
            var email = wrapper.find('input.validation-email');
            var numPositive = wrapper.find('input.validation-number-positive');

            required.each(function() {
                var $this = $(this);
                if ($this.val().trim() === '') {
                    $this.addClass('validation-error');
                    valid = false;
                }
            });

            var emailRegex = /^.+@.{2,}\..{2,}$/;
            email.each(function() {
                var $this = $(this);
                if (!emailRegex.test($this.val().trim())) {
                    $this.addClass('validation-error');
                    valid = false;
                }
            });

            var numRegex = /^[1-9][0-9]*$/;
            numPositive.each(function() {
                var $this = $(this);
                if (!numRegex.test($this.val().trim())) {
                    $this.addClass('validation-error');
                    valid = false;
                }
            });

            return valid;
        };
    };

    /**
     * Used to generate and run invisible reCaptcha
     *
     * @param {jQuery|string} form
     * @param {function} callback
     * @param {function} errorCallback
     * @constructor
     */
    var Recaptcha = function(form, callback, errorCallback) {
        form = $(form);
        var div = form.find('div.captcha').get(0);
        var captchaId = null;
        var executed = false;
        var isError = false;

        var showError = function() {
            showMessage(QpnRecaptcha.errorMsg);
        };

        /**
         * Initializes reCaptcha if available
         */
        this.init = function() {
            if (!div || typeof(grecaptcha) === 'undefined' || captchaId !== null)
                return;

            captchaId = grecaptcha.render(
                div, {
                    'sitekey': QpnRecaptcha.siteKey,
                    'badge': 'inline',
                    'size': 'invisible',
                    'callback': callback,
                    'error-callback': function() {
                        isError = true;
                        showError();
                    }
                }
            );
        };

        /**
         * Executes reCaptcha if it was initialized correctly,
         * or simply calls the callback without a captcha token directly
         */
        this.run = function() {
            if (isError) {
                showError();
                if (typeof(errorCallback) === 'function')
                    errorCallback();
                return;
            }

            if (!div || typeof(grecaptcha) === 'undefined' || captchaId === null) {
                callback(null);
                return;
            }

            // Reset captcha if it was already executed
            if (executed) {
                grecaptcha.reset(captchaId);
            }
            else {
                executed = true;
            }

            // Execute captcha challenge
            grecaptcha.execute(captchaId);
        };
    };

    /**
     * @param {jQuery} btn
     * @param {jQuery} dialog
     * @constructor
     */
    var VariationFormHandler = function(btn, dialog) {
        var form, productIdInput;

        var onCheckVariations = function() {
            btn.prop('disabled', true);
            btn.addClass('disabled');
            productIdInput.val('');
        };
        var onFoundVariation = function(self, variation) {
            btn.prop('disabled', false);
            btn.removeClass('disabled');
            productIdInput.val(variation.variation_id);
        };

        // Initialization
        form = btn.closest('.variations_form');
        productIdInput = dialog.find('input[name="product_id"]');

        form.on('check_variations', onCheckVariations);
        form.on('found_variation', onFoundVariation);
    };

    /**
     * Handles common dialogs functionality
     *
     * @param {jQuery|string} dialog
     * @param {string} title
     * @param {string} controller
     * @constructor
     */
    var Dialog = function(dialog, title, controller) {
        // Protected variables declaration
        var validation, captcha;

        /**
         * Displays the dialog with specified title
         */
        this.show = function() {
            dialog.dialog({
                draggable: false,
                resizable: false,
                modal: true,
                title: title,
            });

            captcha.init();
        };

        /**
         * Called when the main Send button is clicked, validates the form,
         * displays AJAX loader and runs captcha challenge
         */
        var onSendClicked = function() {
            if (!validation.validate()) {
                showMessage(QpnPopups.l10n.validationError);
                return;
            }

            dialog.addClass('loading');

            captcha.run();
        };

        /**
         * Actually sends AJAX request after successful captcha challenge
         *
         * @param {string} captchaToken
         */
        var sendRequest = function(captchaToken) {
            var data = dialog.find('input').serializeArray();
            data.push({ name: 'action', value: 'qpn_ajax' });
            data.push({ name: 'controller', value: controller });
            data.push({ name: 'task', value: 'save' });

            if (captchaToken) {
                data.push({ name: 'captcha_token', value: captchaToken });
            }

            $.post({
                url: QpnPopups.ajaxUrl,
                data: data,
                dataType: 'json',
                success: function(response) {
                    if (response.status !== 1) {
                        showMessage(response.message);
                        return;
                    }

                    showMessage(response.message);
                    dialog.dialog('close');
                },
                error: function() {
                    showMessage(QpnPopups.l10n.ajaxError);
                },
                complete: function() {
                    dialog.removeClass('loading');
                }
            });
        };

        /**
         * Removes the loading class from dialog in case of some captcha error
         */
        var captchaError = function() {
            dialog.removeClass('loading');
        };

        // Initialization
        dialog = $(dialog);
        validation = new FormValidation(dialog);
        captcha = new Recaptcha(dialog, sendRequest, captchaError);

        dialog.find('button.qpn-send').click(onSendClicked);
    };

    // Initialize dialogs on DOM ready
    $(function() {
        var requestQuoteBtn = $('#qpn_request_quote_btn');
        var watchPriceBtn = $('#qpn_watch_price_btn');

        if (requestQuoteBtn.length) {
            var requestQuoteForm = $('#qpn_request_quote_form');
            var requestQuoteDialog = new Dialog(
                requestQuoteForm,
                QpnPopups.l10n.requestQuoteTitle,
                'quote_request'
            );
            requestQuoteBtn.click(requestQuoteDialog.show);
            new VariationFormHandler(requestQuoteBtn, requestQuoteForm);
        }
        if (watchPriceBtn.length) {
            var watchPriceForm = $('#qpn_watch_price_form');
            var watchPriceDialog = new Dialog(
                watchPriceForm,
                QpnPopups.l10n.watchPriceTitle,
                'price_watch'
            );
            watchPriceBtn.click(watchPriceDialog.show);
            new VariationFormHandler(watchPriceBtn, watchPriceForm);
        }
    });
})(jQuery);
