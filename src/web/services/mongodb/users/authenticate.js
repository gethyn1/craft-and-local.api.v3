const { User } = require('./model')

const authenticate = async ({ email, password }) => {
  try {
    const result = await User
      .findOne({ email })
      .exec()

    if (!result) {
      throw new Error('No user found')
    }

    const isMatch = await result.comparePassword(password)

    if (!isMatch) {
      throw new Error('Incorrect password')
    }

    return result
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  authenticate
}
