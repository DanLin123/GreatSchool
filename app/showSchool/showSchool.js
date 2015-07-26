angular.module('myApp.showSchool', [
  'resources.school'
])
.controller('schoolInfoController', function($scope,schoolService,$stateParams,$location){
  
  $scope.schoolId = $stateParams.schoolId;

  schoolService.getById($scope.schoolId).then(function(schoolInfo){
    $scope.schoolInfo = schoolInfo;
  });

  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})

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


