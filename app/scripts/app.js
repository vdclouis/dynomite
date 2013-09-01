'use strict';

var dynomiteApp = angular.module('dynomiteApp', ['ngResource', 'google-maps', 'angulartics', 'angulartics.google.analytics']);

dynomiteApp
  //removes # from routes, but now template request should be handled by server
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  //configuration of the routes
  .config(['$routeProvider', function ($routeProvider) {
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
        controller: 'LoginCtrl'
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
          user: 'loadUser'
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
        controller: 'AreaCtrl',
        resolve: {
          areas: 'loadAreas'
        }
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
        templateUrl: '/views/comments',
        controller: 'CommentsCtrl'
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
  //.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  //  $rootScope.$on("$routeChangeStart", function (event, next, current) {
  //    $rootScope.error = null;
  //    if (!Auth.authorize(next.access)) {
  //      if(Auth.isLoggedIn()) $location.path('/');
  //      else                  $location.path('/login');
  //    }
  //  });
  //}])
;
