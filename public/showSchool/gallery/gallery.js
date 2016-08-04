angular.module('myApp.showSchool.gallery',['myApp.schoolServices'])
.controller('galleryCtrl', function($scope, $window, dataFactory) {
    $scope.myInterval = 3000;
    $scope.noWrapSlides = true;
    $scope.active = 0;
    var currIndex = 0;
    $scope.previewImage = 'asset/upload-pic.png';
    $scope.uploadFile;
    var slides = $scope.slides = [];

    $scope.addSlide = function(slide) {
        slides.push({
          image: 'http://localhost:3000/' + slide.image,
          text: slide.text,
          id: currIndex++
        });
    };

    $scope.uploadFile = function(files) {
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);
        var schoolId = dataFactory.school().id;
        //upload files, and save return url to mongodb
        dataFactory.upload(schoolId, fd)
        .then(function(res){
            var newGallery = res.data;
            var gallery = dataFactory.school().gallery;
            for (var i = 0; i < newGallery.length; i++) {
                gallery.push(newGallery[i]);
            }
            dataFactory.update(schoolId, { 'gallery':gallery})
            .then(function() {
              console.log('update mongodb sucess');
              $window.location.reload();
            }, function() {
                console.log('failed');
            });
        });
    };

    var gallery = dataFactory.school().gallery || [] ;
    for (var i = 0; i < gallery.length; i++) {
        $scope.addSlide(gallery[i]);
    }
});
