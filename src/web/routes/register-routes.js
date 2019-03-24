const { producersRoutes } = require('./producers')
const { categoriesRoutes } = require('./categories')

const registerRoutes = (config, app) => {
  producersRoutes(config, app)
  categoriesRoutes(config, app)
}

module.exports = {
  registerRoutes
}
