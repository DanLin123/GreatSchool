'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp.showSchools', [
  'resources.school','ngAnimate', 'ui.bootstrap'
])
.controller('showSchoolsController', function ($scope, schoolService, schoolServiceCached) {
	$scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.maxSize= 10;

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

	  schoolServiceCached.all(function(schools){
	  	$scope.schools = schools;
	  });  
})
.filter('startFrom', function() {
    return function(input, start) {
    	debugger;
        start = +start; //parse to int
        return input.slice(start);
    }
});