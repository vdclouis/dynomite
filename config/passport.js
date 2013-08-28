
var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , User = mongoose.model('User')


module.exports = function (passport, config) {
  // returnequire('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      console.log("deserializeUser");
      console.log(user);

      done(err, user)

    })
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (!user) {
          console.log("unknown user");
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.authenticate(password)) {
          console.log("invalid password");
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
      })
    }
  ))
}