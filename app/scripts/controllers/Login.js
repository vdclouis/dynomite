'use strict';

angular.module('dynomiteApp')
  .controller('LoginCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.login = function(data) {
      console.log('test');
 
      $http.post('/users/session', $scope.user)
      .success(function() {
        console.log('success');
        console.log($scope.user);
        $location.path('/');
      })
      .error(function() {
        console.log('error');
      })
      ;

    };
  }]);