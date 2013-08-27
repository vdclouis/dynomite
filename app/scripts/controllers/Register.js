'use strict';

angular.module('dynomiteApp')
  .controller('RegisterCtrl', function ($scope, $http, $location) {
    $scope.save = function(data) {
      console.log('test');
 
      $http.post('/register', $scope.user)
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
  });