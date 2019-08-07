const argon2 = require('argon2')
const { integrationTest } = require('./integration-test')
const { User } = require('../web/services/mongodb/users/model')

const BASE_URL = 'http://localhost:5000'
const uri = `${BASE_URL}/users`

// TO DO: find a better way to test password hash
// Ensure password is hashed in database
const assertPasswordIsHashed = async (id, password) => {
  try {
    const result = await User.findById(id).exec()
    return argon2.verify(result.password, password)
  } catch (error) {
    console.log('Error asserting password is hashed', error)
  }
}

integrationTest('Create, reads, updates and deletes user', async (t, request) => {
  try {
    const user = { email: 'jeremiah@gmail.com', password: 'thisisasecret' }

    const createResult = await request({
      method: 'POST',
      uri,
      body: user
    })

    const passwordIsHashed = await assertPasswordIsHashed(createResult.data.id, user.password)
    t.equal(passwordIsHashed, true, 'stores hashed password in database')

    const readResult = await request({ uri })

    const updateResult = await request({
      uri: `${uri}/${createResult.data.id}`,
      method: 'POST',
      body: { email: 'jeremiah@jeremiah.com' }
    })

    await request({
      uri: `${uri}/${createResult.data.id}`,
      method: 'DELETE'
    })

    // Read users to ensure user has been deleted
    const deleteResult = await request({ uri })

    t.equal(createResult.data.email, user.email, 'creates user in database')
    // expecte 2 users as 1 user is also saved in integration setup
    t.equal(readResult.data.length, 2, 'reads user from database')
    t.equal(updateResult.data.email, 'jeremiah@jeremiah.com', 'updates user in database')

    // expect 1 users as 1 user is also saved in integration setup
    t.equal(deleteResult.data.length, 1, 'deletes user from database')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})
