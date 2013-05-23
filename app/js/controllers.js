/* Controllers */

angular.module('Dynomite.controllers', []).
  controller('HomeCtrl', ['$scope', function($scope) {
    $scope.name = 'Bob';
  }])
  .controller('AreaCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('areas/areas.json')
      .success(function(data) {
        $scope.areas = data;
      });
  }])
  .controller('AreaMapCtrl', [function() {
  }])
  .controller('AreaListCtrl', [function() {
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