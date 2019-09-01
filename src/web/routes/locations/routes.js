const { createMongoDBService } = require('../../services/mongodb')
const { getLocations, getLocation } = require('./get')
const { createLocation, updateLocation } = require('./post')
const { deleteLocation } = require('./delete')
const { sanitizeInput } = require('../sanitize-input')
const { validateProp, handleValidationErrors } = require('../validate')

const validateEmail = validateProp({ validator: 'isEmail', field: 'email', message: 'Email must be in a valid format', optional: true })
const validateWebsite = validateProp({ validator: 'isURL', field: 'website', message: 'Website must be a valid URL', optional: true })
const validateFields = [validateEmail, validateWebsite]

// TODO test and refactor for reusable custom sanitization
const sanitizeFields = (req, res, next) => {
  if (req.body.telephone) {
    req.body.telephone = req.body.telephone.replace(/ /g, '')
  }

  next()
}

const locationsRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/locations', getLocations(mongoDBService))
  app.get('/locations/:id', getLocation(mongoDBService))

  app.post('/locations', sanitizeInput, sanitizeFields, validateFields, handleValidationErrors, createLocation(mongoDBService))
  app.post('/locations/:id', sanitizeInput, sanitizeFields, validateFields, handleValidationErrors, updateLocation(mongoDBService))

  app.delete('/locations/:id', deleteLocation(mongoDBService))
}

module.exports = {
  locationsRoutes
}
