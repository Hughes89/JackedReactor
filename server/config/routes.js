var liftController = require('../lifts/liftController.js');
var userController = require('../users/userController.js');
var helpers = require('./helpers.js');
var path = require('path');

module.exports = function (app, express) {

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/user/:id', helpers.isAuth, liftController.getAllLifts);

app.get('/:user/:liftId', helpers.isAuth, liftController.getCertainLift);

app.post('/submitLift', helpers.isAuth, liftController.submitLift);

app.delete('/delete/:user/:lift', helpers.isAuth, liftController.deleteLifts);

app.post('/signup', userController.signup);

app.post('/signin', userController.signin);
};