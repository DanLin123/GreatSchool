'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'checklist-model',
  'myApp.search',
  'myApp.showSchools',
  'myApp.showSchool',
  'myApp.directives'
])
.config(function($stateProvider, $urlRouterProvider) {
  // Now set up the states

  $stateProvider
    .state('showSchools', {
      url: "/showSchools",
      templateUrl: "showSchools/showSchools.html",
      controller: 'showSchoolsController'
    })

    .state('search', {
      url: "/search",
      templateUrl: "search/search.html",
      controller: 'searchController'
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
      url: "/:schoolId/review",
      templateUrl: "showSchool/review/review.html",
    })
    .state('showSchool.gallery', {
      url: "/gallery",
      templateUrl: "showSchool/gallery/gallery.html",
    })   
    
    $urlRouterProvider.otherwise("/search") 
})