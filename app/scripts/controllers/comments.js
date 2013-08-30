'use strict';

angular.module('dynomiteApp')
  .controller('CommentsCtrl', function ($scope, $http, $routeParams) {
    // Get comments
    $http.get('/api/v1/commentz/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');
        $scope.comments = data;
      })
      .error(function() {
        console.log('nay');
      })
  });
