const { createMongoDBService } = require('../../services/mongodb')
const { getProducers, getProducer } = require('./get')
const { createProducer, updateProducer } = require('./post')
const { deleteProducer } = require('./delete')
const { sanitizeInput } = require('../sanitize-input')

const producersRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/producers', getProducers(mongoDBService))
  app.get('/producers/:userId', getProducer(mongoDBService))

  app.post('/producers', sanitizeInput, createProducer(mongoDBService))
  // TO DO: only allow GET requests by user ID. Update using _id
  app.post('/producers/:userId', sanitizeInput, updateProducer(mongoDBService))

  app.delete('/producers/:id', deleteProducer(mongoDBService))
}

module.exports = {
  producersRoutes
}
