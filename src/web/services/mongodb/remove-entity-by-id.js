const { transformResult } = require('./transform-result')

const removeEntityById = (model) => async (id) => {
  try {
    const removed = await model.findByIdAndRemove(id)
    return transformResult(removed)
  } catch (error) {
    throw error
  }
}

module.exports = {
  removeEntityById
}
