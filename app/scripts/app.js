'use strict';

angular.module('dynomiteApp', ['ngResource', 'google-maps'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/Home.html',
        controller: 'HomeCtrl'
      })
      .when('/register', {
        templateUrl: 'views/Register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: 'views/Login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        /*templateUrl: 'views/Login.html',
        controller: 'LoginCtrl'*/
      })
      .when('/user/:username', {
        templateUrl: 'views/User.html',
        controller: 'UserCtrl'
      })
      .when('/about', {
        templateUrl: 'views/About.html',
        controller: 'AboutCtrl'
      })
      .when('/home', {
        templateUrl: 'views/Home.html',
        controller: 'HomeCtrl'
      })
      .when('/grades', {
        templateUrl: 'views/Grades.html',
        controller: 'GradesCtrl'
      })
      .when('/area', {
        templateUrl: 'views/Area.html',
        controller: 'AreaCtrl'
      })
      .when('/area/add', {
        templateUrl: 'views/AreaAdd.html',
        controller: 'AreaAddCtrl'
      })
      .when('/area/edit/:areaId', {
        templateUrl: 'views/AreaEdit.html',
        controller: 'AreaEditCtrl'
      })
      .when('/area/:areaId', {
        templateUrl: 'views/AreaRoutes.html',
        controller: 'AreaRoutesCtrl'
      })
      .when('/route/add/:areaId', {
        templateUrl: 'views/RouteAdd.html',
        controller: 'RouteAddCtrl'
      })
      .when('/route/:routeId', {
        templateUrl: 'views/RouteId.html',
        controller: 'RouteIdCtrl'
      })
      .when('/route/pictures/:routeId', {
        templateUrl: 'views/RouteIdPictures.html',
        controller: 'RouteIdPicturesCtrl'
      })
      .when('/route/edit/:routeId', {
        templateUrl: 'views/RouteIdEdit.html',
        controller: 'RouteIdEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    //$locationProvider.html5Mode(true);
  });