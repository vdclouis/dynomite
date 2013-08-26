'use strict';

angular.module('dynomiteApp')
  .controller('RouteAddCtrl', ['$scope', '$location', '$routeParams', 'RouteEdit', 'Areas', function($scope, $location, $routeParams, RouteEdit, Areas) {

    //get areaName from current area for the dropdown
    Areas.allAreas().query({}, function (data){
      console.log(data);
      $scope.areas = data;
    });

    $scope.save = function() {
      RouteEdit.save($scope.route, function(route) {
        $location.path('/route/' + route._id.$oid);
      });
    };

    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pick(function(FPFile){
        console.log(FPFile.url);
        $scope.area.img = FPFile.url;
        $scope.$apply();
      });
    };
  }]);