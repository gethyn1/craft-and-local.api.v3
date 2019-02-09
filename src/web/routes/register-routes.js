const { producersRoutes } = require('./producers')

const registerRoutes = (config, app) => {
  // Register routes here
  producersRoutes(config, app)
}

module.exports = {
  registerRoutes
}
