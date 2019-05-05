const bodyParser = require('body-parser')
const helmet = require('helmet')

const { initialiseSession } = require('./initialise-session')
const { setHeaders } = require('./set-headers')
const { connectDatabase, disconnectDatabase } = require('./connect-database')
const { registerRoutes } = require('../routes')
const { registerErrorHandlers } = require('./error-handlers')

const listen = (config, app) =>
  app.listen(config.server.PORT, () => console.log(
    `App listening on port ${config.server.PORT}`)
  )

// TO DO: sanitise all incoming data
const start = (config, app) => {
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  setHeaders(config, app)
  registerRoutes(config, app)
  registerErrorHandlers(app)

  return listen(config, app)
}

const initialise = async (config, app) => {
  try {
    const connection = await connectDatabase(config)
    initialiseSession(connection, config, app)
    const server = start(config, app)
    server.once('close', disconnectDatabase)
    return server
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  initialise
}
