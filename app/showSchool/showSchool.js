angular.module('myApp.showSchool', ['myApp.showSchool.review', 'myApp.showSchool.gallery'
])
.controller('schoolInfoController', function($scope,$stateParams,$location, $http){
  $scope.schoolInfo = {};

  var schoolUri =  '/api/schools/' + $stateParams.schoolId;
  $http.get(schoolUri).success(function(data) {
              $scope.schoolInfo.name = data.name;
              $scope.schoolInfo.addr = data.address;

              $scope.schoolInfo.tag = "";
              $scope.schoolInfo.tag += (data.catagery) ? data.catagery :"";
              $scope.schoolInfo.tag += (data.schoolType) ? data.schoolType :"";
              $scope.schoolInfo.tag += (data.level) ? data.level :"";
        
         
              $scope.schoolInfo.area = "";
              $scope.schoolInfo.area += (data.province) ? data.province :"";
              $scope.schoolInfo.area += (data.city) ? data.city :"";
              $scope.schoolInfo.area += (data.area) ? data.area :"";

              $scope.schoolInfo.logo = (data.logo!= "")? data.logo : "asset/no-school-photo.png" ; 
              $scope.schoolInfo.phone = data.phone.join(" ")
              $scope.schoolInfo.introduction = data.introduction;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})



