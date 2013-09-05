
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')

/**
 * Auth callback
 */

/*exports.isAuth = function (req, res, next) {
  res.send('200', {
    user: req.user ? JSON.stringify(req.user) : "null"
  });
  next();
}*/

exports.authCallback = function (req, res, next) {
  //res.redirect('/');
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
  console.log("logout");
  req.logout();
  res.send(200);
  //res.redirect('/')
}

/**
 * Login succesful redirect
 * Session
 */
//DEPRECATED
exports.loginSuccesRedirect = function (req, res) {
  //res.redirect('/')
  //res.render('error', {
  //  status: 500
  //});
}

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'

  User.findOne({ username: user.username }, function(err, username) {
    if(username) {
      console.log(username);
      res.send('500', {'error': 'User already exists'});
    } else {
      user.save(function (err) {
        if (err) {
          console.log(err);
          return res.render('register', { errors: err.errors, user: user })
        }
        req.logIn(user, function(err) {
          if (err){
            return next(err);
          };
          //return res.redirect('/');
          res.json(200, { "role": user.role, "username": user.username });
        })
      })
    }
  });
}

/**
 *  Show profile
 */

/*exports.show = function (req, res) {
  var user = req.profile;
  console.log(user);
  res.render('partials/user', {
    //title: user.name,
    user: user
  });
}*/

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
  .select('name username email')
  .exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  })
};

exports.userName = function (req, res, next, username) {
  User
  .findOne({ username : username })
  .select('name username email')
  .exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + username));
    req.profile = user;
    next();
  })
};

exports.all = function(req, res) {
  User.find().exec(function(err, users) {
    if (err) {
      res.send('500', {
        status: 500
      });
    } else {
      res.jsonp(users);
    }
  });
};
