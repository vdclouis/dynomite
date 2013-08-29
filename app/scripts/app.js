'use strict';

angular.module('dynomiteApp', ['ngResource', 'google-maps'])
  .config(function ($routeProvider, $locationProvider) {
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
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: '/logout',
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
          user: function($q, $route, UsersService) {
            var deferred = $q.defer();
            UsersService.currentUser($route.current.params.userName)
            .then(function(data){
              deferred.resolve(data);
            });
            return deferred.promise;
          }
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
        templateUrl: '/views/AreaAdd',
        controller: 'AreaAddCtrl'
      })
      .when('/area/edit/:areaId', {
        templateUrl: '/views/AreaEdit',
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
      .when('/route/pictures/:routeId', {
        templateUrl: '/views/RouteIdPictures',
        controller: 'RouteIdPicturesCtrl'
      })
      .when('/route/edit/:routeId', {
        templateUrl: '/views/RouteIdEdit',
        controller: 'RouteIdEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
