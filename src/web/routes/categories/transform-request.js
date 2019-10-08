const { evolve, pick, compose } = require('ramda')
const { trimAndEscape } = require('../sanitize-input')
const { validateDataObject } = require('../validate-data-object')
const { UPDATE_CATEGORY_SCHEMA, CREATE_CATEGORY_SCHEMA } = require('./schema')
const { CATEGORY_KEYS } = require('./keys')

const sanitize = evolve({
  title: trimAndEscape,
  slug: trimAndEscape
})

const transformDataObject = (isCreatingEntity) => {
  const schema = isCreatingEntity ? CREATE_CATEGORY_SCHEMA : UPDATE_CATEGORY_SCHEMA
  return compose(validateDataObject(schema), sanitize, pick(CATEGORY_KEYS))
}

const transformRequest = (req, res, next) => {
  try {
    req.body = transformDataObject(!req.params.id)(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  transformRequest
}
