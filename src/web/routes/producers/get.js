const getProducers = (service) => async (req, res, next) => {
  try {
    const results = await service.producers.find(req.query)
    res.json(results)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProducers
}
