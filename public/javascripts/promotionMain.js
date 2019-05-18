angular.module('promotion', [])
	.controller('promotionController', function ($scope, $http) {
		$http.get("https://company-website-and-api.herokuapp.com/api/promotion/getPromotions").then(function(res) {
            	$scope.promotionsList = res.data.promotionsList;
		});
	});