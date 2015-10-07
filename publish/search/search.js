'use strict';

angular.module('myApp.search', ['ngAnimate', 'ui.bootstrap'
])
.controller('searchController', function ($scope, $http) {
 	$http.get('/api/schools/name')
        .success(function(data) {
            $scope.schoolNames = data;
        })
        .error(function(data) {
            console.log('Error get schools names: ' + data);
        });


 	 $scope.currentCity = "福州"  //to do : auto detect the city by the ip
 	 $scope.chinaAreas = {
		    "福建省": {
		    	"福州市": [
		    		"全部",
			        "鼓楼区",
			        "台江区",
			        "仓山区",
			        "马尾区",
			        "晋安区",
			        "福清市",
			        "长乐市",
			        "闽侯县",
			        "连江县",
			        "罗源县",
			        "闽清县",
			        "永泰县",
			        "平潭县"]
		    }
 	 }

 	  $scope.province = "福建省"
 	  $scope.city = "福州市"
	  $scope.schoolAreas = $scope.chinaAreas.福建省.福州市
	  $scope.schoolTypes = ["全部","高中", "初中", "幼儿园", "日托"]
	  $scope.schoolCategories = ["全部","公办","民办", "私立"]
	  $scope.schoolLevel = ["全部","示范", "重点", "普通"]

	  $scope.selectedValue = {
	    areas: [], 
	    schoolType:[],
	    categary: [], 
	    level:[]
	  }

	  $scope.showSearchTags = function(selected){
	  	var searchText = "更多查找条件: ";
	  	var areas = selected.areas;

	  	for (var i = areas.length - 1; i >= 0; i--) {
	  		searchText += areas[i];
	  		searchText += " "; 
	  	};
	  	return searchText;
	  }

	  $scope.searchTagsText = $scope.showSearchTags($scope.selectedValue);
	  
})
.filter("getAdvancedSearch", function(){
   return function(input){
	var output = "其他查找条件: ";
   	for (var key in input) {
	  if (input.hasOwnProperty(key)) {
	     var options = input[key];
	     for (var i = options.length - 1; i >= 0; i--) {
	   	 	output += options[i] + " ";
	   	 };
	  }
	}
   
    return output; 
   }
});
