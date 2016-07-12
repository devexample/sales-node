(function(){
	angular.module("app.clients.list", [])
	.controller("ClientsListController", ["$scope", "$http", ClientsListController]);

	function ClientsListController( $scope, $http ){
		$scope.__httpStack.push(1);
		$http.get("/api/clients")
		.success(function( data ){
			$scope.clients = data;
		}).error(function( message ){
			$scope.error = message;
		}).finally(function(){
			$scope.__httpStack.pop();
		});
	};
})();