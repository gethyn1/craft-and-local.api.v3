const test = require('tape')
const { buildSuccessResponse } = require('./build-responses')

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
    }
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
    ]
  }

  t.deepEqual(result, expected)
  t.end()
})