/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = mongoose.Schema;

/**
 * Route Schema
 */
var RouteSchema = new Schema({
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
  type: {
    type: String,
    default: '',
    trim: true
  },
  rating: {
    type: Number,
    default: '',
    trim: true
  },
  grade: {
    type: String,
    default: '',
    trim: true
  },
  img: {
    type: Array
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
  area: {
    type: Schema.ObjectId,
    ref: 'Area'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Statics
 */
RouteSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('area user').exec(cb);
  },
  byarea: function(areaId, cb) {
    this.find({
      area: areaId
    }).populate('area user').exec(cb);
  }
};

/**
 * Create Model
 */
mongoose.model('Route', RouteSchema);