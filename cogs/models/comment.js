/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  env = process.env.NODE_ENV || 'development',
  config = require('../../config/config')[env],
  Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    red: 'User'
  }
});

/**
 * Statics
 */
CommentSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('user').exec(cb);
  }
};

/**
 * Create Model
 */
mongoose.model('Comment', CommentSchema);