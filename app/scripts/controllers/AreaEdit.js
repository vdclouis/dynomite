'use strict';

angular.module('dynomiteApp')
  .controller('AreaEditCtrl', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams) {

    // Get Unique Area
    $http.get('/areas/' + $routeParams.areaId).
      success(function(data, status, headers, config) {
        console.log('yay');
        $scope.area = data;
      }).
      error(function(data, status, headers, config) {
        console.log('nay');
      });

    // On Click Update Area
    $scope.save = function() {
      $http.put('/areas/' + $routeParams.areaId, $scope.area)
        .success(function() {
          console.log('success');
          console.log($scope.area);
          $location.path('/');
        })
        .error(function() {
          console.log('error');
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