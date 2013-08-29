'use strict';

angular.module('dynomiteApp')
  .controller('LoginCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.login = function(data) {
      console.log('test');
 
      $http.post('/users/session', $scope.user)
      .success(function(data, status, headers, config) {

        if(data.status === "ok"){
          $location.path('/user/'+data.username);
        } else {
          if(data.type === "user"){
            $scope.error.user = data.message;
          }
          if(data.type === "password"){
            $scope.error.password = data.message;
          }
        }


        //console.log("data", data);
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

        //console.log('error');
      })
      ;

    };
  }]);