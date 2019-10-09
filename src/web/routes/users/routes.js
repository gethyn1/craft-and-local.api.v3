const { createMongoDBService } = require('../../services/mongodb')
const { getUsers, getUser } = require('./get')
const { createUser, updateUser } = require('./post')
const { deleteUser } = require('./delete')
const { sanitizeInput } = require('../sanitize-input')
const { authenticateUser } = require('../authenticate-user')

const usersRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/users', authenticateUser, getUsers(mongoDBService))
  app.get('/users/:id', authenticateUser, getUser(mongoDBService))

  app.post('/users', authenticateUser, sanitizeInput, createUser(mongoDBService))
  app.post('/users/:id', authenticateUser, sanitizeInput, updateUser(mongoDBService))

  app.delete('/users/:id', authenticateUser, deleteUser(mongoDBService))
}

module.exports = {
  usersRoutes
}
