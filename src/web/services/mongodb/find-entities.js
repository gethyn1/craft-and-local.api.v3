const findEntities = (Entity) => async () => {
  try {
    const entities = await Entity
      .find()
      .exec()

    return entities
  } catch (error) {
    throw new Error(error.errmsg)
  }
}

module.exports = {
  findEntities
}
