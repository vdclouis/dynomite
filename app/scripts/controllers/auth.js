'use strict';

angular.module('dynomiteApp')
  .controller('NavCtrl', ['$scope', '$location', 'Auth', '$rootScope', function($scope, $location, Auth, $rootScope) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function() {
      Auth.logout(function() {
        $location.path('/login');
      }, function() {
        $rootScope.error = 'Failed to logout';
      });
    };
  }])
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    /*$scope.save = function(data) {
      console.log('test');
      $scope.user.role = Auth.userRoles.user;
      $http.post('/register', $scope.user)
      .success(function() {
        console.log('success');
        console.log($scope.user);
        $location.path('/');
      })
      .error(function() {
        console.log('error');
      });
    };*/
    //$scope.role = Auth.userRoles.user;
    //$scope.userRoles = Auth.userRoles;
    $scope.register = function() {
      Auth.register({
        name: $scope.user.name,
        email: $scope.user.email,
        username: $scope.user.username  ,
        password: $scope.user.password,
        role: Auth.userRoles.user
      },
      function() {
        $location.path('/');
      },
      function(err) {
        $rootScope.error = err;
      });
    };
  }])
/*
  .controller('LoginCtrl', ['$scope', '$location', '$http', 'authenticatedUser', function($scope, $location, $http, User) {
    $scope.error = {};
    $scope.login = function(data) {
      console.log('test');
      $http.post('/users/session', $scope.user)
      .success(function(data, status, headers, config) {
        if(data.status === 'ok'){
          // successful login
          User.isLogged = true;
          User.username = data.user;
          $location.path('/user/'+data.user.username);
        } else {
          User.isLogged = false;
          User.username = '';

          if(data.type === 'user'){
            $scope.error.user = data.message;
          }
          if(data.type === 'password'){
            $scope.error.password = data.message;
          }
          $scope.error.general = data.message;
        }

       
        console.log('data', data);
        //console.log('status', status);
        //console.log('headers', headers);
        //console.log('config', config);

        //console.log('success');
        //console.log($scope.user);
      })
      .error(function(data, status, headers, config) {
        //console.log('data', data);
        //console.log('status', status);
        //console.log('headers', headers);
        //console.log('config', config);
        
        User.isLogged = false;
        User.username = '';
        

        //console.log('error');
      })
      ;
    };
  }])
*/
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    //$scope.rememberme = true;
    console.log("FUNCTION");
    $scope.login = function() {
      console.log("1. login clicked");
      Auth.login(
      //user
      {
        username: $scope.user.email,
        password: $scope.user.password
        //rememberme: $scope.remembermeconsole.log("2. data send to auth service"
        //, username, password);
      },
      //succes
      function(res) {
        console.log("5. result:", res);
        $location.path('/');
      },
      //error
      function(err) {
        console.log("5b. fail", err);
        $rootScope.error = "Failed to login";
      });
    };
    //$scope.loginOauth = function(provider) {
    //  $window.location.href = '/auth/' + provider;
    //}
  }])
  .controller('LogoutCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    console.log('LogoutCtrl');
    $http.get('/users/logout')
    .success(function() {
      console.log('logout success');
      $scope.global = {
        user: {},
        authenticated: false
      };
      $location.path('/');
    })
    .error(function(err) {
      console.log(err);
    });
  }]);