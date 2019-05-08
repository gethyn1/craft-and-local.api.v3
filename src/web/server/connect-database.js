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
