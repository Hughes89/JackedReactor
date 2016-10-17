var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port = 8080;
app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.listen(8080);