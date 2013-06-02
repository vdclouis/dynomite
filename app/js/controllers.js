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
      $scope.findMe();
      
      for (var i=0; i<data.length; i++) {
        var lat = data[i].coord.lat;
        var lon = data[i].coord.lon;
        
        $scope.markers.push({
          latitude: lat,
          longitude: lon
        });
      }
    });
    
    //gmap  
    $scope.center = {
      latitude: 33,
      longitude: 3.7
    };
    $scope.zoom = 8;
    
    $scope.markers = [];
    
    //get pos
    $scope.geolocationAvailable = navigator.geolocation ? true : false;
    $scope.findMe = function() {
      if( $scope.geolocationAvailable ) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          $scope.$apply();
        }, function() {

        });
      }
    };
    
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
  .controller('AreaEditCtrl', ['$scope', '$location', '$routeParams', 'AreaEdit', function($scope, $location, $routeParams, AreaEdit) {
    var self = this;
    
    AreaEdit.get({id: $routeParams.areaId}, function(area) {
      self.original = area;
      $scope.area = new AreaEdit(self.original);
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
      return angular.equals(self.original, $scope.route);
    };
    $scope.destroy = function() {
      self.original.destroy(function() {
        $location.path('/route');
      });
    };
    $scope.save = function() {
      $scope.area.update(function() {
        $location.path('/route');
      });
    };
  }])
  .controller('RouteIdDeleteCtrl', [function() {
  }])
  .controller('RouteAddCtrl', ['$scope', '$location', '$routeParams', '$log', 'Routes', 'Areas', function($scope, $location, $routeParams, $log, Routes, Areas) {
    //var t = $location.search;

    //get all areas for the dropdown
    Areas.allAreas().query({}, function (data){
      //console.log(data.length);
      for (var i = 0; i < data.length; i++){
        data[i]['areaName'] = $routeParams.area;
      }
      $scope.areas = data;
      //console.log(data);
      //$scope.route.areaName = data[0];
    });

    console.log($routeParams.area);
    //get the area name
    //$scope.areaName = $routeParams.area;


    $scope.save = function() {
      /*Routes.areaName = $routeParams.area;*/
      Routes.routeById().save($scope.route, function(route) {
        $location.path('/area');
      });
    };
  }]);