const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const onConnected = (onConnect) => () => {
  console.log('Mongo DB connected')
  onConnect()
}

const onError = err => console.error(err)

const onDisconnected = () => console.log('Mongo DB disconnected')

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit()
  })
})

const connectDatabase = (onConnect, config, app) => {
  mongoose.connect(config.environment.MONGODB_URI, { useNewUrlParser: true })
  mongoose.set('useCreateIndex', true)
  mongoose.connection.on('connected', onConnected(onConnect))
  mongoose.connection.on('error', onError)
  mongoose.connection.on('disconnected', onDisconnected)
}

module.exports = {
  connectDatabase
}
