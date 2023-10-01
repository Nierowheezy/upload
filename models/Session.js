const mongoose = require('mongoose');

const schema = mongoose.Schema;

var sessionSchema = new schema({
  //   encoding: String,
  mimetype: String,
});

module.exports = mongoose.model('Session', sessionSchema);
