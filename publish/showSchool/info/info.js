angular.module('myApp.showSchool.info',['myApp.schoolServices'])
.controller('infoCtrl', function($scope, dataFactory, $window, $uibModal) {
    $scope.school = dataFactory.school();
  
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

  $scope.checkReviews = function() {

  }

})
.controller('customDialogCtrl',function($scope,$uibModalInstance,introduction){
  $scope.introduction = introduction;
  $scope.ok = function () {
    $uibModalInstance.close($scope.introduction);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
