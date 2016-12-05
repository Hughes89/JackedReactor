var User = require('../users/userModel.js');
var jwt = require('jwt-simple');
var config = require('../config.js');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    User.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          //send 404
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                user.password = '';
                var token = jwt.encode(user, config.secret);
                res.json({token: token});
              } else {
                //send 401
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
              //create/send token
              res.sendStatus(201);
          });
        }
      });
  }
};