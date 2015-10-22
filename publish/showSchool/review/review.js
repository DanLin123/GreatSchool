angular.module('myApp.showSchool.review', [])
.controller('review', function($scope,$stateParams,$location, $http, $window){

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
            $http.put('/api/schools/'+ $scope.schoolId,{ review: $scope.newReview})
              .success(function(data) {
                  $window.location.reload();
              })
              .error(function(data) {
                 
                  $window.alert("提交失败，请联系lindan_xmu@126.com");
                   $scope.submitButtonText = "提交点评";

              });
          
      }

  }
})
