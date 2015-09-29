'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp.showSchools', ['ngAnimate', 'ui.bootstrap'])
.controller('showSchoolsController', function ($scope, $http) {
	$scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.maxSize= 10;

    $http.get('/api/schools')
        .success(function(data) {
            $scope.schools = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);                
    }

	 $scope.getLogo = function(logo){
	 	if(logo== "")
	 	{
	 		return "asset/no-school-photo.png"
	 	}
	 	else{
	 		return logo
	 	}
	 }

	 $scope.getScore = function(reviews){
	 	var schoolScore = 0;
	 	if(reviews!=null && reviews!=undefined)
	 	{
	 		var reviewLength = reviews.length;
		 	for(var i=0; i< reviewLength; i++)
		 	{
		 		schoolScore += reviews[i].generalScore
		 	}
			schoolScore = schoolScore/reviewLength;
	 	}
	 	return schoolScore;
	 }

	 $scope.getReviewsCount = function(reviews){
	 	if(reviews==null && reviews==undefined)
	 	{
	 		return 0;
	 	}
	 	return reviews.length;
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