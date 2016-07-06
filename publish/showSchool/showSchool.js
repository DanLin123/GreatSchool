angular.module('myApp.showSchool', ['ui.bootstrap',
  'myApp.showSchool.review', 'myApp.showSchool.gallery', 'myApp.schoolServices'
])
.controller('schoolInfoController', function($rootScope, $scope,$stateParams,$state,
  $location, $window, $uibModal, dataFactory,commonFactory){


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
        $rootScope.school.reviews = data.reviews ? data.reviews.clean(null) : [];
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

  var saveIntroductionToDb = function(newIntroduction){
    dataFactory.update($rootScope.school.id, { 'introduction': newIntroduction})
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
          return  $rootScope.school.introduction;
        }
      }
    });

    modalInstance.result.then(function (introduction) {
      saveIntroductionToDb(introduction);
    });
  };
})

.controller('customDialogCtrl',function($scope,$uibModalInstance,introduction){
  $scope.introduction = introduction;
  $scope.ok = function () {
    $uibModalInstance.close($scope.introduction);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
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



