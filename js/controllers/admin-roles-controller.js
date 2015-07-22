angular.module('elementsNGApp').controller('adminRolesController', function($scope, $http, $timeout) {
	$scope.contextPath = eConfig.ctx;
	$scope.groups = groups.filter(function(val, index, array) { return val.type == 'System'; });
	$scope.gridSettings = {
		dataSource: $scope.groups,
		columns: [
			{ dataField: 'id', caption: 'ID', alignment: 'left', width: 60, sortIndex: 0, sortOrder: 'asc' },
			{
				dataField: 'name',
				caption: 'Role Name',
				cellTemplate: function (container, options) {
                    $('<a/>').addClass('dx-link')
                    	.attr('href', '#role/' + options.data['id'])
                        .text(options.value)
                        .appendTo(container);
                }
			},
			{ dataField: 'ownerName', caption: 'Owner Full Name' },
			{ 
				caption: 'Member Count',
                width: 100,
                calculateCellValue: function (data) {
                	return data.members.length;
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
			editMode: 'batch',
			editEnabled: true,
			removeEnabled: true,
			insertEnabled: true
		}
	};
});
