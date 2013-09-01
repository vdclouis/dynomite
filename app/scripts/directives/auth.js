'use strict';

angular.module('dynomiteApp')
  .directive('auth', ['$rootScope', '$location', 'authenticatedUser', function ($root, $location, authenticatedUser) {
  return {
    link: function (scope, elem, attrs, ctrl) {
      $root.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        console.log('auth rootchange test');
        if (!prevRoute.access.isFree && !authenticatedUser.isLogged) {
          // reload the login route
        }
        /*
        * IMPORTANT:
        * It's not difficult to fool the previous control,
        * so it's really IMPORTANT to repeat the control also in the backend,
        * before sending back from the server reserved information.
        */
      });
    }
  };
  }])
;
