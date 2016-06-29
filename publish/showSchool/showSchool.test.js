describe('schoolInfoController', function() {
  var scope, ctrl, httpBackend, stateparams, schoolServices;

  beforeEach(module('myApp.showSchool'));
  beforeEach(angular.mock.module("myApp.showSchool.review"));
  beforeEach(angular.mock.module("myApp.showSchool.gallery"));

  beforeEach(function(){
    commonFactoryFake = {
      getScore: function(data){
        return 2;
      }
    }
  })


  beforeEach(angular.mock.inject(function($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new(); 
    httpBackend = $httpBackend;
    stateparams = { schoolId: 1 }; //mock your stateparams object with your id
    state = { };
    httpBackend.expectGET('/api/schools/' + (stateparams.schoolId)).respond({"_id":"55e16c8ddceee257ba2c8e46",
                                    "province":"福建省","city":"福州市","name":"fuzhouyoueryuan","schoolType":"幼儿园",
                                    "area":"","level":"普通","address":"尚进街排尾新村４号楼二层","logo":"","catagery":"",
                                    "phone":["83285513"]});
 
    ctrl = $controller("schoolInfoController", {$scope:scope, $stateParams:stateparams, $state:state,
                                      commonFactory: commonFactoryFake}); 
  }));

  it('should get schoool name', function() {
    httpBackend.flush(); 
    expect(scope.name).toBe('fuzhouyoueryuan');
    expect(scope.address).toBe('尚进街排尾新村４号楼二层');
    expect(scope.catagery).toBe('');
    expect(scope.schoolType).toBe('幼儿园');
    expect(scope.level).toBe('普通');
    expect(scope.province).toBe('福建省');
    expect(scope.city).toBe('福州市');
    expect(scope.area).toBe('');
    expect(scope.reviewCount).toBe(0);
    expect(scope.score).toBe(2);
    expect(scope.logo).toBe("asset/no-school-photo.png");
    expect(scope.phone).toBe("83285513");
    expect(scope.introduction).toBe("");
    expect(scope.reviews.length).toBe(0);
  });
});
