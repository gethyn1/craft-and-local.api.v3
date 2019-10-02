const { buildSuccessResponse } = require('../build-responses')

// TODO service could be renamed to repository
// TODO potentially group model / repository with route
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
    const result = await service.locations.updateById({ id: req.params.id, fields: req.body })
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createLocation,
  updateLocation
}
