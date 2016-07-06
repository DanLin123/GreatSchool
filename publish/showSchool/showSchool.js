angular.module('myApp.showSchool', ['ui.bootstrap',
  'myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.schoolServices'
])
.controller('schoolInfoController', function($scope,$stateParams,$location, 
                                            $window, $uibModal, dataFactory){

  dataFactory.getSchool($stateParams.schoolId)
  .then(function(data){
    $scope.school = data;
  });


  var saveIntroductionToDb = function(newIntroduction){
    dataFactory.update($scope.school.id, { 'introduction': newIntroduction})
    .then(function(){
      $window.location.reload();
    },function(){
      $window.alert("提交失败，请联系lindan_xmu@126.com");
    });
  }

  $scope.addIntroduction = function (size) {

    var modalInstance = $uibModal.open({
      templateUrl: '/common/templates/customDialog.html',
      controller: 'customDialogCtrl',
      size: size,
      resolve: {
        introduction: function () {
          return  $scope.school.introduction;
        }
      }
    });

    modalInstance.result.then(function (introduction) {
      saveIntroductionToDb(introduction);
    });
  };
})

.controller('customDialogCtrl',function($scope,$uibModalInstance,introduction){
  $scope.introduction = introduction;
  $scope.ok = function () {
    $uibModalInstance.close($scope.introduction);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
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



