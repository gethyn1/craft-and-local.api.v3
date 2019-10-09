const { createMongoDBService } = require('../../services/mongodb')
const { getLocations, getLocation } = require('./get')
const { createLocation, updateLocation } = require('./post')
const { deleteLocation } = require('./delete')
const { transformRequest } = require('./transform-request')
const { authenticateUser } = require('../authenticate-user')

const locationsRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/locations', getLocations(mongoDBService))
  app.get('/locations/:id', getLocation(mongoDBService))

  app.post('/locations', authenticateUser, transformRequest, createLocation(mongoDBService))
  app.post('/locations/:id', authenticateUser, transformRequest, updateLocation(mongoDBService))

  app.delete('/locations/:id', authenticateUser, deleteLocation(mongoDBService))
}

module.exports = {
  locationsRoutes
}
