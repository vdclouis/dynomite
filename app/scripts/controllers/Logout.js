'use strict';

angular.module('dynomiteApp')
  .controller('LogoutCtrl', ['$location', '$http', function($location, $http) {
    $http.get('/users/logout')
    .succes(function() {
      console.log('logout succes');
      $location.path('/');
    })
    .error(function() {

    })
    ;
  }]);