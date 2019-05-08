const { producersRoutes } = require('./producers')
const { categoriesRoutes } = require('./categories')
const { usersRoutes } = require('./users')
const { authenticateRoutes } = require('./authenticate')
const { wrapError } = require('./errors')
const { UNAUTHORIZED } = require('./http-statuses')

const authenticateUser = (req, res, next) => {
  if (req.path === '/authenticate/login') {
    return next()
  }

  if (req.session.isAuthenticated) {
    return next()
  }

  next(wrapError({
    message: 'Authentication error',
    statusCode: UNAUTHORIZED
  }))
}

const registerRoutes = (config, app) => {
  app.all('*', authenticateUser)

  producersRoutes(config, app)
  categoriesRoutes(config, app)
  usersRoutes(config, app)
  authenticateRoutes(config, app)
}

module.exports = {
  registerRoutes
}
