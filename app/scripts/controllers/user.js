'use strict';

var app = angular.module('dynomiteApp');

app.controller('UserCtrl', ['$scope', '$route', 'AreasService', function($scope, $route, AreasService) {

  $scope.user = $route.current.locals.user;
  console.log($scope.user._id);
  AreasService.areaById($scope.user._id)
  .then(function(data) {
    $scope.areas = data;
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
