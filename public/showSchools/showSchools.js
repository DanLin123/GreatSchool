angular.module('myApp.showSchools', ['myApp.schoolServices'])
.controller('showSchoolsController', function ($scope, $stateParams, generalService, dataFactory) {
    $scope.selected = {
      city : $stateParams.city,
      name : $stateParams.name,
      level : (typeof $stateParams.level === 'string' ) ? [$stateParams.level] : $stateParams.level,
      area : (typeof $stateParams.area === 'string' ) ? [$stateParams.area] : $stateParams.area,
      type: (typeof $stateParams.type === 'string' ) ? [$stateParams.type] : $stateParams.type,
    };

	  $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.numPages = 0;
    $scope.levels = ['幼儿园', '小学', '中学', '高中'];
    $scope.schoolTypes = ['公立', '私立'];

    dataFactory.cities()
    .then(function(response) {
      $scope.cities = response.data;
    })

    dataFactory.schoolNames()
    .then(function(response) {
        $scope.schoolNames = response.data;
    });

    dataFactory.areas($scope.selected.city)
    .then(function(response) {
        $scope.areas = response.data;
    })

    dataFactory.schools($scope.selected.city, $scope.selected.name, 
      $scope.selected.area, $scope.selected.level, $scope.selected.type)
    .then(function(response) {
        $scope.schools = response.data;
        $scope.numPages = Math.floor($scope.schools.length/$scope.pageSize) + 1;

        for(var i =0; i < $scope.schools.length; i++)
        {
            $scope.schools[i].logo = generalService.getLogo($scope.schools[i].logo);
            $scope.schools[i].id = $scope.schools[i]._id;
        }
    });

    $scope.getReviewsCount = function(reviews){
      return reviews != null ? reviews.length : 0; 
    }

})
.filter('indexFrom', function() {

    return function(input, start) {
      return input != null ? input.slice(start) : [];   
    }

});