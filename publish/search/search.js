angular.module('myApp.common.searchPanel', ['myApp.schoolServices',])
.controller('searchController', function ($scope, $http, dataFactory) {
  $scope.names = [];
  $scope.selectedCity= '';

    $scope.users = [
      'TestUser1',
      'TestUser2'
  ];

  dataFactory.cities()
  .then(function(response) {
      $scope.schoolCities = response.data;
    });

  dataFactory.schoolNames()
  .then(function(response){
      $scope.names = response.data;
  });
   
  $scope.beautyEncode = function(string){
    string = string.replace();
    return string;
  };
})

