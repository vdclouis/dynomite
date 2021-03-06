'use strict';

angular.module('dynomiteApp')
  .controller('AreaEditCtrl', ['$scope', '$location', '$http', '$routeParams', 'AreasService', function($scope, $location, $http, $routeParams, AreasService) {

    // Get Unique Area
    $http.get('/api/v1/areas/' + $routeParams.areaId).
      success(function(data) {
        console.log('yay');
        $scope.area = data;
      }).
      error(function() {
        console.log('nay');
      });

    // On Click Update Area
    $scope.save = function() {
      $http.put('/api/v1/areas/' + $routeParams.areaId, $scope.area)
        .success(function() {
          console.log('success');
          $location.path('/areas');
        })
        .error(function() {
          console.log('error');
        });
    };

    // Delete Area
    $scope.destroy = function() {
      /*$http.delete('/api/v1/areas/' + $routeParams.areaId)
        .success(function() {
          console.log('yay');
          $location.path('/areas');
        })
        .error(function() {
          console.log('nay');
        });*/
      AreasService.deleteArea($routeParams.areaId)
      .then(function(data) {
        $location.path('/areas');
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