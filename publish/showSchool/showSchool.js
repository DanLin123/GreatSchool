angular.module('myApp.showSchool', ['ui.bootstrap','dialogs.main',
  'myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.schoolServices'
])
.controller('schoolInfoController', function($rootScope, $scope,$stateParams,$state,$location, $http, $window,
        dialogs, dataFactory,commonFactory){

  //default state set to showSchool.Info
  if($state && $state.current && $state.current.name == "showSchool")
  {
      $state.transitionTo('showSchool.Info', {schoolId:$stateParams.schoolId});
  }

  $rootScope.school={"logo":"asset/no-school-photo.pn"};
  dataFactory.school($stateParams.schoolId)
      .then(function(response) {
        let data = response.data;
        $rootScope.school.name = data.name;
        $rootScope.school.address = data.address;
        $rootScope.school.id = data.id;

        $rootScope.school.catagery = (data.catagery) ? data.catagery :"";
        $rootScope.school.schoolType = (data.schoolType) ? data.schoolType :"";
        $rootScope.school.level =  (data.level) ? data.level :"";

        $rootScope.school.province = (data.province) ? data.province :""; 
        $rootScope.school.city = (data.city) ? data.city :"";
        $rootScope.school.area = (data.area) ? data.area :"";
  
        $rootScope.school.logo = commonFactory.getLogo(data.logo); 
        $rootScope.school.phone = (data.phone) ? data.phone.join(" ") :"";
        $rootScope.school.introduction = data.introduction ? data.introduction : "" ;
        $rootScope.school.score = commonFactory.getScore(data.review);
        $rootScope.school.reviews = data.reviews ? data.reviews.clean(null) : null;
        $rootScope.school.reviewCount = data.reviews ? data.reviews.length : 0;
        $rootScope.school.gallery = data.gallery;
      });


  Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  };

  $scope.addIntroduction = function(){
    var dlg = dialogs.create('/common/templates/customDialog.html','customDialogCtrl',{},'lg');
    dlg.result.then(
          function(newIntroduction){
             saveIntroductionToDb(newIntroduction);
          });
  }

  var saveIntroductionToDb = function(newIntroduction){
        dataFactory.update($rootScope.school.id, { 'introduction': newIntroduction})
        .then(function(data){
          $window.location.reload();
        },function(error){
          $window.alert("提交失败，请联系lindan_xmu@126.com");
        });
  }

  $scope.isActive = function(route) {
        return route === $location.path().split(/[\s/]+/).pop();
  };
})

//controller for add introduction dialog. share school with schoolInfoController 
.controller('customDialogCtrl',function($rootScope, $scope,$modalInstance){
  $scope.introduction = $rootScope.school.introduction;
  $scope.cancel = function(){
    $modalInstance.dismiss('canceled');  
  }; 
  $scope.save = function(){
    $modalInstance.close($scope.introduction);
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



