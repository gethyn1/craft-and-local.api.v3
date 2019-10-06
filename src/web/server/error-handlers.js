const logErrors = (err, req, res, next) => {
  // TODO: implement logger and turn off for testing
  console.error(err.stack)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode)
  res.json({ error: err.message, statusCode })
}

const registerErrorHandlers = (app) => {
  app.use(logErrors)
  app.use(errorHandler)
}

module.exports = {
  errorHandler,
  registerErrorHandlers
}
