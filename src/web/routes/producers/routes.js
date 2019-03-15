const { createMongoDBService } = require('../../services/mongodb')
const { getProducers, getProducer } = require('./get')
const { createProducer, updateProducer } = require('./post')
const { deleteProducer } = require('./delete')

const producersRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/producers', getProducers(mongoDBService))
  app.get('/producers/:userId', getProducer(mongoDBService))

  app.post('/producers', createProducer(mongoDBService))
  app.post('/producers/:userId', updateProducer(mongoDBService))

  app.delete('/producers/:id', deleteProducer(mongoDBService))
}

module.exports = {
  producersRoutes
}
