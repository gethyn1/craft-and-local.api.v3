const { createMongoDBService } = require('../../services/mongodb')
const { getUsers, getUser } = require('./get')
const { createUser, updateUser } = require('./post')
const { deleteUser } = require('./delete')

const usersRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/users', getUsers(mongoDBService))
  app.get('/users/:id', getUser(mongoDBService))

  app.post('/users', createUser(mongoDBService))
  app.post('/users/:id', updateUser(mongoDBService))

  app.delete('/users/:id', deleteUser(mongoDBService))
}

module.exports = {
  usersRoutes
}
