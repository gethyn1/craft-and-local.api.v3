const argon2 = require('argon2')
const { integrationTest } = require('./integration-test')

const uri = 'http://localhost:5000/users'
const options = { uri, json: true }

integrationTest('Create, reads, updates and deletes user', async (t, request) => {
  try {
    const user = { email: 'jeremiah@gmail.com', password: 'thisisasecret' }

    const createResult = await request({
      ...options,
      method: 'POST',
      body: user
    })

    const passwordIsHashed = await argon2.verify(createResult.data.user.password, user.password)

    const readResult = await request(options)

    const updateResult = await request({
      ...options,
      uri: `${uri}/${createResult.data.user._id}`,
      method: 'POST',
      body: { email: 'jeremiah@jeremiah.com' }
    })

    await request({
      ...options,
      uri: `${uri}/${createResult.data.user._id}`,
      method: 'DELETE'
    })

    const deleteResult = await request(options)

    t.equal(createResult.data.user.email, user.email, 'creates user in database')
    // expecte 2 users as 1 user is also saved in integration setup
    t.equal(readResult.data.users.length, 2, 'reads user from database')
    t.equal(updateResult.data.user.email, 'jeremiah@jeremiah.com', 'updates user in database')
    t.equal(passwordIsHashed, true, 'stores hashed password in database')
    // expecte 1 users as 1 user is also saved in integration setup
    t.equal(deleteResult.data.users.length, 1, 'deletes user from database')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})
