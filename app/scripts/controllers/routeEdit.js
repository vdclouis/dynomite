'use strict';

angular.module('dynomiteApp')
  .controller('RouteEditCtrl', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
    // Get Route
    $http.get('/api/v1/routes/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');
        $scope.route = data;
      })
      .error(function() {
        console.log('nay');
      });

    // Delete Route
    $scope.destroy = function() {
      $http.delete('/api/v1/routes/' + $routeParams.routeId)
        .success(function() {
          console.log('yay');
          $location.path('/route');
        })
        .error(function() {
          console.log('nay');
        });
    };

    // Update Route
    $scope.save = function() {
      $http.put('/api/v1/routes/' + $routeParams.routeId, $scope.route)
        .success(function() {
          console.log('yay');
          $location.path('/route/' + $routeParams.routeId);
        })
        .error(function() {
          console.log('nay');
        });
    };

    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pick(function(FPFile){
        console.log(FPFile.url);
        $scope.area.img = FPFile.url;
        $scope.$apply();
      });
    };
  }]);