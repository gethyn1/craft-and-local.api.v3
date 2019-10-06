const mongoose = require('mongoose')
const { NOT_FOUND } = require('../../http-statuses')

const handleInvalidId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid ID')
    error.statusCode = NOT_FOUND
    throw error
  }
}

module.exports = {
  handleInvalidId
}
