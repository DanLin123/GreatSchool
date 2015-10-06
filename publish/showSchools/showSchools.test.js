describe('showSchoolsController', function() {
  beforeEach(module('myApp.showSchools'));

  var controller;
  var scope;
  beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('showSchoolsController', { $scope: scope });
  }));

  describe('$scope.getLogo', function() {
    it('If logo name is set , return the logo name', function() {
    
      var logo = scope.getLogo("myLogo");
      expect(logo).toEqual('myLogo');
    });

     it('If logo name is not set , return default name', function() {
      var logo = scope.getLogo("");
      expect(logo).toEqual('asset/no-school-photo.png');
    });
  }); 
});



