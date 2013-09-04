'use strict';

angular.module('dynomiteApp')
  .controller('RouteCtrl', ['$scope', '$routeParams', '$http', 'Auth', function($scope, $routeParams, $http, Auth) {

    $scope.accessLevels = Auth.accessLevels;

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