const session = require('express-session')

const initialiseSession = (app) => {
  const sess = {
    secret: 'keyboard cat',
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
