/**
 * Base Model Class.
 */
$.Model.extend('elements.Model',
/** Static */
{
	log: function(msg, className) {
		if (eConfig.debug && typeof window.console != 'undefined') {
			if (typeof msg == 'string') {
				if(className)
					console.log(className + ': ' + msg);
				else
					console.log(msg);
			}
			else {
				// Log object by itself so firebug will show properties in console.
				if(className) {
					console.log(className + ':');
				}
				console.log(msg);
			}
		}
	},

	/**
	 * Wraps the given callback function with the default response handler.
	 * Given callback is only invoked on success, i.e. status == 1
	 *
	 */
	wrapResponseCb: function(cb) {
		return function(resp) {
			switch(resp.status) {
			case 1:
				cb(resp.data);
				break;
			case -1:
				console.log('error: ' + $.toJSON(resp.data));
				break;
			default:
				console.log("unknown status: " + resp.status);
//				throw "unknown status: " + resp.status;
			}
		}
	},

	ajax: function(params) {
		// default type
		if (!params.dataType) {
			params.dataType = 'json';
		}

		// Use 'traditional' param serialization,
		// So: ajax{ data: { param1: [...]}...}
		// serializes to: param1=val1,param1=val2
		// instead of: param1[]=val1,param1[]=val2
		if (params.traditional !== false) {
			params.traditional = true;
		}

		$.wAjax(params);
	},

	doGet: function(params) {
		params = this._parseArgs(arguments);
		params.type = 'GET';
		this.ajax(params);
	},

	doPost: function(params) {
		params = this._parseArgs(arguments);
		params.type = 'POST';
		this.ajax(params);
	},

	_parseArgs: function(argsArray) {
		var l = argsArray.length;
		// if they pass one object then use it as the params object
		if (l == 1 && typeof argsArray[0] == 'object') {
			return argsArray[0];
		}
		var p = { url: argsArray[0] };
		if (l > 1) {
			p.success = argsArray[1];
		}
		return p;
	},

	postJSON: function(url, data, success) {
		if (typeof data != "string") {
			data = jQuery.toJSON(data)
		}

		this.doPost({
			url: url,
			contentType: 'application/json',
			data: data,
			success: success
		});
	},

	getJSON: function( url, data, callback ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}

		this.doGet({
			url: url,
			data: data,
			success: callback
		});
	},

	/**
	 * Add after advice to the given callback in order
	 * to fire the event with the given name.
	 */
	wrapWithEvent: function(cb, eventName) {
		return function(data) {
			if ($.isFunction(cb)) {
				cb(data);
			}
			OpenAjax.hub.publish(eventName, data);
		}
	}
},
/** Prototype */
{
	_tracker: null,
	debug: true,

	init: function(props) {
		this._super(props);
		this._tracker = new elements.ChangeTracker();
	},

	/**
	 * Log a message if debug is enabled and there is a logging console.
	 */
	log: function(msg) {
		if (this.debug) {
			elements.util.log(msg, this.Class.className);
		}
	},

	_set: function(name, val) {
		if (typeof val != 'undefined') {
			this[name] = val;
		}
	},

	notDefined: function(args) {
		if (args.length) {
			for (var i = 0; i < args.length; i++) {
				var a = args[i];
				if ($.isUndefined(a)) {
					return true;
				}
			}
			return false;
		}
		else {
			return true;
		}
	},

	addChange: function(fieldName, data) {
		this._tracker.addChange(fieldName, data);
	},

	getChanges: function() {
		return this._tracker.getChanges();
	}

});


$.Class.extend('elements.ChangeTracker', {
},
{
	/**
	 * Map of fieldName -> changes array
	 */
	changes: null,

	addChange: function(fieldName, data, overwrite) {
		if (this.changes == null) this.changes = {};
		var _d = this.changes[fieldName],
			ow = (overwrite === true);
		elements.util.log('Tracking change for field: ' + fieldName + '. Overwrite: ' + ow);
		if (!_d || ow) {
			_d = [data];
			this.changes[fieldName] = _d;
		}
		else {
			_d.push(data);
		}
	},

	getChanges: function() {
		return this.changes;
	},

	clear: function() {
		this.changes = null;
	},

	hasChanges: function() {
		return this.changes != null;
	}
});

