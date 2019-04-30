const deleteUser = (service) => async (req, res, next) => {
  try {
    await service.users.removeByID(req.params.id)
    res.json(null)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteUser
}
