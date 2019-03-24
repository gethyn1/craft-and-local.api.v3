const { Category } = require('./model')

const find = async () => {
  try {
    const results = await Category
      .find()
      .exec()

    return {
      statusCode: 200,
      status: 'success',
      data: {
        categories: results
      }
    }
  } catch (error) {
    throw new Error(error.errmsg)
  }
}

module.exports = {
  find
}
