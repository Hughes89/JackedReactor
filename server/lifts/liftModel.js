var mongoose = require('mongoose');

var LiftSchema = new mongoose.Schema({
  lift: String,
  weight: Number,
  date: String,
  user: String,
  reps: Number,
  OneRepMax: String
});

module.exports = mongoose.model('Lift', LiftSchema);