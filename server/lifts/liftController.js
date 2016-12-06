var Lift = require('../lifts/liftModel.js');
var moment = require('moment');


module.exports = {
  getAllLifts: function (req, res, next) {
    var userId = req.user._id;
    Lift.find({user: userId}, function (err, liftObj) {
      if (err) {
        console.log(err);
      } else if (liftObj) {
        //console.log('Found: ' + liftObj);
        res.json(liftObj);
      }
    });
  },

  getCertainLift: function (req, res, next) {
    var userId = req.user._id;
    var lift = req.params.liftId;
    Lift.find({ user : userId, lift: lift }, function (err, liftObj) {
      if (err) {
        console.log(err);
      } else if (liftObj) {
        console.log('Found: ' + liftObj);
        res.json(liftObj);
      }
    });
  },

  submitLift: function (req, res, next) {
    var userId = req.user._id;
    var data = req.body;
    var date = moment().format('MM/DD/YYYY');
    var OneRepMax = Math.round(data.weight * (1 + (data.reps/30)));
    var lift = new Lift({ 
      lift: data.lift,
      date: date,
      weight: data.weight,
      reps: data.reps,
      OneRepMax: OneRepMax,
      user: userId });
    lift.save(function (err, liftObj) {
      if (err) {
        console.log(err);
      } else {
        console.log('Save successful');
        res.sendStatus(201);
      }
    });
  },

  deleteLifts: function (req, res, next) {
    var lift = req.params.lift;
    var userId = req.user._id;
    Lift.find({ user : userId, lift: lift }).remove().exec(function (err, data) {
      if (err) {
        console.log(err);
      }
      res.sendStatus(200);
    });
  }

};