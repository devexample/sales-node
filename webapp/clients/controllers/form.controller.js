(function(){
	angular.module("app.clients.form", ["angularValidator"])
	.controller("ClientsFormController", ["$scope", "$http", ClientsFormController]);

	function ClientsFormController( $scope, $http ){
		if( $scope.params.id ){
			$scope.__httpStack.push(1);
			$http.get("/api/clients/" + $scope.params.id)
			.success(function( data ){
				$scope.client = data;
				console.log(data);
			}).error(function( message ){
				$scope.error = message;
			}).finally(function(){
				$scope.__httpStack.pop();
			});
		}

		$scope.delete = function(){
			$scope.__httpStack.push(1);
			$http.delete("/api/clients/" + $scope.params.id)
			.success(function( data ){
				location.href = "#/";
			}).error(function( message ){
				$scope.error = message;
			}).finally(function(){
				$scope.__httpStack.pop();
			});
		}

		$scope.submit = function(){
			if( $scope.client._id ){
				$scope.__httpStack.push(1);
				$http.put("/api/clients", $scope.client)
				.success(function( data ){
					location.href = "#/";
				}).error(function( message ){
					$scope.error = message;
				}).finally(function(){
					$scope.__httpStack.pop();
				});
			} else {
				$scope.__httpStack.push(1);
				$http.post("/api/clients", $scope.client)
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