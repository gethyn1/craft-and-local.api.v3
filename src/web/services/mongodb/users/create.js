const { User } = require('./model')

const create = async (fields) => {
  try {
    const user = new User(fields)
    const result = await user.save()

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
  create
}
