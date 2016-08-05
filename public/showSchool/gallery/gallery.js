angular.module('myApp.showSchool.gallery',['myApp.schoolServices'])
.controller('galleryCtrl', function($scope,$stateParams, $window, dataFactory) {
    $scope.myInterval = 3000;
    $scope.noWrapSlides = true;
    $scope.active = 0;
    $scope.previewImage = 'asset/upload-pic.png';
    $scope.slides = [];
    $scope.id = $stateParams.schoolId;

    dataFactory.getGallery($scope.id).then(
        function(data) {
            for(var i = 0; i < data.length; i++) {
                $scope.slides.push({

                    'image' : data[i],
                    'id' : i
                });
            }
        }
    );
     /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function getSignedRequest(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }


    $scope.initUpload = function(files, id) {
        dataFactory.getSignedRequest(files[0]);
    };
});
