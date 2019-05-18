angular.module('promotion', [])
	.controller('promotionController', function ($scope, $http) {
		$http.get("http://localhost:3000/api/promotion/getPromotions").then(function(res) {
            	$scope.promotionsList = res.data.promotionsList;
		});
	});