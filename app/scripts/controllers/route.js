'use strict';

angular.module('dynomiteApp')
  .controller('RouteCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

    // Get unique route
    $http.get('/api/v1/routes/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');
        $scope.route = data;
      })
      .error(function() {
        console.log('nay');
      });

    // Get comments
    $http.get('/api/v1/commentz/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');
        $scope.comments = data;
      })
      .error(function() {
        console.log('nay');
      });

  }]);