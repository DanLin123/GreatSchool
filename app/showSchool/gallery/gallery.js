angular.module('myApp.showSchool.gallery', ['resources.school'])
.controller('galleryCtrl', function($scope,schoolService,$stateParams,$location) {
	$scope._Index = 0;
	$scope.width = '800';
	$scope.height = '400';

    $scope.schoolId = $stateParams.schoolId;

    schoolService.getById($scope.schoolId).then(function(schoolInfo){
       $scope.gallery = schoolInfo.gallery;
    });

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;

});
