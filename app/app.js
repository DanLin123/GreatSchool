'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp', [
  'ngRoute',
  'myApp.schoolInfo',
  'myApp.review',
  'myApp.intro',
  'myApp.gallery'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/schoolInfo'});
}])
.controller('myAppCtrl', function($scope, $route, $location) {
	 $scope.isActive = function(route) {
        return route === $location.path();
    }
})



