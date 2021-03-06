'use strict';

angular.module('dynomiteApp')
  .controller('AreaAddCtrl', ['$scope', '$location', '$http', 'AreasService', function($scope, $location, $http, AreasService){

    // Post new area on save()
    /*$scope.save = function() {
      console.log('save');
      $http.post('/api/v1/areas', $scope.area)
        .success(function() {
          console.log('yay');
          $location.path('/areas'); // Doesn't work in Mobile for some reason
        })
        .error(function() {
          console.log('nay');
        });
    };*/

    $scope.save = function() {
      AreasService.addArea($scope.area)
      .then(function(data) {
          if(data.error !=  undefined){
            $scope.error = data;
          } else {
            console.log(data);
            $location.path('/areas');
          }
      })
    };

    // Get Current location
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.area = { lat: position.coords.latitude, lng: position.coords.longitude };
      $scope.$apply();
    });

    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pickAndStore({
          multiple: true
        }, {
          path: '/uploads/'
        },
        function(FPFile){
          var a = [];
          for (var i=0; i<FPFile.length; i++) {
            var x = FPFile[i].url;
            a.push(x);
          }
          $scope.area.img = a;
          $scope.$apply();
        });
    };
  }]);