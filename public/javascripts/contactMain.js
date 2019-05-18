angular.module('contact', [])
	.controller('contactController', function ($scope, $http) {
		$http.get("https://company-website-and-api.herokuapp.com/api/contact/getContact").then(function(res) {
            $scope.number = res.data.telephone_number;
            $scope.address = res.data.address;
            $scope.email = res.data.e_mail;
		});
	});