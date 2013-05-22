angular.module('Dynomite', ['Dynomite.filters', 'Dynomite.services', 'Dynomite.directives', 'Dynomite.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    });
    $routeProvider.when('/area', {
      templateUrl: 'partials/area.html',
      controller: 'AreaCtrl'
    });
    $routeProvider.when('/area/map', {
      templateUrl: 'partials/area-map.html',
      controller: 'AreaMapCtrl'
    });
    $routeProvider.when('/area/list', {
      templateUrl: 'partials/area-list.html',
      controller: 'AreaListCtrl'
    });
    $routeProvider.when('/area/:id', {
      templateUrl: 'partials/areaId.html',
      controller: 'RouteIdCtrl'
    });
    $routeProvider.when('/area/:id/pictures', {
      templateUrl: 'partials/areaIdPictures.html',
      controller: 'RouteIdPicturesCtrl'
    });
    $routeProvider.when('/area/:id/edit', {
      templateUrl: 'partials/areaIdEdit.html',
      controller: 'RouteIdEditCtrl'
    });
    $routeProvider.when('/area/add', {
      templateUrl: 'partials/areaAdd.html',
      controller: 'RouteAddCtrl'
    });
    $routeProvider.when('/route/:id', {
      templateUrl: 'partials/routeId.html',
      controller: 'RouteIdCtrl'
    });
    $routeProvider.when('/route/:id/edit', {
      templateUrl: 'partials/routeIdEdit.html',
      controller: 'RouteIdEditCtrl'
    });
    $routeProvider.when('/route/add', {
      templateUrl: 'partials/routeAdd.html',
      controller: 'RouteAddCtrl'
    });
    $routeProvider.when('/user', {
      templateUrl: 'partials/user.html', 
      controller: 'UserIdCtrl'
    });
    $routeProvider.when('/user/:id', {
      templateUrl: 'partials/userId.html', 
      controller: 'UserIdCtrl'
    });
    $routeProvider.when('/user/:id/edit', {
      templateUrl: 'partials/userIdEdit.html', 
      controller: 'UserIdEditCtrl'
    });
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html', 
      controller: 'LoginCtrl'
    });
    $routeProvider.when('/register', {
      templateUrl: 'partials/register.html', 
      controller: 'RegisterCtrl'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }]);