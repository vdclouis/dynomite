'use strict';

angular.module('dynomiteApp', ['ngResource', 'google-maps'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/Home',
        controller: 'HomeCtrl'
      })
      .when('/register', {
        templateUrl: 'views/Register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: 'views/Login',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        /*templateUrl: 'views/Login.html',
        controller: 'LoginCtrl'*/
      })
      .when('/users', {
        templateUrl: '/views/users',
        controller: 'UsersCtrl'
      })
      .when('/user/pro', {
        templateUrl: 'views/user.html',
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
        templateUrl: '/views/secure/Area',
        controller: 'AreaCtrl'
      })
      .when('/area/add', {
        templateUrl: '/views/secure/AreaAdd',
        controller: 'AreaAddCtrl'
      })
      .when('/area/edit/:areaId', {
        templateUrl: '/views/AreaEdit.html',
        controller: 'AreaEditCtrl'
      })
      .when('/area/:name', {
        templateUrl: 'views/AreaRoutes.html',
        controller: 'AreaRoutesCtrl'
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
      .when('/route/add', {
        templateUrl: 'views/RouteAdd.html',
        controller: 'RouteAddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });


