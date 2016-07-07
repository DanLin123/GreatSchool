angular.module('myApp.showSchool', ['ui.bootstrap', 'myApp.schoolServices',
  'myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.showSchool.info'
])
.controller('schoolInfoController',function($scope,$stateParams, dataFactory){
  $scope.school = dataFactory.school();
  $scope.activeIndex = 0;

  dataFactory.getSchool($stateParams.schoolId);
  $scope.checkReviews = function() {
    $scope.activeIndex = 1;
  }

})
.filter('getScore', function() {
  return function(reviews) {
    schoolScore = 0;
    if(reviews && reviews.length != 0)
    {
      var reviewLength = reviews.length;
      for(var i=0; i< reviewLength; i++)
      {
        schoolScore += reviews[i].generalScore
      }
      schoolScore = Math.round(schoolScore/reviewLength);
    }
    return schoolScore;
  };
});



