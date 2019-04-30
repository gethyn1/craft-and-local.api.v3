const { User } = require('./model')

const findOne = async (id) => {
  try {
    const result = await User
      .findById(id)
      .exec()

    if (!result) {
      throw new Error('No user found')
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
  findOne
}
