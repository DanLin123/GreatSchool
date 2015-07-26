'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp', [
  'ngRoute',
  'resources.school',
  'myApp.gallery'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/intro', {templateUrl: 'schoolInfo/intro.html'})
  .when('/showSchool/:schoolId/review', {templateUrl: 'schoolInfo/review.html'})
  .when('/showSchool/:schoolId/info', {templateUrl: 'schoolInfo/info.html'})
  .when('/showSchool/:schoolId/gallery', {templateUrl: 'schoolInfo/gallery.html'})
  .when('/showSchools', {
        templateUrl: 'showSchools/showSchools.html',
        controller: 'showSchoolsController'
      })
  .when('/showSchool/:schoolId', {
      templateUrl: 'schoolInfo/info.html',
      controller: 'schoolInfoController'
  })
  .otherwise({redirectTo: '/showSchools'});
}])

.controller('showSchoolsController', function ($scope, schoolService) {

  schoolService.all().then(function(schools){
    $scope.schools = schools;
  });
})

.controller('myAppCtrl', function($scope, $route, $location) {
	 $scope.isActive = function(route) {
        return route === $location.path();
    }
})

.controller('schoolInfoController', function($scope,schoolService,$routeParams){
  $scope.schoolId = $routeParams.schoolId;
  schoolService.getById($scope.schoolId).then(function(schoolInfo){
    $scope.schoolInfo = schoolInfo;
  });
})
