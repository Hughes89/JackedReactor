var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var port = 8080;

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('');

require('./config/routes.js')(app, express);


// /********************
//  * Authentication Testing
//  ********************/

// app.get('/test', function (req, res) {
//   res.sendFile('/Users/mikehughes/Documents/MVPproject/WorkoutAngular/LiftTracker/public/app/signin/signin.html');
// });


// app.post('/signin', function (req, res, next) {
//   var username = req.body.username;
//   var password = req.body.password;
//   User.findOne({ username: username })
//     .then(function (user) {
//       if (!user) {
//         next(new Error('User does not exist'));
//       } else {
//         console.log(user);
//       }
//     });
// });

app.listen(8080);
console.log('Listening on port: ' + port);