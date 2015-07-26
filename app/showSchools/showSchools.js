'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp.showSchools', [
  'ngRoute',
  'resources.school',
])
.controller('showSchoolsController', function ($scope, schoolService) {

  schoolService.all().then(function(schools){
    $scope.schools = schools;
  });
})
