const mongoose = require('mongoose')
const argon2 = require('argon2')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  created: {
    type: Date,
    default: Date.now
  }
})

async function comparePassword (candidatePassword) {
  try {
    return argon2.verify(this.password, candidatePassword)
  } catch (error) {
    throw new Error('There was an error comparing passwords')
  }
}

// TODO this is tested in integration test but probably better to test here and not return hash in response
// see https://github.com/vikpe/mongoose-middleware-test
function hashPassword (next) {
  const user = this

  if (!user.isModified('password')) return next()

  argon2.hash(user.password).then(hash => {
    user.password = hash
    next()
  }).catch(err => next(err))
}

UserSchema.pre('save', hashPassword)
UserSchema.methods.comparePassword = comparePassword

module.exports = {
  User: mongoose.model('User', UserSchema)
}
