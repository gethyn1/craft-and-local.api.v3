const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const onConnected = () => console.log('Mongo DB connected')

const onDisconnected = () => console.log('Mongo DB disconnected')

const onError = err => console.error(err)

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit()
  })
})

const connectDatabase = async (config, app) => {
  // Fix deprecation notice
  mongoose.set('useCreateIndex', true)
  // Fix deprecation notice. Should be removed when updating to Mongoose v6
  // https://github.com/Automattic/mongoose/issues/6880#issuecomment-435621543
  mongoose.set('useFindAndModify', false)
  mongoose.connection.on('connected', onConnected)
  mongoose.connection.on('error', onError)
  mongoose.connection.on('disconnected', onDisconnected)

  await mongoose.connect(config.environment.MONGODB_URI, { useNewUrlParser: true })
}

const disconnectDatabase = () => {
  mongoose.disconnect()
}

module.exports = {
  connectDatabase,
  disconnectDatabase
}
