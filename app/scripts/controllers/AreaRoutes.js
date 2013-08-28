'use strict';

angular.module('dynomiteApp')
  .controller('AreaRoutesCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

    // Get Area with specific id
    $http.get('/areas/' + $routeParams.areaId)
      .success(function(data) {
        console.log('yay');
        $scope.area = data;
      })
      .error(function(){
        console.log('nay');
      });

    // Get routes with specific areaId
    $http.get('/routez/' + $routeParams.areaId)
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