const { handleInvalidId } = require('./handle-invalid-id')
const { transformResult } = require('./transform-result')

const findEntityById = (Entity) => async (id) => {
  try {
    // TODO: unsure about calling this void function
    // is there a more functional way of implementing?
    handleInvalidId(id)

    const entity = await Entity
      .findById(id)
      .exec()

    if (!entity) {
      throw new Error('No entity found for ID')
    }

    return transformResult(entity)
  } catch (error) {
    throw error
  }
}

module.exports = {
  findEntityById
}
