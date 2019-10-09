const { createMongoDBService } = require('../../services/mongodb')
const { getCategories, getCategory } = require('./get')
const { createCategory, updateCategory } = require('./post')
const { deleteCategory } = require('./delete')
const { transformRequest } = require('./transform-request')
const { authenticateUser } = require('../authenticate-user')

const categoriesRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/categories', getCategories(mongoDBService))
  app.get('/categories/:id', authenticateUser, getCategory(mongoDBService))

  app.post('/categories', authenticateUser, transformRequest, createCategory(mongoDBService))
  app.post('/categories/:id', authenticateUser, transformRequest, updateCategory(mongoDBService))

  app.delete('/categories/:id', authenticateUser, deleteCategory(mongoDBService))
}

module.exports = {
  categoriesRoutes
}
