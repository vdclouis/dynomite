'use strict';

angular.module('dynomiteApp')
  .controller('CommentAddCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.comment = {
      route: $routeParams.routeId
    };

    $scope.create = function() {
      $http.post('/api/v1/comments', $scope.comment)
        .success(function() {
          console.log('yay');
          $location.path('/route/' + $routeParams.routeId);
        })
        .error(function() {
          console.log('nay');
        });
    };
  });
