angular.module('myApp.showSchool.review', ['myApp.schoolServices'])
.controller('review', function($rootScope, $scope,$stateParams,$location, $window, dataFactory){
  $scope.reviews =  dataFactory.school().reviews;
  $scope.submitButtonText = "提交点评";
  $scope.schoolId = $stateParams.schoolId;
  
  $scope.getDatetime = function() {
    return (new Date).toLocaleFormat("%A, %B %e, %Y");
  };

  $scope.reset = function(){
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
  }

  $scope.commentClass = function(){
    if( $scope.newReview.content == "点评不能为空" )
    {
      return 'emptyComment';
    }
    return '';
  }
  

  $scope.reset();

  $scope.clearText = function(){
    $scope.newReview.content="";
  }

  $scope.canSubmitReview = function(){
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
      if( $scope.canSubmitReview())
      {
            $scope.submitButtonText ="正在提交...";
            $scope.reviews.push($scope.newReview);
            dataFactory.update($scope.schoolId, { 'reviews':$scope.reviews})
            .then(function(){
              $scope.reset();
            }, function(){
              $window.alert("提交失败，请联系lindan_xmu@126.com");
              $scope.submitButtonText = "提交点评";
            });
      }

  }
})
