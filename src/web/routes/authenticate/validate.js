const { path } = require('ramda')
const { buildSuccessResponse } = require('../build-responses')

const validate = (req, res) => {
  const isAuthenticated = path(['session', 'isAuthenticated'], req)
  res.json(buildSuccessResponse({ isAuthenticated }))
}

module.exports = {
  validate
}
