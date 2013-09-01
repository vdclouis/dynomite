'use strict';

angular.module('dynomiteApp')
  .controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function() {
      Auth.logout(function() {
        $location.path('/login');
      }, function() {
        $rootScope.error = "Failed to logout";
      });
    };
  }])
  .controller('RegisterCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.save = function(data) {
      console.log('test');

      $http.post('/register', $scope.user)
      .success(function() {
        console.log('success');
        console.log($scope.user);
        $location.path('/');
      })
      .error(function() {
        console.log('error');
      });
    };
  }])
  .controller('LoginCtrl', ['$scope', '$location', '$http', 'authenticatedUser', function($scope, $location, $http, User) {
    $scope.error = {};
    $scope.login = function(data) {
      console.log('test');
      $http.post('/users/session', $scope.user)
      .success(function(data, status, headers, config) {
        if(data.status === "ok"){
          // succefull login
          User.isLogged = true;
          User.username = data.user;
          $location.path('/user/'+data.user.username);
        } else {
          User.isLogged = false;
          User.username = '';

          if(data.type === "user"){
            $scope.error.user = data.message;
          }
          if(data.type === "password"){
            $scope.error.password = data.message;
          }
          $scope.error.general = data.message;
        }

       
        console.log("data", data);
        //console.log("status", status);
        //console.log("headers", headers);
        //console.log("config", config);

        //console.log('success');
        //console.log($scope.user);
      })
      .error(function(data, status, headers, config) {
        //console.log("data", data);
        //console.log("status", status);
        //console.log("headers", headers);
        //console.log("config", config);
        
        User.isLogged = false;
        User.username = '';
        

        //console.log('error');
      })
      ;
    }
  }])
  .controller('LogoutCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    console.log('LogoutCtrl');
    $http.get('/users/logout')
    .succes(function() {
      console.log('logout succes');
      $scope.global = {
        user: {},
        authenticated: false
      };
      $location.path('/');
    })
    .error(function(err) {
      console.log(err)
    })
    ;
  }]);