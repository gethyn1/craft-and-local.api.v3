const { createMongoDBService } = require('../../services/mongodb')
const { getCategories, getCategory } = require('./get')
const { createCategory, updateCategory } = require('./post')

const categoriesRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/categories', getCategories(mongoDBService))
  app.get('/categories/:id', getCategory(mongoDBService))

  app.post('/categories', createCategory(mongoDBService))
  app.post('/categories/:id', updateCategory(mongoDBService))
}

module.exports = {
  categoriesRoutes
}
