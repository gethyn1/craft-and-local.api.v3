const { __, includes } = require('ramda')
const { UNAUTHORIZED } = require('../../http-statuses')
const { wrapError } = require('../errors')
const { buildSuccessResponse } = require('../build-responses')

// TODO move authentication error messages into constants to share with service
// TODO don't send password in response
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
    res.json(buildSuccessResponse(user))
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
