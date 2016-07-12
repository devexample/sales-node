(function(){
	angular.module("app", ["app.states"])
	.controller("MainController", ["$scope", "$http", MainController])
	.factory('authInterceptor', [function() {
		return {
			request: function( config ){
				config.headers = config.headers || {};
				config.headers.token = localStorage.getItem("tokenSalesExample") || sessionStorage.getItem("tokenSalesExample");
				return config;
			}
		};
	}]).config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	}]);;

	function MainController( $scope, $http ){
		$scope.__httpStack = [];
		var vm = this;
		
		$scope.__httpStack.push(1);
		$http.get("/api/user/info")
		.success(function( data ){
			vm.user = data;
		}).error(function( message ){
			$scope.error = message;
		}).finally(function(){
			$scope.__httpStack.pop();
		});
	}
})();