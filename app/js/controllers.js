/* Controllers */

angular.module('Dynomite.controllers', []).
  controller('HomeCtrl', [function() {
  }])
  .controller('AreaCtrl', ['$scope', '$http',
    function($scope, $http) {
      $http.get('areas/areas.json')
        .success(function(data) {
          $scope.areas = data;
        });
      angular.extend($scope, {
        center: {
          lat: 51.0500,
          lng: 3.7167,
          zoom: 4
        },
        markers: {
          Madrid: {
            lat: 40.095,
            lng: -3.823,
            message: "Drag me to your position",
            focus: true,
            draggable: true
          }
        }
      });
      $scope.orderAreas = 'name';
  }])
  .controller('AreaMapCtrl', [function() {
  }])
  .controller('AreaListCtrl', [function() {
  }])
  .controller('AreaIdCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
      $scope.AreaId = $routeParams.id;
      $http.get('areas/routes.json')
        .success(function(data) {
          $scope.routes = data;
        })
  }])
  .controller('RouteIdCtrl', [function() {
  }])
  .controller('RouteIdPicturesCtrl', [function() {
  }])
  .controller('RouteIdEditCtrl', [function() {
  }])
  .controller('RouteAddCtrl', [function() {
  }])
  .controller('RouteIdCtrl', [function() {
  }])
  .controller('RouteIdEditCtrl', [function() {
  }])
  .controller('RouteAddCtrl', [function() {
  }])
  .controller('UserCtrl', [function() {
  }])
  .controller('UserIdCtrl', [function() {
  }])
  .controller('UserIdEditCtrl', [function() {
  }])
  .controller('LoginCtrl', [function() {
  }])
  .controller('RegisterCtrl', [function() {
  }]);