angular.module('elementsNGApp').controller('adminResourceController', function($scope, $http, $timeout, $routeParams) {
	$scope.contextPath = eConfig.ctx;
	$scope.selectedResource = $routeParams.selectedResourceID ? journals.filter(function(val, index, array) { return val.id == $routeParams.selectedResourceID; })[0] : null;
	$scope.resources = $scope.selectedResource != null ? $scope.selectedResource.children : [];
	$scope.gridSettings = {
		dataSource: $scope.resources,
		columns: [
			{ dataField: 'id', caption: 'ID'},
			{ dataField: 'name', caption: 'Name' }
		],
		paging: {
			pageSize: 20
		},
		filterRow: {
			visible: true
		},
		groupPanel: {
			visible: false,
		},
		editing: {
			editMode: 'row',
			editEnabled: false,
			removeEnabled: false
		}
	};
	$scope.generateRandomPermissions = function() {
		permissions = [];
		var count = Math.floor((Math.random() * 10) + 1);
		for (var i = 0; i < count; i++) {
			permissions.push({"name":"", "type":"Read"});
		};
		return permissions;
	};
	$scope.permissions = $scope.generateRandomPermissions();
});
