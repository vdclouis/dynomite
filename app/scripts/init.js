'use strict';

$(document).ready(function() {
  angular.bootstrap(document, ['dynomiteApp']);

  // SnapJS
  var snapper = new Snap({
    element: document.getElementById('snapper'),
    disable: 'left',
    touchToDrag: false,
    tapToClose: true
  });

  document.getElementById('open-right').addEventListener('click', function() {
    if( snapper.state().state === 'right' ) {
      snapper.close();
    } else {
      snapper.open('right');
    }
  });

  $('.menu-li').click(function() {
    console.log('click');
    if( snapper.state().state === 'right' ) {
      snapper.close();
    } else {
      snapper.open('right');
    }
  });
});

angular.module('dynomiteApp')
  .controller('InitCtrl', ['$scope', '$location', '$rootScope', 'Global', function($scope, $location, $rootScope, Global) {

    /*
     * Arguments: event, current, previous, rejection
     */
    $rootScope.$on('$routeChangeSuccess', function () {
      //console.log('proroutechange');
    });

    /*
     * Arguments: event, current, previous, rejection
     */
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
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