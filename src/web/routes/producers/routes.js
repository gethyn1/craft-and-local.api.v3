const { createMongoDBService } = require('../../services/mongodb')
const { getProducers, getProducer } = require('./get')

const producersRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/producers', getProducers(mongoDBService))
  app.get('/producers/:userId', getProducer(mongoDBService))
}

module.exports = {
  producersRoutes
}
