'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'angularCSS',
  'myApp.schoolServices',
  'checklist-model',
  'myApp.common.searchPanel',
  'myApp.showSchools',
  'myApp.showSchool',
  'myApp.common.rating',
  'rt.encodeuri'
])
.config(function($stateProvider, $urlRouterProvider) {
  // Now set up the states

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

    .state('showSchool.Info', {
      url: "/info",
      templateUrl: "showSchool/info/info.html",
    })

    .state('showSchool.review', {
      url: "/review",
      templateUrl: "showSchool/review/review.html",
    })
   

    .state('showSchool.gallery', {
      url: "/gallery",
      templateUrl: "showSchool/gallery/gallery.html",
    })   
    
    $urlRouterProvider.otherwise("/search") 
})
