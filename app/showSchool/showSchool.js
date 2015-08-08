angular.module('myApp.showSchool', [
  'resources.school'
])
.controller('schoolInfoController', function($scope,schoolService,$stateParams,$location){
  
  $scope.newReview = {
    generalScore: "",
    teacherScore: "",
    facilityScore: "",
    studentScore: "",
    content: "写点评"
  } 

  $scope.reset = function(){
    $scope.newReview = {
      generalScore: "",
      teacherScore: "",
      facilityScore: "",
      studentScore: "",
      content: "写点评"
    } 
  }

  $scope.clearText = function(){
    $scope.newReview.content="";
  }

  $scope.schoolId = $stateParams.schoolId;

  schoolService.getById($scope.schoolId).then(function(schoolInfo){
    $scope.schoolInfo = schoolInfo;
  });

  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };

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
            $scope.schoolInfo.reviews.push($scope.newReview);
            $scope.schoolInfo.$update().then(
              function( value ){
                console.log(value);
                $scope.reset();
              },
              
              function( error ){}
            )
      }
    
  }
})

.controller('galleryCtrl', function($scope) {
	$scope._Index = 0;
	$scope.width = '600px';
	$scope.height = '400px';

	 // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.getGallery().length - 1) ? ++$scope._Index : 0;
    };

   // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.getGallery().length - 1;
    };

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

	 $scope.showPhoto = function (index) {
        $scope._Index = index;
    };
});


