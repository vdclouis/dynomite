'use strict';

angular.module('dynomiteApp')
  .controller('DefaultCtrl', ['$scope', function ($scope) {
  }])
  .controller('NavCtrl', ['$scope', '$location', 'Auth', '$rootScope', function($scope, $location, Auth, $rootScope) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    $scope.logout = function() {
      Auth.logout(function() {
        $location.path('/login');
      }, function() {
        $rootScope.error = 'Failed to logout';
      });
    };
  }]);