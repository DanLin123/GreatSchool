angular.module('myApp.showSchool.gallery',['myApp.schoolServices'])
.controller('galleryCtrl', function($scope,$stateParams, $window, dataFactory) {
    $scope.myInterval = 3000;
    $scope.noWrapSlides = true;
    $scope.active = 0;
    $scope.previewImage = 'asset/upload-pic.png';
    $scope.uploadFile;
    $scope.slides = [];

    dataFactory.getGallery($stateParams.schoolId).then(
        function(data) {
            for(var i = 0; i < data.length; i++) {
                $scope.slides.push({
                    'image' : data[i].image,
                    'id' : i
                });
            }
        }
    );


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
              $window.location.reload();
            }, function() {
                console.log('failed');
            });
        });
    };

});
