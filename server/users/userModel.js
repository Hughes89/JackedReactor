var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema)