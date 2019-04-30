const mongoose = require('mongoose')

const SLUG_MATCH = /^[0-9a-z-]+$/

const toKebabCase = string => string.replace(/([_ ])/g, '-').toLowerCase()

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  slug: {
    type: String,
    required: 'Slug is required',
    unique: true,
    match: [SLUG_MATCH, 'Must use only lowercase letters, numbers and dashes']
  }
})

// Format slug before saving to database
CategorySchema.pre('validate', function (next) {
  this.slug = toKebabCase(this.slug)
  next()
})

module.exports = {
  SLUG_MATCH,
  toKebabCase,
  Category: mongoose.model('Category', CategorySchema)
}
