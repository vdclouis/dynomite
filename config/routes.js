var async = require('async');

module.exports = function (app, passport, auth) {

  var index = require('../cogs/controllers/index');
  app.get('/', index.index);

  //public views
  //accecible by anyone
  app.get('/views/:partial', index.partials);

  //private views:
  //ng-controllers of these views should not be visible for 
  //unauthenticated users or the app will choke
  app.get('/views/secure/:partial', auth.requiresLogin, index.partials);

  var users = require('../cogs/controllers/users');
  app.get('/logout', users.logout);
  app.get('/users', auth.requiresLogin);
  app.get('/users/me', users.me);
  //app.get('/users/:userId', users.show);
  app.get('/usersData/:userName', users.show);

  // User params
  app.param('userId', users.userId);
  app.param('userName', users.userName);

  // registere + login POST request
  app.post('/register', users.create);
  app.post(
    // the form post route
    '/users/session'
    ,function(req, res, next) {
      passport.authenticate(
        'local'
        // arguments are what is returned from passport function
        , function(err, user, info) {

          if (err) {
            return res.send({ 'status':'err', 'message':err.message });
          }
          if (!user) {
            return res.send({ 'status':'fail', 'type': info.type, 'message': info.message });
          }
          req.logIn(user, function(err) {
            if (err) { 
              return res.send({ 'status':'err', 'message':err.message }); 
            }
            return res.send({ 'status':'ok', 'username': user.name });
          });

        }
      )(req, res, next);
    }
    ,function(err, req, res, next) {
      // 
      return res.send({'status':'err','message':err.message});
    }
    // redirect after succesfull login
    //users.loginSuccesRedirect
  );

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

  // wildcard
  app.get('*', index.index);
};
