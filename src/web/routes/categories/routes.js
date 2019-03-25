const { createMongoDBService } = require('../../services/mongodb')
const { getCategories, getCategory } = require('./get')

const categoriesRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/categories', getCategories(mongoDBService))
  app.get('/categories/:id', getCategory(mongoDBService))
}

module.exports = {
  categoriesRoutes
}
