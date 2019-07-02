const findEntityById = (Entity) => async (id) => {
  try {
    const entity = await Entity
      .findById(id)
      .exec()

    if (!entity) {
      throw new Error('No entity found for ID')
    }

    return {
      statusCode: 200,
      status: 'success',
      data: {
        entity
      }
    }
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  findEntityById
}
