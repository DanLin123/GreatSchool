"use strict";
var rating = angular.module("myApp.common.rating", []);

rating.directive("myrating", function() {
  var directive = { };
  directive.restrict = 'AE';
  directive.scope = {
    topic: '@',
    note:"@",
    score: '=',
    max: '=', 
  };

  directive.templateUrl = "/common/rating/rating.html";
  
  directive.link = function(scope, elements, attr) {
    scope.updateStars = function() {
      var idx = 0;
      scope.stars = [ ];
      for (idx = 0; idx < scope.max; idx += 1) {
        scope.stars.push({
          full: scope.score > idx
        });
      }

    };

    var defaultNote = scope.note;
    var scoreTextMap = {
        1: "很差",
        2: "一般",
        3: "好",
        4: "很好",
        5: "非常好"
    };
    
    var getScoreNote= function(score){
        var scoreNote = scoreTextMap[score];
        if(scoreNote)
        {
          return scoreNote;
        }
        else
        {
          return defaultNote;
        }
    }

    scope.hover = function(/** Integer */ idx) {
      scope.hoverIdx = idx;
      scope.note = getScoreNote(idx+1);
    };
    
    scope.stopHover = function() {
      scope.hoverIdx = -1;
      scope.note = getScoreNote(scope.score);
    };
    
    scope.starColor = function(/** Integer */ idx) {
      var starClass = 'rating-normal';
      if (idx <= scope.hoverIdx) {
       starClass = 'rating-highlight'; 
      }
      return starClass;
    };

    scope.starClass = function(/** Star */ star, /** Integer */ idx) {
      var starClass = 'fa-star-o';
      if (star.full || idx <= scope.hoverIdx) {
        starClass = 'fa-star';
      }
      return starClass;
    };

    scope.scoreIsEmpty = function(score)
    {
      return (score == "无");
    }

    scope.noteClass = function(score){
      if(scope.scoreIsEmpty(score))
        return 'warning';
      return 'smallNote';
    };
    
    scope.setRating = function(idx) {
      scope.score = idx + 1;
      scope.stopHover();
    };
   
    scope.$watch('score', function(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        scope.updateStars();
        scope.note = getScoreNote(newValue);
      }
    });

  };
  
  return directive;
});


rating.directive("staticStar",function() {
  var directive = { };
  directive.restrict = 'AE';
  directive.scope = {
    score: '=',
    max: '=', 
  };

  directive.templateUrl = "/common/rating/stars.html";
  directive.link = function(scope, elements, attr) {
  scope.updateStars = function() {
      var idx = 0;
      scope.stars = [ ];
      for (idx = 0; idx < scope.max; idx += 1) {
        scope.stars.push({
          full: scope.score > idx
        });
      }
    };
   
    scope.starClass = function(/** Star */ star, /** Integer */ idx) {
      var starClass = 'fa-star-o';
      if (star.full || idx <= scope.hoverid) {
        starClass = 'fa-star';
      }
      return starClass;
    };

    scope.$watch(attr.score,function(newValue,oldValue){
                //check new value to be what you expect.
        if (newValue != oldValue){     
            scope.updateStars();
         }
    });
    scope.updateStars();
  };
  return directive;
});

rating.directive("showOneReview", function(){
  return{
    restrict:'AE',
    scope:{review: '='},
    templateUrl: "/common/rating/review.html",
    link:function(scope, elements, attr) {
    }
  }
})

