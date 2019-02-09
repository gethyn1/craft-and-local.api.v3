const getProducers = (service) => async (req, res) => {
  try {
    const results = await service.producers.find()
    res.json(results)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getProducers
}
