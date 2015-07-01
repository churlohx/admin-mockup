angular.module('elementsNGApp').controller('adminDashboardController', function($scope, $http, $timeout) {
	$scope.contextPath = eConfig.ctx;
	$scope.users = users;
	$scope.groups = groups;
	$scope.gridSettings = {
		dataSource: users,
		paging: {
			pageSize: 6
		},
		filterRow: {
			visible: true
		},
		groupPanel: {
			visible: true,
		},
		editing: {
			editMode: 'row',
			editEnabled: true,
			removeEnabled: true,
			insertEnabled: true
		}
	};
});
