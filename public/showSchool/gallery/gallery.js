angular.module('myApp.showSchool.gallery',['ui.bootstrap','myApp.schoolServices'])
.controller('galleryCtrl', function($scope,$stateParams, $window, dataFactory) { 
    $scope.myInterval = 3000;
    $scope.noWrapSlides = true;
    $scope.active = 0;
    $scope.previewImage = 'asset/upload-pic.png';
    $scope.slides = [];
    var id = $stateParams.schoolId;
    var gallery = [];

    dataFactory.getGallery(id).then(
        function(data) {
          gallery = data;
          for(var i = 0; i < data.length; i++) {
              $scope.slides.push({
                  'image' : data[i],
                  'id' : i
              });
          }
        }
    );

      /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    var uploadFile = function (file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              gallery.push(url);
              dataFactory.update(id, {'gallery':gallery});  //save url to mongodb
              $window.location.reload();
            }
            else{
              alert('Could not upload file.');
            }
          }
        };
        xhr.send(file);       
    }

    $scope.initUpload = function(files, id) {
        dataFactory.getSignedRequest(files[0]).then(function(rep){
          uploadFile(files[0], rep.signedRequest, rep.url);
        });
    };
});
