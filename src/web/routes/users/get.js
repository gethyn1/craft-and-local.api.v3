const getUsers = (service) => async (req, res, next) => {
  try {
    const results = await service.users.find()
    res.json(results)
  } catch (error) {
    next(error)
  }
}

const getUser = (service) => async (req, res, next) => {
  try {
    const result = await service.users.findOne(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  getUser
}
