'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp.showSchools', [
  'resources.school','ngAnimate', 'ui.bootstrap'
])
.controller('showSchoolsController', function ($scope, schoolService, schoolServiceCached) {


 $scope.getlogo = function(logo){
 	if(logo== "")
 	{
 		return "asset/no-school-photo.png"
 	}
 	else{
 		return logo
 	}
 }

  schoolServiceCached.all(function(schools){
  	$scope.schools = schools;
  });  
})
