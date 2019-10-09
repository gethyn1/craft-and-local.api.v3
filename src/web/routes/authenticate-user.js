const { wrapError } = require('./errors')
const { UNAUTHORIZED } = require('../http-statuses')

const authenticateUser = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next()
  }

  return next(wrapError({
    message: 'Authentication error',
    statusCode: UNAUTHORIZED
  }))
}

module.exports = {
  authenticateUser
}
