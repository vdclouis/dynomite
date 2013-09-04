/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Route = mongoose.model('Route'),
  _ = require('underscore');

/**
 * Find a route by id
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.route = function(req, res, next, id) {
  var User = mongoose.model('User');
  var Area = mongoose.model('Area');

  Route.load(id, function(err, route) {
    if (err) return next(err);
    if (!route) return next(new Error('Failed to load ' + id));
    req.route = route;
    next();
  });
};

/**
 * Find routes by areaId
 * @param req
 * @param res
 * @param next
 * @param areaId
 */
exports.routebyarea = function(req, res, next, areaId) {
  var User = mongoose.model('User');
  var Area = mongoose.model('Area');

  Route.byarea(areaId, function(err, routebyarea) {
    if (err) return next(err);
    if (!routebyarea) return next(new Error('Failed to load ' + areaId));
    req.routebyarea = routebyarea;
    next();
  });
};

exports.routebyuser = function(req, res, next, userId) {
  var User = mongoose.model('User');
  var Area = mongoose.model('Area');

  Route.byuser(userId, function(err, routebyuser) {
    if (err) return next(err);
    if (!routebyuser) return next(new Error('Failed to load ' + userId));
    req.routebyuser = routebyuser;
    next();
  });
};

/**
 * Create a route
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  var route = new Route(req.body);

  Route.findOne({ name: route.name }, function(err, routes) {
    if(routes) {
      console.log('route exists');
      res.send('500', {'error': 'Route already exists'});
    } else {
      console.log('route doesn\'t exist');
      route.user = req.user;
      route.save();
      res.jsonp(route);
    }
  });
};

/**
 * Update a route
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  var route = req.route;

  route = _.extend(route, req.body);

  route.save(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(route);
    }
  });
};

/**
 * Delete a route
 * @param req
 * @param res
 */
exports.destroy = function(req, res) {
  var route = req.route;

  route.remove(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(route);
    }
  });
};

/**
 * Show a route by id
 * @param req
 * @param res
 */
exports.show = function(req, res) {
  res.jsonp(req.route);
};

/**
 * Show routes by areaId
 * @param req
 * @param res
 */
exports.showbyarea = function(req, res) {
  res.jsonp(req.routebyarea);
};

exports.showbyuser = function(req, res) {
  res.jsonp(req.routebyuser);
};

/**
 * Show all Routes
 * @param req
 * @param res
 */
exports.all = function(req, res) {
  Route.find().sort('-created').populate('user area').exec(function(err, route) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(route);
    }
  });
};