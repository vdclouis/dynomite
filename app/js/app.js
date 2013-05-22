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
    .when('/area/:id', {
      templateUrl: 'partials/areaId.html', 
      controller: RouteIdCtrl
    })
    .when('/area/:id/pictures', {
      templateUrl: 'partials/areaIdPictures.html', 
      controller: RouteIdPicturesCtrl
    })
    .when('/area/:id/edit', {
      templateUrl: 'partials/areaIdEdit.html', 
      controller: RouteIdEditCtrl
    })
    .when('/area/add', {
      templateUrl: 'partials/areaAdd.html', 
      controller: RouteAddCtrl
    })
    .when('/route/:id', {
      templateUrl: 'partials/routeId.html', 
      controller: RouteIdCtrl
    })
    .when('/route/:id/edit', {
      templateUrl: 'partials/routeIdEdit.html', 
      controller: RouteIdEditCtrl
    })
    .when('/route/add', {
      templateUrl: 'partials/routeAdd.html', 
      controller: RouteAddCtrl
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);