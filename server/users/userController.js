var User = require('../users/userModel.js');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    User.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                res.send(username);
              } else {
                return next(new Error('No user'));
              }
            });
        }
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    User.findOne({ username: username })
      .then(function (user) {
        if (user) {
          next(new Error('User already exists!'));
        } else {
          User.create({
            username: username,
            password: password
          })
          .then(function (user) {
              res.sendStatus(201);
          });
        }
      });
  }
};