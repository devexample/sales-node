(function(){
	angular.module("app.layout", [])
	.factory("layout", [function(){
		return {
			header: "/public/components/header.html"
		};
	}])
})();