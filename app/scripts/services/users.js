'use strict';

angular.module('dynomiteApp')
  //
  .factory('currentUserCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('currentUserCache', {
      capacity:1
    });
  }])
  //
  .service('UsersService', ['$q', '$http', 'currentUserCache', function($q, $http, currentUserCache) {
    return{
      currentUser : function(username) {
        // start the promise
        var defer = $q.defer();
        // check if user is not in cache already
        if( typeof currentUserCache.get(username) === 'undefined' ){
          $http.get('/usersData/'+username)
          .success(function(data) {
            // store the data in cache
            currentUserCache.put(username, data);
            // resolve the promise
            defer.resolve(data);
          })
          .error(function(response){
            console.log('error');
            defer.resolve(response);
          });
        // get data from cache
        } else {
          // get user from cache
          var user = currentUserCache.get(username);
          // resolve promise
          defer.resolve(user);
        }
        // return the promise
        return defer.promise;
      }
    };
  }])
  //
  .factory('Auth', ['$http', '$cookieStore', function($http, $cookieStore){

    console.log("cookiestore get", $cookieStore.get('user'));

    var accessLevels = routingConfig.accessLevels
      , userRoles = routingConfig.userRoles
      , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    // consume the cookie
    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
      console.log(currentUser);
    };

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined)
          role = currentUser.role;
        return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
      },
      register: function(user, success, error) {
        $http.post('/register', user).success(function(res) {
          changeUser(res);
          success();
        }).error(error);
      },
      login: function(user, success, error) {
        console.log("Authservice login user", user);
        $http.post('/login', user)
        .success(function(user){
          console.log(user);
          changeUser(user);
          success(user);
        })
        .error(function(error) {
          console.log('loginerror', error);
        });
      },
      logout: function(success, error) {
        $http.post('/logout').success(function(){
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  }]);