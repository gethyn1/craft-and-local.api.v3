const createEntity = (Entity) => async (fields) => {
  try {
    const entity = new Entity(fields)
    return entity.save()
  } catch (error) {
    throw error
  }
}

module.exports = {
  createEntity
}
