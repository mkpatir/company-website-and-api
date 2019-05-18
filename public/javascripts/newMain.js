angular.module('new', [])
	.controller('newController', function ($scope, $http) {
		$http.get("https://company-website-and-api.herokuapp.com/api/new/getNews").then(function(res) {
            	$scope.newsList = res.data.newsList;
		});
	});