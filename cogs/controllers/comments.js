/**
 * Module dpendencies
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Comment = mongoose.model('Comment'),
    _ = require('underscore');

/**
 * Find comment by id
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.comment = function(req, res, next, id) {
  var User = mongoose.model('User');
  var Route = mongoose.model('Route');

  Comment.load(id, function(err, comment) {
    if (err) return next(err);
    if (!comment) return next(new Error('Failed to load comment ' +id));
    req.comment = comment;
    next();
  });
};

/**
 * Find comments by routeId
 * @param req
 * @param res
 * @param next
 * @param routeId
 */
exports.commentbyroute = function(req, res, next, routeId) {
  var User = mongoose.model('User');
  var Route = mongoose.model('Route');

  Comment.byroute(routeId, function(err, commentbyroute) {
    if (err) return next(err);
    if (!commentbyroute) return next(new Error('Failed to load ' + routeId));
    req.commentbyroute = commentbyroute;
    next();
  });
};

/**
 * Create a comment
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  var comment = new Comment(req.body);

  comment.user = req.user;
  comment.save();
  res.jsonp(comment);
};

/**
 * Update a comment
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  var comment = req.comment;

  // Copy all of the properties in the source objects
  // over to the destination object, and return the destination
  // object. It's in-order, so the last source will override
  // properties of the same name in previous arguments.
  // _.extend(destination, sources)
  comment = _.extend(comment, req.body);

  comment.pre('save', function(next, done) {
    this.modified = new Date();
    next();
  });

  comment.save(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(comment);
    }
  });
};

/**
 * Delete a comment
 * @param req
 * @param res
 */
exports.destroy = function(req, res) {
  var comment = req.comment;

  comment.remove(function(err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(comment);
    }
  });
};

/**
 * Show a comment by id
 * @param req
 * @param res
 */
exports.show = function(req, res) {
  res.jsonp(req.comment);
};

exports.showbyroute = function(req, res) {
  res.jsonp(req.commentbyroute);
};

/**
 * Show all Comments
 * @param req
 * @param res
 */
exports.all = function(req, res) {
  Comment.find().sort('-created').populate('user route').exec(function(err, comment) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(comment);
    }
  });
};