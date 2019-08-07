const { buildSuccessResponse } = require('../build-responses')

const getUsers = (service) => async (req, res, next) => {
  try {
    const results = await service.users.find()
    res.json(buildSuccessResponse(results))
  } catch (error) {
    next(error)
  }
}

const getUser = (service) => async (req, res, next) => {
  try {
    const result = await service.users.findById(req.params.id)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  getUser
}
