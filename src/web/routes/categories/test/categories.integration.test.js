/* globals describe, it, beforeEach, afterEach, expect */
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const request = require('supertest')
const express = require('express')
const server = require('../../../server')
const { getSidCookie, getTestConfig } = require('../../test/utils')
const { Category } = require('../../../services/mongodb/categories/model')
const { CATEGORY_A, CATEGORY_B, CATEGORY_C } = require('./test-data')

describe('/categories', () => {
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
    it('should return all categories', async () => {
      await Category.create([CATEGORY_A, CATEGORY_B, CATEGORY_C])
      const res = await request(app).get('/categories').set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(3)
      expect(res.body.data.some(l => l.title === 'Bakery')).toBeTruthy()
      expect(res.body.data.some(l => l.title === 'Brewery')).toBeTruthy()
      expect(res.body.data.some(l => l.title === 'Smokery')).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('should return category by ID', async () => {
      const category = new Category(CATEGORY_A)
      await category.save()
      const res = await request(app).get(`/categories/${category._id}`).set('Cookie', Cookie)

      expect(res.status).toBe(200)
      expect(res.body.data).toHaveProperty('title', 'Bakery')
    })

    it('should return 404 if invalid ID requested', async () => {
      const res = await request(app).get('/categories/1').set('Cookie', Cookie)
      expect(res.status).toBe(404)
    })
  })

  describe('POST /', () => {
    it('should return 422 for missing title', async () => {
      const category = { ...CATEGORY_A, title: undefined }
      const res = await request(app).post('/categories/').set('Cookie', Cookie).send(category)
      expect(res.status).toBe(422)
    })

    it('should return 422 for invalid title', async () => {
      const invalidTitles = ['', 'a'.repeat(21)]

      await Promise.each(invalidTitles, async (title) => {
        const category = { ...CATEGORY_A, title }
        const res = await request(app).post('/categories/').set('Cookie', Cookie).send(category)
        expect(res.status).toBe(422)
      })
    })

    it('should return 422 for missing slug', async () => {
      const category = { ...CATEGORY_A, slug: undefined }
      const res = await request(app).post('/categories/').set('Cookie', Cookie).send(category)
      expect(res.status).toBe(422)
    })

    it('should return 422 for invalid slug', async () => {
      const invalidSlugs = ['', 'a'.repeat(21), 'not Kebab Case', 'NotKebabCase']

      await Promise.each(invalidSlugs, async (slug) => {
        const category = { ...CATEGORY_A, slug }
        const res = await request(app).post('/categories/').set('Cookie', Cookie).send(category)
        expect(res.status).toBe(422)
      })
    })
  })

  describe('POST /:id', () => {
    it('should update a category if it already exists', async () => {
      const category = new Category(CATEGORY_A)
      await category.save()

      const fields = { title: 'Butcher' }
      const res = await request(app).post(`/categories/${category._id}`).set('Cookie', Cookie).send(fields)
      const updated = await Category.find({ title: 'Butcher' })

      expect(res.status).toBe(200)
      expect(updated.length).toBe(1)
    })

    it('should return 404 if category does not exist', async () => {
      const fields = { title: 'Organic Bakery' }
      const ID = mongoose.Types.ObjectId()
      const res = await request(app).post(`/categories/${ID}`).set('Cookie', Cookie).send(fields)

      expect(res.status).toBe(404)
    })
  })
})
