'use strict';

// Declare app level module which depends on views, and components


angular.module('myApp', [
  'ui.router',
  'resources.school',
  'myApp.showSchools',
  'myApp.showSchool'
])
.config(function($stateProvider, $urlRouterProvider) {
  
  // Now set up the states
  $stateProvider
    .state('showSchools', {
      url: "/showSchools",
      templateUrl: "showSchools/showSchools.html",
      controller: 'showSchoolsController'
    })

    .state('showSchool', {
      url: "/showSchool/:schoolId",
      templateUrl: "showSchool/showSchool.html",
      controller: 'schoolInfoController'
    })

    .state('showSchool.Info', {
      url: "/info",
      templateUrl: "showSchool/info.html",
      controller: 'schoolInfoController'
    })

    .state('showSchool.reviews', {
      url: "/reviews",
      templateUrl: "showSchool/reviews.html",
      controller: 'schoolInfoController'
    })
    .state('showSchool.gallery', {
      url: "/gallery",
      templateUrl: "showSchool/gallery.html",
      controller: 'schoolInfoController'
    })

})

