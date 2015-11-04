angular.module('myApp.showSchool', ['ui.bootstrap','dialogs.main',
  'myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.schoolServices'
])
.controller('schoolInfoController', function($scope,$stateParams,$state,$location, $http, $window,
        dialogs, schoolReviewService){
  //default state set to showSchool.Info
  if($state && $state.current && $state.current.name == "showSchool")
  {
      $state.transitionTo('showSchool.Info', {schoolId:$stateParams.schoolId});
  }

  $scope.addIntroduction = function(){
    var dlg = dialogs.create('/common/templates/customDialog.html','customDialogCtrl',{},'lg');
    dlg.result.then(
          function(newIntroduction){
             saveIntroductionToDb(newIntroduction);
             console.log(newIntroduction);
          });
  }

   var saveIntroductionToDb = function(newIntroduction){
        $http.put('/api/schools/'+ $scope.id,{ 'introduction': newIntroduction})

          .success(function(data) {
              $window.location.reload();
          })
          .error(function(data) {
              $window.alert("提交失败，请联系lindan_xmu@126.com");
          });

  }
  

  Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  };

  var schoolUri =  '/api/schools/' + $stateParams.schoolId;
  $http.get(schoolUri).success(function(data) {
              $scope.name = data.name;
              $scope.address = data.address;
              $scope.id = data._id;

              $scope.catagery = (data.catagery) ? data.catagery :"";
              $scope.schoolType = (data.schoolType) ? data.schoolType :"";
              $scope.level =  (data.level) ? data.level :"";

              $scope.province = (data.province) ? data.province :""; 
              $scope.city = (data.city) ? data.city :"";
              $scope.area = (data.area) ? data.area :"";
        
              $scope.logo = (data.logo!= "")? data.logo : "asset/no-school-photo.png" ; 
              $scope.phone = (data.phone) ? data.phone.join(" ") :"";
              $scope.introduction = data.introduction ? data.introduction : "" ;
              $scope.score = schoolReviewService.getScore(data);
              $scope.reviews = data.review ? data.review.clean(null) : null;
              $scope.reviewCount = $scope.reviews ? $scope.reviews.length : 0;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})
.controller('customDialogCtrl',function($scope,$modalInstance,data){
  $scope.input = {introduction : ''};

  $scope.cancel = function(){
    $modalInstance.dismiss('canceled');  
  }; // end cancel
  
  $scope.save = function(){
    $modalInstance.close($scope.introduction);
  }; // end save
  
 
}) // end whatsYourNameCtrl



