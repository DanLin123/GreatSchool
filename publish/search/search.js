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

