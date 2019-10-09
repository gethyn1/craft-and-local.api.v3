const { createMongoDBService } = require('../../services/mongodb')
const { getUsers, getUser } = require('./get')
const { createUser, updateUser } = require('./post')
const { deleteUser } = require('./delete')
const { authenticateUser } = require('../authenticate-user')
const { transformRequest } = require('./transform-request')

const usersRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/users', authenticateUser, getUsers(mongoDBService))
  app.get('/users/:id', authenticateUser, getUser(mongoDBService))

  app.post('/users', authenticateUser, transformRequest, createUser(mongoDBService))
  app.post('/users/:id', authenticateUser, transformRequest, updateUser(mongoDBService))

  app.delete('/users/:id', authenticateUser, deleteUser(mongoDBService))
}

module.exports = {
  usersRoutes
}
