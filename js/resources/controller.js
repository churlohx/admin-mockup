/**
 * This file contains the the core class definitions for our controller hierarchy.
 * These controllers are considered abstract.  Concrete implementations belong in
 * the 'controllers' folder.
 */




/**
 * Base Controller.
 */
$.Controller.extend('elements.Controller',
/** Static */
{
	onDocument: false,

	/**
	 * Show an error dialog with the given message.
	 * For the most part errors and validation messages will be handled in a standard
	 * way when they come back in the response to an ajax call.  Use this method when
	 * handling other types of errors that may not have happened on the server.
	 */
	error: function(msg) {
		if (msg){
			var dlg = $('#general_message');
			dlg.find('.message').text(msg);
			dlg.removeClass('hidden').dialog({
				title: 'Error',
				modal: true,
				resizable: false,
				buttons: {
					'Ok': function(){
						$(this).dialog('close');
					}
				}
			});
			dlg.dialog('open');
		}
	},

	/**
	 * Standard method for opening up a dialog.
	 * @see elements.Dialog
	 */
	openDialog: function(args) {
		var node = $('<div></div>')
		$('body').append(node);
		var clazz = args.dialogClass ? args.dialogClass : elements.Dialog;
		return new clazz(node, args);
	}

},
/** Prototype */
{
	debug: true,			/* boolean - debug flag, controls logging */

	init: function(el, data){
		this._super(el, data);
		// add the ability to mix-in a properties object to this controller
		$.extend(this, data);
	},

	/**
	 * Log a message if debug is enabled and there is a logging console.
	 */
	log: function(msg) {
		if (this.debug) {
			elements.util.log(msg, this.Class.className);
		}
	},

	openDialog: function(args) {
		return elements.Controller.openDialog(args);
	},

	/**
	 * Open a resource in a dialog.
	 * Note: This currently only supports Attachment.
	 */
	openResourceDialog: function(key){
		elements.AtlasResource.get(key.id, null, function(ar) {
			wingu.AttachmentViewerController.openAttachmentViewer(ar);
		});
	},

	/*
	 * Override the super class to check that we still have a DOM element backing us.
	 * This is an attempt at fixing ELEMENTS-884.
	 */
	find: function(selector) {
		if (this.element) {
			return this._super(selector);
		}
		return $();
	},

	/*
	 * Override the super class to check that we still have a DOM element backing us.
	 * If we don't the callback is not executed.
	 * This is an attempt at fixing ELEMENTS-884.
	 */
	callback: function() {
		var fn = $.Class.callback.apply(this, arguments);
		var me = this;
		return function() {
			if (me.element != null) {
				return fn.apply(this, arguments);
			}
			else {
				me.log('element is null');
				return null;
			}
		}
	},

	/**
	 * Parse a key to an AtlasResource out of an element.
	 */
	parseResource: function(el) {
		var id,
			href = this.parseHrefHash(el),
			type = $(el).attr('type'),
			namespace = $(el).attr('namespace');
		if (!type) {
			return this.parseResourceString(href);
		}
		return {
			type: type,
			namespace: namespace,
			id: href
		}
	},

	/**
	 * Parse a resource key from a string.
	 * @return key object - { namespace, type, id }
	 */
	parseResourceString: function(str) {
		// a named parameter in the hash is not a resource string
		if (str.indexOf('=') > -1)
			return null;
		var parts = str.split(':');
		var namespace = null;
		var type = null;
		var id = null;
		if (parts.length == 1) {
			id = str;
		} else if (parts.length == 2) {
			namespace = 'wingu.com';
			type = parts.shift(); // shift() removes and returns the item at index 0
			id = str;
		} else if (parts.length > 2) {
			namespace = parts.shift();
			type = parts.shift();
			id = parts.join(':'); // id can contain colons in some cases (like search queries)
		}
		return {
			namespace: namespace,
			type: type,
			id: id
			};
	},

	/**
	 * Utility function to get the value of an href attribute after the hash.
	 */
	parseHrefHash: function(el) {
		var href = $(el).attr('href');
		return href.substring(href.indexOf('#') + 1);
	},

	show: function() {
		this.element.css('display', '');
	},

	hide: function() {
		this.element.css('display', 'none');
	},

	/**
	 * Opens the given resource in the workspace.
	 * Resource can be a resource key(namespace, type, id), an
	 * atlas resource object, or a resource string.
	 */
	openWorkspaceObject: function(resource) {
		var hash = null;
		if (typeof resource == 'string') {
			hash = resource;
		}
		// Object
		else {
			// resource object
			if (resource.documentType) {
				hash = this.makeResourceString({
					namespace: resource.documentType.namespace,
					type: resource.documentType.type,
					id: resource.id
				});
			}
			// resource key
			else {
				hash = this.makeResourceString(resource);
			}
		}

		dialog.hideAllInline();
		this.log('Updating hash from openWorkspaceObject: ' + hash);
		window.location.hash = hash;
	},

	makeBinaryLink: function(binaryDataReference, name, callerId) {
		var lnk = eConfig.ctx + "upload/stream/" + binaryDataReference.id;
		if (typeof callerId != 'undefined') {
			lnk += '/' + callerId;
		}
		if (typeof name != 'undefined') {
			lnk += '/' + encodeURI(name).replace(/\//g, '');
		}
		return lnk;
	},

	makeResourceString: function(key) {
		var str;
		if (key.namespace) {
			str = key.namespace + ':' + key.type;
		} else if (key.type) {
			str = key.type;
		} else {
			return;
		}
		if (key.id) {
			str += ':' + key.id;
		} else if (key.documentId) {
			str += ':' + key.documentId;
		}
		return str;
	},

	makeWsLink: function(resource) {
		var name, typeId;
		if (arguments.length == 2) {
			typeId = arguments[0];
			name = arguments[1];
		}
		else {
			typeId = resource.typeId;
			name = resource.name;
		}
		return '<a class="wsLink" href="#' + typeId + '">' + name + '</a>';
	},

	// Show a loading indicator.
	// Wait 300 ms before showing spinner.
	// If an item loads fast, ex 100 ms, we don't want to flash a spinner.
	showSpinner: function(height) {

		var self = this,
		cssHeight;

		if(typeof height !== 'undefined'){
			cssHeight = "height: " + height + "px;";
		}

		if(this.element.length){
			this.element.append("<div class='mode large-spinner' style='display: none;"+ cssHeight +"'><div>");
		}

		setTimeout(function() {
			if(self.find(".mode.large-spinner").length){
				self.find(".mode.large-spinner").fadeIn();
			}
		}, 300);
	},

	hideSpinner: function() {
		this.find(".mode.large-spinner").remove();
	}

});
