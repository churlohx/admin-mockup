var elementsNGApp = angular.module('elementsNGApp', ['ui.bootstrap', 'ngRoute', 'ngSanitize', 'dx']);
elementsNGApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
            .when(eConfig.ctx + 'user/:selectedUserId', {
                templateUrl : eConfig.ctx + 'js/views/admin/user.html',
                controller  : 'adminUserController'
            })
            .when(eConfig.ctx + 'users', {
                templateUrl : eConfig.ctx + 'js/views/admin/users.html',
                controller  : 'adminUsersController'
            })
            .when(eConfig.ctx + 'group/:selectedGroupID', {
                templateUrl : eConfig.ctx + 'js/views/admin/group.html',
                controller  : 'adminGroupController'
            })
            .when(eConfig.ctx + 'groups', {
                templateUrl : eConfig.ctx + 'js/views/admin/groups.html',
                controller  : 'adminGroupsController'
            })
            .when(eConfig.ctx + 'resources/:selectedUserId?', {
                templateUrl : eConfig.ctx + 'js/views/admin/resources.html',
                controller  : 'adminResourcesController'
            })
            .when(eConfig.ctx + 'features', {
                templateUrl : eConfig.ctx + 'js/views/admin/features.html',
                controller  : 'adminFeaturesController'
            })
			.otherwise({
                templateUrl : eConfig.ctx + 'js/views/admin/dashboard.html',
                controller : 'adminDashboardController'
			});
    }
]);

elementsNGApp.run(function($rootScope) {
	// Show a loading indicator.
	// Wait 300 ms before showing spinner.
	// If an item loads fast, ex 100 ms, we don't want to flash a spinner.
    $rootScope.showSpinner = function(ele, height) {
		var cssHeight;
		if(typeof height !== 'undefined'){
			cssHeight = "height: " + height + "px;";
		}
		if(ele.length){
			ele.append("<div class='mode large-spinner' style='display: none;"+ cssHeight +"'><div>");
		}
		setTimeout(function() {
			var spinner = angular.element('.mode.large-spinner');
			if(spinner.length){
				spinner.show(); //spinner.fadeIn();
			}
		}, 300);
	};
	$rootScope.hideSpinner = function() {
		angular.element('.mode.large-spinner').remove();
	}
});
