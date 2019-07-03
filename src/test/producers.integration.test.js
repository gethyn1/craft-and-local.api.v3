const { integrationTest } = require('./integration-test')

const BASE_URL = 'http://localhost:5000'
const uri = `${BASE_URL}/producers`

const entityExists = id => entity => entity._id === `${id}`

integrationTest('Create, reads, updates and deletes producer', async (t, request) => {
  try {
    // Seed database
    await request({
      method: 'POST',
      uri,
      body: {
        userId: 'my_first_producer',
        title: 'My first producer'
      }
    })

    // Create producer for tests
    const producer = {
      userId: 'my_second_producer',
      title: 'My second producer'
    }

    // Create producer
    const createResult = await request({
      method: 'POST',
      uri,
      body: producer
    })

    t.equal(createResult.data.entity.userId, 'my_second_producer', 'creates producer in database with correct user ID')
    t.equal(createResult.data.entity.title, 'My second producer', 'creates producer in database with correct title')

    // Read producers
    const readResult = await request({ uri })
    const createdProducerId = createResult.data.entity._id
    const isCreatedProducer = entityExists(createdProducerId)

    t.equal(readResult.data.entities.length, 2, 'reads correct number of producers from database')
    t.equal(readResult.data.entities.some(isCreatedProducer), true, 'created producer is returned in list from database')

    // Read producer
    const readOneResult = await request({
      uri: `${uri}/${createResult.data.entity.userId}`
    })

    t.equal(readOneResult.data.entity.userId, 'my_second_producer', 'reads single producer from database')

    // Update producer
    const updateResult = await request({
      uri: `${uri}/${createResult.data.entity.userId}`,
      method: 'POST',
      body: {
        title: 'Updated second user'
      }
    })

    t.equal(updateResult.data.entity.title, 'Updated second user', 'updates producer title')
    t.equal(updateResult.data.entity.userId, 'my_second_producer', 'does not update producer user ID')

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
