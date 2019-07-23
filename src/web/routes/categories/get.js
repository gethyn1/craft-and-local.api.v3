const { buildSuccessResponse } = require('../build-responses')

const getCategories = (service) => async (req, res, next) => {
  try {
    const results = await service.categories.find()
    res.json(buildSuccessResponse(results))
  } catch (error) {
    next(error)
  }
}

const getCategory = (service) => async (req, res, next) => {
  try {
    const result = await service.categories.findById(req.params.id)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategories,
  getCategory
}
