const { producersRoutes } = require('./producers')
const { categoriesRoutes } = require('./categories')
const { usersRoutes } = require('./users')

const registerRoutes = (config, app) => {
  producersRoutes(config, app)
  categoriesRoutes(config, app)
  usersRoutes(config, app)
}

module.exports = {
  registerRoutes
}
