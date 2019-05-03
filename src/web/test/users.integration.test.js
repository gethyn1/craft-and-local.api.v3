const express = require('express')
const { MongoMemoryServer } = require('mongodb-memory-server')
const argon2 = require('argon2')
const { assocPath } = require('ramda')
const test = require('tape')
const request = require('request-promise')
const server = require('../server')
const config = require('../../config')

const uri = 'http://localhost:5000/users'
const options = { uri, json: true }
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

test('App create, reads, updates and deletes user', async (t) => {
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
    t.equal(readResult.data.users.length, 1, 'reads user from database')
    t.equal(updateResult.data.user.email, 'jeremiah@jeremiah.com', 'updates user in database')
    t.equal(passwordIsHashed, true, 'hstores hashed password in database')
    t.equal(deleteResult.data.users.length, 0, 'deletes user from database')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})

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
