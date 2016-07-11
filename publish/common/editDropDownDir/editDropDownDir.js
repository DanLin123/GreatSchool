angular.module('myApp.common.editDropDownDir', [])
.directive('editDropDown', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {
      options: '=',
    },
    templateUrl: '/common/editDropDownDir/editDropDownDir.html',
    link: function(scope, iElement, iAttrs, ngModelCtrl) {
      ngModelCtrl.$formatters.push(function(modelValue) {
        console.log('formatter');
        return {
          selected: modelValue,
        };
      });

      ngModelCtrl.$parsers.push(function(viewValue) {
          console.log('parsers' + viewValue.selected);
          return viewValue.selected;
      });

      scope.$watch('selected', function() {
          console.log('watch');
          ngModelCtrl.$setViewValue({ selected: scope.selected});
      });

      ngModelCtrl.$render = function() {
          console.log('render'); 
          if (!ngModelCtrl.$viewValue) ngModelCtrl.$viewValue = { selected: ''};
          scope.selected = ngModelCtrl.$viewValue.selected;
      };

    },
    controller: ['$scope', function($scope) {
       $scope.choose = function($event){
        $scope.selected = $event.target.getAttribute('data-value');  
      }      
    }],
  };
});
