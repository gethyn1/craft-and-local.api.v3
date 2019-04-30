const { User } = require('./model')

const find = async () => {
  try {
    const results = await User
      .find()
      .exec()

    return {
      statusCode: 200,
      status: 'success',
      data: {
        users: results
      }
    }
  } catch (error) {
    throw new Error(error.errmsg)
  }
}

module.exports = {
  find
}
