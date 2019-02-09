const bodyParser = require('body-parser')
const { connectDatabase } = require('./connect-database')
const { registerRoutes } = require('../routes')
const { registerErrorHandlers } = require('./error-handlers')

const listen = (config, app) =>
  app.listen(config.server.PORT, () => console.log(
    `App listening on port ${config.server.PORT}`)
  )

const start = (config, app) => () => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

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
