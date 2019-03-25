const getCategories = (service) => async (req, res, next) => {
  try {
    const results = await service.categories.find()
    res.json(results)
  } catch (error) {
    next(error)
  }
}

const getCategory = (service) => async (req, res, next) => {
  try {
    const result = await service.categories.findOne(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategories,
  getCategory
}
