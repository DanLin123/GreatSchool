angular.module('myApp.showSchool', [
  'resources.school', 'myApp.showSchool.review', 'myApp.showSchool.gallery'
])
.controller('schoolInfoController', function($scope,schoolService,$stateParams,$location){
  $scope.schoolId = $stateParams.schoolId;

  schoolService.getById($scope.schoolId).then(function(schoolInfo){
    $scope.schoolInfo = schoolInfo;
    $scope.tag = $scope.schoolInfo.tags.join(' '); 
  });

  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})



