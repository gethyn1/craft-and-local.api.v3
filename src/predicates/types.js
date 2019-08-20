const { compose, equals, type } = require('ramda')

module.exports.isString = compose(equals('String'), type)

module.exports.isFunction = compose(equals('Function'), type)
