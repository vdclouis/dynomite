$(document).ready(function() {
  angular.bootstrap(document, ['dynomiteApp']);

  // SnapJS
  var snapper = new Snap({
    element: document.getElementById('snapper'),
    disable: 'right',
    touchToDrag: false
  });

  document.getElementById('open-left').addEventListener('click', function() {
    if( snapper.state().state === 'left' ) {
      snapper.close();
    } else {
      snapper.open('left');
    }
  });
});

angular.module('dynomiteApp')
  .controller('InitCtrl', ['$scope', '$location', function($scope, $location) {
    // Active link checker
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);