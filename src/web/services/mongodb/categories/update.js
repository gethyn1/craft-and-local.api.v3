const { Category } = require('./model')

const update = async (id, category) => {
  try {
    const result = await Category.findByIdAndUpdate(
      id,
      category,
      {
        new: true,
        runValidators: true
      }
    )

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
  update
}
