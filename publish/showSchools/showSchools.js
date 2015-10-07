'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp.showSchools', ['myApp.schoolServices'])
.controller('showSchoolsController', function ($scope, $http, schoolReviewService,  $stateParams) {
    $scope.name = $stateParams.name;
    $scope.province = $stateParams.province;
    $scope.city = $stateParams.city
    $scope.area = $stateParams.area
    $scope.schoolType = $stateParams.schoolType

    console.log("**** params name" + $scope.name);
    console.log("**** params province" + $scope.province)
    console.log("**** params city" + $scope.city)
    console.log("**** params area" + $scope.area)
    console.log("**** params schoolType" + $scope.schoolType)
  

	$scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.maxSize= 10;

    $http.get('/api/schools',{params:{name:$scope.name, province: $scope.province, city:$scope.city, 
                        area:$scope.area, schoolType:$scope.schoolType, category:$scope.category, level: $scope.level}})
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
        start = +start; 
        if(input != null && input!=undefined){
        	return input.slice(start);
        }
        else{
        	return input;
        }
        
    }
});
