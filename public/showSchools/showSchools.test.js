describe('showSchoolsController', function() {
  beforeEach(module('myApp.showSchools'));

  var controller;
  var scope;
  beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('showSchoolsController', { $scope: scope });
  }));

});