const test = require('tape')
const { wrapError } = require('./errors')

const message = 'Massive error!!!'

test('wrapError() returns an error with the correct props', (t) => {
  const result = wrapError({ message, statusCode: 500 })

  t.equal(result instanceof Error, true, 'should be an instance of Error')
  t.equal(result.message, 'Massive error!!!', 'should have a correctly formatted message property')
  t.equal(result.statusCode, 500, 'should add the statusCode to the error')
  t.end()
})
