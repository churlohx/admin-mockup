angular.module('elementsNGApp').controller('adminFeaturesController', function($scope, $http, $timeout, $routeParams) {
	$scope.contextPath = eConfig.ctx;
	$scope.documentTypeGridSettings = {
		dataSource: documentTypes,
		columns: [
			{ dataField: 'id', caption: 'ID', alignment: 'left', width: 100, sortIndex: 0, sortOrder: 'asc' },
			{
				dataField: 'name',
				caption: 'Name',
				cellTemplate: function (container, options) {
                    $('<a/>').addClass('dx-link')
                    	.attr('href', '#feature/documentType/' + options.data['id'])
                        .text(options.value)
                        .appendTo(container);
                }
			 },
			 {
				dataField: 'defaultPermissionPolicyID',
				caption: 'Default Permission Policy',
				lookup: {dataSource: permissionPolicyTypes, valueExpr:'id', displayExpr:'name'}
			 },
			 {
				dataField: 'ownerPermissionPolicyID',
				caption: 'Owner Permission Policy',
				lookup: {dataSource: permissionPolicyTypes, valueExpr:'id', displayExpr:'name'}
			 }
		],
		paging: {
			pageSize: 10
		},
		filterRow: {
			visible: true
		},
		groupPanel: {
			visible: false,
		},
		editing: {
			editMode: 'row',
			editEnabled: true,
			removeEnabled: true,
			insertEnabled: true
		}
	};
});
