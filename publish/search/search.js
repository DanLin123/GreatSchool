angular.module('myApp.common.searchPanel', ['myApp.schoolServices',])
.controller('searchController', function ($scope, $http, dataFactory) {
  $scope.names = [];
  $scope.selectedCity = '';


  var queryCities = function() {
    dataFactory.cities()
    .then(function(response) {
        $scope.schoolCities = response.data;
    });
  }


  var querySchoolNames = function(city) {
    dataFactory.schoolNames(city)
    .then(function(response){
        $scope.names = response.data;
    });
  }

  queryCities();
  querySchoolNames($scope.selectedCity);
  $scope.$watch('selectedCity', function(newValue, oldValue) {
    querySchoolNames(newValue);
  });
 
  $scope.beautyEncode = function(string){
    string = string.replace();
    return string;
  };

})

