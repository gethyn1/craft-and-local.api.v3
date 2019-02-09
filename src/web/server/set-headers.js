const setHeaders = (config, app) => {
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.environment.WEB_APP_ORIGIN)
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    next()
  })
}

module.exports = {
  setHeaders
}
