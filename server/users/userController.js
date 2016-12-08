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
          res.send('user');
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                user.password = '';
                user.salt = '';
                var token = jwt.encode(user, config.secret);
                res.json({token: token});
              } else {
                res.send('password');
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
          res.send('user');
        } else {
          User.create({
            username: username,
            password: password
          })
          .then(function (user) {
              user.password = '';
              user.salt = '';
              var token = jwt.encode(user, config.secret);
              res.json({token: token});
          });
        }
      });
  }
};