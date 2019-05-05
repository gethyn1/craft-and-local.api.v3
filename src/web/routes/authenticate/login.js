const login = (service) => async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await service.users.authenticate({ email, password })
    req.session.user = user
    req.session.isAuthenticated = true
    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login
}
