const { integrationTest } = require('./integration-test')

const BASE_URL = 'http://localhost:5000'
const uri = `${BASE_URL}/categories`

const entityExists = id => entity => entity.id === `${id}`

integrationTest('Create, reads, updates and deletes categories', async (t, request) => {
  try {
    // Seed database
    await request({
      method: 'POST',
      uri,
      body: {
        title: 'First category title',
        slug: 'first'
      }
    })

    // Create category for tests
    const category = {
      title: 'Second category title',
      slug: 'second'
    }

    // Create category
    const createResult = await request({
      method: 'POST',
      uri,
      body: category
    })

    t.equal(createResult.data.title, 'Second category title', 'creates category in database with correct title')
    t.equal(createResult.data.slug, 'second', 'creates category in database with correct slug')

    // Read categories
    const readResult = await request({ uri })
    const createdCategoryId = createResult.data.id
    const isCreatedCategory = entityExists(createdCategoryId)

    t.equal(readResult.data.length, 2, 'reads correct number of categories from database')
    t.equal(readResult.data.some(isCreatedCategory), true, 'created category is returned in list from database')

    // Read category
    const readOneResult = await request({
      uri: `${uri}/${createdCategoryId}`
    })

    t.equal(readOneResult.data.title, 'Second category title', 'reads single category from database')

    // Update category
    const updateResult = await request({
      uri: `${uri}/${createdCategoryId}`,
      method: 'POST',
      body: {
        title: 'Updated second category title'
      }
    })

    t.equal(updateResult.data.title, 'Updated second category title', 'updates category title')
    t.equal(updateResult.data.slug, 'second', 'does not update category slug')

    // TODO Delete location
    // await request({
    //   uri: `${uri}/${createdCategoryId}`,
    //   method: 'DELETE'
    // })

    // const deleteResult = await request({ uri })

    // t.equal(deleteResult.data.length, 1, 'deletes category from database')
  } catch (error) {
    t.fail(error)
  }
  t.end()
})
