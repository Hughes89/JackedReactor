var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var port = 8080;

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://Mike:test123@ds045521.mlab.com:45521/comment-box');

require('./config/routes.js')(app, express);


app.listen(8080);
console.log('Listening on port: ' + port);