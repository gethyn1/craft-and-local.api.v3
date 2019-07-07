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
    required: true
  },
  _id: false
})

const LocationSchema = mongoose.Schema({
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  location: {
    type: pointSchema,
    required: true
  },
  address: {
    type: String
  },
  alias: {
    type: String
  }
})

LocationSchema.index({ location: '2dsphere' })

module.exports = {
  Location: mongoose.model('Location', LocationSchema)
}
