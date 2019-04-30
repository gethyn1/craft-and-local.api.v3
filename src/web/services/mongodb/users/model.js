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

// Hash password before saving to database
UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  argon2.hash(user.password).then(hash => {
    user.password = hash
    next()
  }).catch(err => next(err))
})

// Compare database password hash with user submitted password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    argon2.verify(this.password, candidatePassword).then(match => {
      if (match) {
        resolve(match)
      } else {
        reject(match)
      }
    }).catch(err => reject(err))
  })
}

module.exports = {
  User: mongoose.model('User', UserSchema)
}
