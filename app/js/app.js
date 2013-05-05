'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/friends', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.when('/explore', {templateUrl: 'partials/partial3.html', controller: 'MyCtrl3'});
    $routeProvider.when('/user',  {templateUrl: 'partials/partial4.html', controller: 'MyCtrl4'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
