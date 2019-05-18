angular.module('reference', [])
	.controller('referenceController', function ($scope, $http) {
		$http.get("http://localhost:3000/api/reference/getReferences").then(function(res) {
            	$scope.referencesList = res.data.referencesList;
		});
	});