angular.module('myApp', [
  'ui.router',
  'angularCSS',
  'myApp.schoolServices',
  'myApp.generalServices',
  'editableDropdown',
  'checklist-model',
  'myApp.common.searchPanel',
  'myApp.showSchools',
  'myApp.showSchool',
  'myApp.common.rating',
  'rt.encodeuri'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('showSchools', {
      url: "/showSchools?city?name?area?level?type",
      templateUrl: "showSchools/showSchools.html",
      controller: 'showSchoolsController',
      css: "showSchools/showSchools.css"
    })

    .state('search', {
      url: "/search",
      templateUrl: "search/search.html",
    })
    
    .state('showSchool', {
      url: "/showSchool/:schoolId",
      templateUrl: "showSchool/showSchool.html",
      controller: 'schoolInfoController'
    })
    
    $urlRouterProvider.otherwise("/search") 
})
