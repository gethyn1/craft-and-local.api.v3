const producers = require('./producers')
const categories = require('./categories')
const users = require('./users')

const createMongoDBService = () => ({
  producers: {
    ...producers
  },
  categories: {
    ...categories
  },
  users: {
    ...users
  }
})

module.exports = {
  createMongoDBService
}
