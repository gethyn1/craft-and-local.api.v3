const { buildSuccessResponse } = require('../build-responses')

const deleteCategory = (service) => async (req, res, next) => {
  try {
    const result = await service.categories.removeById(req.params.id)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteCategory
}
