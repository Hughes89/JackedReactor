var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var port = 8080;

/*********************
 * Middleware
 *********************/

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/***********************
 * Database 
 ************************/

var db;
mongoose.connect('mongodb://@ds045521.mlab.com:45521/comment-box');
var Lift = mongoose.model('Lift', {lift: String, date: String, weight: Number, user: String});

/**************************
 * Routes
 *************************/

app.get('/', function (req, res) {
  res.sendFile('../public/index.html');
});

app.get('/user/:id', function (req, res, next) {
  var user = req.params.id;
  Lift.find({ user : user }, function (err, liftObj) {
    if (err) {
      console.log(err);
    } else if (liftObj) {
      // console.log('Found: ' + liftObj);
      res.json(liftObj);
    }
  });
});


app.get('/:user/:id', function (req, res, next) {
  var user = req.params.user;
  var lift = req.params.id;
  Lift.find({ user : user, lift: lift }, function (err, liftObj) {
    if (err) {
      console.log(err);
    } else if (liftObj) {
      // console.log('Found: ' + liftObj);
      res.json(liftObj);
    }
  });
});

app.post('/submitLift', function (req, res, next) {
  var data = req.body;
  var lift = new Lift({ lift: data[1], date: Date(), weight: data[2], user: data[0] });
  lift.save(function (err, liftObj) {
    if (err) {
      console.log(err);
    } else {
      console.log('Save successful: ', liftObj);
    }
  });
});



app.listen(8080);

console.log('Listening on port: ' + port);