
/*
 *  Passport middelware setup
 */

var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , User = mongoose.model('User');

module.exports = function (passport, config) {
  // returnequire('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserialize');
    //gives back all of the user info
    /*User.findOne({ _id: id }, function (err, user) {
      done(err, user);
    })*/
    User.findOne({ _id: id }).select('name username email role').exec(function(err, user) {
      done(err, user);
    });
  });

  // use local strategy
  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    /*
     * returns err, user, info
     */
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("unknown user");
          return done(null, false, {
            type: 'user',
            message: 'Unknown user'
          });
        };
        if (!user.authenticate(password)) {
          console.log("invalid password");
          return done(null, false, {
            type: 'password',
            message: 'Invalid password'
          });
        };
        return done(null, user);
      })
    }
  ))
}