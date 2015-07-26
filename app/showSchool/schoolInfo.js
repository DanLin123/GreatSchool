angular.module('myApp.showSchool', [
  'resources.school',
  'myApp.gallery'
])
.controller('schoolInfoController', function($scope,schoolService,$stateParams,$location){
  $scope.schoolId = $stateParams.schoolId;

  schoolService.getById($scope.schoolId).then(function(schoolInfo){
    $scope.schoolInfo = schoolInfo;
  });

  $scope.isActive = function(route) {
        return route === $location.path();
  };
})

