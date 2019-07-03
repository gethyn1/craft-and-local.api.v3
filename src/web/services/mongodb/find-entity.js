const findEntity = (Entity) => async (conditions) => {
  try {
    const entity = await Entity
      .findOne(conditions)
      .exec()

    if (!entity) {
      throw new Error('No entity found for conditions', JSON.stringify(conditions))
    }

    return entity
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  findEntity
}
