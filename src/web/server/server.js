const bodyParser = require('body-parser')
const helmet = require('helmet')

const { setHeaders } = require('./set-headers')
const { connectDatabase } = require('./connect-database')
const { registerRoutes } = require('../routes')
const { registerErrorHandlers } = require('./error-handlers')

const listen = (config, app) =>
  app.listen(config.server.PORT, () => console.log(
    `App listening on port ${config.server.PORT}`)
  )

const start = (config, app) => () => {
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  setHeaders(config, app)
  registerRoutes(config, app)
  registerErrorHandlers(app)
  listen(config, app)
}

const initialise = (config, app) => {
  const startApp = start(config, app)
  connectDatabase(startApp, config, app)
}

module.exports = {
  initialise
}
