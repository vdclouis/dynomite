angular.module('Dynomite', ['Dynomite.filters', 'Dynomite.services', 'Dynomite.directives', 'Dynomite.controllers', 'google-maps']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      })
      .when('/grades', {
        templateUrl: 'partials/grades.html',
        controller: 'GradesCtrl'
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
      .when('/route/pictures/:routeId', {
        templateUrl: 'partials/route-pictures.html',
        controller: 'RouteIdPicturesCtrl'
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
  
/* Snapjs */
var snapper = new Snap({
  element: document.getElementById('snapper'),
  disable: 'right',
  touchToDrag: false
});

/* Slideshow */
document.getElementById('open-left').addEventListener('click', function() {
  if( snapper.state().state === "left" ) {
  snapper.close();
  } else {
  snapper.open("left");
  }
});


























