const { compose, omit, evolve } = require('ramda')
const { Location } = require('./model')
const { createEntity } = require('../create-entity')
const { findEntityById } = require('../find-entity-by-id')
const { findEntities } = require('../find-entities')
const { updateEntityById } = require('../update-entity-by-id')
const { removeEntityById } = require('../remove-entity-by-id')
const { excludeFilter, latlngFilter, mindistanceFilter, setFilter } = require('./filters')
const { thenTransformEntities, thenTransformEntity } = require('../transform-result')

const buildGeoJsonForCoordinates = coordinates => ({
  type: 'Point',
  coordinates
})

const transformFields = fields => ({
  location: buildGeoJsonForCoordinates(fields.coordinates),
  ...omit(['coordinates'], fields)
})

const setCategoryFilter = setFilter('categories')
const setExcludeFilter = setFilter('exclude', excludeFilter)
const setLatlngFilter = setFilter('latlng', latlngFilter)
const setMindistanceFilter = setFilter('mindistance', mindistanceFilter)

const setConditions = ({ categories, exclude, latlng, mindistance }) =>
  compose(
    setMindistanceFilter(mindistance),
    setLatlngFilter(latlng),
    setExcludeFilter(exclude),
    setCategoryFilter(categories)
  )({})

const create = compose(thenTransformEntity, createEntity(Location), transformFields)

const updateLocationById = updateEntityById(Location)

const updateTransformations = {
  fields: transformFields
}

const update = compose(thenTransformEntity, updateLocationById, evolve(updateTransformations))

const findById = compose(thenTransformEntity, findEntityById(Location))

const find = compose(thenTransformEntities, findEntities(Location, setConditions))

const removeById = removeEntityById(Location)

module.exports = {
  transformFields,
  create,
  findById,
  find,
  update,
  removeById
}
