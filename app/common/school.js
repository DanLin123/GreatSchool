'use strict';

// Declare app level module which depends on views, and components


angular.module('resources.school', ['mongolabResourceHttp'])
 .constant('MONGOLAB_CONFIG',{API_KEY:'hcVHpIwCS5RrP26QhsfY-G1JX0clwKPI', DB_NAME:'greatschool'})
 
 .factory('schoolService', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('school');
 }) 






