var Lift = require('../lifts/liftModel.js');
var moment = require('moment');


module.exports = {
  getAllLifts: function (req, res, next) {
    var user = req.params.id;
    Lift.find({ user : user }, function (err, liftObj) {
      if (err) {
        console.log(err);
      } else if (liftObj) {
        console.log('Found: ' + liftObj);
        res.json(liftObj);
      }
    });
  },

  getCertainLift: function (req, res, next) {
    var user = req.params.user;
    var lift = req.params.liftId;
    Lift.find({ user : user, lift: lift }, function (err, liftObj) {
      if (err) {
        console.log(err);
      } else if (liftObj) {
        console.log('Found: ' + liftObj);
        res.json(liftObj);
      }
    });
  },

  submitLift: function (req, res, next) {
    var data = req.body;
    var date = moment().format('MM/DD/YYYY');
    var lift = new Lift({ lift: data[1], date: date, weight: data[2], user: data[0] });
    lift.save(function (err, liftObj) {
      if (err) {
        console.log(err);
      } else {
        console.log('Save successful: ', liftObj);
      }
    });
  },

  deleteLifts: function (req, res, next) {
    var lift = req.params.lift;
    var user = req.params.user;
    Lift.find({ user : user, lift: lift }).remove().exec(function (err, data) {
      if (err) {
        console.log(egg);
      }
      res.sendStatus(201);
    });
  }

};