const { __, includes, compose, type, equals } = require('ramda')
const { locationsRoutes } = require('./locations')
const { producersRoutes } = require('./producers')
const { categoriesRoutes } = require('./categories')
const { usersRoutes } = require('./users')
const { authenticateRoutes } = require('./authenticate')
const { wrapError } = require('./errors')
const { UNAUTHORIZED } = require('./http-statuses')

const unAuthenticatedRoutes = ['/authenticate/login', '/authenticate/validate']

const isUnauthenticatedRoute = includes(__, unAuthenticatedRoutes)

const isFunction = compose(equals('Function'), type)

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

const setCsrfToken = (req, res, next) => {
  if (isFunction(req.csrfToken)) {
    res.cookie('XSRF-TOKEN', req.csrfToken())
  }

  next()
}

const registerRoutes = (config, app) => {
  app.all('*', authenticateUser, setCsrfToken)

  locationsRoutes(config, app)
  producersRoutes(config, app)
  categoriesRoutes(config, app)
  usersRoutes(config, app)
  authenticateRoutes(config, app)
}

module.exports = {
  registerRoutes
}
