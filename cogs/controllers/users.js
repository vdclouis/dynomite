
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}

/**
 * Show login form
 */

exports.loginView = function (req, res) {
  res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  })
}

/**
 * Show sign up form
 */

exports.register = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.redirect('/')
}

/**
 * Login succesful redirect
 * Session
 */

exports.loginSuccesRedirect = function (req, res) {
  res.redirect('/')
}

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      return res.render('register', { errors: err.errors, user: user })
    }
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/')
    })
  })
}

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile
  console.log(user);
  res.render('partials/user', {
    //title: user.name,
    user: user
  })
}

exports.me = function (req, res) {
  res.jsonp(req.user || null);
}

exports.show = function(req, res) {
  res.jsonp(req.profile);
};

/**
 * Find user by id
 */

exports.userId = function (req, res, next, id) {
  User
  .findOne({ _id : id })
  .exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  })
}

exports.userName = function (req, res, next, name) {
  User
  .findOne({ name : name })
  .exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + name));
    req.profile = user;
    next();
  })
}
