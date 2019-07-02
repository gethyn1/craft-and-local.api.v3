const createEntity = (Entity) => async (fields) => {
  try {
    const entity = new Entity(fields)
    const result = await entity.save()

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
  createEntity
}
