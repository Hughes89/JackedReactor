var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String
});

UserSchema.methods.comparePasswords = function (submittedPassword) {
  var savedPassword = this.password;
  return Q.Promise(function (resolve, rejext) {
    bcrypt.compare(submittedPassword, savedPassword, function (err, isMath) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
  bcrypt.hash(user.password, salt, null, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    user.salt = salt;
    next();
  });
  });
});

module.exports = mongoose.model('User', UserSchema)