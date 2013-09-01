'use strict';

angular.module('dynomiteApp')
  .controller('InitCtrl', ['$scope', '$location', '$http', 'Global', function($scope, $location, $http, Global) {
    $scope.global = Global;
  }]);