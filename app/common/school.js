'use strict';

// Declare app level module which depends on views, and components


var schoolApp = angular.module('resources.school', ['mongolabResourceHttp'])
 .constant('MONGOLAB_CONFIG',{API_KEY:'hcVHpIwCS5RrP26QhsfY-G1JX0clwKPI', DB_NAME:'greatschool'})
 
 .factory('schoolService', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('school');
 }) 
 .factory('schoolCache', function($cacheFactory){
 	return $cacheFactory("schoolCache");
 });


schoolApp.factory('schoolServiceCached', function (schoolService, schoolCache ) {
 	return {
 		all : function(func){
 			var cache = schoolCache.get('schoolData');
 			if (cache) {
		    	 func(cache);
		    	 console.log("using cache");
		   	}
		   	else {
		   		schoolService.all().then(function(schools){
		   			schoolCache.put('schoolData', schools);
		   			func(schools);
		   			console.log("get data");
		   		});
		    }
 		}
 	}
 }) 

