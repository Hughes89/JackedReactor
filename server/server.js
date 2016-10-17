var express = require('express');
var mongoose = require('mongoose');
var app = express();
var db;
var port = 8080;
app.use(express.static('../public'));

app.get('/', function (req, res) {
  res.sendFile('../public/index.html');
});

mongoose.connect('mongodb://uname:pword@ds045521.mlab.com:45521/comment-box')
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));


app.listen(8080);

console.log('Listening on port: ' + port);