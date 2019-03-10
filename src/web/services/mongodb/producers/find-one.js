const { Producer } = require('./model')

const findOne = async (userId) => {
  try {
    const result = await Producer
      .findOne({ userId })
      .exec()

    return {
      statusCode: 200,
      status: 'success',
      data: {
        producer: result
      }
    }
  } catch (error) {
    throw new Error(error.errmsg)
  }
}

module.exports = {
  findOne
}
