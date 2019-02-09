const mongoose = require('mongoose')

const ProducerSchema = mongoose.Schema({
  avatar: {
    type: String,
    lowercase: true,
    trim: true
  },
  userId: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'User ID is required'
  },
  title: {
    type: String,
    required: 'Title is required'
  },
  description: {
    type: String
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  delivery: {
    type: Boolean,
    default: false
  },
  instagramHandle: {
    type: String,
    default: ''
  },
  twitterHandle: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, 'Please use a valid email address']
  },
  contactTelephone: {
    type: String
  },
  website: {
    type: String
  }
})

module.exports = {
  Producer: mongoose.model('Producer', ProducerSchema)
}
