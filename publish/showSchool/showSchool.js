angular.module('myApp.showSchool', ['myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.schoolServices'
])
.controller('schoolInfoController', function($scope,$stateParams,$location, $http, schoolReviewService){
 
  var schoolUri =  '/api/schools/' + $stateParams.schoolId;
  $http.get(schoolUri).success(function(data) {
              $scope.name = data.name;
              $scope.addr = data.address;
              $scope.id = data._id;

              $scope.tag = "";
              $scope.tag += (data.catagery) ? data.catagery :"";
              $scope.tag += (data.schoolType) ? data.schoolType :"";
              $scope.tag += (data.level) ? data.level :"";
        
         
              $scope.area = "";
              $scope.area += (data.province) ? data.province :"";
              $scope.area += (data.city) ? data.city :"";
              $scope.area += (data.area) ? data.area :"";

              $scope.logo = (data.logo!= "")? data.logo : "asset/no-school-photo.png" ; 
              $scope.phone = data.phone.join(" ")
              $scope.introduction = data.introduction;
              $scope.score = schoolReviewService.getScore(data);
              $scope.reviewCount = data.reviews ? data.reviews.length : 0;
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})



