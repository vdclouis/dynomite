'use strict';

angular.module('dynomiteApp')
  //
  .factory('currentUserCache', function($cacheFactory) {
    return $cacheFactory('currentUserCache', {
      capacity:1
    });
  })
  //
  .service('UsersService', function UsersService($q, $http, currentUserCache) {
    return{
      currentUser : function(username) {
        // start the promise
        var deferred = $q.defer();
        // check if user is not in cache already
        if( typeof currentUserCache.get(username) === 'undefined' ){
          $http.get('/usersData/'+username)
          .success(function(data) {
            // store the data in cache
            currentUserCache.put(username, data);
            // resolve the promise
            deferred.resolve(data);
          })
          .error(function(response){
            deferred.reject(response);
          });
        // get data from cache
        } else {
          // get user from cache
          var user = currentUserCache.get(username);
          // resolve promise
          deferred.resolve(user);
        }
        // return the promise
        return deferred.promise;
      }
    }
  });