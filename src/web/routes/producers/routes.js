const { createMongoDBService } = require('../../services/mongodb')
const { getProducers } = require('./get')

const producersRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/producers', getProducers(mongoDBService))
}

module.exports = {
  producersRoutes
}
