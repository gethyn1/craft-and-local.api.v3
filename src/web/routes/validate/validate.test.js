const test = require('tape')
const sinon = require('sinon')
const { validateProp } = require('./validate')
const { isNumber } = require('../../../predicates')

const validators = {
  isNumber
}

test('validateProp() does nothing if validation passes', (t) => {
  const req = { body: { age: 93 } }
  const res = { locals: {} }
  const next = sinon.spy()

  validateProp(validators)({ field: 'age', message: 'age must be a number', validator: 'isNumber' })(req, res, next)

  t.equal(typeof res.locals.userInputErrors === 'undefined', true, 'does not add error to userInputErrors')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('validateProp() adds an error to userInputErrors on invalid input', (t) => {
  const req = { body: { age: 'not a number' } }
  const res = { locals: {} }
  const next = sinon.spy()

  const expectedErrors = [{
    field: 'age',
    message: 'age must be a number'
  }]

  validateProp(validators)({ field: 'age', message: 'age must be a number', validator: 'isNumber' })(req, res, next)

  t.deepEqual(res.locals.userInputErrors, expectedErrors, 'adds an error to userInputErrors on invalid input')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('validateProp() thows an error if field is not defined', (t) => {
  const req = { body: {} }
  const res = { locals: {} }
  const next = sinon.spy()

  const callMiddleware = () => validateProp(validators)({ field: 'age', message: 'age must be a number', validator: 'isNumber' })(req, res, next)

  t.throws(callMiddleware, /Field to validate must exist on req.body: age/, 'thows an error if field is not defined')
  t.equal(next.called, false, 'does not call next()')
  t.end()
})

test('validateProp() does not perform validation if field is missing and optional set to true', (t) => {
  const req = { body: {} }
  const res = { locals: {} }
  const next = sinon.spy()

  validateProp(validators)({ field: 'age', message: 'age must be a number', validator: 'isNumber', optional: true })(req, res, next)

  t.equal(typeof res.locals.userInputErrors === 'undefined', true, 'does not add error to userInputErrors')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('validateProp() adds an error to userInputErrors on invalid input when field is optional', (t) => {
  const req = { body: { age: 'not a number' } }
  const res = { locals: {} }
  const next = sinon.spy()

  const expectedErrors = [{
    field: 'age',
    message: 'age must be a number'
  }]

  validateProp(validators)({ field: 'age', message: 'age must be a number', validator: 'isNumber', optional: true })(req, res, next)

  t.deepEqual(res.locals.userInputErrors, expectedErrors, 'adds an error to userInputErrors on invalid input when field is optional')
  t.equal(next.called, true, 'calls next()')
  t.end()
})
