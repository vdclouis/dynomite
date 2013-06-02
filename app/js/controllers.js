/* Controllers */
angular.module('Dynomite.controllers', [])
  .controller('HomeCtrl', ['$scope', '$filter', 'Weather', function($scope, $filter, Weather) {

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = pos.coords.latitude;
      $scope.lon = pos.coords.longitude;
      
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
      
    });
  }])
  .controller('AreaCtrl', ['$scope', 'Areas', function($scope, Areas) {
            
    
    $scope.areas = Areas.allAreas().query({}, function(data) {
      for (var i=0; i < data.length; i++) {
        //console.log(data);
        console.log(data[i].coord.lat);
        console.log(data[i].coord.lon);
      };
    });
      
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
      Areas.getArea().save($scope.area, function(area) {
        $location.path('/area');
      });
    };
  }])
  .controller('AreaEditCtrl', ['$scope', '$location', '$routeParams', 'Areas', function($scope, $location, $routeParams, Areas) {
    var self = this;
    
    Areas.getArea().get({id: $routeParams.areaId}, function(area) {
      self.original = area;
      $scope.area = new Areas(self.original);
    });
    
    $scope.isClean = function() {
      return angular.equals(self.original, $scope.area)
    };
    
    $scope.destroy = function() {
      self.original.destroy(function() {
        $location.path('/area');
      });
    };
    
    $scope.save = function() {
      $scope.area.update(function() {
        $location.path('/area');
      })
    }
  }])
  .controller('AreaRoutesCtrl', ['$scope', '$routeParams', 'Routes', 'Areas', function($scope, $routeParams, Routes, Areas) {

    Areas.getArea().query({id: $routeParams.name}, function(area) {
      console.log(area);
      $scope.area = area['0'];
    });
    /*Areas.getArea().get({id: $routeParams.name}, function (data) {
      $scope.area = data;
    });*/

    $scope.routes = Routes.getR().query({areaName: $routeParams.name});
  }])
  .controller('RouteIdCtrl', ['$scope', '$routeParams', 'Routes', function($scope, $routeParams, Routes) {
    console.log('RouteIdCtrl');
  }])
  .controller('RouteIdPicturesCtrl', [function() {
  }])
  .controller('RouteIdEditCtrl', ['$scope', '$routeParams', 'Routes', function($scope, $routeParams, Routes) {
    var self = this;
    Routes.getR().get({id: $routeParams.routeId}, function(route) {
      self.original = route;
      $scope.route = new Routes(self.original);
    });
    $scope.isClean = function() {
      return angular.equals(self.original, $scope.route)
    };
    $scope.destroy = function() {
      self.original.destroy(function() {
        $location.path('/route');
      });
    };
    $scope.save = function() {
      $scope.area.update(function() {
        $location.path('/route');
      })
    };
  }])
  .controller('RouteIdDeleteCtrl', [function() {
  }])
  .controller('RouteAddCtrl', ['$scope', '$location', '$routeParams', '$log', 'Routes', 'Areas', function($scope, $location, $routeParams, $log, Routes, Areas) {
    //var t = $location.search;

    //get all areas for the dropdown
    Areas.allAreas().query({}, function (data){
      $scope.areas = data;
      console.log(data);
    });

    //get the area name
    $scope.areaName = $routeParams.area;
    $scope.save = function() {
      Routes.areaName = $routeParams.area;
      Routes.routeById().save($scope.route, function(route) {
        $location.path('/area');
      });
    };
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