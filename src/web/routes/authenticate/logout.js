const logout = (req, res) => {
  req.session.destroy()
  res.json(null)
}

module.exports = {
  logout
}
