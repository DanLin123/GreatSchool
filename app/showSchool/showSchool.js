angular.module('myApp.showSchool', [
  'resources.school', 'myApp.showSchool.review', 'myApp.showSchool.gallery'
])
.controller('schoolInfoController', function($scope,schoolService,$stateParams,$location){
  $scope.schoolId = $stateParams.schoolId;
  $scope.schoolInfo = {};
  schoolService.getById($scope.schoolId).then(function(schoolInfoDB){
  	console.log(schoolInfoDB.catagery);
  	$scope.schoolInfo.name = schoolInfoDB.name;
  	$scope.schoolInfo.addr = schoolInfoDB.address;
    $scope.schoolInfo.tag = schoolInfoDB.catagery.concat(" ", schoolInfoDB.level," ", schoolInfoDB.schoolType) ;
    $scope.schoolInfo.area = schoolInfoDB.province.concat(" ", schoolInfoDB.city, " ", schoolInfoDB.area);
    $scope.schoolInfo.logo = schoolInfoDB.logo; 
    $scope.schoolInfo.phone = schoolInfoDB.phone.join(" ")
    $scope.schoolInfo.introduction = schoolInfoDB.schoolIntroduction;
  });

  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})



