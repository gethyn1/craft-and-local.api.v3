const express = require('express')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { assocPath } = require('ramda')
const test = require('tape')
const server = require('../server')
const config = require('../../config')

const integrationTest = (name, testCallback) => {
  const mongoServer = new MongoMemoryServer()
  let testServer

  test('Integration test setup', async (t) => {
    try {
      const mongoUri = await mongoServer.getConnectionString()
      const testConfig = assocPath(['environment', 'MONGODB_URI'], mongoUri, config)
      testServer = await server.initialise(testConfig, express())
      t.pass('Integration test setup complete')
    } catch (error) {
      t.fail('Integration test setup failed', error)
    }
    t.end()
  })

  test(name, async (t) => testCallback(t))

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