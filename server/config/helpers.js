var jwt = require('jwt-simple');
var config = require('../config.js');

module.exports = {
  isAuth: (req, res, next) => {
    var token = req.headers['x-access-token'];
    var user;
    if (!token) {
      return res.sendStatus(403); // send forbidden if a token is not provided
    }
    try {
      user = jwt.decode(token, config.secret);
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
};