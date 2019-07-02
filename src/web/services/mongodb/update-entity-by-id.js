const updateEntityById = (Entity) => async (id, fields) => {
  try {
    const result = await Entity.findByIdAndUpdate(
      id,
      fields,
      {
        new: true,
        runValidators: true
      }
    )

    if (!result) {
      throw new Error('No entity found')
    }

    return {
      statusCode: 200,
      status: 'success',
      data: {
        entity: result
      }
    }
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  updateEntityById
}
