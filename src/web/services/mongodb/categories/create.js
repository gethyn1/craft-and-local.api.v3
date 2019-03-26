const { Category } = require('./model')

const create = async (fields) => {
  try {
    const category = new Category(fields)
    const result = await category.save()

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
  create
}
