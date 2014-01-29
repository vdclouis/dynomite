'use strict';

var dynomiteApp = angular.module('dynomiteApp', ['ngResource', 'ngRoute', 'ngCookies', 'google-maps', 'angulartics', 'angulartics.google.analytics']);

dynomiteApp
  //removes # from routes, but now template request should be handled by server
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  //configuration of the routes
  .config(['$routeProvider', function ($routeProvider) {
    var access = routingConfig.accessLevels;
    $routeProvider
      .when('/', {
        templateUrl: '/views/home',
        controller: 'HomeCtrl',
        access: access.public
      })
      .when('/register', {
        templateUrl: '/views/register',
        controller: 'RegisterCtrl',
        access: access.anon
      })
      .when('/login', {
        templateUrl: '/views/login',
        controller: 'LoginCtrl',
        access: access.anon
      })
      .when('/logout', {
        /*templateUrl: '/logout',*/
        controller: 'LogoutCtrl',
        access: access.user
      })
      .when('/users', {
        templateUrl: '/views/users',
        controller: 'UsersCtrl',
        access: access.user
      })
      .when('/user/:userName', {
        templateUrl: '/views/user',
        controller: 'UserCtrl',
        /*resolve: {
          //at this point the routeParams has not
          //been populated with his data yet
          user: 'loadUser'
        },*/
        access: access.public
      })
      .when('/about', {
        templateUrl: '/views/about',
        controller: 'DefaultCtrl',
        access: access.public
      })
      .when('/grades', {
        templateUrl: '/views/grades',
        controller: 'DefaultCtrl',
        access: access.public
      })
      .when('/areas', {
        templateUrl: '/views/areas',
        controller: 'AreaCtrl',
        //resolve: {
        //  areas: 'loadAreas'
        //},
        access: access.public
      })
      .when('/area/add', {
        templateUrl: '/forms/areaAdd',
        controller: 'AreaAddCtrl',
        access: access.user
      })
      .when('/area/edit/:areaId', {
        templateUrl: '/secure/views/areaEdit',
        controller: 'AreaEditCtrl',
        access: access.admin
      })
      .when('/area/:areaId', {
        templateUrl: '/views/routes',
        controller: 'RoutesCtrl',
        access: access.public
      })
      .when('/route/add/:areaId', {
        templateUrl: '/forms/routeAdd',
        controller: 'RouteAddCtrl',
        access: access.user
      })
      .when('/route/:routeId', {
        templateUrl: '/views/route',
        controller: 'RouteCtrl',
        access: access.public
      })
      .when('/route/edit/:routeId', {
        templateUrl: '/views/routeEdit',
        controller: 'RouteEditCtrl',
        access: access.admin
      })
      .when('/comment/add/:routeId', {
        templateUrl: '/views/commentAdd',
        controller: 'CommentAddCtrl',
        access: access.user
      })
      .when('/comment/edit/:commentId', {
        templateUrl: '/views/commentEdit',
        controller: 'CommentEditCtrl',
        access: access.user
      })
      .when('/route/comments/:routeId', {
        templateUrl: '/views/comments',
        controller: 'CommentsCtrl',
        access: access.public
      })
      .otherwise({
        redirectTo: '/'
      });
  }]) /*eo config*/
  .config(['$httpProvider', function ($httpProvider) {
    var interceptor = ['$location', '$q', function($location, $q) {
      function success(response) {
        return response;
      }
      function error(response) {
        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
      return function(promise) {
        return promise.then(success, error);
      };
    }];
    $httpProvider.responseInterceptors.push(interceptor);
  }])
  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      //console.log("next", next);
      $rootScope.error = null;
      var wtf = !Auth.authorize(next.access);
      //console.log("wtf", wtf);
      if (wtf) {
        //console.log("not authorized");
        if(Auth.isLoggedIn()) {
          $location.path('/');
        } else {
          $location.path('/login');
        }
      }
    });
  }])
;
