/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Area = mongoose.model('Area'),
    _ = require('underscore');

/**
 * Find area by id
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.area = function(req, res, next, id) {
  var User = mongoose.model('User');

  Area.load(id, function(err, area) {
    if (err) return next(err);
    if (!area) return next(new Error('Failed to load ' + id));
    req.area = area;
    next();
  });
};

/**
 * Create an area
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  var area = new Area(req.body);

  Area.findOne({ name: area.name }, function(err, areas) {
    if(areas) {
      console.log('area exists');
      res.send('500', {'error': 'Area already exists'});
    } else {
      console.log('area doesn\'t exist');
      area.user = req.user;
      area.save();
      res.jsonp(area);
    }
  });
};

/**
 * Update an area
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  var area = req.area;

  area = _.extend(area, req.body);

  area.save(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(area);
    }
  });
};

/**
 * Delete an area
 * @param req
 * @param res
 */
exports.destroy = function(req, res) {
  var area = req.area;

  area.remove(function(err) {
    if (err) {
      res.send('error', {
        status: 500
      });
    } else {
      res.jsonp(area);
    }
  });
};

/**
 * Show an area
 * @param req
 * @param res
 */
exports.show = function(req, res) {
  res.jsonp(req.area);
};

/**
 * Show all Areas
 * @param req
 * @param res
 */
exports.all = function(req, res) {
  Area.find().sort('-created').populate('user').exec(function(err, area) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(area);
    }
  });
};

exports.byUserId = function(req, res, next, userId) {
  var User = mongoose.model('User');

  Area.byUser(userId, function(err, areaByUserId) {
    if (err) return next(err);
    if (!areaByUserId) return next(new Error('Failed to load ' + areaId));
    req.area = areaByUserId;
    next();
  });
};

