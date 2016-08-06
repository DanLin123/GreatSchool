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
.factory("dataFactory", function($http, commonFactory){
	var factory = [];
	var restAPI = "/api";
	var schoolInfo = {};

	factory.getSchool = function (id) {
		var promise = $http.get(restAPI + '/schools/' + id)
		.then(function(response){
			let data = response.data;
	        schoolInfo.name = data.name;
	        schoolInfo.address = data.address;
	        schoolInfo.id = data._id;

	        schoolInfo.catagery = (data.catagery) ? data.catagery :"";
	        schoolInfo.schoolType = (data.schoolType) ? data.schoolType :"";
	        schoolInfo.level =  (data.level) ? data.level :"";

	        schoolInfo.province = (data.province) ? data.province :""; 
	        schoolInfo.city = (data.city) ? data.city :"";
	        schoolInfo.area = (data.area) ? data.area :"";
	  
	        schoolInfo.logo = commonFactory.getLogo(data.logo); 
	        schoolInfo.phone = (data.phone) ? data.phone.join(" ") :"";
	        schoolInfo.introduction = data.introduction ? data.introduction : "" ;
	        schoolInfo.score = commonFactory.getScore(data.review);
	        schoolInfo.reviews = data.reviews ? data.reviews : [];
	        schoolInfo.reviewCount = data.reviews ? data.reviews.length : 0;
	        schoolInfo.gallery = data.gallery;
	        return schoolInfo;
		})
		return promise;
    };

    factory.getGallery = function(id){
    	var promise = $http.get(restAPI + '/schools/' + id)
		.then(function(response){
	        return response.data.gallery;
		})
		return promise;
    }

    factory.getReview = function(id){
    	var promise = $http.get(restAPI + '/schools/' + id)
		.then(function(response){
	        return response.data.reviews;
		})
		return promise;
    }

    factory.school = function(){
    	return schoolInfo;
    }

	factory.areas = function(city) {
		var promise = $http.get(restAPI + '/areas/' + city);
        return promise;
	};

	factory.cities = function(){
		var promise = $http.get(restAPI + '/cities');
        return promise;
	}

	factory.schoolTypes = function() {
		var promise = $http.get(restAPI + '/schoolTypes');
		return promise
	}

	factory.schoolNames = function(city) {
		var promise = $http.get(restAPI + '/schoolNames/' + city);
		return promise;
	}

	factory.schools = function(city, name, area, level, type) {
		let api = restAPI + '/schools?';
		api += city ? ('city=' + city + '&') : '';
		api += name ? ("name=" + name + "&") : '';
		api += area ? ("area=" + area + "&") : '';
		api += level ? ("level=" + level + "&") : '';
		api += type ? ("type=" + type +"&") : '';
		var promise = $http.get(api);
		return promise;
	}

    factory.update = function(id, content) {
    	let promise = $http.patch(restAPI + '/schools/' + id, content);
    	return promise;
    }

  
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    factory.getSignedRequest= function(file) {
    	var promise = $http.get(restAPI + `/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    	.then(function(response){
    		return response.data;
    	}, function(){
    		alert('Could not sign file.')
    	});
    	return promise;
    }

	return factory;
})