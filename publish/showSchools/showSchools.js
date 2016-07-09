'use strict';
angular.module('myApp.showSchools', ['myApp.schoolServices'])
.controller('showSchoolsController', function ($scope, $http, $stateParams, commonFactory,dataFactory) {
    $scope.name = $stateParams.name;
    $scope.area = $stateParams.area;
    $scope.city = $stateParams.city;
    $scope.schoolType = $stateParams.schoolType;
	$scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.maxSize= 10;

    $scope.areas= [];
    $scope.levels = ['幼儿园', '小学', '初中', '高中'];
    $scope.schoolTypes = ['公立', '私立'];

    dataFactory.areas($scope.city)
    .then(function(response) {
        $scope.areas = response.data;
    })

    dataFactory.schools($scope.city, $scope.name, $scope.area, $scope.schoolType)
    .then(function(response) {
        $scope.schools = response.data;
        for(var i =0; i < $scope.schools.length; i++)
        {
            $scope.schools[i].score = commonFactory.getScore($scope.schools[i].review);
            $scope.schools[i].logo = commonFactory.getLogo($scope.schools[i].logo);
            $scope.schools[i].id = $scope.schools[i]._id;
        }
    });
   
	 $scope.getReviewsCount = function(reviews){
	 	if(reviews)
	 	{
	 		return reviews.length;
	 	}
	 	return 0;
	 }

})
.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        if(input != null && input!=undefined){
        	return input.slice(start);
        }
        else{
        	return input;
        }
        
    }
});
