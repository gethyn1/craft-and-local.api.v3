const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const initialiseSession = (connection, config, app) => {
  const sess = {
    store: new MongoStore({ mongooseConnection: connection }),
    secret: config.environment.SESSION_SECRET,
    cookie: {},
    saveUninitialized: false,
    resave: false
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }

  app.use(session(sess))
}

module.exports = {
  initialiseSession
}
