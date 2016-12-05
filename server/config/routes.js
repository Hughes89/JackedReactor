var liftController = require('../lifts/liftController.js');
var userController = require('../users/userController.js');
var config = require('../config.js');
var path = require('path');

module.exports = function (app, express) {

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/user/:id', liftController.getAllLifts);

app.get('/:user/:liftId', liftController.getCertainLift);

app.post('/submitLift', liftController.submitLift);

app.delete('/delete/:user/:lift', liftController.deleteLifts);

app.post('/signup', userController.signup);

app.post('/signin', userController.signin);
};