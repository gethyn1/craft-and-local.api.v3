const { Producer } = require('./model')

const create = async (fields) => {
  try {
    const producer = new Producer(fields)
    const result = await producer.save()

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
  create
}
