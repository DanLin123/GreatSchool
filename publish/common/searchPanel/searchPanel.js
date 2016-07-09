angular.module('myApp.common.searchPanel', ['ngAnimate', 'ui.bootstrap', 'myApp.schoolServices'
])
.controller('searchPanelController', function ($scope, $http, dataFactory) {
  dataFactory.cities()
  .then(function(response) {
      $scope.schoolCities = response.data;
    });

  dataFactory.schoolNames()
  .then(function(response){
      $scope.schoolNames = response.data;
  });
   
  $scope.beautyEncode = function(string){
    string = string.replace();
    return string;
  };
})

