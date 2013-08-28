'use strict';

angular.module('dynomiteApp')
  .service('UsersService', function UsersService($q, $http, currentUserCache) {
    
    return{
      currentUser : function(username) {
        // start the promise
        var deferred = $q.defer();
        // check if user is not in cache already
        if( typeof currentUserCache.get(username) === 'undefined' ){
          $http.get('/usersData/'+username)
          /*.success(function(data) {
            $scope.area = data;
          })
          .error(function(){
          })*/
          .then(function(data){
            // store the data in cache
            currentUserCache.put(username, data);
            // resolve the promise
            deferred.resolve(data);
          });
          //.error(function(){
          //  deferred.reject();
          //});
        // get data from cache
        } else {
          // get user from cache
          var user = currentUserCache.get(username);
          // resolve promise
          deferred.resolve(user);
        }
        // return the promise
        return deferred.promise;
      },
      getItem: function(dataset, item) {

      }
    }




    /*var RouteEdit = $resource(
      'https://api.mongolab.com/api/1/databases/dynomite/collections/routes/:id?apiKey=' + apikey,
      {},
      {
        update: { method: 'PUT' }
      }
    );

    RouteEdit.prototype.update = function(cb) {
      return RouteEdit.update(
        { id: this._id.$oid },
        angular.extend({}, this, {_id:undefined}),
        cb
      );
    };

    RouteEdit.prototype.destroy = function(cb) {
      return RouteEdit.remove({id: this._id.$oid}, cb);
    };

    return RouteEdit;*/
  });