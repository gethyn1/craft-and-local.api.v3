const { User } = require('./model')

const removeByID = async (id) => {
  try {
    await User.findByIdAndRemove(id)

    return {
      statusCode: 200,
      status: 'success',
      data: {}
    }
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  removeByID
}
