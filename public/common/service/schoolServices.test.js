describe('commonFactory', function() {
  var commonFac;

  beforeEach( function(){
    module('myApp.schoolServices');

    inject(function($injector) {
      commonFac = $injector.get('commonFactory');
    });
  });

  describe('getScore', function() {

    it('The score is average value of reviews', function() {
        var reviews = [
          {"generalScore":1},
          {"generalScore":1},
          {"generalScore":5},
        ];
        var score = commonFac.getScore(reviews)
        expect(score).toEqual(2);
    });

    it('If only one review, the score equal the reviews score ', function() {
      var reviews = [
          {"generalScore":5}
        ];
      var score = commonFac.getScore(reviews)
      expect(score).toEqual(5);
    });

    it('If no review, the score equal 0', function() {
      var reviews = [];
      var score = commonFac.getScore(reviews)
      expect(score).toEqual(0);
    });

  }); 
});
