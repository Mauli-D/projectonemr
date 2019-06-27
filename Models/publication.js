const mongoose = require('mongoose');

// Our Schema
const PublicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Publication', PublicationSchema);
