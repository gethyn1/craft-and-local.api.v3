const test = require('tape')
const { buildSuccessResponse, buildErrorResponse } = require('./build-responses')

test('buildSuccessResponse() builds a success response in the correct format for a single entity', (t) => {
  const data = {
    id: '123',
    title: 'Mama\'s Little Bakery'
  }

  const result = buildSuccessResponse(data)

  const expected = {
    status: 'ok',
    data: {
      id: '123',
      title: 'Mama\'s Little Bakery'
    },
    meta: {}
  }

  t.deepEqual(result, expected)
  t.end()
})

test('buildSuccessResponse() builds a success response in the correct format for a list of entities', (t) => {
  const data = [
    {
      id: '123',
      title: 'Mama\'s Little Bakery'
    },
    {
      id: '567',
      title: 'Captain Barney\'s Shellfish Stall'
    }
  ]

  const result = buildSuccessResponse(data)

  const expected = {
    status: 'ok',
    data: [
      {
        id: '123',
        title: 'Mama\'s Little Bakery'
      },
      {
        id: '567',
        title: 'Captain Barney\'s Shellfish Stall'
      }
    ],
    meta: {}
  }

  t.deepEqual(result, expected)
  t.end()
})

test('buildSuccessResponse() builds a success response in the correct format for a single entity with meta', (t) => {
  const data = {
    entity: {
      id: '123',
      title: 'Mama\'s Little Bakery'
    },
    version: 1
  }

  const result = buildSuccessResponse(data)

  const expected = {
    status: 'ok',
    data: {
      id: '123',
      title: 'Mama\'s Little Bakery'
    },
    meta: {
      version: 1
    }
  }

  t.deepEqual(result, expected)
  t.end()
})

test('buildSuccessResponse() builds a success response in the correct format for a list of entities with meta', (t) => {
  const data = {
    entities: [
      {
        id: '123',
        title: 'Mama\'s Little Bakery'
      },
      {
        id: '567',
        title: 'Captain Barney\'s Shellfish Stall'
      }
    ],
    page: 1,
    totalPages: 3
  }

  const result = buildSuccessResponse(data)

  const expected = {
    status: 'ok',
    data: [
      {
        id: '123',
        title: 'Mama\'s Little Bakery'
      },
      {
        id: '567',
        title: 'Captain Barney\'s Shellfish Stall'
      }
    ],
    meta: {
      page: 1,
      totalPages: 3
    }
  }

  t.deepEqual(result, expected)
  t.end()
})

test('buildErrorResponse() builds an error response in the correct format', (t) => {
  const errors = ['first error', 'second error']

  const result = buildErrorResponse(errors)

  const expected = {
    status: 'ok',
    data: null,
    errors
  }

  t.deepEqual(result, expected)
  t.end()
})
