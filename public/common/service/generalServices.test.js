describe('generalService', function() {
  var generalService;

  beforeEach( function(){
    module('myApp.generalServices');

    inject(function($injector) {
      generalService = $injector.get('generalService');
    });
    
  });

  describe('getScore', function() {

    it('The score is average value of reviews', function() {
        var reviews = [
          {"generalScore":1},
          {"generalScore":1},
          {"generalScore":5},
        ];
        var score = generalService.getScore(reviews)
        expect(score).toEqual(2);
    });

    it('If only one review, the score equal the reviews score ', function() {
      var reviews = [
          {"generalScore":5}
        ];
      var score = generalService.getScore(reviews)
      expect(score).toEqual(5);
    });

    it('If no review, the score equal 0', function() {
      var reviews = [];
      var score = generalService.getScore(reviews)
      expect(score).toEqual(0);
    });

  }); 

  describe('getLogo', function() {
    it('return defalut value if logo is empty', function() {
      expect(generalService.getLogo('')).toEqual('asset/no-school-photo.png');
    });

    it('return logo if it is not empty', function() {
      expect(generalService.getLogo('test.png')).toEqual('test.png');
    });
  });

});
