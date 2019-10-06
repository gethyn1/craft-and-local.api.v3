const { UNPROCESSABLE_ENTITY } = require('../http-statuses')

const validateDataObject = (schema) => (obj) => {
  const { error, value } = schema.validate(obj)

  if (error) {
    error.statusCode = UNPROCESSABLE_ENTITY
    throw error
  }

  return value
}

module.exports = {
  validateDataObject
}
