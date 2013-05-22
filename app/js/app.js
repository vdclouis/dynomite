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
    .otherwise({
      redirectTo: '/phones'
    });
  }]);