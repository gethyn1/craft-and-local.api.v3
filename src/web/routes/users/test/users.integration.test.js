/* globals describe, it, beforeEach, afterEach, expect */
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const request = require('supertest')
const express = require('express')
const server = require('../../../server')
const { getSidCookie, getTestConfig } = require('../../test/utils')
const { User } = require('../../../services/mongodb/users/model')

const USER_A = {
  email: 'bob@testmail.com',
  password: '123456'
}

const USER_B = {
  email: 'jo@testmail.com',
  password: 'abcdef'
}

const USER_C = {
  email: 'eric@testmail.com',
  password: '000000'
}

describe('/users', () => {
  let mongoServer
  let app
  let Cookie

  beforeEach(async (done) => {
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
    it('should return all users', async () => {
      await User.create([USER_A, USER_B, USER_C])
      const res = await request(app).get('/users').set('Cookie', Cookie)

      expect(res.status).toBe(200)
      // Expected 4 as a user is created in `getSidCookie()` to allow querying an authenticated endpoint
      expect(res.body.data.length).toBe(4)
      expect(res.body.data.some(u => u.email === 'bob@testmail.com')).toBeTruthy()
      expect(res.body.data.some(u => u.email === 'jo@testmail.com')).toBeTruthy()
      expect(res.body.data.some(u => u.email === 'eric@testmail.com')).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('should return user by ID', async () => {
      const user = new User(USER_A)
      await user.save()
      const res = await request(app).get(`/users/${user._id}`).set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data).toHaveProperty('email', 'bob@testmail.com')
    })

    it('should return 404 if invalid ID requested', async () => {
      const res = await request(app).get('/users/1').set('Cookie', Cookie)
      expect(res.status).toBe(404)
    })
  })

  describe('POST /', () => {
    it('should return 422 for missing email', async () => {
      const user = { ...USER_A, email: undefined }
      const res = await request(app).post('/users').set('Cookie', Cookie).send(user)
      expect(res.status).toBe(422)
    })

    it('should return 422 for missing password', async () => {
      const user = { ...USER_A, password: undefined }
      const res = await request(app).post('/users').set('Cookie', Cookie).send(user)
      expect(res.status).toBe(422)
    })

    it('should return 422 for invalid email', async () => {
      const invalidEmails = ['', 'bobattestemail.com', 'bob@testemail', '@testemail.com', 'bob@']

      await Promise.each(invalidEmails, async (email) => {
        const user = { ...USER_A, email }
        const res = await request(app).post('/users/').set('Cookie', Cookie).send(user)
        expect(res.status).toBe(422)
      })
    })

    it('should return 422 for invalid password', async () => {
      const invalidPasswords = ['', 'a'.repeat(4), 'a'.repeat(101), 1234, { '$where': 'badthingshappen' }]

      await Promise.each(invalidPasswords, async (password) => {
        const user = { ...USER_A, password }
        const res = await request(app).post('/users/').set('Cookie', Cookie).send(user)
        expect(res.status).toBe(422)
      })
    })
  })

  describe('POST /:id', () => {
    it('should update a user if it already exists', async () => {
      const user = new User(USER_A)
      await user.save()

      const fields = { email: 'bob.frederiksen@slowmail.co' }
      const res = await request(app).post(`/users/${user._id}`).set('Cookie', Cookie).send(fields)
      const updated = await User.find({ email: 'bob.frederiksen@slowmail.co' })

      expect(res.status).toBe(200)
      expect(updated.length).toBe(1)
    })

    it('should return 404 if user does not exist', async () => {
      const fields = { email: 'bob.frederiksen@slowmail.co' }
      const ID = mongoose.Types.ObjectId()
      const res = await request(app).post(`/users/${ID}`).set('Cookie', Cookie).send(fields)

      expect(res.status).toBe(404)
    })
  })
})
