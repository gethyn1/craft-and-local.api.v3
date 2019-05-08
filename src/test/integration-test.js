const express = require('express')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { assocPath } = require('ramda')
const test = require('tape')
const request = require('request-promise')
const server = require('../web/server')
const config = require('../config')

const { create } = require('../web/services/mongodb/users')

const user = { email: 'integration@test.com', password: 'test' }

const options = {
  method: 'POST',
  uri: 'http://localhost:5000/authenticate/login',
  json: true,
  body: user,
  resolveWithFullResponse: true
}

const getSIDCookie = response => response.headers['set-cookie'].toString().match('connect.sid=(.*?);')[1]

const makeRequest = (cookie) => async (options) => {
  return request({
    ...options,
    headers: {
      Cookie: cookie
    }
  })
}

// TODO implement test setup that only runs setup and teardown once for all tests
const integrationTest = (name, testCallback) => {
  const mongoServer = new MongoMemoryServer()
  let testServer
  let sessionId

  test('Integration test setup', async (t) => {
    try {
      const mongoUri = await mongoServer.getConnectionString()
      const testConfig = assocPath(['environment', 'MONGODB_URI'], mongoUri, config)
      testServer = await server.initialise(testConfig, express())

      await create(user)
      const authorise = await request(options)
      sessionId = getSIDCookie(authorise)

      t.pass('Integration test setup complete')
    } catch (error) {
      t.fail('Integration test setup failed', error)
    }
    t.end()
  })

  test(name, async (t) => testCallback(t, makeRequest(`connect.sid=${sessionId}`)))

  test('Integration test teardown', async (t) => {
    try {
      await testServer.close(() => console.log('Test server closed'))
      await mongoServer.stop()
      t.pass('Integration teardown complete')
    } catch (error) {
      t.fail('Integration test teardown failed', error)
    }
    t.end()
  })
}

module.exports = {
  integrationTest
}
