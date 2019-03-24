const getCategories = (service) => async (req, res, next) => {
  try {
    const results = await service.categories.find()
    res.json(results)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategories
}
