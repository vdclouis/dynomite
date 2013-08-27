'use strict';

angular.module('dynomiteApp')
  .controller('canvasCtrl', ['$scope', '$location', '$routeParams', 'RouteEdit', 'Routes', function($scope, $location, $routeParams, RouteEdit, Routes) {
    var self = this;
    var overlay = [];
    RouteEdit.get({id: $routeParams.routeId}, function(route) {
      self.original = route;
      $scope.route = new RouteEdit(self.original);
      if(typeof $scope.route.overlay !== 'undefined'){
        for (var i = 0 ; i <= $scope.route.overlay.length-1; i++) {
          var cc = new newCircle(i, $scope.route.overlay[i].x, $scope.route.overlay[i].y, 50, 50);
          overlay[i] = cc.circleData;
          layer.add(cc.circleGroup);
          layer.draw();
        }
      }
    });
    $scope.saveData = function(){
      console.log(overlay);
      $scope.route.overlay = overlay;
      $scope.route.update(function() {
        $location.path('/area');
      });
    };
    $(window).on('resize',function(){
      if(this.resizeTO) { clearTimeout(this.resizeTO); }
      this.resizeTO = setTimeout(function(){
        $(this).trigger('resizeEnd');
      },500);
    });
    $(window).on('resizeEnd orientationchange',function(){
      console.log('resizing');
      $('#container').empty();
      //RunHeaderAnim();
    });
    var droparea = $('#droparea');
    var wallImage = $('#wallImage[0]');
/*
    function RunHeaderAnim() {
      stage.setWidth(window.innerWidth);
      stage.setHeight(window.innerHeight-90);
      stage.draw();
      //console.log(stage.getWidth());
      //console.log(stage.getHeight());

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
*/
    var stage = new Kinetic.Stage({
      container : 'droparea',
      width : window.innerWidth,
      height : window.innerHeight-90,
    });
    var layer = new Kinetic.Layer();
    stage.add(layer);

/*    var dragSrcEl = null;
    document.getElementById("start").addEventListener('dragstart', function(e){
      dragSrcEl = this;
    });

    document.getElementById("end").addEventListener('dragstart', function(e){
      dragSrcEl = this;
    });
*/
    var con = stage.getContainer();
    con.addEventListener('dragover',function(e){
      e.preventDefault(); //@important
    });

    var newCircle = function(name, xval, yval, width, heigth){
      self = this;
      this.thisName = name;
      this.thisx = xval;
      this.thisy = yval;
      this.thisWidth = width;
      this.thisHeigth = heigth;
      this.circleData = {
        x:this.thisx,
        y:this.thisy
      };
      var minX = stage.getX()+this.width/2;
      var maxX = stage.getX()+stage.getWidth()-this.width/2;
      var minY = stage.getY()+this.heigth/2;
      var maxY = stage.getY()+stage.getHeight()-this.heigth/2;
      this.circleGroup = new Kinetic.Group({
        id: this.thisName,
        x:this.thisx,
        y:this.thisy,
        draggable:true,
        dragBoundFunc: function(pos) {
          var X=pos.x;
          var Y=pos.y;
          if(X<minX){X=minX;}
          if(X>maxX){X=maxX;}
          if(Y<minY){Y=minY;}
          if(Y>maxY){Y=maxY;}
          return({x:X, y:Y});
        }
      });
      this.circle = new Kinetic.Circle({
        radius: 25,
        stroke: 'red',
        strokeWidth: 2,
        id: 'circle'
      });
      this.circleGroup.add(this.circle);
      this.circleGroup.on('touchmove dragend', function(e) {
        overlay[self.thisName] = {
          x: this.getPosition().x,
          y: this.getPosition().y
        };
        //var touchPos = stage.getTouchPosition();
      });
      console.log(this);
      return this;
    };

    //insert image to stage
    con.addEventListener('drop',function(e){
      var itemName = layer.children.length;
      var cc = new newCircle(itemName, 25, 25, 50, 50);
      overlay[itemName] = cc.circleData;
      console.log(overlay);
      layer.add(cc.circleGroup);
      layer.draw();
      /*switch(dragSrcEl.id){
        case 'start':
          console.log('startobj');
          var startGroup = new Kinetic.Group({
            //draggable : true,
            x: 0,
            y: 0,
          });
          //startCircleGroup.add(removeLabel);
          //startGroup.add(startCircleGroup);
          //startGroup.add(simpleLabel);
          //layer.add(startGroup);
          layer.add(cc);
          layer.draw();
        break;
        case 'end':
          var image = new Kinetic.Image({
            draggable : true,
            //x: e.clientX/2,
            //y: e.clientY/2
          });
          layer.add(image);
          imageObj = new Image();
          imageObj.src = dragSrcEl.src;
          imageObj.onload = function(){
            image.setImage(imageObj);
            layer.draw();
            console.log(layer);
            console.log(elements);
          };
        break;
      };*/
    });

  }]);
