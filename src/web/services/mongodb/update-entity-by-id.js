const { NOT_FOUND } = require('../../http-statuses')
const { handleInvalidId } = require('./handle-invalid-id')
const { transformResult } = require('./transform-result')

const updateEntityById = (Entity) => async ({ id, fields }) => {
  try {
    handleInvalidId(id)

    const entity = await Entity.findByIdAndUpdate(
      id,
      fields,
      {
        new: true,
        runValidators: true
      }
    )

    if (!entity) {
      const error = new Error(`No entity found for ID [${id}]`)
      error.statusCode = NOT_FOUND
      throw error
    }

    return transformResult(entity)
  } catch (error) {
    throw error
  }
}

module.exports = {
  updateEntityById
}
