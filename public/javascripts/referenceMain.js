angular.module('reference', [])
	.controller('referenceController', function ($scope, $http) {
		$http.get("https://company-website-and-api.herokuapp.com/api/reference/getReferences").then(function(res) {
            	$scope.referencesList = res.data.referencesList;
		});
	});