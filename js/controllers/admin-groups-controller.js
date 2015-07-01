angular.module('elementsNGApp').controller('adminGroupsController', function($scope, $http, $timeout) {
	$scope.contextPath = eConfig.ctx;
	$scope.groupTypes = ["System", "Normal"];
	$scope.gridSettings = {
		dataSource: groups,
		columns: [
			{ dataField: 'id', caption: 'ID', alignment: 'left', width: 60, sortIndex: 0, sortOrder: 'asc' },
			{
				dataField: 'name',
				caption: 'Group Name',
				cellTemplate: function (container, options) {
                    $('<a/>').addClass('dx-link')
                    	.attr('href', '#group/' + options.data['id'])
                        .text(options.value)
                        .appendTo(container);
                }
			},
			{ dataField: 'ownerName', caption: 'Owner Full Name' },
			{ dataField: 'type', caption: 'Type', lookup: { dataSource: $scope.groupTypes }},
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
