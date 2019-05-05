const login = (service) => async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await service.users.authenticate({ email, password })

    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login
}
