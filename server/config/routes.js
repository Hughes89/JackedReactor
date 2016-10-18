var liftController = require('../lifts/liftController.js');
var userController = require('../users/userController.js');

module.exports = function (app, express) {

app.get('/', function (req, res) {
  res.sendFile('../public/index.html');
});

app.get('/user/:id', liftController.getAllLifts);

app.get('/:user/:id', liftController.getCertainLift);

app.post('/submitLift', liftController.submitLift);

app.delete('/delete/:user/:lift', liftController.deleteLifts);

app.post('/signup', userController.signup);

app.post('/signin', userController.signin);
};