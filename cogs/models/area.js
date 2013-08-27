/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = mongoose.Schema;

/**
 * Area Schema
 */
var AreaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  rating: {
    type: Number,
    default: '',
    trim: true
  },
  img: {
    type: String,
    default: '',
    trim: true
  },
  lat: {
    type: String,
    default: '',
    trim: true
  },
  lng: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Statics
 */
AreaSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('user').exec(cb);
  }
};

/**
 * Create model
 */
mongoose.model('Area', AreaSchema);