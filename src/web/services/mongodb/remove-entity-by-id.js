const removeEntityById = (model) => async (id) => {
  try {
    return model.findByIdAndRemove(id)
  } catch (error) {
    throw error
  }
}

module.exports = {
  removeEntityById
}
