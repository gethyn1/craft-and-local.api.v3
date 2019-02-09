const getProducers = (req, res) => {
  res.json({
    producers: [1, 2, 3]
  })
}

module.exports = {
  getProducers
}
