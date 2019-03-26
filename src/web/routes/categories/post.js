const createCategory = (service) => async (req, res, next) => {
  try {
    const result = await service.categories.create(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const updateCategory = (service) => async (req, res, next) => {
  try {
    const result = await service.categories.update(req.params.id, req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCategory,
  updateCategory
}
