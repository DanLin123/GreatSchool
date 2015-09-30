'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp.showSchools', ['myApp.schoolServices'])
.controller('showSchoolsController', function ($scope, $http, schoolReviewService) {
	$scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.maxSize= 10;

    $http.get('/api/schools')
        .success(function(data) {
            $scope.schools = data;
            for(var i =0; i < $scope.schools.length; i++)
            {
            	$scope.schools[i].score = schoolReviewService.getScore($scope.schools[i]);
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	 $scope.getLogo = function(logo){
	 	if(logo== "")
	 	{
	 		return "asset/no-school-photo.png"
	 	}
	 	else{
	 		return logo
	 	}
	 }

	

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
        start = +start; //parse to int
        if(input != null && input!=undefined){
        	return input.slice(start);
        }
        else{
        	return input;
        }
        
    }
});
