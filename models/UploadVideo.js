const mongoose = require('mongoose');

const schema = mongoose.Schema;

var uploadSchema = new schema({
  name: String,
  url: String,
  fieldname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
});

module.exports = mongoose.model('Upload', uploadSchema);
