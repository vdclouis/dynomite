'use strict';

angular.module('dynomiteApp')
  .controller('UserCtrl', ['$scope', '$http', '$route', 'UsersService', function($scope, $http, $route, UsersService) {
    //store the routeparam username
    //var username = $routeParams.userName

    /*UsersService.currentUser(username)
    .then(function(data){
      $scope.user = data.data;
    });*/

    $scope.user = $route.current.locals.user;

    //$scope.user = UsersService.currentUser(username);

  }]);