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
        //if( typeof currentUserCache.get(username) === 'undefined' ){
          $http.get('/usersData/'+username)
          .success(function(data) {
            // store the data in cache
            //currentUserCache.put(username, data);
            // resolve the promise
            defer.resolve(data);
          })
          .error(function(response){
            console.log('error');
            defer.resolve(response);
          });
        // get data from cache
        /*} else {
          // get user from cache
          var user = currentUserCache.get(username);
          // resolve promise
          defer.resolve(user);
        }*/
        // return the promise
        return defer.promise;
      },
      allUsers: function() {
        var defer = $q.defer();
        $http.get('/allusers')
        .success(function(data) {
          // resolve the promise
          defer.resolve(data);
        })
        .error(function(response){
          defer.resolve(response);
        });
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
      console.log("current user change :", currentUser);
    };

    return {
      authorize: function(accessLevel, role) {
        //console.log('accessLevel:', accessLevel);

        // if the function is called from the $routeChangeStart
        // the role will be undefined
        if(role === undefined){
          role = currentUser.role;
        }

        var level = accessLevel.bitMask;
        //console.log('level: ', level);

        var brole = role.bitMask;
        //console.log('role: ', brole);

        return level & brole;
      },
      isLoggedIn: function(user) {
        if(user === undefined){
          user = currentUser;
          console.log('isloggedin: ', user);
        }
        return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
      },
      register: function(user, success, error) {
        $http.post('/register', user)
        .success(function(res) {
          changeUser(res);
          success();
        })
        .error(function(errorcb) {
          error(errorcb);
          console.log('register error');
        });
      },
      login: function(user, success, error) {
        console.log("2. send data with Auth service", user);
        $http.post('/login', user)
        .success(function(user){
          console.log("3. user succes login", user);
          changeUser(user);
          success(user);
        })
        .error(function(errorcb) {
          console.log('3b. loginerror', errorcb);
          error(errorcb);
        });
      },
      logout: function(success, error) {
        $http.post('/logout')
        .success(function(){
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        })
        .error(function(error) {
          console.log('logout error');
        });
      },
      //vars used in other controllers
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  }]);