/**
 * model.js
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  email:      {type: String, unique: true},
  hash:       String,
  created_at: Date
});

mongoose.connect('mongodb://localhost/logindb');

exports.User = mongoose.model('User', UserSchema);
