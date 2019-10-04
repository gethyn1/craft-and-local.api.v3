/* globals describe, it, beforeEach, afterEach, expect */
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { assocPath } = require('ramda')
const request = require('supertest')
const express = require('express')
const server = require('../../../server')
const config = require('../../../../config')
const { User } = require('../../../services/mongodb/users/model')
const { Location } = require('../../../services/mongodb/locations/model')
const { LOCATION_A, LOCATION_B, LOCATION_C, BAKERY_CATEGORY_ID } = require('./test-data')

describe('/locations', () => {
  describe('GET /', () => {
    let mongoServer
    let app
    let Cookie

    beforeEach(async (done) => {
      // Setup database and app (server)
      mongoServer = new MongoMemoryServer()
      const mongoUri = await mongoServer.getConnectionString()
      const testConfig = assocPath(['environment', 'MONGODB_URI'], mongoUri, config)
      app = await server.initialise(testConfig, express())

      // Seed database with user
      const user = new User({ email: 'integration@test.com', password: 'test' })
      await user.save()

      // Login user and get session ID
      const res = await request(app)
        .post('/authenticate/login')
        .set('Accept', 'application/json')
        .send({ 'email': 'integration@test.com', 'password': 'test' })

      Cookie = res.headers['set-cookie'].pop().split(';')[0]
      done()
    })

    it('should return all locations', async (done) => {
      try {
        // Seed database
        await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])

        // Make request
        const res = await request(app).get('/locations').set('Cookie', Cookie)

        // Assertions
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(3)
        expect(res.body.data.some(l => l.title === 'Mama\'s Little Bakery')).toBeTruthy()
        expect(res.body.data.some(l => l.title === 'The Remote Bakery')).toBeTruthy()
        expect(res.body.data.some(l => l.title === 'The Organic Turnip Co')).toBeTruthy()
        done()
      } catch (error) {
        done.fail(error)
      }
    })

    it('should return all locations by category', async (done) => {
      try {
        // Seed database
        await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])

        // Make request
        const res = await request(app).get(`/locations?categories=${BAKERY_CATEGORY_ID}`).set('Cookie', Cookie)

        // Assertions
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(2)
        expect(res.body.data.some(l => l.title === 'Mama\'s Little Bakery')).toBeTruthy()
        expect(res.body.data.some(l => l.title === 'The Remote Bakery')).toBeTruthy()
        done()
      } catch (error) {
        done.fail(error)
      }
    })

    it('should return no locations if category has no related locations', async (done) => {
      try {
        // Seed database
        await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])

        // Make request
        const CATEGORY_ID = mongoose.Types.ObjectId()
        const res = await request(app).get(`/locations?categories=${CATEGORY_ID}`).set('Cookie', Cookie)

        // Assertions
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(0)
        done()
      } catch (error) {
        done.fail(error)
      }
    })

    it('should exclude location by ID', async (done) => {
      try {
        // Seed database
        const locations = await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])

        // Make request
        const locationToExclude = locations[0]
        const res = await request(app).get(`/locations?exclude=${locationToExclude._id}`).set('Cookie', Cookie)

        // Assertions
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(2)
        expect(res.body.data.find(l => l.title === locationToExclude.title)).toBeFalsy()
        done()
      } catch (error) {
        done.fail(error)
      }
    })

    // TODO: min distance query (relies on defining exact locations in test data)

    // TODO: test latLng query. Currently not working with in memory mongo DB server

    afterEach(async (done) => {
      // Close server
      await app.close(() => console.log('Test server closed'))
      // Close database
      await mongoServer.stop()
      done()
    })
  })
})
