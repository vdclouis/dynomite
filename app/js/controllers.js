/* Controllers */

angular.module('Dynomite.controllers', []).
  controller('HomeCtrl', [function() {
  }])
  .controller('AreaCtrl', ['$scope', 'Areas', function($scope, Areas) {
    $scope.areas = Areas.allAreas().query();
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
  .controller('AreaIdCtrl', ['$scope', '$routeParams', 'Areas', 'Routes', function($scope, $routeParams, Areas, Routes) {
    $scope.area = Areas.areaById($routeParams.id).get();
    $scope.routes = Routes.allRoutes().query();
  }])
  .controller('RouteIdCtrl', ['$scope', '$routeParams', 'Routes', function($scope, $routeParams, Routes) {
    $scope.route = Routes.routeById($routeParams.id).get();
  }])
  .controller('RouteIdPicturesCtrl', [function() {
  }])
  .controller('RouteIdEditCtrl', [function() {
  }])
  .controller('RouteAddCtrl', [function() {
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