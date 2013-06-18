'use strict';

angular.module('dynomiteApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/About', {
        templateUrl: 'views/About.html',
        controller: 'AboutCtrl'
      })
      .when('/Home', {
        templateUrl: 'views/Home.html',
        controller: 'HomeCtrl'
      })
      .when('/Grades', {
        templateUrl: 'views/Grades.html',
        controller: 'GradesCtrl'
      })
      .when('/Area', {
        templateUrl: 'views/Area.html',
        controller: 'AreaCtrl'
      })
      .when('/AreaAdd', {
        templateUrl: 'views/AreaAdd.html',
        controller: 'AreaAddCtrl'
      })
      .when('/AreaEdit', {
        templateUrl: 'views/AreaEdit.html',
        controller: 'AreaEditCtrl'
      })
      .when('/AreaRoutes', {
        templateUrl: 'views/AreaRoutes.html',
        controller: 'AreaRoutesCtrl'
      })
      .when('/RouteId', {
        templateUrl: 'views/RouteId.html',
        controller: 'RouteIdCtrl'
      })
      .when('/RouteIdPictures', {
        templateUrl: 'views/RouteIdPictures.html',
        controller: 'RouteIdPicturesCtrl'
      })
      .when('/RouteIdEdit', {
        templateUrl: 'views/RouteIdEdit.html',
        controller: 'RouteIdEditCtrl'
      })
      .when('/RouteIdDelete', {
        templateUrl: 'views/RouteIdDelete.html',
        controller: 'RouteIdDeleteCtrl'
      })
      .when('/RouteAdd', {
        templateUrl: 'views/RouteAdd.html',
        controller: 'RouteAddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
