'use strict';
angular.module('myApp.showSchools', ['myApp.schoolServices'])
.controller('showSchoolsController', function ($scope, $http, $stateParams, commonFactory,dataFactory) {
    $scope.selected = {
      city : $stateParams.city,
      name : $stateParams.name,
      level : (typeof $stateParams.level === 'string' ) ? [$stateParams.level] : $stateParams.level,
      area : (typeof $stateParams.area === 'string' ) ? [$stateParams.area] : $stateParams.area,
      type: (typeof $stateParams.type === 'string' ) ? [$stateParams.type] : $stateParams.type,
    };

	  $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.maxSize= 10;
    $scope.levels = ['幼儿园', '小学', '初中', '高中'];
    $scope.schoolTypes = ['公立', '私立'];

    $scope.getCities = function() {
      dataFactory.cities()
      .then(function(response) {
        $scope.schoolCities = response.data;
      });
    }
    $scope.getSchoolNames = function() {
      dataFactory.schoolNames()
      .then(function(response) {
          $scope.schoolNames = response.data;
      })
    }
    $scope.getAreas = function() {
        dataFactory.areas($scope.selected.city)
        .then(function(response) {
            $scope.areas = response.data;
        })
    }
    $scope.getSchoolList = function() {
      dataFactory.schools($scope.selected.city, $scope.selected.name, 
        $scope.selected.area, $scope.selected.level, $scope.selected.type)
      .then(function(response) {
          $scope.schools = response.data;
          for(var i =0; i < $scope.schools.length; i++)
          {
              $scope.schools[i].score = commonFactory.getScore($scope.schools[i].review);
              $scope.schools[i].logo = commonFactory.getLogo($scope.schools[i].logo);
              $scope.schools[i].id = $scope.schools[i]._id;
          }
      });
    }
    $scope.getReviewsCount = function(reviews){
      if(reviews)
      {
        return reviews.length;
      }
      return 0;
    }

    $scope.getSchoolNames();
    $scope.getCities();
    $scope.getAreas();
    $scope.getSchoolList();
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
