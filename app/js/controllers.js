/* Controllers */
angular.module('Dynomite.controllers', [])
  .controller('HomeCtrl', ['$scope', '$filter', 'Weather', function($scope, $filter, Weather) {
    
    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = pos.coords.latitude;
      $scope.lon = pos.coords.longitude;
    });
    
    console.log($scope.lat);
    
    $scope.weather = Weather.get({lat: $scope.lat, lon: $scope.lon}, function(data) {
      //inject filters
      var uppercaseFilter = $filter('uppercase');
      var underscoreFilter = $filter('underscore');
      
      //apply filters
      var icon = underscoreFilter(uppercaseFilter(data.currently.icon));
      
      //initiate skycons
      var skycons = new Skycons({"color": "#a0a0a0"});
      skycons.add('ico', Skycons[icon]);
      skycons.play();
    });
  }])
  .controller('AreaCtrl', ['$scope', 'Areas', function($scope, Areas) {
    //get all areas
    $scope.areas = Areas.query();
    
    //google-maps directive
    google.maps.visualRefresh = true;
    
    angular.extend($scope, {
      center: {
        latitude: 51.0500,
        longitude: 3.7167
      },
      markers: [
        {
          latitude: 40.095,
          longitude: -3.823,
        }
      ],
      zoom: 8
    });
    
    //default order
    $scope.orderAreas = 'name';
  }])
  .controller('AreaAddCtrl', ['$scope', '$location', 'Areas', function($scope, $location, Areas){
    $scope.save = function() {
      Areas.save($scope.area, function(area) {
        $location.path('/area/edit/' + area._id.$oid);
      });
    };
  }])
  .controller('AreaEditCtrl', ['$scope', '$location', '$routeParams', 'Areas', function($scope, $location, $routeParams, Areas) {
   var self = this;
   
   Areas.get({id: $routeParams.areaId}, function(area) {
     self.original = area;
     $scope.area = new Areas(self.original);
   });
   
   $scope.isClean = function() {
     return angular.equals(self.original, $scope.area);
   };
   
   $scope.destroy = function() {
     self.original.destroy(function() {
       $location.path('/area');
     });
   };
   
   $scope.save = function() {
     $scope.area.update(function() {
       $location.path('/area');
     });
   };
  }])
  .controller('AreaRoutesCtrl', ['$scope', '$routeParams', 'Routes', 'Areas', function($scope, $routeParams, Routes, Areas) {
    $scope.routes = Routes.query({areaName: $routeParams.name});
  }])
  .controller('RouteIdCtrl', ['$scope', '$routeParams', 'Routes', function($scope, $routeParams, Routes) {
    $scope.route = Routes.routeById($routeParams.id).get();
  }])
  .controller('RouteIdPicturesCtrl', [function() {
  }])
  .controller('RouteIdEditCtrl', ['$scope', '$routeParams', 'Routes', function($scope, $routeParams, Routes) {
    console.log('edit route');
  }])
  .controller('RouteIdDeleteCtrl', [function() {
  }])
  .controller('RouteAddCtrl', [function() {
  }])
  .controller('UserCtrl', [function() {
  }])
  .controller('UserIdCtrl', [function() {
  }])
  .controller('UserIdEditCtrl', [function() {
  }])
  .controller('LoginCtrl', [function() {
  }])
  .controller('RegisterCtrl', [function() {
  }]);