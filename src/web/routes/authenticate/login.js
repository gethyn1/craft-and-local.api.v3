const { __, includes } = require('ramda')
const { UNAUTHORIZED } = require('../http-statuses')
const { wrapError } = require('../errors')

// TODO move authentication error messages into constants to share with service
const authenticationErrors = ['No user found', 'Incorrect password']

const isAuthenticationError = includes(__, authenticationErrors)

const wrapAuthenticationError = () => wrapError({
  message: 'Authentication error',
  statusCode: UNAUTHORIZED
})

const login = (service) => async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await service.users.authenticate({ email, password })
    req.session.user = user
    req.session.isAuthenticated = true
    res.json(user)
  } catch (error) {
    const responseError = isAuthenticationError(error.message)
      ? wrapAuthenticationError()
      : error

    next(responseError)
  }
}

module.exports = {
  login
}
