'use strict';

// Declare app level module which depends on views, and components


angular.module('resources.school', ['mongolabResourceHttp'])
 .constant('MONGOLAB_CONFIG',{API_KEY:'hcVHpIwCS5RrP26QhsfY-G1JX0clwKPI', DB_NAME:'greatschool'})
 
 .factory('schoolService', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('school');
 }) 

.controller('AppController', function ($scope, schoolService) {

  Project.all().then(function(schoolService){
    $scope.school = schoolService;
  });
})

.controller('schoolInfoController', function($scope,schoolService){

  schoolService.getById('55b38749e4b01d0a17cdd015').then(function(schoolInfo){
   
    $scope.schoolInfo = schoolInfo;
     console.log(schoolInfo);
  });
})




