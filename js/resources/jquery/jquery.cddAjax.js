/**
 * ChemDrawDirect ajax plugin to provied convenience methods and potentially tie into
 * CDD webservice error codes if we start using them by an asynch
 * call. Has ability to auto populate errors in form or delegates to specified
 * error handler. (Code was adapted from jquery.wAjax.js)
 *
 * Additional parameters:
 * 	1a. validationErrorHandler: A callback which mimics success but is only called for validation errors.
 *  1b. formRoot: The root element of this form. This will be used to auto populate/clear errors.
 *
 * TODO:
 *  2. Default validation handler to complain when validation errors aren't being handled.
 *  3. Add handlers for non-validation errors.
 *  4. Add $.wAjaxdefaults object to allow setting default actions for
 *     non-validation errors, i.e. dialog box for system error.
 * @author Sean T Purdy / Eric (original jquery.wAjax.js author)
 */
(function($) {
	$.fn.populateErrors = function(errors) {
		populateErrors(this, errors);
	};

	$.fn.clearErrors = function() {
		clearErrors(this);
	}

	$.cddAjax = function(settings) {
		var validationErrorHandler = settings.validationErrorHandler;
		var formRoot = settings.formRoot;

		// If we are given a form or element which contains decendent
		// errors clear the errors before save.
		if(formRoot) {
			clearErrors(formRoot);
		}

		// prepend the ctxAjax path if not found.
		// if the old ctxPath is found replace it.
		if(settings.url && settings.url.indexOf('http') != 0) {
			var url = settings.url;

			if(url.indexOf(eConfig.ctxAjax) == -1) {
				if(url.indexOf(eConfig.ctx) == 0) {
					url = url.replace(eConfig.ctx, eConfig.ctxAjax);
				} else {
					if(url.indexOf("/") == 0) {
						url = eConfig.ctxAjax + url.substring(1)
					} else {
						url = eConfig.ctxAjax + url;
					}
				}
			}
			settings.url = url;
		}
		
		// unless explicitly set to true, don't cache
		if (settings.cache !== true)
			settings.cache = false;

		// remove 'null' values in the parameter map unless the settings explicitly allow them
		// having a null value in the parameter map results in the string 'null' being passed to the server
		if (settings.data && settings.allowNullParams !== true) {
			for (k in settings.data) {
				if (settings.data[k] == null) {
					delete settings.data[k];
				}
			}
		}
		
		if (settings.contentType && ('json' == settings.contentType || 'application/json' == settings.contentType)) {
			settings.data = $.toJSON(settings.data);
		}
		
		$.ajax(settings);
	};

	/**
	 * Populate the errors in the given form.
	 * TODO: This should be hidden but currently the non-ajax validation isn't automatic.
	 */
	function populateErrors(/*JQuery*/ rootElement, /*Map, field:error*/ errors) {
		for(var currentField in errors) {
			$(rootElement).find(".error[name=" + currentField + "]")
						.html(errors[currentField]);
		}
	}

	/**
	 * Clear the errors found in this form.
	 * TODO: This should be hidden but currently the non-ajax validation isn't automatic.
	 */
	function clearErrors(/*JQuery*/formRoot) {
		$(formRoot).find('.error').empty();
	}
})(jQuery);
