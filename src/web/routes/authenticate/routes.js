const { createMongoDBService } = require('../../services/mongodb')
const { login } = require('./login')
const { logout } = require('./logout')

const authenticateRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()
  app.post('/authenticate/login', login(mongoDBService))
  app.post('/authenticate/logout', logout)
}

module.exports = {
  authenticateRoutes
}
