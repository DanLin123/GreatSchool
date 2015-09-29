'use strict';

// Declare app level module which depends on views, and components


var schoolApp = angular.module('resources.school', ['mongolabResourceHttp'])
 .constant('MONGOLAB_CONFIG',{API_KEY:'hcVHpIwCS5RrP26QhsfY-G1JX0clwKPI', DB_NAME:'greatschool'})
 
 .factory('schoolService', function ($mongolabResourceHttp, $http) {
   	var factory = {}; 
    factory.all = function() {
    	var data=  $http.get('/api/schools');

    	console.log(data);
    	return data;
    }
    return factory;
 });


