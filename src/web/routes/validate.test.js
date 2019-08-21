const test = require('tape')
const { getPropFromReqBody } = require('./validate')

test('getPropFromReqBody() gets prop from request body', (t) => {
  const obj = {
    body: {
      some: 'prop',
      another: 'different prop'
    }
  }
  const result = getPropFromReqBody('another', obj)

  t.equal(result, 'different prop')
  t.end()
})
