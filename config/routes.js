
var async = require('async')

module.exports = function (app, passport, auth) {

  // home route
  var index = require('../cogs/controllers/index')
  app.get('/', index.index)
  app.get('/area', index.area)
  app.get('/test', index.test)
  app.get('*', index.index)

  var users = require('../cogs/controllers/users')
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)

}