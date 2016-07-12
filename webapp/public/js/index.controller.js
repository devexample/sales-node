(function(){
	angular.module("app.index", [])
	.controller("IndexController", ["$scope", "$http", IndexController])
	.factory("authInterceptor", [function() {
		return {
			request: function( config ){
				config.headers = config.headers || {};
				config.headers.token = localStorage.getItem("SalesExample_token") || sessionStorage.getItem("SalesExample_token");
				return config;
			}
		};
	}]).config(["$httpProvider", function ($httpProvider) {
		$httpProvider.interceptors.push("authInterceptor");
	}]);;

	function IndexController( $scope, $http ){
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