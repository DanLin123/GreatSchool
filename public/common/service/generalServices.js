angular.module('myApp.generalServices', [])
.factory("generalService", function(){
	var factory = [];
	
	factory.getScore = function(reviews){
		if(reviews == null || reviews.length == 0) {
			return 0;
		}

		var schoolScore = 0;
	 	for(var i=0; i< reviews.length; i++) {
	 		schoolScore += reviews[i].generalScore
	 	}
		schoolScore = Math.round(schoolScore/reviews.length);

	 	return schoolScore;
	}

	factory.getLogo = function(logo) {
		return logo == '' ? 'asset/no-school-photo.png' : logo;
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