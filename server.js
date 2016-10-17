var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port = 8080;
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'public/index.html');
});

app.listen(8080);

console.log('Listening on port: ' + port);