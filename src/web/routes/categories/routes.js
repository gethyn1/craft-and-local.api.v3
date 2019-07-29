const { createMongoDBService } = require('../../services/mongodb')
const { getCategories, getCategory } = require('./get')
const { createCategory, updateCategory } = require('./post')
const { deleteCategory } = require('./delete')

const categoriesRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/categories', getCategories(mongoDBService))
  app.get('/categories/:id', getCategory(mongoDBService))

  app.post('/categories', createCategory(mongoDBService))
  app.post('/categories/:id', updateCategory(mongoDBService))

  app.delete('/categories/:id', deleteCategory(mongoDBService))
}

module.exports = {
  categoriesRoutes
}
