/**
 * ChemistryWebService model object.
 * @author Pinkey Gupta
 */
elements.Model.extend('elements.ChemistryWebService',
/* @Static */
{	baseUri: null,
	token: null,
	
	getStoichiometryGridContentForCDXML : function(attrs, success, unsuccess, async, error) { 
		var self = this;
		var successCallback = function() {
			console.log("Successfully fetched chemdraw webservice details ");
			self.makeCDDWebserviceCall("toProperties", attrs, success, unsuccess, async, error);
		};
		var errorCallback = function() {
			console.log("Unable to fetch ChemDraw webservice invocation details");
			unsuccess();
		};
		
		if(!this.token && !this.baseUri) {
			this.getChemdrawWebServiceDetails(successCallback, errorCallback, async);
		} else {
			this.makeCDDWebserviceCall("toProperties", attrs, success, unsuccess, async, error);
		}
	},
	
	getInchi : function(attrs, success, unsuccess, async, error) {
		if(!error) {
			error = unsuccess;
		}
		if(async === undefined) {
			async = false;
		}
		
		var self = this;
		var successCallback = function() {
			console.log("Successfully fetched chemdraw webservice details ");
			self.makeCDDWebserviceCall("toInChIString", attrs, success, unsuccess, async, error);
		};
		var errorCallback = function() {
			console.log("Unable to fetch ChemDraw webservice invocation details");
			unsuccess();
		};
		
		if(!this.token && !this.baseUri) {
			this.getChemdrawWebServiceDetails(successCallback, errorCallback, async);
		} else {
			this.makeCDDWebserviceCall("toInChIString", attrs, success, unsuccess, async, error);
		}
	},

	makeCDDWebserviceCall : function(service, attrs, success, unsuccess, async, error) { 
		if(!error) {
			error = unsuccess;
		}
		if(async === undefined) {
			async = false;
		}
		var cdxml = attrs.reactionContent;
		var inputObject = new Object();
		inputObject.chemData = cdxml;
		inputObject.chemDataType = ".cdxml";
		var webServInput = JSON.stringify(inputObject);	
		var hash = this.token;
		var url =  this.baseUri + service;
		var self = this;
		
		$.ajax({
			url: url,
			contentType: 'application/json ; charset=UTF-8',
			cache: false,
			type:  "POST",
			data:  webServInput,
			success: success,
			unsuccess: unsuccess,
			async: async,
			error: error,
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("authorization", "Basic " + hash);
			}

		});
	},
	  
	getChemdrawWebServiceDetails: function(success, unsuccess, async) {
		if(async === undefined) {
			async = false;
		}
		var inputObject = new Object();
		inputObject.service = "toProperties";

		var self = this;
		this.doPost({
			url: 'chemistryWebService/fetch_cdwebservice_details',
			data: {
				service: "toProperties",
			},
			contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
			success: function(data) {
				if(data.baseUri && data.token) {
					self.baseUri = data.baseUri;
					self.token = data.token;
					if(typeof success !== "undefined") { 
						success();
					}
				} else {
					if(typeof unsuccess !== "undefined") {
						unsuccess();
					}
				}	
			},
			unsuccess: function(data) {
				self.baseUri = null;
				self.token = null;
				unsuccess(data);
			},
			async: async
		});
	},
	
	destroyChemdrawWebServiceDetails : function() {
		this.baseUri = null;
		this.token = null;
	}
	
},

/* @Prototype */
{});