const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true
  },
  coordinates: {
    type: [Number],
    min: [2, 'Coordinates must contain 2 points'],
    max: [2, 'Coordinates must contain 2 points'],
    default: [0, 0],
    required: true
  },
  _id: false
})

// TO DO: add created and updated timestamp
// TO DO: format telephone on save
// TO DO: format website URL on save
const LocationSchema = mongoose.Schema({
  location: {
    type: pointSchema,
    required: true
  },
  title: {
    type: String,
    required: 'Title is required'
  },
  description: {
    type: String
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  address: {
    type: String
  },
  alias: {
    type: String
  },
  instagramHandle: {
    type: String
  },
  twitterHandle: {
    type: String
  },
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, 'Please use a valid email address']
  },
  telephone: {
    type: String
  },
  website: {
    type: String
  }
})

LocationSchema.index({ location: '2dsphere' })

module.exports = {
  Location: mongoose.model('Location', LocationSchema)
}
