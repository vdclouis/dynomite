'use strict';

var dynomiteApp = angular.module('dynomiteApp', ['ngResource', 'ngCookies', 'google-maps', 'angulartics', 'angulartics.google.analytics']);

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
        access: access.anon
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
        access: access.anon
      })
      .when('/users', {
        templateUrl: '/views/users',
        controller: 'UsersCtrl',
        access: access.anon
      })
      .when('/user/:userName', {
        templateUrl: '/views/user',
        controller: 'UserCtrl',
        resolve: {
          //at this point the routeParams has not
          //been populated with his data yet
          user: 'loadUser'
        },
        access: access.anon
      })
      .when('/about', {
        templateUrl: '/views/about',
        controller: 'DefaultCtrl',
        access: access.anon
      })
      .when('/grades', {
        templateUrl: '/views/grades',
        controller: 'DefaultCtrl',
        access: access.anon
      })
      .when('/areas', {
        templateUrl: '/views/areas',
        controller: 'AreaCtrl',
        resolve: {
          areas: 'loadAreas'
        },
        access: access.anon
      })
      .when('/area/add', {
        templateUrl: '/forms/areaAdd',
        controller: 'AreaAddCtrl',
        access: access.anon
      })
      .when('/area/edit/:areaId', {
        templateUrl: '/secure/views/areaEdit',
        controller: 'AreaEditCtrl',
        access: access.anon
      })
      .when('/area/:areaId', {
        templateUrl: '/views/routes',
        controller: 'RoutesCtrl',
        access: access.anon
      })
      .when('/route/add/:areaId', {
        templateUrl: '/forms/routeAdd',
        controller: 'RouteAddCtrl',
        access: access.anon
      })
      .when('/route/:routeId', {
        templateUrl: '/views/route',
        controller: 'RouteCtrl',
        access: access.anon
      })
      .when('/route/edit/:routeId', {
        templateUrl: '/views/routeEdit',
        controller: 'RouteEditCtrl',
        access: access.anon
      })
      .when('/route/commentAdd/:routeId', {
        templateUrl: '/views/commentAdd',
        controller: 'CommentAddCtrl',
        access: access.anon
      })
      .when('/route/comments/:routeId', {
        templateUrl: '/views/comments',
        controller: 'CommentsCtrl',
        access: access.anon
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
      console.log('$routeChangeStart');
      $rootScope.error = null;
      if (!Auth.authorize(next.access)) {
        if(Auth.isLoggedIn()) {
          $location.path('/');
        } else {
          $location.path('/login');
        }
      }
    });
  }])
;
