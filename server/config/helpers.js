var jwt = require('jwt-simple');

module.exports = {
  isAuth: (req, res, next) => {
    var token = req.headers['x-access-token'];
    var user;
    if (!token) {
      return res.sendStatus(403); // send forbidden if a token is not provided
    }
    try {
      user = jwt.decode(token, process.env.secret);
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
};