const { buildSuccessResponse } = require('../build-responses')

const deleteLocation = (service) => async (req, res, next) => {
  try {
    const result = await service.locations.removeById(req.params.id)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteLocation
}
