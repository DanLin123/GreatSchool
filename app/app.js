'use strict';

// Declare app level module which depends on views, and components


var app = angular.module('myApp', [
  'ngRoute',
  'myApp.schoolInfo',
  'myApp.review',
  'myApp.intro',
  'myApp.gallery'
])


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/schoolInfo'});
}]);



