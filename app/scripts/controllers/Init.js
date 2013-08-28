'use strict';

angular.module('dynomiteApp')
  .controller('InitCtrl', function ($scope) {
    console.log('init');
    //$scope.global = Global;
    console.log(window);
    console.log(window.user);
  });