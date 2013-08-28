var async = require('async');

module.exports = function (app, passport, auth) {

  var index = require('../cogs/controllers/index');
  app.get('/', index.index);
  app.get('/views/:partial', index.partials);
  app.get('/views/secure/:partial', auth.requiresLogin, index.partials);

  var users = require('../cogs/controllers/users');

  app.get('/logout', users.logout);
  app.get('/users', auth.requiresLogin);
  app.get('/users/me', users.me);
  //app.get('/users/:userId', users.show);
  app.get('/users/:userName', users.show);

  app.post('/register', users.create);
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
      //,successRedirect : "/"
    ),
    //redirect after succesfull login
    users.loginSuccesRedirect
  );

  //Finish with setting up the userId param
  app.param('userId', users.userId);
  app.param('userName', users.userName);

  // Area Routes
  var areas = require('../cogs/controllers/areas');
  app.get('/areas', areas.all);
  app.post('/areas', areas.create);
  app.get('/areas/:areaId', areas.show);
  app.put('/areas/:areaId', areas.update);
  app.del('/areas/:areaId', areas.destroy);

  // Finish by setting up the areaId param
  app.param('areaId', areas.area);

  // Route Routes (confusing much)
  var routes = require('../cogs/controllers/routes');
  app.get('/routes', routes.all);
  app.post('/routes', routes.create);
  app.get('/routes/:routeId', routes.show);
  app.get('/routez/:areaId', routes.showbyarea); // Experimental
  app.put('/routes/:routeId', routes.update);
  app.del('/routes/:routeId', routes.destroy);

  // Finish by setting up the routeId param
  app.param('routeId', routes.route);
  app.param('areaId', routes.routebyarea);

  // Home route
/*  var index = require('../cogs/controllers/index');
  app.get('/', index.index);*/
  app.get('*', index.index);
};
