angular.module('myApp.showSchool', ['myApp.schoolServices',
  'myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.showSchool.info'
])

.constant('TAB', {
  INFO: 0,
  REVIEW : 1,
  GALLERY: 2
})

.controller('schoolInfoController',function($scope,TAB, $stateParams, $location, 
  $anchorScroll, dataFactory){
  
  $scope.activeIndex = TAB.INFO;
  dataFactory.querySchool($stateParams.schoolId);
  $scope.school = dataFactory.school();

  $scope.addReview = function() {
    $scope.activeIndex = TAB.REVIEW;
  }

  $scope.checkReviews = function() {
      $scope.activeIndex = TAB.INFO;
      $location.hash('reviews');
      $anchorScroll('reviews');
  }
});
