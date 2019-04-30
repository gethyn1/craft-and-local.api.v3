const { User } = require('./model')

const update = async (id, user) => {
  try {
    const result = await User.findByIdAndUpdate(
      id,
      user,
      {
        new: true,
        runValidators: true
      }
    )

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
  update
}
