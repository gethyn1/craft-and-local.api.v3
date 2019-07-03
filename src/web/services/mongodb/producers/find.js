const { Producer } = require('./model')

const find = async ({ limit }) => {
  try {
    const results = await Producer
      .find()
      .limit(parseInt(limit, 10))
      .exec()

    return {
      statusCode: 200,
      status: 'success',
      data: {
        producers: results
      }
    }
  } catch (error) {
    throw new Error(error.errmsg)
  }
}

module.exports = {
  find
}
