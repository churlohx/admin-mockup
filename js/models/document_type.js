$.Class.extend('elements.DocumentType', {
	/**
	 * Return the CSS class to use for an object of the given type.
	 * @param typeQName the FQN for the document type of the object
	 */
	classForType: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if(dt) { 
			return dt.metaData.cssClass;
		}
		return '';
	},
	/**
	 * Return the display name to use for an object of the given type.
	 * @param typeQName the FQN for the document type of the object
	 */
	nameForType: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if(dt) {          
			return dt.metaData.displayName;
		}
		return '';
	},
	
	modelClassForType: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) { 
			return dt.modelClass;
		}
		return '';
	},

	isPrintable: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.printable;
		}
		return '';
	},

	isTrashable: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.trashable;
		}
		return '';
	},
	
	isMovable: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.movable;
		}
		return '';
	},
	
	isTemplatable: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.templatable;
		}
		return '';
	},
	
	acceptsFiles: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.acceptsFiles;
		}
		return '';
	},
	
	acceptsElements: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.acceptsElements;
		}
		return '';
	},

	isShareable: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.shareable;
		}
		return '';
	},

	openInDialog: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if (dt) {
			return dt.openInDialog;
		}
		return '';
	},
	
	/**
	 * Return the display name(plural) to use for an object of the given type.
	 * @param typeQName the FQN for the document type of the object
	 */
	namePlForType: function(typeQName) {
		var dt = this.findDocType(typeQName);
		if(dt) { 
			return dt.metaData.displayNamePl;
		}
		return '';
	},
	
	findDocType: function(typeQName) {
		var _docTypes = eConfig.docTypes;
		if(!_docTypes) { 
			elements.Model.log('Warning: doc types accessed but not loaded');
			return null;
		} else if (!_docTypes[typeQName]) {
			return null;
		}
		return _docTypes[typeQName];
	}
	
},
{
	namespace: '',
	type: '',
	updatable: true,	/* boolean - flag that determines if the auto flush feature should be started,
							when a resource of this type is loaded in the workspace. */
	
	init: function(documentType) {
		this.namespace = documentType.namespace;
		this.type = documentType.type;
		this.updatable = documentType.updatable;
	},
	
	getQName: function() {
		return this.namespace + ':' + this.type;
	},
	
	equals: function(docType) {
		return this.namespace == docType.namespace && this.type == docType.type; 
	},
	
	isSameType: function(docTypes) {
		if (!$.isArray(docTypes)) {
			docTypes = [docTypes];
		}
		for (var i = 0; i < docTypes.length; i++) {
			var dt = docTypes[i];
			if (this.type == (typeof dt == 'string' ? dt : dt.type)) {
				return true;
			}
		}
		return false;
	},
	
	getHtmlClass: function() {
		return elements.DocumentType.classForType(this.getQName());
	},
	
	getName: function() {
		return elements.DocumentType.nameForType(this.getQName());
	},
	
	getNamePl: function() {
		return elements.DocumentType.namePlForType(this.getQName());
	},
	
	getModelClass: function() {
		return elements.DocumentType.modelClassForType(this.getQName());
	},
	
	isPrintable: function() {
		return elements.DocumentType.isPrintable(this.getQName());
	},
	
	isTrashable: function() {
		return elements.DocumentType.isTrashable(this.getQName());
	},

	isMovable: function() {
		return elements.DocumentType.isMovable(this.getQName());
	},
	acceptsFiles: function() {
		return elements.DocumentType.acceptsFiles(this.getQName());
	},
	acceptsElements: function() {
		return elements.DocumentType.acceptsElements(this.getQName());
	},
	isTemplatable: function() {
		return elements.DocumentType.isTemplatable(this.getQName());
	},
	isShareable: function() {
		return elements.DocumentType.isShareable(this.getQName());
	},
	openInDialog: function() {
		return elements.DocumentType.openInDialog(this.getQName());
	}
});