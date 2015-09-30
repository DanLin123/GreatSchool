describe('showSchoolsController', function() {
  beforeEach(module('myApp.showSchools'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('$scope.getLogo', function() {
    it('If logo name is set , return the logo name', function() {
      var $scope = {};
      var controller = $controller('showSchoolsController', { $scope: $scope });
      var logo = $scope.getLogo("myLogo");
      expect(logo).toEqual('myLogo');
    });

     it('If logo name is not set , return default name', function() {
      var $scope = {};
      var controller = $controller('showSchoolsController', { $scope: $scope });
      var logo = $scope.getLogo("");
      expect(logo).toEqual('asset/no-school-photo.png');
    });
  }); 
});



