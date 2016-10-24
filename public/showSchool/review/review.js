angular.module('myApp.showSchool.review', ['myApp.schoolServices'])
.controller('review', function($scope,$stateParams,$location, $window, dataFactory){
  $scope.school = dataFactory.school();
  $scope.submitButtonText = "提交点评";

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

  $scope.commentClass = function(){
    return $scope.newReview.content == "点评不能为空" ? 'emptyComment' : '';
  }

  var canSubmitReview = function(){
      var $canSubmit = true;
      Object.keys($scope.newReview).forEach(function (key) { 
        var value = $scope.newReview[key];
        if(key == "content")
        {
            if(value == "写点评" || value == "点评不能为空" || value == "")
            {
              $scope.newReview.content = "点评不能为空";
              $canSubmit = false;
            }
        }
        else
        {
            if(value =="" || value=="无")
            {
               $scope.newReview[key] ="无";
               $canSubmit = false;
            }
        }
      
      });
      return $canSubmit;

  }

  $scope.addReview = function(){
      if( canSubmitReview())
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
