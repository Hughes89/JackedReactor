var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config.js');
var app = express();

var port = 8080;


app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(database);

require('./config/routes.js')(app, express);


app.listen(8080);
console.log('Listening on port: ' + port);