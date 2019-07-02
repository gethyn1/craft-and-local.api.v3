const removeEntityById = (model) => async (id) => {
  try {
    return model.findByIdAndRemove(id)
  } catch (error) {
    // TO DO: abstract function for creating error messages
    throw new Error(error.errmsg || error.message)
  }
}

module.exports = {
  removeEntityById
}
