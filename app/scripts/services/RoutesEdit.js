'use strict';

angular.module('dynomiteApp')
  .factory('RouteEdit', function($resource) {
    var RouteEdit = $resource(
      'https://api.mongolab.com/api/1/databases/dynomite/collections/routes/:id?apiKey=' + apikey,
      {},
      {
        update: { method: 'PUT' }
      }
    );

    RouteEdit.prototype.update = function(cb) {
      return RouteEdit.update(
        { id: this._id.$oid },
        angular.extend({}, this, {_id:undefined}),
        cb
      );
    }

    RouteEdit.prototype.destroy = function(cb) {
      return RouteEdit.remove({id: this._id.$oid}, cb);
    };

    return RouteEdit;
  })