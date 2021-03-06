const { transformResult } = require('./transform-result')

const updateEntity = (Entity) => async (conditions, fields) => {
  try {
    const entity = await Entity.findOneAndUpdate(
      conditions,
      fields,
      {
        new: true,
        runValidators: true
      }
    )

    if (!entity) {
      throw new Error('No entity found for conditions', JSON.stringify(conditions))
    }

    return transformResult(entity)
  } catch (error) {
    throw error
  }
}

module.exports = {
  updateEntity
}
