'use strict';

var UserCtrl = angular.module('dynomiteApp');
  UserCtrl.controller('UserCtrl', ['$scope', '$route', function($scope, $route) {
    $scope.user = $route.current.locals.user;
  }]);

UserCtrl.loadUser = function($q, $route, UsersService) {
  console.log('resolve user')
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
}