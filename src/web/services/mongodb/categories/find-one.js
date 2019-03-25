const { Category } = require('./model')

const findOne = async (id) => {
  try {
    const result = await Category
      .findById(id)
      .exec()

    if (!result) {
      throw new Error('No category found')
    }

    return {
      statusCode: 200,
      status: 'success',
      data: {
        category: result
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
