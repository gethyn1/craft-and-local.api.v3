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

    t.equal(result.statusCode, 200, 'succesfully authenticates user')
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
