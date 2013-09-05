'use strict';

var app = angular.module('dynomiteApp');

app.controller('UserCtrl', ['$scope', '$route', '$http', 'AreasService', 'UsersService', '$routeParams', function($scope, $route,  $http, AreasService, UsersService, $routeParams) {

  //$scope.user = $route.current.locals.user;

  UsersService.currentUser($routeParams.userName)
  .then(function(data){
    $scope.user = data;

    AreasService.areaById($scope.user._id)
    .then(function(data) {
      $scope.areas = data;
    });

    // Get routes with current user
    $http.get('/api/v1/routess/' + $scope.user._id)
    .success(function(data) {
      console.log('yay');
      $scope.routes = data;
      console.log(data);
    })
    .error(function() {
      console.log('nay');
    });


    
  });

}]);

app.controller('UsersCtrl', ['$scope', '$route', 'UsersService', 'Auth', function($scope, $route , UsersService, Auth) {

  $scope.accessLevels = Auth.accessLevels;

  UsersService.allUsers()
  .then(function(data) {
    $scope.users = data;
  });

}]);

app.factory('loadUser', ['$q', '$route', 'UsersService', function($q, $route, UsersService) {
  console.log('resolve user');
  var deferred = $q.defer();
  UsersService.currentUser($route.current.params.userName)
  .then(function(data){
    //this doesnt look right
    if(data.name === $route.current.params.userName){
      deferred.resolve(data);
    }else{
      deferred.reject(data);
    }
  });
  return deferred.promise;
}]);
