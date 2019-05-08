const { toBoolean } = require('./to-boolean')

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  WEB_APP_ORIGIN: process.env.WEB_APP_ORIGIN,
  SESSION_SECRET: process.env.SESSION_SECRET,
  USE_UNSECURE_COOKIE: toBoolean(process.env.USE_UNSECURE_COOKIE)
}
