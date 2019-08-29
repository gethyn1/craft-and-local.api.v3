const { escape, trim } = require('validator')
const { map, replace, curry, fromPairs, adjust, toPairs, compose, filter, anyPass } = require('ramda')
const { isString, isArray, isObject, isNumber } = require('../../predicates')

// https://github.com/ramda/ramda/wiki/Cookbook#map-keys-of-an-object-rename-keys-by-a-function
const mapKeys = curry((fn, obj) => fromPairs(map(adjust(0, fn), toPairs(obj))))

const NO_SQL_REGEX = /([$.])+/g

const sanitizeNoSql = replace(NO_SQL_REGEX, '')

const sanitizeKeys = mapKeys(sanitizeNoSql)

const sanitizeObj = compose(map(value => isObject(value) ? sanitizeObj(value) : value), sanitizeKeys)

const isLegalType = anyPass([isString, isArray, isObject, isNumber])

const isIterable = anyPass([isObject, isArray])

const filterIllegalTypes = compose(map(value => isIterable(value) ? filterIllegalTypes(value) : value), filter(isLegalType))

const trimAndEscape = compose(escape, trim)

const escapeString = value => isString(value) ? trimAndEscape(value) : value

const escapeObj = compose(map(value => isIterable(value) ? escapeObj(value) : value), map(escapeString))

const sanitizeBody = compose(filterIllegalTypes, sanitizeObj, escapeObj)

const sanitizeInput = (req, res, next) => {
  // TODO protect against stack overflow for recursive functions
  // This is possibly already handled internally by Ramda
  req.body = sanitizeBody(req.body)
  next()
}

module.exports = {
  sanitizeObj,
  sanitizeNoSql,
  sanitizeKeys,
  filterIllegalTypes,
  escapeObj,
  sanitizeInput
}
