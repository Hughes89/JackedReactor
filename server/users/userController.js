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
          res.sendStatus(404);
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                user.password = '';
                var token = jwt.encode(user, config.secret);
                res.json({token: token});
              } else {
                res.sendStats(401);
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
          res.sendStatus(400);
        } else {
          User.create({
            username: username,
            password: password
          })
          .then(function (user) {
              user.password = '';
              var token = jwt.encode(user, config.secret);
              res.json({token: token});
          });
        }
      });
  }
};