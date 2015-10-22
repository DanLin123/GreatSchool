'use strict';

angular.module('myApp.search', ['ngAnimate', 'ui.bootstrap'
])
.controller('searchController', function ($scope, $http) {
	$scope.selectedSchoolType="全部"
	$scope.selectedArea = "全部"
	$scope.selectedCategory ="全部"
	$scope.selectedLevel = "全部"
 	$http.get('/api/schoolField/name')
        .success(function(data) {
            $scope.schoolNames = data;
        })
        .error(function(data) {
            console.log('Error get schools names: ' + data);
        });
      $http.get('/api/schoolField/area')
        .success(function(data) {
             data.unshift("全部")
             $scope.schoolAreas = data;
        })
        .error(function(data) {
            console.log('Error get areas: ' + data);
      });

       $http.get('/api/schoolField/schoolType')
        .success(function(data) {
             data.unshift("全部")
             $scope.schoolTypes = data;
        })
        .error(function(data) {
            console.log('Error get schoolType: ' + data);
      });
 	  $scope.province = "福建省"
 	  $scope.city = "福州市"
	   
    $scope.beautyEncode = function(string){
      string = string.replace();
      return string;
    };
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
})


