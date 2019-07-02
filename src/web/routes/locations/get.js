const getLocations = (service) => async (req, res, next) => {
  try {
    const results = await service.locations.find(req.query)
    res.json(results)
  } catch (error) {
    next(error)
  }
}

const getLocation = (service) => async (req, res, next) => {
  try {
    const result = await service.locations.findById(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getLocations,
  getLocation
}
