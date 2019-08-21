const validator = require('validator')
const { path } = require('ramda')
const { isString } = require('../../predicates')

const VALIDATION_LOOKUP = {
  ...validator,
  isString
}

const getPropFromReqBody = (prop, req) => path(['body', prop], req)

const validateReqBodyProp = (type, prop, req) => validate(type, getPropFromReqBody(prop, req))

const validate = (type, value) => VALIDATION_LOOKUP[type](value)

const validateProp = (type, prop, message) => (req, res, next) =>
  handleValidation(validateReqBodyProp(type, prop, req), message, next)

const validatePropNot = (type, prop, message) => (req, res, next) =>
  handleValidation(!validateReqBodyProp(type, prop, req), message, next)

const handleValidation = (isValid, message, next) => {
  if (!isValid) {
    throw new Error(message)
  }

  return next()
}

module.exports = {
  getPropFromReqBody,
  validateProp,
  validatePropNot
}
