const { Producer } = require('./model')

const find = async () => {
  try {
    const results = await Producer.find().exec()

    return {
      statusCode: 200,
      status: 'success',
      data: {
        producers: results
      }
    }
  } catch (error) {
    throw new Error('Bad request')
  }
}

module.exports = {
  find
}
