
var async = require('async')

module.exports = function (app, passport, auth) {

  // home route
<<<<<<< HEAD
  var index = require('../cogs/controllers/index')
  //app.get('/', index.index)
  app.get('/area', auth.requiresLogin)
  //app.get('/views/area', index.area)
  //app.get('/test', index.test)
  

  var users = require('../cogs/controllers/users')
  //app.get('/signin', users.signin)
  //app.get('/signup', users.signup)
  //app.get('/signout', users.signout)
  app.get('/logout', users.logout)

  app.post('/register', users.create)

  app.post(
    //the form post route
    '/users/session',
    //
    passport.authenticate(
      'local',
      {failureRedirect: 
        '/register', 
        failureFlash: 'Invalid email or password.'
      }
    ),
    //redirect after succesfull login
    users.session
  )

  //app.get('/users/me', users.me)
  //app.get('/users/:userId', users.show)

  // Area Routes
  var areas = require('../cogs/controllers/areas');
  app.get('/areas', areas.all);
  app.post('/areas', areas.create);
  app.get('/areas/:areaId', areas.show);
  app.put('/areas/:areaId', areas.update);
  app.del('/areas/:areaId', areas.destroy);

  // Finish by setting up the areaId param
  app.param('areaId', areas.area);

  //its wild
  app.get('*', index.index)
};
