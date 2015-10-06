angular.module('myApp.showSchool', ['myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.schoolServices'
])
.controller('schoolInfoController', function($scope,$stateParams,$state,$location, $http, schoolReviewService){
  //default state set to showSchool.Info
  if($state && $state.current && $state.current.name == "showSchool")
  {
      $state.transitionTo('showSchool.Info', {schoolId:$stateParams.schoolId});
  }

  var schoolUri =  '/api/schools/' + $stateParams.schoolId;
  $http.get(schoolUri).success(function(data) {
              $scope.name = data.name;
              $scope.address = data.address;
              $scope.id = data._id;

              $scope.catagery = (data.catagery) ? data.catagery :"";
              $scope.schoolType = (data.schoolType) ? data.schoolType :"";
              $scope.level =  (data.level) ? data.level :"";

              $scope.province = (data.province) ? data.province :""; 
              $scope.city = (data.city) ? data.city :"";
              $scope.area = (data.area) ? data.area :"";
        
              $scope.logo = (data.logo!= "")? data.logo : "asset/no-school-photo.png" ; 
              $scope.phone = data.phone.join(" ")
              $scope.introduction = data.introduction ? data.introduction : "" ;
              $scope.score = schoolReviewService.getScore(data);
              $scope.reviewCount = data.reviews ? data.reviews.length : 0;
              $scope.reviews = data.reviews ? data.reviews :  (new Array());
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})



