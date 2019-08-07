const { authenticate } = require('./authenticate')

module.exports = {
  ...require('./users'),
  authenticate
}
