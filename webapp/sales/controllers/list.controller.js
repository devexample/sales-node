(function(){
	angular.module("app.products.list", [])
	.controller("SalesListController", ["$scope", "$http", ProductsListController]);

	function ProductsListController( $scope, $http ){
		$scope.__httpStack.push(1);
		$http.get("/api/clients")
		.success(function( data ){
			$scope.clients = data;
		}).error(function( message ){
			$scope.error = message;
		}).finally(function(){
			$scope.__httpStack.pop();
		});

		$scope.loadClientSales = function( client ){
			if( client ){
				$scope.__httpStack.push(1);
				$http.get("/api/sales/client/" + client)
				.success(function( data ){
					for (var i = 0; i < data.length; i++) {
						var total = 0;
						for (var j = 0; j < data[i].products.length; j++) {
							total += data[i].products[j].price * data[i].products[j].quantity;
						};
						data[i].total = total;
					};
					$scope.sales = data;
				}).error(function( message ){
					$scope.error = message;
				}).finally(function(){
					$scope.__httpStack.pop();
				});
			} else {
				delete $scope.sales;
			}
		};

		$scope.showDeteail = function( index ){
			$scope.selectedSale = index;
		};
	};
})();