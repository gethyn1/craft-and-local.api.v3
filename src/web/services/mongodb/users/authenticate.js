const { User } = require('./model')

const authenticate = async ({ email, password }) => {
  try {
    const result = await User
      .findOne({ email })
      .exec()

    if (!result) {
      throw new Error('Authentication failed. No user found')
    }

    const isMatch = await result.comparePassword(password)

    if (!isMatch) {
      // TODO allow setting different response codes
      throw new Error('Authentication failed. Incorrect password.')
    }

    return {
      statusCode: 200,
      status: 'success',
      data: {
        user: result
      }
    }
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  authenticate
}
