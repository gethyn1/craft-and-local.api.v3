const mongoose = require('mongoose')
const { integrationTest } = require('./integration-test')

const BASE_URL = 'http://localhost:5000'
const uri = `${BASE_URL}/locations`

const entityExists = id => entity => entity.id === `${id}`

integrationTest('Create, reads, updates and deletes location', async (t, request) => {
  try {
    // Seed database
    await request({
      method: 'POST',
      uri,
      body: {
        title: 'Mama\'s little bakery',
        coordinates: [123, 456],
        categories: [mongoose.Types.ObjectId()],
        address: 'Chicago, IL',
        alias: 'First Street'
      }
    })

    // Create location for tests
    const categoryId = mongoose.Types.ObjectId()

    const location = {
      title: 'The remote place',
      coordinates: [789, 111],
      categories: [categoryId],
      address: 'number 5, remote place, bb7 9pz',
      alias: 'near the lake'
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

    t.deepEqual(createResult.data.location, expectedLocation, 'creates location in database with correct location')
    t.deepEqual(createResult.data.categories, [`${categoryId}`], 'creates location in database with correct categories')
    t.equal(createResult.data.address, 'number 5, remote place, bb7 9pz', 'creates location in database with correct address')
    t.equal(createResult.data.alias, 'near the lake', 'creates location in database with correct alias')

    // Read locations
    const readResult = await request({ uri })
    const createdLocationId = createResult.data.id
    const isCreatedLocation = entityExists(createdLocationId)

    t.equal(readResult.data.length, 2, 'reads correct number of locations from database')
    t.equal(readResult.data.some(isCreatedLocation), true, 'created location is returned from list in database')

    // Read location
    const readOneResult = await request({
      uri: `${uri}/${createResult.data.id}`
    })

    t.equal(readOneResult.data.alias, 'near the lake', 'reads single location from database')

    // Read location by filters
    const categoryFilterResult = await request({ uri: `${uri}?categories=${categoryId}` })
    t.equal(categoryFilterResult.data.length, 1, 'it gets the correct number of locations for category')
    t.equal(isCreatedLocation(categoryFilterResult.data[0]), true, 'it gets the correct location for category')

    const excludeFilterResult = await request({ uri: `${uri}?exclude=${createdLocationId}` })
    t.equal(excludeFilterResult.data.length, 1, 'it gets the correct number of locations for exclude')
    t.equal(isCreatedLocation(excludeFilterResult.data[0]), false, 'it excludes the correct location')

    // TODO: latlng test not working - needs fixing
    // const latlngFilterResult = await request({ uri: `${uri}?latlng=0,0` })
    // t.equal(latlngFilterResult.data.length, 2, 'it gets the correct number of locations for latlng')
    // t.equal(isCreatedLocation(latlngFilterResult.data[0]), false, 'it returns locations in the correct order')

    // Update location
    const updateResult = await request({
      uri: `${uri}/${createResult.data.id}`,
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

    t.deepEqual(updateResult.data.location, expectedUpdatedLocation, 'updates location in database with correct location')
    t.deepEqual(updateResult.data.categories, [`${categoryId}`], 'does not update categories')
    t.equal(updateResult.data.address, 'number 5, remote place, bb7 9pz', 'does not update address')
    t.equal(updateResult.data.alias, 'new alias', 'updates location in database with correct alias')

    // Delete location
    await request({
      uri: `${uri}/${createResult.data.id}`,
      method: 'DELETE'
    })

    const deleteResult = await request({ uri })

    t.equal(deleteResult.data.length, 1, 'deletes location from database')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})
