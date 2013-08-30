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
  modified: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  route: {
    type: Schema.ObjectId,
    ref: 'Route'
  }
});

/**
 * Statics
 */
CommentSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('route user').exec(cb);
  }
};

/**
 * Create Model
 */
mongoose.model('Comment', CommentSchema);