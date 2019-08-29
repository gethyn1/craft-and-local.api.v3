const { createMongoDBService } = require('../../services/mongodb')
const { getLocations, getLocation } = require('./get')
const { createLocation, updateLocation } = require('./post')
const { deleteLocation } = require('./delete')
const { sanitizeInput } = require('../sanitize-input')

// TODO test and refactor for reusable custom sanitization
const sanitizeFields = (req, res, next) => {
  if (req.body.telephone) {
    req.body.telephone = req.body.telephone.replace(' ', '')
  }

  next()
}

const locationsRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/locations', getLocations(mongoDBService))
  app.get('/locations/:id', getLocation(mongoDBService))

  app.post('/locations', sanitizeInput, sanitizeFields, createLocation(mongoDBService))
  app.post('/locations/:id', sanitizeInput, sanitizeFields, updateLocation(mongoDBService))

  app.delete('/locations/:id', deleteLocation(mongoDBService))
}

module.exports = {
  locationsRoutes
}
