const mongoose = require('mongoose')
const { integrationTest } = require('./integration-test')

const BASE_URL = 'http://localhost:5000'
const uri = `${BASE_URL}/locations`

integrationTest('Create, reads, updates and deletes location', async (t, request) => {
  try {
    const producerId = mongoose.Types.ObjectId()
    const categoryId = mongoose.Types.ObjectId()

    const location = {
      coordinates: [123, 456],
      producer: producerId,
      categories: [categoryId],
      address: 'number 5, remote place, bb7 9pz',
      alias: 'my alias'
    }

    // Create location
    const createResult = await request({
      method: 'POST',
      uri,
      body: location
    })

    const expectedLocation = {
      type: 'Point',
      coordinates: [123, 456]
    }

    t.deepEqual(createResult.data.entity.location, expectedLocation, 'creates location in database with correct location')
    t.equal(createResult.data.entity.producer, `${producerId}`, 'creates location in database with correct producer')
    t.deepEqual(createResult.data.entity.categories, [`${categoryId}`], 'creates location in database with correct categories')
    t.equal(createResult.data.entity.address, 'number 5, remote place, bb7 9pz', 'creates location in database with correct address')
    t.equal(createResult.data.entity.alias, 'my alias', 'creates location in database with correct alias')

    // Read locations
    const readResult = await request({ uri })

    t.equal(readResult.data.entities.length, 1, 'reads correct number of locations from database')
    t.equal(readResult.data.entities[0].producer, `${producerId}`, 'location is returned from database')

    // Read location
    const readOneResult = await request({
      uri: `${uri}/${createResult.data.entity._id}`
    })

    t.equal(readOneResult.data.entity.producer, `${producerId}`, 'reads single location from database')

    // Update location
    const updateResult = await request({
      uri: `${uri}/${createResult.data.entity._id}`,
      method: 'POST',
      body: {
        coordinates: [789, 101],
        alias: 'new alias'
      }
    })

    const expectedUpdatedLocation = {
      type: 'Point',
      coordinates: [789, 101]
    }

    t.deepEqual(updateResult.data.entity.location, expectedUpdatedLocation, 'updates location in database with correct location')
    t.equal(updateResult.data.entity.producer, `${producerId}`, 'does not update producer')
    t.deepEqual(updateResult.data.entity.categories, [`${categoryId}`], 'does not update categories')
    t.equal(updateResult.data.entity.address, 'number 5, remote place, bb7 9pz', 'does not update address')
    t.equal(updateResult.data.entity.alias, 'new alias', 'updates location in database with correct alias')

    // Delete location
    await request({
      uri: `${uri}/${createResult.data.entity._id}`,
      method: 'DELETE'
    })

    const deleteResult = await request({ uri })

    t.equal(deleteResult.data.entities.length, 0, 'deletes location from database')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})
