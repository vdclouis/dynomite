angular.module('Dynomite', ['Dynomite.filters', 'Dynomite.services', 'Dynomite.directives', 'Dynomite.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/area', {
        templateUrl: 'partials/area.html',
        controller: 'AreaCtrl'
      })
      .when('/area/map', {
        templateUrl: 'partials/area-map.html',
        controller: 'AreaMapCtrl'
      })
      .when('/area/list', {
        templateUrl: 'partials/area-list.html',
        controller: 'AreaListCtrl'
      })
      .when('/area/:id', {
        templateUrl: 'partials/area-id.html',
        controller: 'AreaIdCtrl'
      })
      .when('/area/:id/pictures', {
        templateUrl: 'partials/area-id-pictures.html',
        controller: 'ArezIdPicturesCtrl'
      })
      .when('/area/:id/edit', {
        templateUrl: 'partials/area-id-edit.html',
        controller: 'AreaIdEditCtrl'
      })
      .when('/area/add', {
        templateUrl: 'partials/area-add.html',
        controller: 'AreaAddCtrl'
      })
      .when('/route/:id', {
        templateUrl: 'partials/route-id.html',
        controller: 'RouteIdCtrl'
      })
      .when('/route/:id/edit', {
        templateUrl: 'partials/route-id-edit.html',
        controller: 'RouteIdEditCtrl'
      })
      .when('/route/:id/delete', {
        controller: 'RouteIdDeleteCtrl'
      })
      .when('/route/add', {
        templateUrl: 'partials/route-add.html',
        controller: 'RouteAddCtrl'
      })
      .when('/user', {
        templateUrl: 'partials/user.html',
        controller: 'UserCtrl'
      })
      .when('/user/:id', {
        templateUrl: 'partials/user-id.html',
        controller: 'UserIdCtrl'
      })
      .when('/user/:id/edit', {
        templateUrl: 'partials/user-id-edit.html',
        controller: 'UserIdEditCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);
  
var snapper = new Snap({
  element: document.getElementById('snapper')
});