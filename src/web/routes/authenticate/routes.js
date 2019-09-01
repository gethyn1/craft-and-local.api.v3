const { createMongoDBService } = require('../../services/mongodb')
const { sanitizeInput } = require('../sanitize-input')
const { login } = require('./login')
const { logout } = require('./logout')
// TO DO: rename validate routes and controller to not clash with input validation
const { validate } = require('./validate')
const { validateProp, handleValidationErrors } = require('../validate')

const validateEmail = [
  validateProp({ validator: 'isEmail', field: 'email', message: 'Email must be in a valid format' }),
  validateProp({ validator: 'isNotEmpty', field: 'password', message: 'Password must not be empty' })
]

const validatePassword = [
  validateProp({ validator: 'isString', field: 'password', message: 'Password must be a string' }),
  validateProp({ validator: 'isNotEmpty', field: 'password', message: 'Password must not be empty' })
]

const authenticateRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()
  app.get('/authenticate/validate', validate)
  app.post('/authenticate/login', validateEmail, validatePassword, handleValidationErrors, sanitizeInput, login(mongoDBService))
  app.post('/authenticate/logout', logout)
}

module.exports = {
  authenticateRoutes
}
