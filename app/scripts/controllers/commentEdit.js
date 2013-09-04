'use strict';

angular.module('dynomiteApp')
  .controller('CommentEditCtrl', ['$scope', '$location', '$routeParams', '$http', '$filter', function($scope, $location, $routeParams, $http, $filter) {
    // Get comment
    $http.get('/api/v1/comments/' + $routeParams.commentId)
      .success(function(data) {
        console.log('yay');
        $scope.comment = data;
        console.log(data);
        console.log($scope.comment.modified);
      })
      .error(function() {
        console.log('nay');
      });

    // Save modified comment
    $scope.save = function() {
      $http.put('/api/v1/comments/' + $routeParams.commentId, $scope.comment)
        .success(function() {
          // Success!
          console.log('yay');

          // Change path after save
          $location.path('/route/' + $scope.comment.route._id)
        })
        .error(function() {
          console.log('nay');
        });
    };

    // Delete comment
  }]);