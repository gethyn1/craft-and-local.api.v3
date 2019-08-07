const { buildSuccessResponse } = require('../build-responses')

const deleteUser = (service) => async (req, res, next) => {
  try {
    const result = await service.users.removeById(req.params.id)
    res.json(buildSuccessResponse(result))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteUser
}
