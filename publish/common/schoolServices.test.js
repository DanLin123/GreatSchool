describe('schoolReviewService', function() {
  beforeEach(module('myApp.showSchools'));
  var schoolReviewServiceObj;

  beforeEach(inject(function(schoolReviewService){
    schoolReviewServiceObj=schoolReviewService;
  }));

  describe('getScore', function() {
    it('The score is average value of reviews', function() {
        var school = {"_id":"55b39ad4e4b01d0a17cdd0df",
                "reviews":[{"generalScore":1},
                            {"generalScore":1},
                            {"generalScore":5},
                          
                      ]}
        var score = schoolReviewServiceObj.getScore(school)
        expect(score).toEqual(2);
    });
    it('If only one review, the score equal the reviews score ', function() {
      var school = {"_id":"55b39ad4e4b01d0a17cdd0df","reviews":[{"generalScore":5}]}
      var score = schoolReviewServiceObj.getScore(school)
      expect(score).toEqual(5);
    });

    it('If no review, the score equal 0', function() {
      var school = {"_id":"55b39ad4e4b01d0a17cdd0df","reviews":[]}
      var score = schoolReviewServiceObj.getScore(school)
      expect(score).toEqual(0);
    });

  }); 
});
