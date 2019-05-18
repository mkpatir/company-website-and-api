angular.module('new', [])
	.controller('newController', function ($scope, $http) {
		$http.get("http://localhost:3000/api/new/getNews").then(function(res) {
            	$scope.newsList = res.data.newsList;
		});
	});