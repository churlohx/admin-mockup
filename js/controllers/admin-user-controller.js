angular.module('elementsNGApp').controller('adminUserController', function($scope, $http, $timeout, $routeParams) {
	$scope.contextPath = eConfig.ctx;
	$scope.users = users;
	$scope.selectedUser = users.filter(function(val, index, array) { return val.id == $routeParams.selectedUserId; })[0];
	$scope.groups = groups.filter(function(val, index, array) { return val.ownerName == $scope.selectedUser.fullname; });
	$scope.roles = groups.filter(function(val, index, array) { return val.type == 'System'; });
	$scope.userDetails = {};
	$scope.roleGridSettings = {
		dataSource: $scope.roles,
		columns: [
			{ 
				caption: 'Selected',
                width: 100,
                calculateCellValue: function (data) {
                	return $scope.selectedUser.roles.indexOf(data.id) >= 0;
                }
            },
			{
				dataField: 'name',
				caption: 'Role Name',
				cellTemplate: function (container, options) {
                    $('<a/>').addClass('dx-link')
                    	.attr('href', '#group/' + options.data['id'])
                        .text(options.value)
                        .appendTo(container);
                }
			}
		],
		filterRow: {
			visible: false
		},
		showColumnHeaders: false,
		columnHeaders: {
			visible: false
		},
		groupPanel: {
			visible: false
		},
		editing: {
			editMode: 'row',
			editEnabled: false,
			removeEnabled: false,
			insertEnabled: false
		}
	};
	$scope.gridSettings = {
		dataSource: $scope.groups,
		columns: [
			{ dataField: 'id', caption: 'ID', alignment: 'left', width: 100, sortIndex: 0, sortOrder: 'asc' },
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
			{ 
				caption: 'Member Count',
                width: 100,
                calculateCellValue: function (data) {
                	return data.members.length;
                }
            }
		],
		paging: {
			pageSize: 5
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
			insertEnabled: false
		}
	};
});
