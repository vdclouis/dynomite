angular.module('Dynomite', ['Dynomite.filters', 'Dynomite.services', 'Dynomite.directives']).
  config(['$routeProvider', function($routeProvider) {
    .when('/', {
      templateUrl: 'partials/home.html',   
      controller: HomeCtrl
    })
    .when('/area', {
      templateUrl: 'partials/area.html', 
      controller: AreaCtrl
    })
    .when('/area/map' {
      templateUrl: 'partials/area-map.html',
      controller: AreaMapCtrl
    })
    .when('/')
    .otherwise({
      redirectTo: '/phones'
    });
  }]);