angular.module('myApp.showSchool.review', [
  'resources.school'
])
.controller('review', function($scope,schoolService,$stateParams,$location){

  $scope.schoolId = $stateParams.schoolId;

  schoolService.getById($scope.schoolId).then(function(schoolInfo){
    $scope.schoolInfo = schoolInfo;
  });


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
            $scope.schoolInfo.reviews.unshift($scope.newReview);
            $scope.schoolInfo.$update().then(
              function( value ){
                $scope.reset();
              },
              
              function( error ){}
            )
      }
    
  }
})
