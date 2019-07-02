const deleteLocation = (service) => async (req, res, next) => {
  try {
    await service.locations.removeById(req.params.id)
    res.json(null)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteLocation
}
