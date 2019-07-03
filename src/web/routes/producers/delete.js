const deleteProducer = (service) => async (req, res, next) => {
  try {
    await service.producers.removeById(req.params.id)
    res.json(null)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteProducer
}
