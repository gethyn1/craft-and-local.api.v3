const mongoose = require('mongoose')
const { integrationTest } = require('./integration-test')

const BASE_URL = 'http://localhost:5000'
const uri = `${BASE_URL}/locations`

const entityExists = id => entity => entity._id === `${id}`

integrationTest('Create, reads, updates and deletes location', async (t, request) => {
  try {
    // Seed database
    await request({
      method: 'POST',
      uri,
      body: {
        coordinates: [123, 456],
        producer: mongoose.Types.ObjectId(),
        categories: [mongoose.Types.ObjectId()],
        address: 'number 1, far away from here, W1A 8FF',
        alias: 'the name of the place'
      }
    })

    // Create location for tests
    const producerId = mongoose.Types.ObjectId()
    const categoryId = mongoose.Types.ObjectId()

    const location = {
      coordinates: [789, 111],
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
      coordinates: [789, 111]
    }

    t.deepEqual(createResult.data.entity.location, expectedLocation, 'creates location in database with correct location')
    t.equal(createResult.data.entity.producer, `${producerId}`, 'creates location in database with correct producer')
    t.deepEqual(createResult.data.entity.categories, [`${categoryId}`], 'creates location in database with correct categories')
    t.equal(createResult.data.entity.address, 'number 5, remote place, bb7 9pz', 'creates location in database with correct address')
    t.equal(createResult.data.entity.alias, 'my alias', 'creates location in database with correct alias')

    // Read locations
    const readResult = await request({ uri })
    const createdLocationId = createResult.data.entity._id
    const isCreatedLocation = entityExists(createdLocationId)

    t.equal(readResult.data.entities.length, 2, 'reads correct number of locations from database')
    t.equal(readResult.data.entities.some(isCreatedLocation), true, 'created location is returned from in list database')

    // Read location
    const readOneResult = await request({
      uri: `${uri}/${createResult.data.entity._id}`
    })

    t.equal(readOneResult.data.entity.producer, `${producerId}`, 'reads single location from database')

    // Read location by filters
    // Note: not currently possible to test latlng an mindistance filters
    const categoryFilterResult = await request({ uri: `${uri}?categories=${categoryId}` })
    t.equal(categoryFilterResult.data.entities.length, 1, 'it gets the correct number of locations for category')
    t.equal(isCreatedLocation(categoryFilterResult.data.entities[0]), true, 'it gets the correct location for category')

    const excludeFilterResult = await request({ uri: `${uri}?exclude=${createdLocationId}` })
    t.equal(excludeFilterResult.data.entities.length, 1, 'it gets the correct number of locations for exclude')
    t.equal(isCreatedLocation(excludeFilterResult.data.entities[0]), false, 'it excludes the correct location')

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

    t.equal(deleteResult.data.entities.length, 1, 'deletes location from database')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})
