angular.module('myApp.common.dialog',['myApp.schoolServices'])
.controller('dialogCtrl',function($scope,$uibModalInstance,dataFactory){
  $scope.introduction = dataFactory.school().introduction;

  $scope.ok = function () {
    $uibModalInstance.close($scope.introduction);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});