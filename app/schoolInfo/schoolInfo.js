angular.module('schoolInfo', [
  'ngRoute',
  'resources.school',
  'myApp.gallery'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/intro', {templateUrl: 'schoolInfo/intro.html'})
  .when('/review', {templateUrl: 'schoolInfo/review.html'})
  .when('/info', {templateUrl: 'schoolInfo/info.html'})
  .when('/gallery', {templateUrl: 'schoolInfo/gallery.html'})
  .otherwise({redirectTo: '/info'});
}])

