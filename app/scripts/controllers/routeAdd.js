'use strict';

angular.module('dynomiteApp')
  .controller('RouteAddCtrl', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {

    // Get area id
    $scope.route = {
      area: $routeParams.areaId
    };

    // Get lat & lng

      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.hack = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        $scope.$apply();
      });

    // Save new route
    $scope.save = function() {
      console.log($scope.route);

      $scope.route.lat = $scope.hack.lat;
      $scope.route.lng = $scope.hack.lng;

      console.log($scope.route.lat);

      $http.post('/api/v1/routes', $scope.route)
        .success(function() {
          console.log('yay');
          $location.path('/area/' + $routeParams.areaId);
        })
        .error(function(data) {
          $scope.error = data;
          console.log('nay');
        });
    };

    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pickAndStore({
        multiple: true,
        mimetype: 'image/*'
      }, {
        path: '/uploads/'
      },
      function(FPFile){
        var a = [];
        for (var i=0; i<FPFile.length; i++) {
          var x = FPFile[i].url;
          a.push(x);
        }
        $scope.route.img = a;
        $scope.$apply();
      });
    };
  }]);