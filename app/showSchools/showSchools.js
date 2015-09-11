'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp.showSchools', [
  'resources.school','ngAnimate', 'ui.bootstrap'
])
.controller('showSchoolsController', function ($scope, schoolService) {
  schoolService.all().then(function(schools){
    $scope.schools = schools;
  });

  $scope.myfunction = function(message){
  	window.alert(JSON.stringify(message));

  }


  schoolService.all({fields:{name:1}}).then(function(schools){
  	$scope.schoolNames = [];
  	
  	for( var i =0; i< schools.length; i++)
  	{
  		$scope.schoolNames.push( schools[i].name );
  	}
  });  
})
