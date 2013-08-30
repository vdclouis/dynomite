'use strict';

var dynomiteApp = angular.module("dynomiteApp", ['ngResource', 'google-maps']);

dynomiteApp
  //removes # from routes, but now template request should be handled by server
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  //configuration of the routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/home',
        controller: 'HomeCtrl'
      })
      .when('/register', {
        templateUrl: '/views/register',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: '/views/login',
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
        templateUrl: '/views/about',
        controller: 'DefaultCtrl'
      })
      .when('/grades', {
        templateUrl: '/views/grades',
        controller: 'DefaultCtrl'
      })
      .when('/areas', {
        templateUrl: '/views/areas',
        controller: 'AreaCtrl'
      })
      .when('/area/add', {
        templateUrl: '/secure/views/areaAdd',
        controller: 'AreaAddCtrl'
      })
      .when('/area/edit/:areaId', {
        templateUrl: '/secure/views/areaEdit',
        controller: 'AreaEditCtrl'
      })
      .when('/area/:areaId', {
        templateUrl: '/views/routes',
        controller: 'RoutesCtrl'
      })
      .when('/route/add/:areaId', {
        templateUrl: '/views/routeAdd',
        controller: 'RouteAddCtrl'
      })
      .when('/route/:routeId', {
        templateUrl: '/views/route',
        controller: 'RouteCtrl'
      })
      .when('/route/edit/:routeId', {
        templateUrl: '/views/routeEdit',
        controller: 'RouteEditCtrl'
      })
      .when('/route/commentAdd/:routeId', {
        templateUrl: '/views/commentAdd',
        controller: 'CommentAddCtrl'
      })
      .when('/route/comments/:routeId', {
        templateUrl: '/views/comments.html',
        controller: 'CommentsCtrl'
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

