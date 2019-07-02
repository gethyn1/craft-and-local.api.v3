const updateEntityById = (Entity) => async (id, fields) => {
  try {
    const entity = await Entity.findByIdAndUpdate(
      id,
      fields,
      {
        new: true,
        runValidators: true
      }
    )

    if (!entity) {
      throw new Error('No entity found')
    }

    return entity
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  updateEntityById
}
