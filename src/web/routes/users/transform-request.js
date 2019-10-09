const { evolve, pick, compose } = require('ramda')
const { trimAndEscape } = require('../sanitize-input')
const { validateDataObject } = require('../validate-data-object')
const { UPDATE_USER_SCHEMA, CREATE_USER_SCHEMA } = require('./schema')
const { USER_KEYS } = require('./keys')

const sanitize = evolve({
  email: trimAndEscape
})

// TODO abstract these transformations as used for all entities
const transformDataObject = (isCreatingEntity) => {
  const schema = isCreatingEntity ? CREATE_USER_SCHEMA : UPDATE_USER_SCHEMA
  return compose(validateDataObject(schema), sanitize, pick(USER_KEYS))
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
