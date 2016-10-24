describe('showSchoolsController', function() {
  var indeFromfilter;

  beforeEach(function () {
    module('myApp.showSchools');

    inject(function ($filter) {
      indeFromfilter = $filter('indexFrom');
    });
  });

  it('should slice array', function () {
    var result = indeFromfilter(['a', 'b', 'c'], 1);
    expect(result).toEqual(['b', 'c']);
  });

   it('should return null if input is null', function () {
    var result = indeFromfilter(null, 1);
    expect(result).toEqual([]);
  });

});