'use strict';

var reviewApp = angular.module('myApp.review', ['ngRoute','myApp.schoolInfo']);

reviewApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/review', {
    templateUrl: 'review/review.html',
    controller: 'reviewCtrl'
  });
}])

reviewApp.controller('reviewCtrl', function($scope,  schoolInfo) {
	$scope.getReviews = function(){
		return schoolInfo.getReviews();
	}
});