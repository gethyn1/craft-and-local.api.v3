const deleteCategory = (service) => async (req, res, next) => {
  try {
    await service.categories.removeById(req.params.id)
    res.json(null)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteCategory
}
