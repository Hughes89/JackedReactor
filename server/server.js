var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.js');
var app = express();

var port = process.env.PORT || 8080;

//Middleware
app.use(express.static(__dirname + '/public'));
app.use("/node_modules", express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use((req, res, next) => {
  console.log(`Request recieved from ${req.url} with method ${req.method}.`);
  next();
});

//Database
mongoose.connect(config.database);

//Routes
require('./config/routes.js')(app, express);

app.listen(port, function () {
  console.log('Listening on port: ' + port);
});