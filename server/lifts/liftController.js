var Lift = require('../lifts/liftModel.js');
var moment = require('moment');


module.exports = {
  getAllLifts: function (req, res, next) {
    var userId = req.user._id;
    Lift.find({user: userId}, function (err, liftObj) {
      if (err) {
        console.log(err);
      } else if (liftObj) {
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
        res.json(liftObj);
      }
    });
  },

  submitLift: function (req, res, next) {
    var userId = req.user._id;
    var data = req.body;
    var date = moment().format('MM/DD/YYYY');
    var OneRepMax = data.weight;
    if (data.reps > 1) {
      OneRepMax = Math.round(data.weight * (1 + (data.reps/30)));
    }
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
  },

  removeLiftData: function (req, res, next) {
    var liftId = req.params.liftId;
    var userId = req.user._id;
    console.log(liftId);
    Lift.findById(liftId)
      .exec((err, lift) => {
        console.log(lift);
        if (lift.user === userId) {
          Lift.findByIdAndRemove(liftId, (err, lift) => {
            if (err) res.sendStatus(404);
            res.sendStatus(200);
          });
        } else {
          res.sendStatus(401);
        }
    });
  }

};