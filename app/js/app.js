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
      .when('/area/edit/:areaId', {
        templateUrl: 'partials/area-detail.html',
        controller: 'AreaEditCtrl'
      })
      .when('/area/add', {
        templateUrl: 'partials/area-detail.html',
        controller: 'AreaAddCtrl'
      })
      .when('/area/:name', {
        templateUrl: 'partials/area-routes.html',
        controller: 'AreaRoutesCtrl'
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
      .otherwise({redirectTo: '/'});
  }]);
  
var snapper = new Snap({
  element: document.getElementById('snapper')
});