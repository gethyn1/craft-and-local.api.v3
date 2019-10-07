const mongoose = require('mongoose')
const { logger } = require('../../logger')

mongoose.Promise = global.Promise

const onConnected = () => logger.info('Mongo DB connected')

const onDisconnected = () => logger.info('Mongo DB disconnected')

const onError = error => logger.error(error)

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit()
  })
})

const connectDatabase = async (config) => {
  // Fix deprecation notice
  mongoose.set('useCreateIndex', true)
  // Fix deprecation notice. Should be removed when updating to Mongoose v6
  // https://github.com/Automattic/mongoose/issues/6880#issuecomment-435621543
  mongoose.set('useFindAndModify', false)
  mongoose.connection.once('connected', onConnected)
  mongoose.connection.once('disconnected', onDisconnected)
  mongoose.connection.on('error', onError)
  await mongoose.connect(config.environment.MONGODB_URI, { useNewUrlParser: true })
  return mongoose.connection
}

const disconnectDatabase = () => {
  mongoose.disconnect()
}

module.exports = {
  connectDatabase,
  disconnectDatabase
}
