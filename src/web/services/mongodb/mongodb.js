const producers = require('./producers')

const createMongoDBService = () => ({
  producers: {
    ...producers
  }
})

module.exports = {
  createMongoDBService
}
