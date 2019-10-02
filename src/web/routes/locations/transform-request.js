const { evolve, replace, pick, trim, omit, compose } = require('ramda')
const { trimAndEscape } = require('../sanitize-input')
const { validateDataObject } = require('../validate-data-object')
const { UPDATE_LOCATION_SCHEMA, CREATE_LOCATION_SCHEMA } = require('./schema')
const { LOCATION_KEYS } = require('./keys')

const sanitize = evolve({
  title: trimAndEscape,
  description: trimAndEscape,
  alias: trimAndEscape,
  instagramHandle: trimAndEscape,
  twitterHandle: trimAndEscape,
  email: trimAndEscape,
  telephone: replace(/\s/g, ''),
  website: trim
})

const buildGeoJsonForCoordinates = coordinates => ({
  type: 'Point',
  coordinates
})

const transformFields = fields => ({
  location: buildGeoJsonForCoordinates(fields.coordinates),
  ...omit(['coordinates'], fields)
})

const transformDataObject = (isCreatingEntity) => {
  const schema = isCreatingEntity ? CREATE_LOCATION_SCHEMA : UPDATE_LOCATION_SCHEMA
  return compose(transformFields, validateDataObject(schema), sanitize, pick(LOCATION_KEYS))
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
