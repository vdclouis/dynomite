'use strict';

angular.module('dynomiteApp')
  .controller('RoutesCtrl', ['$scope', '$routeParams', '$http', 'Auth', function($scope, $routeParams, $http, Auth) {

    $scope.accessLevels = Auth.accessLevels;

    // Get Area with specific id
    $http.get('/api/v1/areas/' + $routeParams.areaId)
      .success(function(data) {
        console.log('yay');
        $scope.area = data;
      })
      .error(function(){
        console.log('nay');
      });

    // Get routes with specific areaId
    $http.get('/api/v1/routez/' + $routeParams.areaId)
      .success(function(data) {
        console.log('yay');
        $scope.routes = data;
      })
      .error(function() {
        console.log('nay');
      });

    // Default Search order
    $scope.orderRoutes = 'name';
  }]);