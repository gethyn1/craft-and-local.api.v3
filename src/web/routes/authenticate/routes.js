const { createMongoDBService } = require('../../services/mongodb')
const { login } = require('./login')

const authenticateRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()
  app.post('/authenticate/login', login(mongoDBService))
}

module.exports = {
  authenticateRoutes
}
