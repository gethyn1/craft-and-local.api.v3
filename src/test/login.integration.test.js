const { integrationTest } = require('./integration-test')

const BASE_URL = 'http://localhost:5000'
const uri = `${BASE_URL}/authenticate/login`
const user = { email: 'jeremiah@gmail.com', password: 'thisisasecret' }

const saveUser = async (request) => request({
  method: 'POST',
  uri: `${BASE_URL}/users`,
  body: user
})

integrationTest('Authenticates user with correct details', async (t, request) => {
  try {
    await saveUser(request)
    t.pass('Succesfully saved user record')

    const result = await request({
      method: 'POST',
      uri,
      body: user
    })

    t.equal(result.status, 'ok', 'succesfully authenticates user')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})

integrationTest('Does not authenticate user with incorrect email', async (t, request) => {
  try {
    await saveUser(request)
    t.pass('Succesfully saved user record')

    await request({
      method: 'POST',
      uri,
      body: { ...user, email: 'jeremiah@jeremiah.com' }
    })

    t.fail('Authenticates user with incorrect email')
  } catch (error) {
    t.equal(error.statusCode, 401, 'Does not authenticate user with incorrect email')
  }
  t.end()
})

integrationTest('Does not authenticate user with incorrect password', async (t, request) => {
  try {
    await saveUser(request)
    t.pass('Succesfully saved user record')

    await request({
      method: 'POST',
      uri,
      body: { ...user, password: 'thisisdifferent' }
    })

    t.fail('Authenticates user with incorrect password')
  } catch (error) {
    t.equal(error.statusCode, 401, 'Does not authenticate user with incorrect password')
  }
  t.end()
})

integrationTest('Returns error for invalid email', async (t, request) => {
  try {
    await request({
      method: 'POST',
      uri,
      body: { ...user, email: 'notanemail' }
    })

    t.fail('Does not return error for invalid email')
  } catch (error) {
    t.equal(error.statusCode, 500, 'Returns correct status code')
    t.equal(error.error.error, 'Email must be in a valid format', 'Returns correct error message')
  }
  t.end()
})

integrationTest('Returns error for empty password', async (t, request) => {
  try {
    await request({
      method: 'POST',
      uri,
      body: { ...user, password: '' }
    })

    t.fail('Does not return error for empty password')
  } catch (error) {
    t.equal(error.statusCode, 500, 'Returns correct status code')
    t.equal(error.error.error, 'Password must not be empty', 'Returns correct error message')
  }
  t.end()
})
