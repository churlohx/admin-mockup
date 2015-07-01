angular.module('elementsNGApp').controller('adminGroupController', function($scope, $http, $timeout, $routeParams) {
	$scope.contextPath = eConfig.ctx;
	$scope.groups = groups;
	$scope.selectedGroup = groups.filter(function(val, index, array) { return val.id == $routeParams.selectedGroupID; })[0];
	$scope.members = users.filter(function(val, index, array) { return $scope.selectedGroup.members.indexOf(val.id) >= 0; });
	$scope.groupPermissionPolicies = groupPermissionPolicies.filter(function(val, index, array) { return val.groupID == $routeParams.selectedGroupID; });
	$scope.groupDetails = {};
	$scope.groupPermissionPolicyGridSettings = {
		dataSource: $scope.groupPermissionPolicies,
		columns: [
			{
				dataField: 'documentTypeID', caption: 'Document Type',
				lookup: {dataSource:documentTypes, valueExpr:'id', displayExpr:'name'},
				sortIndex: 0, sortOrder: 'asc'
			},
			{
				dataField: 'permissionPolicyTypeID', caption: 'Permission Policy',
				lookup: {dataSource:permissionPolicyTypes, valueExpr:'id', displayExpr:'name'}
			}
		],
		paging: {
			pageSize: 5
		},
		filterRow: {
			visible: false
		},
		groupPanel: {
			visible: false,
		},
		editing: {
			editMode: 'row',
			//editEnabled: true,
			removeEnabled: true,
			insertEnabled: true
		}
	};
	$scope.gridSettings = {
		dataSource: $scope.members,
		columns: [
			{ dataField: 'id', caption: 'ID', alignment: 'left', width: 100, sortIndex: 0, sortOrder: 'asc' },
			{ dataField: 'username', caption: 'Email' },
			{
				dataField: 'fullname',
				caption: 'Full Name',
				cellTemplate: function (container, options) {
                    $('<a/>').addClass('dx-link')
                    	.attr('href', '#user/' + options.data['id'])
                        .text(options.value)
                        .appendTo(container);
                }
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
			//editEnabled: true,
			removeEnabled: true,
			insertEnabled: true
		}
	};
});
