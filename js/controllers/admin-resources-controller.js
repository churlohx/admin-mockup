angular.module('elementsNGApp').controller('adminResourcesController', function($scope, $http, $timeout, $routeParams) {
	$scope.contextPath = eConfig.ctx;
	$scope.selectedUser = $routeParams.selectedUserID ? users.filter(function(val, index, array) { return val.id == $routeParams.selectedUserID; })[0] : null;
	$scope.resources = $routeParams.selectedUserID ? journals.filter(function(val, index, array) { return val.ownerId == $scope.selectedUser.id; }) : journals;
	$scope.gridSettings = {
		dataSource: $scope.resources,
		columns: [
			{
				dataField: 'id',
				caption: 'ID',
				cellTemplate: function (container, options) {
                    $('<a/>').addClass('dx-link')
                    	.attr('href', '#resources/resource/' + options.data['id'])
                        .text(options.value)
                        .appendTo(container);
                }
			},
			{ dataField: 'name', caption: 'Name' },
			{ dataField: 'ownerName', caption: 'Owner Full Name'}
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
