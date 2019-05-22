const { createMongoDBService } = require('../../services/mongodb')
const { login } = require('./login')
const { logout } = require('./logout')
const { validate } = require('./validate')

const authenticateRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()
  app.get('/authenticate/validate', validate)
  app.post('/authenticate/login', login(mongoDBService))
  app.post('/authenticate/logout', logout)
}

module.exports = {
  authenticateRoutes
}
