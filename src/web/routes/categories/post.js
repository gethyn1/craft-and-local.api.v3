const { buildSuccessResponse } = require('../build-responses')

const createCategory = (service) => async (req, res, next) => {
  try {
    const result = await service.categories.create(req.body)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

const updateCategory = (service) => async (req, res, next) => {
  try {
    const result = await service.categories.updateById({ id: req.params.id, fields: req.body })
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCategory,
  updateCategory
}
