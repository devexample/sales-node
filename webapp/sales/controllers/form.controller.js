(function(){
	angular.module("app.sales.form", ["angularValidator"])
	.controller("SalesFormController", ["$scope", "$http", SalesFormController]);

	function SalesFormController( $scope, $http ){

		// Load clients
		$scope.__httpStack.push(1);
		$http.get("/api/clients/")
		.success(function( data ){
			$scope.clients = data;
		}).error(function( message ){
			$scope.error = message;
		}).finally(function(){
			$scope.__httpStack.pop();
		});

		// Load products
		$scope.__httpStack.push(1);
		$http.get("/api/products/")
		.success(function( data ){
			$scope.products = data;
		}).error(function( message ){
			$scope.error = message;
		}).finally(function(){
			$scope.__httpStack.pop();
		});

		$scope.addProductToSale = function( product ){
			if( !product ) product = {};
			$scope.productError = product._id ? false : true;
			$scope.productQuantityError = product.quantity ? false : true;

			if( !$scope.productError && !$scope.productQuantityError ){
				if( !$scope.sale ) $scope.sale = {};
				if ( !$scope.sale.products ) $scope.sale.products = [];
				$scope.sale.products.push(product);
				// Remove product from list
				for (var i = 0; i < $scope.products.length; i++) {
					if( $scope.products[i]._id == product._id ){
						$scope.products.splice(i, 1);
						break;
					}
				};

				// Calculate total due
				var total = 0;
				for (var i = 0; i < $scope.sale.products.length; i++) {
					total += $scope.sale.products[i].price * $scope.sale.products[i].quantity;
				}; // Set total due
				$scope.sale.total = total;
				delete $scope.product;
			}
		};

		// $scope.calculateTotalPerProduct = function( product ){
		// 	product.total = product && product.price && product.quantity ? product.price * product.quantity : '';
		// };

		$scope.removeProduct = function( product ){
			for (var i = 0; i < $scope.sale.products.length; i++) {
				if( $scope.sale.products[i]._id == product._id ){
					$scope.products.push(product);
					$scope.sale.products.splice(i, 1);
					break
				}
			};

			// Calculate total due
			var total = 0;
			for (var i = 0; i < $scope.sale.products.length; i++) {
				total += $scope.sale.products[i].price * $scope.sale.products[i].quantity;
			}; // Set total due
			$scope.sale.total = total;
		};

		$scope.showAddProduct = function( value ){
			$scope.addProduct = value;
		};

		$scope.submit = function(){
			if( !$scope.sale.products ){
				$scope.saleProductsError = "You need to add products to sale";
			} else {
				$scope.__httpStack.push(1);
				$http.post("/api/sales", $scope.sale)
				.success(function( data ){
					location.href = "#/";
				}).error(function( message ){
					$scope.saleProductsError = message;
				}).finally(function(){
					$scope.__httpStack.pop();
				});
			}

		}
	};
})();