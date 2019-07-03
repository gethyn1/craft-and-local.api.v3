const { buildSuccessResponse } = require('../build-responses')

const createProducer = (service) => async (req, res, next) => {
  try {
    const result = await service.producers.create(req.body)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

const updateProducer = (service) => async (req, res, next) => {
  try {
    const result = await service.producers.update({ userId: req.params.userId }, req.body)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProducer,
  updateProducer
}
