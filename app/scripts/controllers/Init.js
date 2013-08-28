'use strict';

angular.module('dynomiteApp')
  .controller('InitCtrl', ['$scope', '$location', '$http', 'Global', function($scope, $location, $http, Global) {
    console.log('init');

    $scope.global = Global;
    console.log(window);
    console.log(window.user);
  }]);