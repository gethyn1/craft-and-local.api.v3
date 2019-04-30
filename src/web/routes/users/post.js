const createUser = (service) => async (req, res, next) => {
  try {
    const result = await service.users.create(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const updateUser = (service) => async (req, res, next) => {
  try {
    const result = await service.users.update(req.params.id, req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  updateUser
}
