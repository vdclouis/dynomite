'use strict';

angular.module('dynomiteApp')
  .controller('CommentEditCtrl', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
    // Get comment
    $http.get('/api/v1/comments/' + $routeParams.commentId)
      .success(function(data) {
        console.log('yay');
        $scope.comment = data;
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

    console.log($routeParams.commentId);

    // Delete comment
    $scope.destroy = function() {
      $http.delete('/api/v1/comments/' + $routeParams.commentId)
        .success(function() {
          console.log('yay');
          $location.path('/route/' + $scope.comment.route._id);
        })
        .error(function() {
          console.log('nay');
        })
    }
  }]);