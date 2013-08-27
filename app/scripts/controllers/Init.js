'use strict';

angular.module('dynomiteApp')
  .controller('InitCtrl', function ($scope, Global) {
    console.log('init');
    $scope.global = Global;
  });