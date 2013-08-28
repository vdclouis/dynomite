'use strict';

angular.module('dynomiteApp')
  .controller('UserCtrl', ['$scope', '$http', '$routeParams', 'UsersService', function($scope, $http, $routeParams, UsersService) {
    //store the routeparam username
    var username = $routeParams.userName

    UsersService.currentUser(username)
    .then(function(data){
      $scope.user = data.data;
    });
  }]);