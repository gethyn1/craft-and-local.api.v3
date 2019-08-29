const { compose, equals, type } = require('ramda')

module.exports.isString = compose(equals('String'), type)

module.exports.isFunction = compose(equals('Function'), type)

module.exports.isObject = compose(equals('Object'), type)

module.exports.isNumber = compose(equals('Number'), type)

module.exports.isArray = compose(equals('Array'), type)
