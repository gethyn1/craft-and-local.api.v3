const { createMongoDBService } = require('../../services/mongodb')
const { sanitizeBody } = require('../sanitize-input')
const { login } = require('./login')
const { logout } = require('./logout')
// TO DO: rename validate routes and controller to not clash with input validation
const { validate } = require('./validate')
const { validateProp, validatePropNot } = require('../validate')

const validateEmail = [
  validateProp('isEmail', 'email', 'Email must be in a valid format')
]

const validatePassword = [
  validateProp('isString', 'password', 'Password must be a string'),
  validatePropNot('isEmpty', 'password', 'Password must not be empty')
]

const authenticateRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()
  app.get('/authenticate/validate', validate)
  app.post('/authenticate/login', sanitizeBody, validateEmail, validatePassword, login(mongoDBService))
  app.post('/authenticate/logout', logout)
}

module.exports = {
  authenticateRoutes
}
