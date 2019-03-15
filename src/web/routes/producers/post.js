const createProducer = (service) => async (req, res, next) => {
  try {
    const result = await service.producers.create(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const updateProducer = (service) => async (req, res, next) => {
  try {
    const result = await service.producers.update(req.params.userId, req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProducer,
  updateProducer
}
