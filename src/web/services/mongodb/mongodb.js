const producers = require('./producers')
const categories = require('./categories')
const users = require('./users')
const locations = require('./locations')

const createMongoDBService = () => ({
  producers: {
    ...producers
  },
  categories: {
    ...categories
  },
  users: {
    ...users
  },
  locations: {
    ...locations
  }
})

module.exports = {
  createMongoDBService
}
