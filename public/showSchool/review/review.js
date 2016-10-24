angular.module('myApp.showSchool.review', ['myApp.schoolServices'])
.controller('review', function($scope,$stateParams,$location, $window, dataFactory){
  $scope.school = dataFactory.school();
  $scope.submitButtonText = "提交点评";
  $scope.alertText = '';
  $scope.canSubmit = true;

  $scope.newReview = {
      generalScore: "",
      teacherScore: "",
      facilityScore: "",
      studentScore: "",
      userName:"匿名",
      role:"其他",
      content: "写点评",
      userImg: "asset/anony.png",
      date: Date.now()
  } 

  $scope.getDatetime = function() {
    return (new Date).toLocaleFormat("%A, %B %e, %Y");
  };

  var checkSubmitContent = function(){
    if($scope.newReview.content == '写点评' || $scope.newReview.content.trim() == '') {
      $scope.alertText = "点评不能为空";
        return false;
    }
    if($scope.newReview.generalScore == '' || $scope.newReview.teacherScore == ''
        || $scope.newReview.facilityScore == '' || $scope.newReview.facilityScore == '') {
      $scope.alertText = "评分不能为空";
      return false;
    }

    return true;
  }

  $scope.addReview = function(){
    $scope.canSubmit = checkSubmitContent();
    if($scope.canSubmit)
    {
      $scope.submitButtonText ="正在提交...";
      $scope.school.reviews.push($scope.newReview);
      dataFactory.update($scope.school.id, { 'reviews':$scope.school.reviews})
      .then(function(){
        $window.location.reload();
      }, function(){
        $window.alert("提交失败，请联系lindan_xmu@126.com");
        $scope.submitButtonText = "提交点评";
      });
    }
  }
})
