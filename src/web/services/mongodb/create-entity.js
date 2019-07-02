const createEntity = (Entity) => async (fields) => {
  try {
    const entity = new Entity(fields)
    return entity.save()
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  createEntity
}
