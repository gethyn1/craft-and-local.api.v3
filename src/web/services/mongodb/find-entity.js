const { transformResult } = require('./transform-result')

const findEntity = (Entity) => async (conditions) => {
  try {
    const entity = await Entity
      .findOne(conditions)
      .exec()

    if (!entity) {
      throw new Error('No entity found for conditions', JSON.stringify(conditions))
    }

    return transformResult(entity)
  } catch (error) {
    throw error
  }
}

module.exports = {
  findEntity
}
