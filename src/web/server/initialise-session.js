const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const initialiseSession = (connection, config, app) => {
  console.log('Initialising session for domain:', config.environment.COOKIE_DOMAIN)
  console.log('Using unsecure session cookie:', config.environment.USE_UNSECURE_COOKIE)
  console.log('Using session proxy:', config.environment.USE_SESSION_PROXY)

  const sessionConfig = {
    store: new MongoStore({ mongooseConnection: connection }),
    secret: config.environment.SESSION_SECRET,
    name: config.server.SESSION_ID_NAME,
    cookie: {
      domain: config.environment.COOKIE_DOMAIN,
      secure: !config.environment.USE_UNSECURE_COOKIE
    },
    saveUninitialized: false,
    resave: false,
    proxy: config.environment.USE_SESSION_PROXY
  }

  app.use(session(sessionConfig))
}

module.exports = {
  initialiseSession
}
