(function(){
	angular.module("app.products.form", ["angularValidator"])
	.controller("ProductsFormController", ["$scope", "$http", ProductsFormController]);

	function ProductsFormController( $scope, $http ){
		if( $scope.params.id ){
			$scope.__httpStack.push(1);
			$http.get("/api/products/" + $scope.params.id)
			.success(function( data ){
				$scope.product = data;
			}).error(function( message ){
				$scope.error = message;
			}).finally(function(){
				$scope.__httpStack.pop();
			});
		}

		$scope.checkPrice = function( value ){
			if( isNaN(value) ) return false;
			value = value.toString();
			var decimals = value.split('.');
			decimals = decimals.length > 1 ? decimals[1] : '';
			if( decimals.length > 2 ) return false;
			return true;
		};

		$scope.delete = function(){
			$scope.__httpStack.push(1);
			$http.delete("/api/products/" + $scope.params.id)
			.success(function( data ){
				location.href = "#/";
			}).error(function( message ){
				$scope.error = message;
			}).finally(function(){
				$scope.__httpStack.pop();
			});
		}

		$scope.submit = function(){
			if( $scope.product._id ){
				$scope.__httpStack.push(1);
				$http.put("/api/products", $scope.product)
				.success(function( data ){
					location.href = "#/";
				}).error(function( message ){
					$scope.error = message;
				}).finally(function(){
					$scope.__httpStack.pop();
				});
			} else {
				$scope.__httpStack.push(1);
				$http.post("/api/products", $scope.product)
				.success(function( data ){
					location.href = "#/";
				}).error(function( message ){
					$scope.error = message;
				}).finally(function(){
					$scope.__httpStack.pop();
				});
			}

		}
		
	};
})();