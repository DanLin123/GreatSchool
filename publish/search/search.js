'use strict';

angular.module('myApp.search', ['ngAnimate', 'ui.bootstrap'
])
.controller('searchController', function ($scope, $http) {
	$scope.selectedSchoolType="全部"
	$scope.selectedArea = "全部"
	$scope.selectedCategory ="全部"
	$scope.selectedLevel = "全部"
 	$http.get('/api/schools/name')
        .success(function(data) {
            $scope.schoolNames = data;
        })
        .error(function(data) {
            console.log('Error get schools names: ' + data);
        });
      $http.get('/api/schools/area')
        .success(function(data) {
             data.unshift("全部")
             $scope.schoolAreas = data;
        })
        .error(function(data) {
            console.log('Error get areas: ' + data);
      });

       $http.get('/api/schools/schoolType')
        .success(function(data) {
             data.unshift("全部")
             $scope.schoolTypes = data;
        })
        .error(function(data) {
            console.log('Error get schoolType: ' + data);
      });

       $http.get('/api/schools/catagery')
        .success(function(data) {
             data.unshift("全部")
             $scope.schoolCategories = data;
        })
        .error(function(data) {
            console.log('Error get category: ' + data);
      });

      $http.get('/api/schools/level')
        .success(function(data) {
             data.unshift("全部")
             $scope.schoolLevel = data;
        })
        .error(function(data) {
            console.log('Error get level: ' + data);
      });

 	  $scope.province = "福建省"
 	  $scope.city = "福州市"
	   
})
.filter("getAdvancedSearch", function(){
   return function(input){
	var output = "其他查找条件: ";
   	for (var key in input) {
	  if (input.hasOwnProperty(key)) {
	     var options = input[key];
	     for (var i = options.length - 1; i >= 0; i--) {
	   	 	output += options[i] + " ";
	   	 };
	  }
	}
   
    return output; 
   }
});
