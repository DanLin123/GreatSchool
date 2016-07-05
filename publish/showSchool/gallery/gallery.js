angular.module('myApp.showSchool.gallery',[])
.controller('galleryCtrl', function($scope,$stateParams,$location,$http) {
	$scope._Index = 0;
	$scope.width = '800';
	$scope.height = '400';
    $scope.schoolId = $stateParams.schoolId;

  	var schoolUri =  '/api/schools/' + $stateParams.schoolId;
    $http.get(schoolUri).success(function(data) {
    	 $scope.gallery = data.gallery;
    })

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
});
