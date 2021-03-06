var liftController = require('../lifts/liftController.js');
var userController = require('../users/userController.js');
var helpers = require('./helpers.js');
var path = require('path');

module.exports = function (app, express) {

  app.get('/api/user', helpers.isAuth, liftController.getAllLifts);

  app.get('/api/:liftId', helpers.isAuth, liftController.getCertainLift);

  app.post('/api/submitLift', helpers.isAuth, liftController.submitLift);

  app.delete('/api/delete/:lift', helpers.isAuth, liftController.deleteLifts);

  app.delete('/api/remove/:liftId', helpers.isAuth, liftController.removeLiftData);

  app.post('/api/signup', userController.signup);

  app.post('/api/signin', userController.signin);

  app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve('public/index.html'));
  });
};