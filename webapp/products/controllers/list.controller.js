(function(){
	angular.module("app.products.list", [])
	.controller("ProductsListController", ["$scope", "$http", ProductsListController]);

	function ProductsListController( $scope, $http ){
		$scope.__httpStack.push(1);
		$http.get("/api/products")
		.success(function( data ){
			$scope.products = data;
		}).error(function( message ){
			$scope.error = message;
		}).finally(function(){
			$scope.__httpStack.pop();
		});
	};
})();