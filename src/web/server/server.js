const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const { initialiseSession } = require('./initialise-session')
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

  app.use(cors({
    origin: config.environment.WEB_APP_ORIGIN,
    allowedHeaders: 'Content-Type, X-Requested-With',
    credentials: true
  }))

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
