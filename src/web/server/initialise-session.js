const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const initialiseSession = (connection, config, app) => {
  app.use(session({
    store: new MongoStore({ mongooseConnection: connection }),
    secret: config.environment.SESSION_SECRET,
    name: config.server.SESSION_ID_NAME,
    cookie: {
      secure: !config.environment.USE_UNSECURE_COOKIE
    },
    saveUninitialized: false,
    resave: false
  }))
}

module.exports = {
  initialiseSession
}
