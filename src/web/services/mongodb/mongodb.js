const producers = require('./producers')
const categories = require('./categories')

const createMongoDBService = () => ({
  producers: {
    ...producers
  },
  categories: {
    ...categories
  }
})

module.exports = {
  createMongoDBService
}
