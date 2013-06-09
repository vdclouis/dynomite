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
  .controller('AboutCtrl', ['$scope', function($scope) {

  }])
  .controller('GradesCtrl', ['$scope', function($scope) {

  }])
  .controller('AreaCtrl', ['$scope', 'Areas', function($scope, Areas) {
    $scope.areas = Areas.allAreas().query({}, function(data) {
      //console.log(data);
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
    google.maps.visualRefresh = true;
    
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
  .controller('AreaAddCtrl', ['$scope', '$location', 'Areas', 'AreaEdit', function($scope, $location, Areas, AreaEdit){
    
    $scope.save = function() {
      Areas.getArea().save($scope.area, function(area) {
        $location.path('/area');
      });
    };
    
    $scope.area = new AreaEdit();
    
    $scope.locateMe = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.area.coord = { lat: position.coords.latitude, lon: position.coords.longitude };
        $scope.$apply();
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
    // get areaname
    Areas.getArea().query({id: $routeParams.name}, function(area) {
      //console.log(area);
      $scope.area = area['0'];
    });
    
    // get routes with x areaname
    $scope.routes = Routes.getR().query({areaName: $routeParams.name});
    
    //default order
    $scope.orderRoutes = 'name';
  }])
  .controller('RouteIdCtrl', ['$scope', '$routeParams', 'Routes', '$log', 'routeCache', function($scope, $routeParams, Routes, $log, routeCache) {
    Routes.routeById().get({name: $routeParams.routeId}, function(route) {
      console.log(route);
      $scope.route = route;
      routeCache.put('thisRoute', route);
    });
  }])
  .controller('RouteIdPicturesCtrl', ['$scope', '$routeParams', 'Routes', '$log', 'routeCache', function($scope, $routeParams, Routes, $log, routeCache) {
    if( typeof routeCache.get('thisRoute') === 'undefined' ){
      Routes.routeById().get({name: $routeParams.routeId}, function(route) {
        console.log(route);
        $scope.route = route;
      });
    } else {
      $scope.route = routeCache.get('thisRoute');
    }

  }])
  .controller('RouteIdEditCtrl', ['$scope', '$location', '$routeParams', 'RouteEdit', 'Areas', function($scope, $location, $routeParams, RouteEdit, Areas) {
    Areas.allAreas().query({}, function (data){
      //console.log(data);
      $scope.areas = data;
    });

    var self = this;

    RouteEdit.get({id: $routeParams.routeId}, function(route) {
      self.original = route;
      $scope.route = new RouteEdit(self.original);
    });

    $scope.isClean = function() {
      return angular.equals(self.original, $scope.route);
    };

    $scope.destroy = function() {
      self.original.destroy(function() {
        $location.path('/area');
      });
    };

    $scope.save = function() {
      $scope.route.update(function() {
        $location.path('/area');
      });
    };
  }])
  .controller('RouteIdDeleteCtrl', [function() {
  }])
  .controller('RouteAddCtrl', ['$scope', '$location', '$routeParams', 'Routes', 'Areas', function($scope, $location, $routeParams, Routes, Areas) {

    //get areaName from current area for the dropdown
    Areas.allAreas().query({}, function (data){
      console.log(data);
      $scope.areas = data;
    });

    $scope.save = function() {
      Routes.routeById().save($scope.route, function(route) {
        $location.path('/area/' + route._id.$oid);
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
  }])
  .controller('canvasCtrl', ['$scope', function($scope) {

    $scope.saveData = function(){

    };

    var overlay = [];

    $(window).on('resize',function(){
      if(this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function(){
        $(this).trigger('resizeEnd');
      },500);
    });

    $(window).on('resizeEnd orientationchange',function(){
      console.log('resizing');
      $('#container').empty();
      RunHeaderAnim();
    });

    var droparea = $('#droparea');
    var wallImage = $("#wallImage[0]");
    console.log(droparea);
    console.log(wallImage);

    function RunHeaderAnim() {
      stage.setWidth(window.innerWidth);
      stage.setHeight(window.innerHeight-90);
      stage.draw();
      console.log(stage.getWidth());
      console.log(stage.getHeight());

      var rectHeigth = 50;
      var rectWidth = 50;
      var minX=stage.getX()+25;
      var maxX=stage.getX()+stage.getWidth()-25;
      var minY=stage.getY()+25;
      var maxY=stage.getY()+stage.getHeight()-25;
      
      startCircleGroup = {
        dragBoundFunc: function(pos) {
          var X=pos.x;
          var Y=pos.y;
          if(X<minX){X=minX;};
          if(X>maxX){X=maxX;};
          if(Y<minY){Y=minY;};
          if(Y>maxY){Y=maxY;};
          return({x:X, y:Y});
        }
      }
    }

    var stage = new Kinetic.Stage({
        container : "droparea",
        width : window.innerWidth,
        height : window.innerHeight-90,
    });
    var layer = new Kinetic.Layer();
    stage.add(layer);

    console.log(stage.getWidth());
    console.log(stage.getHeight());
    

    //dragarea test
    /*var dragarea = new Kinetic.Stage({
      container : "dragarea",
      width : 440,
      height : 100,
    });

    var startGroup = new Kinetic.Group({
      draggable: true
      ,id: "startgroup"
    });

    var circle = new Kinetic.Circle({
      //x: stage.getWidth() / 2,
      //y: stage.getHeight() / 2,
      x: 20,
      y: 20,
      radius: 10,
      //fill: 'red',
      stroke: 'red',
      strokeWidth: 4
    });

    startGroup.add(circle);
    var startLayer = new Kinetic.Layer();

    startLayer.add(startGroup);
    //dragarea.add(startLayer);*/

    //rect test
    /*
        var rectHeigth = 50;
        var rectWidth = 50;
        var minX=stage.getX();
        var maxX=stage.getX()+stage.getWidth()-rectWidth;
        var minY=stage.getY();
        var maxY=stage.getY()+stage.getHeight()-rectHeigth;

        var rect = new Kinetic.Rect({
          x: 239,
          y: 75,
          width: rectWidth,
          height: rectHeigth,
          //opacity: 0,
          fill: 'green',
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          offsetX:rectWidth/2,
          offsetY:rectHeigth/2,
          dragBoundFunc: function(pos) {
            var X=pos.x;
            var Y=pos.y;
            if(X<minX){X=minX;};
            if(X>maxX){X=maxX;};
            if(Y<minY){Y=minY;};
            if(Y>maxY){Y=maxY;};
            return({x:X, y:Y});
          },
        });
        layer.add(rect);
        stage.add(layer);

        rect.on('dragstart', function() {
        });
        rect.on('dragend', function() {
          console.log(rect.attrs.x)
          console.log(rect.attrs.y);
        });

        rect.on('click', function() {
          console.log('rect clicked');
          
          var tween = new Kinetic.Tween({
            node: rect, 
            duration: 0.5,
            opacity: 1,
            scaleX: 2,
            scaleY: 2,
            //width: 100,
            //height: 100,
            //offsetX: ,
            //offsetY: 
          });
          tween.play();
        });

        // add cursor styling
        rect.on('mouseover', function() {
          document.body.style.cursor = 'pointer';
        });
        rect.on('mouseout', function() {
          document.body.style.cursor = 'default';
        });
    */

    var dragSrcEl = null;
    document.getElementById("start").addEventListener('dragstart', function(e){
      dragSrcEl = this;
    });

    document.getElementById("end").addEventListener('dragstart', function(e){
      dragSrcEl = this;
    });

    var con = stage.getContainer(); 

    con.addEventListener('dragover',function(e){
      e.preventDefault(); //@important
    });
/*
    // simple label
    var simpleLabel = new Kinetic.Label({
      // x: 350,
      // y: 50,
      opacity: 0.75
    });
    
    simpleLabel.add(new Kinetic.Tag({
      fill: 'yellow'
    }));
    
    simpleLabel.add(new Kinetic.Text({
      text: 'Simple label',
      fontFamily: 'Calibri',
      fontSize: 18,
      padding: 5,
      fill: 'black'
    }));
*/
/*    
    function update(activeAnchor) {
      var group = activeAnchor.getParent();

      var topLeft = group.get('.topLeft')[0];
      var topRight = group.get('.topRight')[0];
      var bottomRight = group.get('.bottomRight')[0];
      var bottomLeft = group.get('.bottomLeft')[0];
      var image = group.get('#circle')[0];

      var anchorX = activeAnchor.getX();
      var anchorY = activeAnchor.getY();

      // update anchor positions
      switch (activeAnchor.getName()) {
        case 'topLeft':
          topRight.setY(anchorY);
          bottomLeft.setX(anchorX);
          break;
        case 'topRight':
          topLeft.setY(anchorY);
          bottomRight.setX(anchorX);
          break;
        case 'bottomRight':
          bottomLeft.setY(anchorY);
          topRight.setX(anchorX); 
          break;
        case 'bottomLeft':
          bottomRight.setY(anchorY);
          topLeft.setX(anchorX); 
          break;
      }

      image.setPosition(topLeft.getPosition());

      var width = Math.abs(topRight.getX() - topLeft.getX());
      var height = Math.abs(bottomLeft.getY() - topLeft.getY());
      if(width && height) {
        image.setSize(width, height);
      }
    }
    function addAnchor(group, x, y, name) {
      var stage = group.getStage();
      var layer = group.getLayer();

      var anchor = new Kinetic.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        radius: 8,
        name: name,
        draggable: true,
        dragOnTop: false
      });

      anchor.on('dragmove', function() {
        update(this);
        layer.draw();
      });
      anchor.on('mousedown touchstart', function() {
        group.setDraggable(false);
        this.moveToTop();
      });
      anchor.on('dragend', function() {
        group.setDraggable(true);
        layer.draw();
      });
      // add hover styling
      anchor.on('mouseover', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(4);
        layer.draw();
      });
      anchor.on('mouseout', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'default';
        this.setStrokeWidth(2);
        layer.draw();
      });

      group.add(anchor);
    }

    function getWidth(thisGroup){
      var children = thisGroup.getChildren();
      var width = 0;
      for( var i=0; i< children.length; i++){
        if(children[i].getWidth() > width)
          width = children[i].getWidth();
      }
      return width;
    }
*/

    //insert image to stage
    con.addEventListener('drop',function(e){
      var itemName = layer.children.length;
      overlay.push({name:itemName, x:0, y:0});
      console.log(overlay);
      console.log(layer.children.length);
      
      console.log(e.clientX);
      console.log(e.clientY);
      var dropX = e.clientX,
          dropY = e.clientY;

      var rectHeigth = 50;
      var rectWidth = 50;
      var minX=stage.getX()+25;
      var maxX=stage.getX()+stage.getWidth()-25;
      var minY=stage.getY()+25;
      var maxY=stage.getY()+stage.getHeight()-25;



      switch(dragSrcEl.id){
        case 'start':
          console.log('startobj');
          var startCircleGroup = new Kinetic.Group({
            id:itemName,
            x:25,
            y:25,
            draggable:true,
            //offsetX:-25,
            //offsetY:-25
            // offsetY:getWidth(this)/2
            dragBoundFunc: function(pos) {
              var X=pos.x;
              var Y=pos.y;
              if(X<minX){X=minX;};
              if(X>maxX){X=maxX;};
              if(Y<minY){Y=minY;};
              if(Y>maxY){Y=maxY;};
              return({x:X, y:Y});
            },
          });
          /*var removeLabel = new Kinetic.Label({
            opacity:1,
            x:0,
            y:0
          });
          removeLabel.add(new Kinetic.Text({
            x:0,
            y:0,
            offsetX:0,
            offsetY:0,
            text: 'X',
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 0,
            margin: 0,
            fill: 'red',
            align: 'left'
          }));*/
          startCircle = new Kinetic.Circle({

            //x:0,
            //y:0,
            /*offsetX:50,
            offsetY:50,*/
            radius: 25,
            stroke: 'red',
            strokeWidth: 2,
            id: 'circle'
          });

          var startGroup = new Kinetic.Group({
            //draggable : true,
            x: 0,
            y: 0,
          });
          /*var simpleLabel = new Kinetic.Label({
            x: 0,
            y: 0,
            opacity: 0.75
          });
          simpleLabel.add(new Kinetic.Tag({
            fill: 'yellow'
          }));
          simpleLabel.add(new Kinetic.Text({
            text: 'RH',
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 5,
            fill: 'black'
          }));*/

          startCircleGroup.add(startCircle);
          //startCircleGroup.add(removeLabel);
          startGroup.add(startCircleGroup);
          //startGroup.add(simpleLabel);
          layer.add(startGroup);
          layer.draw();
          startCircleGroup.on('touchmove dragend', function(e) {
            console.log(this.getPosition().x);
            console.log(this.getPosition().y);
            //console.log(e);
            //console.log(this.attrs.id);
            //console.log(overlay[this.attrs.id]);
            overlay[this.attrs.id] = {
              x: this.getPosition().x,
              y: this.getPosition().y
            }
            console.log(overlay);
            var touchPos = stage.getTouchPosition();
            /*var x = touchPos.x - 190;
            var y = touchPos.y - 40;
            writeMessage(messageLayer, 'x: ' + x + ', y: ' + y);*/
          });
          /*simpleLabel.on('click', function(e) {
            console.log(e);
            var name = e.targetNode.partialText;
            simpleLabel.destroy();
            console.log(e);
            layer.draw();

              var tween = new Kinetic.Tween({
                node: startCircle, 
                duration: 0.5,
                opacity: 1,
                scaleX: 2,
                scaleY: 2,
                //width: 100,
                //height: 100,
                //offsetX: ,
                //offsetY: 
              });
              tween.play();
              addAnchor(startCircleGroup, 0, 0, 'topLeft');
              addAnchor(startCircleGroup, 40, 0, 'topRight');
              addAnchor(startCircleGroup, 40, 38, 'bottomRight');
              addAnchor(startCircleGroup, 0, 38, 'bottomLeft');
          });*/

        break;
        case 'end':
          var image = new Kinetic.Image({
            draggable : true,
            /* x: e.clientX/2,
            y: e.clientY/2*/
          });
          layer.add(image);
          imageObj = new Image();
          imageObj.src = dragSrcEl.src;
          //imageObj.src = "vendors/images/layers.png";
          imageObj.onload = function(){
            image.setImage(imageObj);
            layer.draw();
            console.log(layer);
            /*elements.element1 = {
              'type':'start'
              'x':
              'y':
            }*/
            console.log(elements);
          };        
        break;
      };

    });
  }]);