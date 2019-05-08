const express = require('express')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { assocPath } = require('ramda')
const test = require('tape')
const request = require('request-promise')
const server = require('../web/server')
const config = require('../config')
const { create } = require('../web/services/mongodb/users')

const BASE_URL = 'http://localhost:5000'
const user = { email: 'integration@test.com', password: 'test' }

const getSidCookie = response => response.headers['set-cookie'].toString().match(`${config.server.SESSION_ID_NAME}=(.*?);`)[1]

const makeRequest = (cookieString) => async (options) =>
  request({
    ...options,
    json: true,
    headers: {
      Cookie: cookieString
    }
  })

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

      const authenticatedResponse = await request({
        method: 'POST',
        uri: `${BASE_URL}/authenticate/login`,
        json: true,
        body: user,
        resolveWithFullResponse: true
      })

      sessionId = getSidCookie(authenticatedResponse)

      t.pass('Integration test setup complete')
    } catch (error) {
      t.fail('Integration test setup failed', error)
    }
    t.end()
  })

  test(name, async (t) => testCallback(t, makeRequest(`${config.server.SESSION_ID_NAME}=${sessionId}`)))

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
