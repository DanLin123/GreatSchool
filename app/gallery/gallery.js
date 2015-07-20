'use strict';

var reviewApp = angular.module('myApp.gallery', ['ngRoute','myApp.schoolInfo', 'ui.bootstrap']);

reviewApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/gallery', {
    templateUrl: 'gallery/gallery.html',
  });
}])

reviewApp.controller('galleryCtrl', function($scope,  schoolInfo) {
	$scope._Index = 0;
	$scope.width = '600px';
	$scope.height = '400px';
	$scope.getGallery = function(){
		return schoolInfo.getGallery();
	}

	 // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.getGallery().length - 1) ? ++$scope._Index : 0;
    };

   // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.getGallery().length - 1;
    };

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

	 $scope.showPhoto = function (index) {
        $scope._Index = index;
    };
});
