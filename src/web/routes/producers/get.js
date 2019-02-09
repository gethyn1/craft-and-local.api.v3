const getProducers = (service) => async (req, res, next) => {
  try {
    const { limit } = req.query

    const results = await service.producers.find({ limit })
    res.json(results)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProducers
}
