'use strict';

var apikey = 'zmU_BDz4u4CsCpTltEbxOlPazJOFZtPE';

angular.module('dynomiteApp')
  .factory('Areas', function($resource) {
    return{
      allAreas: function(){
        var Areas = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/areas',
          {
            apiKey: apikey,
            //id: '@name'
          },
          {
            update: { method: 'PUT' }
          }
        );
        return Areas;
      },
      getArea: function(){
        var Areas = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/areas?q={"name"\\:":id"}&apiKey=' + apikey,
          {
            id: '@name'
          },
          {
            update: { method: 'PUT' }
          }
        );
        //extending the resource class
        Areas.prototype.update = function(cb) {
          // action: {method:?, params:?, isArray:?}
          return Areas.update({id: this._id.$oid},
            //angular.extend(destination, source);
            angular.extend({}, this,  {_id:undefined}), cb);
        };
        //remove = default action, method = DELETE
        Areas.prototype.destroy = function(cb) {
          return Areas.remove({id: this._id.$oid}, cb);
        };

        return Areas;
      }
    };
  });