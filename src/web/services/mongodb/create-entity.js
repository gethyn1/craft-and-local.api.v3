const { transformResult } = require('./transform-result')

const createEntity = (Entity) => async (fields) => {
  try {
    const entity = new Entity(fields)
    const result = await entity.save()
    return transformResult(result)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createEntity
}
