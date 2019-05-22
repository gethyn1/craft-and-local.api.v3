const { path } = require('ramda')

const validate = (req, res) => {
  const isAuthenticated = path(['session', 'isAuthenticated'], req)

  res.json({
    statusCode: 200,
    status: 'success',
    data: {
      isAuthenticated
    }
  })
}

module.exports = {
  validate
}
