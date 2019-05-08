const { integrationTest } = require('./integration-test')

const uri = 'http://localhost:5000/authenticate/login'
const options = { method: 'POST', uri, json: true }
const user = { email: 'jeremiah@gmail.com', password: 'thisisasecret' }

const saveUser = async (request) => request({
  ...options,
  uri: 'http://localhost:5000/users',
  body: user
})

integrationTest('Authenticates user with correct details', async (t, request) => {
  try {
    await saveUser(request)
    t.pass('Succesfully saved user record')

    const result = await request({
      ...options,
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
      ...options,
      body: { ...user, email: 'jeremiah@jeremiah.com' }
    })

    t.fail('Authenticates user with incorrect email')
  } catch (error) {
    t.equal(error.statusCode, 500, 'Does not authenticate user with incorrect email')
  }
  t.end()
})

integrationTest('Does not authenticate user with incorrect password', async (t, request) => {
  try {
    await saveUser(request)
    t.pass('Succesfully saved user record')

    await request({
      ...options,
      body: { ...user, password: 'thisisdifferent' }
    })

    t.fail('Authenticates user with incorrect password')
  } catch (error) {
    t.equal(error.statusCode, 500, 'Does not authenticate user with incorrect password')
  }
  t.end()
})
