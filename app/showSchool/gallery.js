'use strict';

angular.module('myApp.gallery', ['ngRoute', 'ui.bootstrap', 'resources.school'])
.controller('galleryCtrl', function($scope) {
	$scope._Index = 0;
	$scope.width = '600px';
	$scope.height = '400px';

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
