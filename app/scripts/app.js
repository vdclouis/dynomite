'use strict';

var dynomiteApp = angular.module('dynomiteApp', ['ngResource', 'google-maps']);

dynomiteApp
  //removes # from routes, but now template request should be handled by server
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  //configuration of the routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/Home',
        controller: 'HomeCtrl'
      })
      .when('/register', {
        templateUrl: '/views/Register',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: '/views/Login',
        controller: 'LoginCtrl',
        access: {
          isFree: false
        }
      })
      .when('/logout', {
        /*templateUrl: '/logout',*/
        controller: 'LogoutCtrl'
      })
      .when('/users', {
        templateUrl: '/views/users',
        controller: 'UsersCtrl'
      })
      .when('/user/:userName', {
        templateUrl: '/views/user',
        controller: 'UserCtrl',
        resolve: {
          //at this point the routeParams has not
          //been populated with his data yet
          user: UserCtrl.loadUser
        }
      })
      .when('/about', {
        templateUrl: '/views/About',
        controller: 'AboutCtrl'
      })
      .when('/home', {
        templateUrl: '/views/Home',
        controller: 'HomeCtrl'
      })
      .when('/grades', {
        templateUrl: '/views/Grades',
        controller: 'GradesCtrl'
      })
      .when('/area', {
        templateUrl: '/views/Area',
        controller: 'AreaCtrl'
      })
      .when('/area/add', {
        templateUrl: '/secure/views/AreaAdd',
        controller: 'AreaAddCtrl'
      })
      .when('/area/edit/:areaId', {
        templateUrl: '/secure/views/AreaEdit',
        controller: 'AreaEditCtrl'
      })
      .when('/area/:areaId', {
        templateUrl: '/views/AreaRoutes',
        controller: 'AreaRoutesCtrl'
      })
      .when('/route/add/:areaId', {
        templateUrl: '/views/RouteAdd',
        controller: 'RouteAddCtrl'
      })
      .when('/route/:routeId', {
        templateUrl: '/views/RouteId',
        controller: 'RouteIdCtrl'
      })
      .when('/route/edit/:routeId', {
        templateUrl: '/views/RouteIdEdit',
        controller: 'RouteIdEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;

/*dynomiteApp.controller('InitCtrl', ['$rootScope', '$scope', '$location', 'Global', function($rootScope, $scope, $location, Global) {
    console.log('test');

    //handle when things go bad
    

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
      console.log('proroutechange');
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      console.log(rejection);
    })

    // Call the global factory, this gets the user information from the view
    $scope.global = Global;
    // Active link checker
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }])
;*/

