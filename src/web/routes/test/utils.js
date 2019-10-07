const { assocPath } = require('ramda')
const request = require('supertest')
const config = require('../../../config')
const { User } = require('../../services/mongodb/users/model')

const getSidCookie = async (app) => {
  // Seed database with user
  const user = new User({ email: 'integration@test.com', password: 'test' })
  await user.save()

  // Login user and get session ID
  const res = await request(app)
    .post('/authenticate/login')
    .set('Accept', 'application/json')
    .send({ 'email': 'integration@test.com', 'password': 'test' })

  return res.headers['set-cookie'].pop().split(';')[0]
}

const getTestConfig = ({ mongoUri }) => assocPath(['environment', 'MONGODB_URI'], mongoUri, config)

module.exports = {
  getSidCookie,
  getTestConfig
}
