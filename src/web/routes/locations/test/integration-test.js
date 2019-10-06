/* globals describe, it, beforeEach, afterEach, expect */
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { assocPath } = require('ramda')
const Promise = require('bluebird')
const request = require('supertest')
const express = require('express')
const server = require('../../../server')
const config = require('../../../../config')
const { User } = require('../../../services/mongodb/users/model')
const { Location } = require('../../../services/mongodb/locations/model')
const { LOCATION_A, LOCATION_B, LOCATION_C, BAKERY_CATEGORY_ID } = require('./test-data')

const getSidCookie = async (app) => {
  // Seed database with user
  const user = new User({ email: 'integration@test.com', password: 'test' })
  await user.save()

  // Login user and get session ID
  const res = await request(app)
    .post('/authenticate/login')
    .set('Accept', 'application/json')
    .send({ 'email': 'integration@test.com', 'password': 'test' })

  return res.headers['set-cookie'].pop().split(';')[0]
}

const getTestConfig = ({ mongoUri }) => assocPath(['environment', 'MONGODB_URI'], mongoUri, config)

describe('/locations', () => {
  let mongoServer
  let app
  let Cookie

  beforeEach(async (done) => {
    // Setup database and app (server)
    mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getConnectionString()
    app = await server.initialise(getTestConfig({ mongoUri }), express())
    Cookie = await getSidCookie(app)
    done()
  })

  afterEach(async (done) => {
    await app.close()
    await mongoServer.stop()
    done()
  })

  describe('GET /', () => {
    it('should return all locations', async () => {
      await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])
      const res = await request(app).get('/locations').set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(3)
      expect(res.body.data.some(l => l.title === 'Mama\'s Little Bakery')).toBeTruthy()
      expect(res.body.data.some(l => l.title === 'The Remote Bakery')).toBeTruthy()
      expect(res.body.data.some(l => l.title === 'The Organic Turnip Co')).toBeTruthy()
    })

    it('should return all locations by category', async () => {
      await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])
      const res = await request(app).get(`/locations?categories=${BAKERY_CATEGORY_ID}`).set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
      expect(res.body.data.some(l => l.title === 'Mama\'s Little Bakery')).toBeTruthy()
      expect(res.body.data.some(l => l.title === 'The Remote Bakery')).toBeTruthy()
    })

    it('should return no locations if category has no related locations', async () => {
      await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])
      const CATEGORY_ID = mongoose.Types.ObjectId()
      const res = await request(app).get(`/locations?categories=${CATEGORY_ID}`).set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(0)
    })

    it('should exclude location by ID', async () => {
      const locations = await Location.create([LOCATION_A, LOCATION_B, LOCATION_C])
      const locationToExclude = locations[0]
      const res = await request(app).get(`/locations?exclude=${locationToExclude._id}`).set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
      expect(res.body.data.find(l => l.title === locationToExclude.title)).toBeFalsy()
    })

    // TODO: min distance query (relies on defining exact locations in test data)

    // TODO: test latLng query. Currently not working with in memory mongo DB server
  })

  describe('GET /:id', () => {
    it('should return location by ID', async () => {
      const location = new Location(LOCATION_A)
      await location.save()
      const res = await request(app).get(`/locations/${location._id}`).set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data).toHaveProperty('title', 'Mama\'s Little Bakery')
    })

    it('should return 404 if invalid ID requested', async () => {
      const res = await request(app).get('/locations/1').set('Cookie', Cookie)
      expect(res.status).toBe(404)
    })
  })

  describe('POST /', () => {
    it('should return 422 for invalid coordinates', async () => {
      const invalidCoordinates = [[91, 181], [-91, -181], 'coordinates', ['coordinates', 'coordinates'], '80,100']

      await Promise.each(invalidCoordinates, async (coordinates) => {
        const location = { ...LOCATION_A, coordinates }
        const res = await request(app).post('/locations/').set('Cookie', Cookie).send(location)
        expect(res.status).toBe(422)
      })
    })

    it('should return 422 for missing address', async () => {
      const location = { ...LOCATION_A, address: undefined }
      const res = await request(app).post('/locations/').set('Cookie', Cookie).send(location)
      expect(res.status).toBe(422)
    })

    it('should return 422 for invalid address', async () => {
      const location = { ...LOCATION_A, address: 'a'.repeat(101) }
      const res = await request(app).post('/locations/').set('Cookie', Cookie).send(location)
      expect(res.status).toBe(422)
    })

    it('should return 422 for missing title', async () => {
      const location = { ...LOCATION_A, title: undefined }
      const res = await request(app).post('/locations/').set('Cookie', Cookie).send(location)
      expect(res.status).toBe(422)
    })

    it('should return 422 for invalid title', async () => {
      const invalidTitles = ['', 'a'.repeat(51)]

      await Promise.each(invalidTitles, async (title) => {
        const location = { ...LOCATION_A, title }
        const res = await request(app).post('/locations/').set('Cookie', Cookie).send(location)
        expect(res.status).toBe(422)
      })
    })

    it('should return 422 for description that is too long', async () => {
      const location = { ...LOCATION_A, description: 'a'.repeat(501) }
      const res = await request(app).post('/locations/').set('Cookie', Cookie).send(location)
      expect(res.status).toBe(422)
    })

    it('should return 422 for description that is too long', async () => {
      const location = { ...LOCATION_A, description: 'a'.repeat(501) }
      const res = await request(app).post('/locations/').set('Cookie', Cookie).send(location)
      expect(res.status).toBe(422)
    })

    it('should save a valid location', async () => {
      const res = await request(app).post('/locations/').set('Cookie', Cookie).send(LOCATION_A)
      const location = Location.find({ name: 'Mama\'s Little Bakery' })

      expect(res.status).toBe(200)
      expect(location).not.toBeNull()
      expect(res.body.data).toHaveProperty('id')
    })
  })

  describe('POST /:id', () => {
    it('should update a location if it already exists', async () => {
      const location = new Location(LOCATION_A)
      location.save()

      const fields = { title: 'Papa\'s Big Bakery' }
      const res = await request(app).post(`/locations/${location._id}`).set('Cookie', Cookie).send(fields)
      const updated = await Location.find({ title: 'Papa\'s Big Bakery' })

      expect(res.status).toBe(200)
      expect(updated.length).toBe(1)
    })

    it('should return 404 location does not exist', async () => {
      const fields = { title: 'Papa\'s Big Bakery' }
      const ID = mongoose.Types.ObjectId()
      const res = await request(app).post(`/locations/${ID}`).set('Cookie', Cookie).send(fields)

      expect(res.status).toBe(404)
    })
  })
})
