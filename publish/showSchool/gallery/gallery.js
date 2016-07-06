angular.module('myApp.showSchool.gallery',['myApp.schoolServices'])
.controller('galleryCtrl', function($rootScope, $scope,$stateParams,$location,$http, dataFactory) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var currIndex = 0;
    var slides = $scope.slides = [];

    $scope.addSlide = function(slide) {
        slides.push({
          image: slide.image,
          text: slide.text,
          id: currIndex++
        });
    };

    var gallery = $rootScope.school.gallery;
    for (var i = 0; i < gallery.length; i++) {
        $scope.addSlide(gallery[i]);
    }


});
