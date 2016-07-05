angular.module('myApp.schoolServices', [])
.factory("commonFactory", function(){
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
	factory.getLogo = function(logo) {
		if( logo === '') {
			return 'asset/no-school-photo.png';
		} else {
			return logo;
		}
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

	factory.reviews = function(id){
		let promise = $http.get(restAPI + '/schools/' + id);
		return promise;
	}

	factory.school = function (id) {
		let promise = $http.get(restAPI + '/schools/' + id);
        return promise;
    };

    factory.update = function(id, instroction){
    	let data = instroction;
    	let promise = $http.patch(restAPI + '/schools/' + id, data);
    	return promise;
    }

	return factory;
})