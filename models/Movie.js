const { model, Schema } = require('mongoose');

const movieSchema = new Schema({
  name: String,
  description: String,
  createdAt: String,
  thumbsUp: Number,
  thumbsDown: Number,
  createdBy: String
});

module.exports = model('Movie', movieSchema);
