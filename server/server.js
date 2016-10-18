var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port = 8080;

app.use(express.static('../public'));


app.get('/', function (req, res) {
  res.sendFile('../public/index.html');
});

app.get('/user/:id', function (req, res, next) {
  var user = req.params.id;
  Lift.find({ user : user }, function (err, liftObj) {
    if (err) {
      console.log(err);
    } else if (liftObj) {
      console.log('Found: ' + liftObj);
      res.json(liftObj);
    }
  });
});

var db;
mongoose.connect('mongodb://Mike:test123@ds045521.mlab.com:45521/comment-box');

//Saving Lift :
var Lift = mongoose.model('Lift', {lift: String, date: String, weight: Number, user: String});
// var test = new Lift({ lift: 'Bench', date: 'tom', weight: 180, user: 'mike' });
// test.save(function (err, liftObj) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Save successful: ', liftObj);
//   }
// });

//Finding User Lifts : 
// Lift.find({ user : 'mike' }, function (err, liftObj) {
//   if (err) {
//     console.log(err);
//   } else if (liftObj) {
//     console.log('Found: ' + liftObj);
//   }
// });

app.listen(8080);

console.log('Listening on port: ' + port);