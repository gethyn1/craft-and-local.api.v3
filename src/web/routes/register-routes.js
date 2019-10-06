const { __, includes } = require('ramda')
const { locationsRoutes } = require('./locations')
const { categoriesRoutes } = require('./categories')
const { usersRoutes } = require('./users')
const { authenticateRoutes } = require('./authenticate')
const { wrapError } = require('./errors')
const { UNAUTHORIZED } = require('../http-statuses')
const { isFunction } = require('../../predicates')

const unAuthenticatedRoutes = ['/authenticate/login', '/authenticate/validate']

const isUnauthenticatedRoute = includes(__, unAuthenticatedRoutes)

const authenticateUser = (req, res, next) => {
  if (isUnauthenticatedRoute(req.path)) {
    return next()
  }

  if (req.session.isAuthenticated) {
    return next()
  }

  return next(wrapError({
    message: 'Authentication error',
    statusCode: UNAUTHORIZED
  }))
}

const setCsrfToken = (config) => (req, res, next) => {
  if (isFunction(req.csrfToken)) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { domain: config.environment.COOKIE_DOMAIN })
  }

  next()
}

const registerRoutes = (config, app) => {
  app.all('*', authenticateUser, setCsrfToken(config))

  locationsRoutes(config, app)
  categoriesRoutes(config, app)
  usersRoutes(config, app)
  authenticateRoutes(config, app)
}

module.exports = {
  registerRoutes
}
