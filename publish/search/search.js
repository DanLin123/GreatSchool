'use strict';

angular.module('myApp.search', ['ngAnimate', 'ui.bootstrap', 'myApp.schoolServices'
])
.controller('searchController', function ($scope, $http, dataFactory) {
	$scope.selectedArea;

  dataFactory.areas()
  .then(function(response) {
      $scope.schoolAreas = response.data;
    });

  dataFactory.schoolTypes()
  .then( function(response) {
       $scope.schoolTypes = response.data;
  });

  dataFactory.schoolNames()
  .then(function(response){
      $scope.schoolNames = response.data;
  });
   
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


