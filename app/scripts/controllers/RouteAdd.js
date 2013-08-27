'use strict';

angular.module('dynomiteApp')
  .controller('RouteAddCtrl', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {

    $scope.route = {
      area: $routeParams.areaId
    };

    $scope.save = function() {
      $http.post('/routes', $scope.route)
        .success(function() {
          console.log('yay');
          $location.path('#/area/' + $routeParams.areaId);
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