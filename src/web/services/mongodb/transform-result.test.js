const test = require('tape')
const { transformResult } = require('./transform-result')

test('transformResult() builds a success response in the correct format for a single entity', (t) => {
  const document = {
    toObject: () => ({
      __v: '1',
      _id: '123',
      title: 'Mama\'s Little Bakery'
    })
  }

  const result = transformResult(document)

  const expected = {
    id: '123',
    title: 'Mama\'s Little Bakery'
  }

  t.deepEqual(result, expected)
  t.end()
})
