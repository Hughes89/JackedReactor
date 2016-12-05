var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var config = require('./config.js');
var app = express();

var port = 8080;

//Middleware
app.use(express.static('./public'));
app.use(jwt({ secret: config.secret }).unless({path: ['/signup', '/signin']}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database
mongoose.connect(config.database);

//Routes
require('./config/routes.js')(app, express);


app.listen(8080, function () {
  console.log('Listening on port: ' + port);
});