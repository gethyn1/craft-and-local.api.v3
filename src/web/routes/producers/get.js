const { buildSuccessResponse } = require('../build-responses')

const getProducers = (service) => async (req, res, next) => {
  try {
    const results = await service.producers.find(req.query)
    res.json(buildSuccessResponse(results))
  } catch (error) {
    next(error)
  }
}

const getProducer = (service) => async (req, res, next) => {
  try {
    const result = await service.producers.findOne({ userId: req.params.userId })
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProducers,
  getProducer
}
