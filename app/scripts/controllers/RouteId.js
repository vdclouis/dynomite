'use strict';

angular.module('dynomiteApp')
  .controller('RouteIdCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

    // Get unique route
    $http.get('/routes/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');
        $scope.route = data;
      })
      .error(function() {
        console.log('nay');
      });



  }]);