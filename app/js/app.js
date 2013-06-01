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
      .when('/route/add', {
        templateUrl: 'partials/route-detail.html',
        controller: 'RouteAddCtrl'
      })
      .when('/route/edit/:routeId', {
        templateUrl: 'partials/route-detail.html',
        controller: 'RouteIdEditCtrl'
      })
      .when('/route/delete/:routeId', {
        controller: 'RouteIdDeleteCtrl'
      })
      .when('/route/:routeId', {
        templateUrl: 'partials/route-id.html',
        controller: 'RouteIdCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);
  
var snapper = new Snap({
  element: document.getElementById('snapper')
});