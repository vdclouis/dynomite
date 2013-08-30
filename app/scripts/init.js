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
  .controller('InitCtrl', ['$scope', '$location', '$rootScope', 'Global', function($scope, $location, $rootScope, Global) {

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
      //console.log('proroutechange');
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      console.log(event);
      console.log(current);
      console.log(previous);
      console.log(rejection);
      //$location.path('/');
    });

    // Call the global factory, this gets the user information from the view
    $scope.global = Global;
    // Active link checker
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);