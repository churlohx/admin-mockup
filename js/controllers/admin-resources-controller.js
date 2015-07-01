angular.module('elementsNGApp').controller('adminResourcesController', function($scope, $http, $timeout, $routeParams) {
	$scope.contextPath = eConfig.ctx;
	$scope.selectedUser = $routeParams.selectedUserId ? users.filter(function(val, index, array) { return val.id == $routeParams.selectedUserId; })[0] : null;
	$scope.journals = $routeParams.selectedUserId ? journals.filter(function(val, index, array) { return val.ownerId == $scope.selectedUser.id; }) : journals;
	$scope.gridSettings = {
		dataSource: $scope.journals,
		columns: [
			{ dataField: 'id', caption: 'ID' },
			{ dataField: 'name', caption: 'Name' },
			{ dataField: 'ownerName', caption: 'Owner Full Name' }
		],
		paging: {
			pageSize: 20
		},
		filterRow: {
			visible: true
		},
		groupPanel: {
			visible: true,
		},
		editing: {
			editMode: 'row',
			editEnabled: false,
			removeEnabled: false
		}
	};
});
