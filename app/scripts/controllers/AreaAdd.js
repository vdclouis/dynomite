'use strict';

angular.module('dynomiteApp')
  .controller('AreaAddCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    // Post new area on save()
    $scope.save = function() {
      $http.post('/areas', $scope.area)
        .success(function() {
          console.log('yay');
          $location.path('/area');
        })
        .error(function() {
          console.log('nay');
        });
    };

    // Get Current location
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.area = { lat: position.coords.latitude, lng: position.coords.longitude };
      $scope.$apply();
    });

    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pick(function(FPFile){
        console.log(FPFile.url);
        $scope.area.img = FPFile.url;
        $scope.$apply();
      });
    };
  }]);