const mongoose = require('mongoose');

// Our Schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  publication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication',
    required: true
  },
  category: {
    type: String,
    enum: ['COMIC', 'SPORT', 'TRAVEL'],
    default: 'COMIC'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
}, {
  timestamps: true
});

// Query Helper
BookSchema.query.comics = function () {
  return this.where({
    category: 'COMIC'
  });
};

BookSchema.query.sports = function () {
  return this.where({
    category: 'SPORT'
  });
};

BookSchema.query.travels = function () {
  return this.where({
    category: 'TRAVEL'
  });
};



module.exports = mongoose.model('Book', BookSchema);
