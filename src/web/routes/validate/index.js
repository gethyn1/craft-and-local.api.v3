const validator = require('validator')
const { compose, not } = require('ramda')
const { validateProp, handleValidationErrors } = require('./validate')
const { isString } = require('../../../predicates')

const VALIDATION_LIBRARY = {
  ...validator,
  isString,
  isNotEmpty: compose(not, validator.isEmpty)
}

module.exports = {
  validateProp: validateProp(VALIDATION_LIBRARY),
  handleValidationErrors
}
