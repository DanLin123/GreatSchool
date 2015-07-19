'use strict';

var reviewApp = angular.module('myApp.intro', ['ngRoute','myApp.schoolInfo']);

reviewApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/intro', {
    templateUrl: 'intro/intro.html',
    controller: 'introCtrl'
  });
}])

reviewApp.controller('introCtrl', function($scope,  schoolInfo) {
	$scope.getSchoolName = function () {

		return schoolInfo.getSchoolName();
	}

	$scope.getAddr =function(){

		return schoolInfo.getAddr();
	}

	$scope.getPhone = function()
	{
		return schoolInfo.getPhone();
	}

	$scope.getTagString = function()
	{
		return schoolInfo.getTagString();
	}

	$scope.getImg = function(){
		return schoolInfo.getImg();
	}
});