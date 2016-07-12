(function(){
	angular.module("app", ["angularValidator"])
	.controller("SingInController", ["$scope", "$http", SingInController]);

	function SingInController( $scope, $http ){
		$scope.__httpStack = [];
		var vm = this;

		vm.submit = function(){
			$scope.__httpStack.push(1);
			$http.post("/api/sign-in", vm.user)
			.success(function( token ){
				sessionStorage.setItem("SalesExample_token", token);
				localStorage.setItem("SalesExample_token", token);
				document.cookie = "SalesExample_token=" + token;
				location.reload();
			}).error(function( message ){
				$scope.error = message;
			}).finally(function(){
				$scope.__httpStack.pop();
			});
		}
	};
})();