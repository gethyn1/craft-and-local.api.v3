const Joi = require('@hapi/joi')
const { pick, compose } = require('ramda')
const { createMongoDBService } = require('../../services/mongodb')
const { sanitizeInput } = require('../sanitize-input')
const { validateDataObject } = require('../validate-data-object')
const { login } = require('./login')
const { logout } = require('./logout')
// TO DO: rename validate routes and controller to not clash with input validation
const { validate } = require('./validate')

const LOGIN_SCHEMA = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(500).required()
})

const transformDataObject = compose(validateDataObject(LOGIN_SCHEMA), pick(['email', 'password']))

const transformRequest = (req, res, next) => {
  try {
    req.body = transformDataObject(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const authenticateRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()
  app.get('/authenticate/validate', validate)
  // TODO: is sanitizeInput required?
  app.post('/authenticate/login', transformRequest, sanitizeInput, login(mongoDBService))
  app.post('/authenticate/logout', logout)
}

module.exports = {
  authenticateRoutes
}
