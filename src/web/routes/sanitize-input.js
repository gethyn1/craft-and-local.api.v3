const escapeHtml = require('escape-html')
const jsStringEscape = require('js-string-escape')
const mongoSanitize = require('mongo-sanitize')
const { compose, map } = require('ramda')

const sanitize = compose(jsStringEscape, escapeHtml, mongoSanitize)

const sanitizeBody = (req, res, next) => {
  req.body = map(sanitize, req.body)
  next()
}

module.exports = {
  sanitizeBody
}
