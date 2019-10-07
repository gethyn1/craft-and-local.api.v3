const pino = require('pino')
const config = require('../config')

// TODO: find a better way of exposing config to logger
// TODO: Pino registered event listeners are not removed when Http.Server (express app is closed).
//       This is causing a memory leak warning during tests
const logger = pino({ level: config.environment.LOG_LEVEL })

module.exports = {
  logger
}
