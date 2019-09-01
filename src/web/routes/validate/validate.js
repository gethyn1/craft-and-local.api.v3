const { isUndefined, isBoolean } = require('../../../predicates')
const { buildErrorResponse } = require('../build-responses')

const handleValidationErrors = (req, res, next) => {
  const { userInputErrors } = res.locals
  if (userInputErrors && userInputErrors.length) {
    return res.json(buildErrorResponse(userInputErrors))
  }

  next()
}

const validateProp = (validators) => ({ field, message = 'Invalid input', validator, optional = false } = {}) => (req, res, next) => {
  if (isUndefined(field)) {
    throw new Error('No field defined for validation')
  }

  if (isUndefined(validator)) {
    throw new Error('No validator defined for field:', field)
  }

  const value = req.body[field]

  if (isUndefined(value) && optional) {
    return next()
  }

  if (isUndefined(value)) {
    throw new Error(`Field to validate must exist on req.body: ${field}`)
  }

  const validatorFromLibrary = validators[validator]

  if (isUndefined(validatorFromLibrary)) {
    throw new Error(`Validator does not exist in library: ${validator}`)
  }

  const isValid = validatorFromLibrary(value)

  if (!isBoolean(isValid)) {
    throw new Error(`Result of validation must be boolean for field, value: ${field}, ${value}`)
  }

  if (!isValid) {
    const validationError = { field, message }
    res.locals.userInputErrors = res.locals.userInputErrors || []
    res.locals.userInputErrors = [...res.locals.userInputErrors, validationError]
  }

  next()
}

module.exports = {
  handleValidationErrors,
  validateProp
}
