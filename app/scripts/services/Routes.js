'use strict';

angular.module('dynomiteApp')
  .factory('Routes', function($resource) {
    return {
      getR: function (){
        var Routes = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/routes?q={"areaName"\\:":areaName"}&apiKey=' + apikey,
          {
            areaName: '@areaName'
          },
          {
            update: { method: 'PUT' },
            get: { method: 'GET' }
          }
        );
        //console.log(Routes);
        Routes.prototype.update = function(cb) {
          return Routes.update({id: this._id.$oid},
          angular.extend({}, this, {_id:undefined}), cb);
        };
        Routes.prototype.destroy = function(cb) {
          return  Routes.remove({id: this._id.$oid}, cb);
        };
        return Routes;
      },
      routeById: function() {
        var Routes = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/routes/:name?fo=true&apiKey=' + apikey,
          {
            name: '@name'
          },
          {
            update: { method: 'PUT' }
          }
        );
        Routes.prototype.update = function(cb) {
          return Routes.update({id: this._id.$oid},
          angular.extendq({}, this, {_id:undefined}), cb);
        };
        Routes.prototype.destroy = function(cb) {
          return Routes.remove({id: this._id.$oid}, cb);
        };
        return Routes;
      }
    };
  })