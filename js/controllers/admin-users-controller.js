angular.module('elementsNGApp').controller('adminUsersController', function($scope, $http, $timeout) {
	$scope.contextPath = eConfig.ctx;
	$scope.gridSettings = {
		dataSource: users,
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
			visible: true,
		},
		editing: {
			editMode: 'row',
			editEnabled: false,
			removeEnabled: true
		}
	};
});
