// models/author.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  isdelete: {
    type: Boolean,
    default: false,
  },
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
