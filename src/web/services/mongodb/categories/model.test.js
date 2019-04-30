const test = require('tape')
const { SLUG_MATCH, toKebabCase } = require('./model')

test(`${SLUG_MATCH} pattern`, (t) => {
  t.equal(SLUG_MATCH.test('this-is-fine-99'), true, 'should allow correct slug format')
  t.equal(SLUG_MATCH.test('NOUPPERCASE'), false, 'should not allow uppercase letters')
  t.equal(SLUG_MATCH.test('no_underscores'), false, 'should not allow underscores')
  t.equal(SLUG_MATCH.test('no spaces'), false, 'should not allow spaces')
  t.equal(SLUG_MATCH.test('no*special/characters.,!&^%$'), false, 'should not allow special characters')
  t.end()
})

test('toKebabCase()', (t) => {
  t.equal(toKebabCase('sOmesTring'), 'somestring', 'should lowercase all letters')
  t.equal(toKebabCase('sOme sTring'), 'some-string', 'should replace spaces with dashes')
  t.equal(toKebabCase('sOme_sTring'), 'some-string', 'should replace underscores with dashes')
  t.end()
})
