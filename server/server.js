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


app.listen(8080);
console.log('Listening on port: ' + port);