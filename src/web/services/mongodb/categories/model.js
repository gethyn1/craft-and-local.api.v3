const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  slug: {
    type: String,
    required: 'Slug is required',
    unique: true
  }
})

module.exports = {
  Category: mongoose.model('Category', CategorySchema)
}
