const getProducers = (service) => async (req, res, next) => {
  try {
    const results = await service.producers.find(req.query)
    res.json(results)
  } catch (error) {
    next(error)
  }
}

const getProducer = (service) => async (req, res, next) => {
  try {
    const result = await service.producers.findOne(req.params.userId)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProducers,
  getProducer
}
