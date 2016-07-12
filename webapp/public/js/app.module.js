(function(){
	angular.module("app", ["app.states"])
	.controller("MainController", ["$scope", "$http", MainController])
	.factory('authInterceptor', [function() {
		return {
			request: function( config ){
				config.headers = config.headers || {};
				config.headers.token = localStorage.getItem("SalesExample_token") || sessionStorage.getItem("SalesExample_token");
				return config;
			}
		};
	}]).config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	}]);;

	function MainController( $scope, $http ){
		$scope.__httpStack = [];
		$scope.__httpStack.push(1);
		$http.get("/api/user/info")
		.success(function( data ){
			vm.user = data;
		}).error(function( message ){
			$scope.error = message;
		}).finally(function(){
			$scope.__httpStack.pop();
		});

		var vm = this;

		vm.signOut = function(){
			localStorage.removeItem("SalesExample_token");
			sessionStorage.removeItem("SalesExample_token");
			document.cookie = "SalesExample_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			location.reload();
		};
	}
})();