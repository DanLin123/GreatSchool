angular.module('myApp.schoolServices', [])
.factory("schoolReviewService", function(){
	var factory = [];
	factory.getScore = function(reviews){
		var schoolScore = 0;
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
	}
	return factory;
})
.factory("dataFactory", function($http){
	var factory = [];
	let restAPI = "http://localhost:12345";

	factory.areas = function() {
		var promise = $http.get(restAPI + '/areas');
        return promise;
	};

	factory.schoolTypes = function() {
		var promise = $http.get(restAPI + '/schoolTypes');
		return promise
	}

	factory.schoolNames = function() {
		var promise = $http.get(restAPI + '/schoolNames');
		return promise;
	}

	factory.schools = function(name, area, schoolType) {
		let api = restAPI + '/schools?';
		if(name != null) {
			api += ("name=" + name + "&");
		}
		if(area != null) {
			api += ("area=" + area + "&");
		}
		if(schoolType != null) {
			api += ("schoolType=" + schoolType +"&");
		}
		var promise = $http.get(api);
		return promise;
	}
	return factory;
})