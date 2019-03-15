const { Producer } = require('./model')

const update = async (userId, producer) => {
  try {
    const result = await Producer.findOneAndUpdate(
      { userId },
      producer,
      {
        new: true,
        runValidators: true
      }
    )

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
  update
}
