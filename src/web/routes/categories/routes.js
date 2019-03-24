const { createMongoDBService } = require('../../services/mongodb')
const { getCategories } = require('./get')

const categoriesRoutes = (config, app) => {
  const mongoDBService = createMongoDBService()

  app.get('/categories', getCategories(mongoDBService))
}

module.exports = {
  categoriesRoutes
}
