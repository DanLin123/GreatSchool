'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp', [
  'ngRoute',
  'resources.school',
  'myApp.gallery'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/intro', {templateUrl: 'schoolInfo/intro.html'});
  $routeProvider.when('/review', {templateUrl: 'schoolInfo/review.html'});
  $routeProvider.when('/schoolInfo', {templateUrl: 'schoolInfo/schoolInfo.html'});
  $routeProvider.when('/gallery', {templateUrl: 'schoolInfo/gallery.html'});
  $routeProvider.otherwise({redirectTo: '/schoolInfo'});

}])
.controller('myAppCtrl', function($scope, $route, $location) {
	 $scope.isActive = function(route) {
        return route === $location.path();
    }
})
