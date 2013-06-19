'use strict';

var apikey = 'zmU_BDz4u4CsCpTltEbxOlPazJOFZtPE';

angular.module('dynomiteApp')
  .factory('AreaEdit', function($resource) {
    var AreaEdit = $resource(
      'https://api.mongolab.com/api/1/databases/dynomite/collections/areas/:id?apiKey=' + apikey,
      {},
      {
        update: { method: 'PUT' }
      }
    );

    AreaEdit.prototype.update = function(cb) {
      return AreaEdit.update(
        { id: this._id.$oid },
        angular.extend({}, this, {_id:undefined}),
        cb
      );
    };

    AreaEdit.prototype.destroy = function(cb) {
      return AreaEdit.remove({id: this._id.$oid}, cb);
    };

    return AreaEdit;
  });