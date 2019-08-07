const { buildSuccessResponse } = require('../build-responses')

const createUser = (service) => async (req, res, next) => {
  try {
    const result = await service.users.create(req.body)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

const updateUser = (service) => async (req, res, next) => {
  try {
    const result = await service.users.updateById({ id: req.params.id, fields: req.body })
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  updateUser
}
