const { buildSuccessResponse } = require('../build-responses')

const createLocation = (service) => async (req, res, next) => {
  try {
    const result = await service.locations.create(req.body)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

const updateLocation = (service) => async (req, res, next) => {
  try {
    const result = await service.locations.update(req.params.id, req.body)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createLocation,
  updateLocation
}
