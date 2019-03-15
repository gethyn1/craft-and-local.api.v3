const { Producer } = require('./model')

const findOne = async (userId) => {
  try {
    const result = await Producer
      .findOne({ userId })
      .exec()

    if (!result) {
      throw new Error('No producer found')
    }

    return {
      statusCode: 200,
      status: 'success',
      data: {
        producer: result
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
