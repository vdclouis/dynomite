angular.module('Dynomite', ['Dynomite.filters', 'Dynomite.services', 'Dynomite.directives']).
  config(['$routeProvider', function($routeProvider) {
    .when('/phones', {
      templateUrl: 'partials/phone-list.html',   
      controller: PhoneListCtrl
    })
    .when('/phones/:phoneId', {
      templateUrl: 'partials/phone-detail.html', 
      controller: PhoneDetailCtrl
    })
    .when('/phones/:phoneId', {
      templateUrl: 'partials/phone-detail.html', 
      controller: PhoneDetailCtrl
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
      redirectTo: '/phones'
    });
  }]);