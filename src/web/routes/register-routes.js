const { locationsRoutes } = require('./locations')
const { categoriesRoutes } = require('./categories')
const { usersRoutes } = require('./users')
const { authenticateRoutes } = require('./authenticate')
const { isFunction } = require('../../predicates')

const setCsrfToken = (config) => (req, res, next) => {
  if (isFunction(req.csrfToken)) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { domain: config.environment.COOKIE_DOMAIN })
  }

  next()
}

const registerRoutes = (config, app) => {
  app.all('*', setCsrfToken(config))

  locationsRoutes(config, app)
  categoriesRoutes(config, app)
  usersRoutes(config, app)
  authenticateRoutes(config, app)
}

module.exports = {
  registerRoutes
}
