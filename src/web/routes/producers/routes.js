const { getProducers } = require('./get')

const producersRoutes = (config, app) => {
  app.get('/producers', getProducers)
}

module.exports = {
  producersRoutes
}
