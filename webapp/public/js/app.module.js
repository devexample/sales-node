(function(){
	angular.module("app", ["app.states"])
	.controller("MainController", ["$scope", MainController]);

	function MainController( $scope ){
		$scope.__httpStack = [];
	}
})();