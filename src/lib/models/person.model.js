const mongoose = require('mongoose');

const Person = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('person', Person);
