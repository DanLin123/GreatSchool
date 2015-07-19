'use strict';

var reviewApp = angular.module('myApp.gallery', ['ngRoute','myApp.schoolInfo', 'ui.bootstrap']);

reviewApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/gallery', {
    templateUrl: 'gallery/gallery.html',
  });
}])

reviewApp.controller('galleryCtrl', function($scope,  schoolInfo) {
	$scope.getGallery = function(){
		return schoolInfo.getGallery();
	}

	$scope.myInterval = 1000;
	var slides = $scope.slides = [];

	$scope.addSlide = function() {
	    var newWidth = 600 + slides.length + 1;
	    slides.push({
	      image: 'http://placekitten.com/' + newWidth + '/300',
	      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
	        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	    });
	  };
	for (var i=0; i<4; i++) {
	    $scope.addSlide();
	}

});
